import express from 'express';
import buisnessController from '../controllers/buisnessController';

// Creating router instance of express router
const router = express.Router();


/*
 * Route to find data with search query
 */
router.route('/buisness')
   .get(
    buisnessController.getBuisness
   )

router.route('/buisness/create')
   .post(
    buisnessController.createBuisness
   )

module.exports = router;