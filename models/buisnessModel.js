import mongoose from 'mongoose';

const buisnesSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    buisness_name:  String,
    buisness_type: String,
    website: String,
    description: String,
  })

module.exports= mongoose.model('buisness',buisnesSchema);

