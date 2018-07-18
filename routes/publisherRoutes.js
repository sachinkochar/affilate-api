import express from 'express';
import publisherController from '../controllers/publisherController';

// Creating router instance of express router
const router = express.Router();


/*
 * Route to find data with search query
 */

router.route('/search')
   .post(
      publisherController.add
   )

module.exports = router;