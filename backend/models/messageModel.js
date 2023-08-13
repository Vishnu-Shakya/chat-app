const { model, Schema } = require('mongoose')


const messageSchema = new Schema({
    senderId: {
        type: 'string',
        required: true
    },
    receiverId: {
        type: 'string',
        required: true
    },
    senderName: {
        type: 'string',
        required: true
    },
    message: {
        text: {
            type: String,
            default: ""

        },
        image: {
            type: 'string',
            default: ""
        }

    }
    ,
    status: {
        type: String,
        default: 'unseen'
    }
}, { timestamps: true })

module.exports = model('message', messageSchema)