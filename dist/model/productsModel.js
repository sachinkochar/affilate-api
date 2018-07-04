'use strict';

var mongoose = require('mongoose');

// create schema
var productModels = mongoose.Schema({
    name: String,
    price: Number
});

module.exports = mongoose.model('Product', productModels);