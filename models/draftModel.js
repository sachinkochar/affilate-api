import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema({
   draft_title: {
      type: String,
      required: true,
      unique: true,
   },
   main_title: {
      type: String,
      required: true,
   },
   quick_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'category',
   },
   content_description: {
      type: String,
   },
   content_type: {
      type: String,
   },
   featuring_image: {
      type: String,
      default: ''
   },
   featuring_data: {
      type: Array,
      "default": []
   },
   article_data: {
      type: Array,
      "default": []
   },
   created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   },
   published_channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
   },
   creation_time: {
      type: Date,
      required: true,
      default: Date.now()
   }


}, );


const draft = mongoose.model('draft', draftSchema);

module.exports = draft;