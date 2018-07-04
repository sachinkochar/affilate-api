const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../../model/productsModel') 

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling Get requests'
    })
});

router.post('/',(req,res,next)=>{
    const products = {
        name : req.body.name,
        price: req.body.price
    };
    const product = new Product({
        name: req.body.name,
        price:req.body.price
    });
    product.save().then((result)=>{
        console.log(result)
    })
    .catch((err)=>{
        console.log(err)
    });
    res.status(201).json({
        message: 'Handling Post requests ',
        createdProduct: product
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId
    if(id === 'special'){
        res.status(200).json({
            message: 'product Id',
            message: id
        })    
    }else{
        res.status(200).json({
            message: 'Not a special product'
        })
    }
})

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'Updated Product'
    })
})

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'Product Deleted'
    })
})

export default router;