const express=require('express')
const router=express.Router()

const { getFriends, messageUploadDb,messageGet } = require('../controllers/messengerController.js')
const { authMiddleware } = require('../middleware/authMiddleware.js')


router.get('/get-friends',authMiddleware,getFriends)
router.post('/send-message',authMiddleware,messageUploadDb)
router.get('/get-message/:id',authMiddleware,messageGet)


module.exports=router