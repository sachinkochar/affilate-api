import  express from 'express';
import allFuncs from '../controllers/searchController';
const router = express.Router();

router.route('/search').get(allFuncs.getResults);
router.route('/').post(allFuncs.postSearch);
router.route('/search/filter').get(allFuncs.getFilteredResults);

module.exports = router;