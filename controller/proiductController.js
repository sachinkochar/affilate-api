import express from 'express'
const router = express.Router();


var getProducts = (req,res,next) => {
    res.status(200).json({
        message: 'all products'
    })
}

var postProducts = (req,res,next) => {
    res.status(200).json({
        message: 'post products'
    })
}

var allFuncs={
    getProducts,postProducts
}

export default  allFuncs