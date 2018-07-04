const mongoose = require('mongoose');

// create schema
const productModels = mongoose.Schema({
    name: String ,
    price: Number
});

module.exports= mongoose.model('Product',productModels);