import express from 'express';
import mongoose from 'mongoose'
import Publisher from '../models/publisherModel'

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

var getPublisher = (req, res, next) => {
    Publisher.find({})
        .then( (data) =>{
            res.status(200).json({
                data:data,
                message:'All Publishers'
            })
    })
    .catch( (err)=>{
        res.status(400).json({
            message: 'error',
            data:err
        })
    } )

}

var createPublisher = (req,res,next) => {
    console.log(req.form_data,'req body')
    const new_publisher= {
        user_id: req.body.user_id,
        name : req.body.buis_name,
        buis_type : req.body.buis_type,
        buis_website : req.body.buis_website,
        description : req.body.description,
    }

    const newPublisher = new Publisher(new_publisher);
    newPublisher.save()
    .then( (data)=>{
        console.log(data)
        res.status(200).json({
            message: 'New Buisness Added Successfully',
            Title: new_publisher.name
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

var publishController={
    createPublisher,getPublisher
}

export default  publishController
