import ensureAuth from '../config/ensure-authenticated';
import userController from '../controllers/userController';
import emailController from '../controllers/emailController';
import express from 'express';

// Creating router instance of express router
const router = express.Router();

/*
   Creating Routes for Risorso Api
*/

// Route to get all users
router.route('/users')
   .get(
      userController.allusers
   );

// Route to get all users
router.route('/user/:id')
   .get(
      userController.singleUser
   );

// user sign-up route
router.route('/email')
   .post(
      userController.register
   );

// user login route
router.route('/login')
   .post(
      userController.login
   );

// user activated link
router.route('/login/:token')
   .post(
      userController.accontVerification
   );

//user logout route
router.route('/logout')
   .get(
      ensureAuth.authenticate,
      userController.logout
   );

// route to handle  forgot_password request
router.route('/forgot_password')
   .post(
      emailController.forgotPassword
   );

// route to handle reset password request
router.route('/reset_password/:token')
   .post(
      emailController.resetPassword
   );





module.exports = router;