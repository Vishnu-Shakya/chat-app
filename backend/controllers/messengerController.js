const User = require('../models/authModel')
const messageModel = require('../models/messageModel')



module.exports.getFriends = async (req, res) => {
    try {
        const myId = req.myId
        const friendsGet = await User.find({})
        const filter = friendsGet.filter(d => d.id !== myId)

        res.status(200).json({ success: true, friends: filter })


    } catch (error) {

        res.status(500).json({
            error: {
                errorMessage: ['Internal Server Error']
            }
        })

    }
}
module.exports.messageUploadDb = async (req,res) => {
    const senderId = req.myId
    const {
        senderName,
        receiverId,
        message,

    } = req.body;

    try {

        const insertMessage = await messageModel.create({
            senderName: senderName,
            senderId: senderId,
            message: {
                text: message,
                image: ""
            },
            receiverId: receiverId


        })

        res.status(201).json({
            success:true,
            message:insertMessage
        })

    } catch (error) {

        res.status(500).json({
            error: {
                errorMessage: ["Internal Server Error"]
            }
        })

    }


}
module.exports.messageGet = async (req, res) => {

    const myId=await req.myId;
    const fdId=req.params.id;
    
   
    
    try {

        let getAllMessage=await messageModel.find({})
        getAllMessage=getAllMessage.filter((m)=>{ 
            if((m.senderId===myId && m.receiverId===fdId) || (m.senderId===fdId && m.receiverId===myId)){ return m }
            })
        
          
       res.status(200).json({
        success:true,
        message:getAllMessage
       })
      
       
    } catch (error) {
        res.status(500).json({
            error:{
                errorMessage:['Ineternal Server Error']
            }
        })
    }


}

