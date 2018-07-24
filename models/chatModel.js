import mongoose from 'mongoose';

// const chatModel = mongoose.Schema({
//     roomId:  String,
//     initiater: "<ObjectId>",
//     replier: "<ObjectId>",
//     messages:{
//         intiater:{
//             message:[{
//                 text: String,
//                 createdOn: new Date()
//             }]
//         }
//     },
//     website: String,
//     description: String,
//   })

const roomModel = mongoose.Schema({
    roomId: String,
    members:Array
})



module.exports= mongoose.model('chatRoom',roomModel);

