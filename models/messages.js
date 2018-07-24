import mongoose from 'mongoose';

const messagesModel= mongoose.Schema({
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatRoom'
    },
    member:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String

})

module.exports= mongoose.model('messages',messagesModel);