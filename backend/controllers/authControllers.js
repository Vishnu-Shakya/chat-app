const { formidable } = require('formidable')
const fs = require('fs')
var validator = require('validator');
const { default: isEmail } = require('validator/lib/isEmail')
const registerModel = require('../models/authModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')




module.exports.userRegister = (req, res) => {
     const form = formidable()
     form.parse(req, async (err, fields, files) => {


          const { userName, email, password, confirmPassword } = fields
          const { image } = files
          const error = []


          if (!userName[0]) {
               error.push('enter your user name ')
          }
          if (!email[0]) {
               error.push('please provide  your email')

          }
          if (!validator.isEmail(email[0])) {
               // error.push('provide your valid email')

          }

          if (!password[0].length) {
               error.push('please provide  your password')
          }
          if (!confirmPassword[0]) {
               error.push('please provide  your confirmPassword')
          }
          if (confirmPassword[0] !== password[0] && (password[0] && confirmPassword[0])) {
               error.push('your password and confrim password is not same ')


          }

          if (password[0] && (password[0].length < 6)) {
               error.push('your password must be min 6 character ')
          }
          if (Object.keys(files).length === 0) {
               error.push('please provide user image ')
          }

          if (error.length > 0) {
               res.status(404).json({
                    error: {
                         errorMessage: error
                    }
               })
          }
          else {
               const getImageName = files.image[0].originalFilename;
               const randNumber = Math.floor(Math.random() * 99999);
               const newImageName = randNumber + getImageName;
               files.image[0].originalFilename = newImageName;

               const newPath = __dirname + `/../../frontend/public/image/${files.image[0].originalFilename}`;

               try {
                    const checkUser = await registerModel.findOne({
                         email: email
                    });
                    if (checkUser) {
                         res.status(404).json({
                              error: {
                                   errorMessage: ['Your email already exited']
                              }
                         })
                    } else {

                         fs.copyFile(files.image[0].filepath, newPath, async (error) => {
                              if (!error) {


                                   const userCreate = await registerModel.create({
                                        userName: userName[0],
                                        email: email[0],
                                        password: await bcrypt.hash(password[0], 10),
                                        image: files.image[0].originalFilename

                                   })


                                   const token = jwt.sign({
                                        id: userCreate._id,
                                        email: userCreate.email,
                                        userName: userCreate.userName,
                                        image: userCreate.image,
                                        registerTime: userCreate.createdAt
                                   }, process.env.SECRET, {

                                        expiresIn: process.env.TOKEN_EXP
                                   })
                                   const options = {
                                        expires: new Date(Date.now() + process.env.COOKIE_EXP * 7 * 24 * 60 * 60 * 1000)
                                   }

                                   res.status(201).cookie('authToken', token, options).json({
                                        successMessage: 'your registration successfull...', token
                                   })
                                   console.log('data sent successfully ')







                              }
                              else {
                                   res.status(500).json({
                                        error: {
                                             errorMessage: ['Interanl Server Error']
                                        }
                                   })
                              }
                         })
                    }

               } catch (error) {
                    res.status(500).json({
                         error: {
                              errorMessage: ['Interanl Server Error']
                         }
                    })

               }


          }
     })// end formidable 










}

module.exports.userLogin = async (req, res) => {
     const error = [];
     const { email, password } = req.body
     // validating the fields 
     if (!email) {
          error.push('Please Provide a email')
     }
     if (!password) {
          error.push('Please Provide Your Password')
     }
     if (email && !validator.isEmail(email)) {
          error.push('please Provide a valid email')
     }
     if (error.length > 0) {
          res.status(404).json({
               error: {
                    errorMessage:error
               }
          })
     }

     else {


          try {

               const checkUser = await registerModel.findOne({
                    email: email
               }).select('+password')

               if (checkUser) {
                    const matchPassword = await bcrypt.compare(password, checkUser.password)

                    if (matchPassword) {
                         const token = jwt.sign({
                              id: checkUser._id,
                              email: checkUser.email,
                              userName: checkUser.userName,
                              image: checkUser.image,
                              registerTime: checkUser.createdAt,
                         }, process.env.SECRET, { expiresIn: process.env.TOKEN_EXP })

                         const options = {
                              expires: new Date(Date.now() + process.env.COOKIE_EXP * 7 * 24 * 60 * 60 * 1000)
                         }


                         res.status(200).cookie('authToken', token, options).json({
                              successMessage: 'Your Login successfull', token
                         })
                    }
                    else {
                         res.status(500).json({
                              error: {
                                   errorMessage: ['Your Password is not valid ']
                              }
                         })

                    }




               }
               else {
                    res.status(500).json({
                         error: {
                              errorMessage: ['Your Email Not Found ']
                         }
                    })
               }


          } catch (error) {

               res.status(500).json({
                    error: {
                         errorMessage: ['Internal Server Error']
                    }
               })
          }

     }
}
