'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../../model/productsModel');

router.get('/', function (req, res, next) {
    res.status(200).json({
        message: 'Handling Get requests'
    });
});

router.post('/', function (req, res, next) {
    var products = {
        name: req.body.name,
        price: req.body.price
    };
    var product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
    res.status(201).json({
        message: 'Handling Post requests ',
        createdProduct: product
    });
});

router.get('/:productId', function (req, res, next) {
    var id = req.params.productId;
    if (id === 'special') {
        res.status(200).json(_defineProperty({
            message: 'product Id'
        }, 'message', id));
    } else {
        res.status(200).json({
            message: 'Not a special product'
        });
    }
});

router.patch('/:productId', function (req, res, next) {
    res.status(200).json({
        message: 'Updated Product'
    });
});

router.delete('/:productId', function (req, res, next) {
    res.status(200).json({
        message: 'Product Deleted'
    });
});

module.exports = router;