import mongoose from 'mongoose';

const publisherSchema = mongoose.Schema({
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title:  String,
    subject: String,
    credibility: String,
    user_trust: String,
    brand_value:String,
    price: String,
    request_for:  String,
    expected_profit: String,
    expected_sales:  String,
    tags: Array
  })

module.exports= mongoose.model('publisher',publisherSchema);

