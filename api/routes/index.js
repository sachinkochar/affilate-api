import { Router } from 'express'
import products from './products'
import search from './Search'

const router =new Router();

router.use('/products',products);
router.use('/search',search);

export default router
