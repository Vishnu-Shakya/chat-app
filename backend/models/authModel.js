const {model,Schema} =require('mongoose')


const registerSchema=new Schema({
    userName:{
        type:'string',
        required:true
    },
    email:{
        type:'string',
        required:true
    },
    password:{
        type:'string',
        required:true,
        select:false
       
    },
    image:{
        type:'string',
        required:true
    }
},{timestamps:true})

module.exports=model('user',registerSchema)