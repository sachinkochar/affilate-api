import express from 'express'
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import all_routes from './api/routes';
const app = express();
const bodyParser = require('body-parser');
const dbUrl= require('./config/config');
const uri= dbUrl.database.connectionString;
app.use(morgan('dev'));

mongoose.connect(uri,(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log('MongoDB is at your service');
    }
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use('/api', all_routes )

// app.use('/orders',ordersRoutes);
    // })

app.use((req, res, next)=>{
    const error= new Error('Not Found');
    error.status=404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        message: error.message
})
})

export default app;