import  express from 'express';
import mongoose from 'mongoose';
import Product from '../../model/productsModel'; 
import allFuncs from '../../controller/proiductController'; 
const router = express.Router();

router.route('/').get(allFuncs.getProducts);
router.route('/').post(allFuncs.postProducts);



export default router;