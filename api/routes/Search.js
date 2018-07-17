import  express from 'express';
import allFuncs from '../../controller/search'; 
const router = express.Router();

router.route('/').get(allFuncs.getResults);
router.route('/').post(allFuncs.postSearch);
router.route('/filter').get(allFuncs.getFilteredResults);



export default router;