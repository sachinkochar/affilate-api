import express from 'express';
import publisherController from '../controllers/publisherController';

// Creating router instance of express router
const router = express.Router();


/*
 * Route to find data with search query
 */

router.route('/publisher')
   .get(
    publisherController.getPublisher
   )

router.route('/publisher/create')
   .post(
    publisherController.createPublisher
   )

module.exports = router;