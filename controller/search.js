import express from 'express';
import mongoose from 'mongoose'
import Search from '../model/searchModel'

var getResults = (req,res,next) => {
    const SearchItems = Search.find({}).then( (data) => {
        console.log(data, 'data')
        res.status(200).json({
            data:data,
            message:'all results'
        })
    })
    .catch( (err) => {
        res.status(500).json({
            message: 'Error Retrieving Data',
            err
    })
})
}

var postSearch = (req,res,next) => {
    console.log(req.form_data,'req body')
    const new_entry= {
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
    
    const searchItem = new Search(new_entry);
    searchItem.save()
    .then( (data)=>{
        console.log(data)
        res.status(200).json({
            message: 'New Entry Added Successfully',
            Title: new_entry.title
        })
    })
    .catch( (err) => {
        res.status(400).json({
            message: 'New Entry Not Added',
            err
        })
    } ) 
}


var getFilteredResults = (req,res,next) => {
    console.log(req.query,'reqiest params')
    let tag_arr=req.query.tags;
    tag_arr=tag_arr.split(',');
    console.log(tag_arr)
    const SearchItems = Search.find({ tags : { $in : tag_arr } }).then( (data) => {
        console.log(data, 'data')
        res.status(200).json({
            data:data,
            message:'all results'
        })
    })
    .catch( (err) => {
        res.status(500).json({
            message: 'Error Retrieving Data',
            err
    })
})
}

var allFuncs={
    getResults,postSearch,getFilteredResults
}

export default  allFuncs