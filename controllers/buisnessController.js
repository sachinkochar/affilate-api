import express from 'express';
import mongoose from 'mongoose'
import Buisness from '../models/buisnessModel'

// var getResults = (req,res,next) => {
//     const SearchItems = Search.find({}).then( (data) => {
//         console.log(data, 'data')
//         res.status(200).json({
//             data:data,
//             message:'all results'
//         })
//     })
//     .catch( (err) => {
//         res.status(500).json({
//             message: 'Error Retrieving Data',
//             err
//     })
// })
// }

var getBuisness = (req, res, next) => {
    Buisness.find({})
        .then( (data) =>{
            res.status(200).json({
                data:data,
                message:'All Buisness'
            })
    })
    .catch( (err)=>{
        res.status(400).json({
            message: 'error',
            data:err
        })
    } )
}

var createBuisness = (req,res,next) => {
    console.log(req.form_data,'req body')
    const new_buisness= {
        user_id: req.body.user_id,
        title : req.body.title,
        subject : req.body.subject,
        credibility : req.body.credibiity,
        user_trust : req.body.user_trust,
        brand_value : req.body.brand_value,
        price : req.body.price,
        request_for : req.body.request_for,
        expected_profit : req.body.expected_profit,
        expected_sales : req.body.expected_sales,
        tags : req.body.tags,
    }

    const newBuisness = new Buisness(new_buisness);
    newBuisness.save()
    .then( (data)=>{
        console.log(data)
        res.status(200).json({
            message: 'New Buisness Added Successfully',
            Title: new_buisness.name
        })
    })
    .catch( (err) => {
        res.status(400).json({
            message: 'New Entry Not Added',
            err
        })
    } )
}


// var getFilteredResults = (req,res,next) => {
//     console.log(req.query,'reqiest params')
//     let tag_arr=req.query.tags;
//     tag_arr=tag_arr.split(',');
//     console.log(tag_arr)
//     const SearchItems = Search.find({ tags : { $in : tag_arr } }).then( (data) => {
//         console.log(data, 'data')
//         res.status(200).json({
//             data:data,
//             message:'all results'
//         })
//     })
//     .catch( (err) => {
//         res.status(500).json({
//             message: 'Error Retrieving Data',
//             err
//     })
// })
// }

var buisnessController={
    createBuisness,getBuisness
}

export default  buisnessController
