import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import validations from '../helpers/userHelper';
import jwt from 'jsonwebtoken';
import config from '../config/';
import nodemailer from 'nodemailer';
import randtoken from 'rand-token';
import timediff from 'timediff';
//import emailExistence from 'email-existence';
import Hyperwallet  from "hyperwallet-sdk";
const url = config.url;

randtoken.generate();

let user = {

   /*
    * Handle user registration process.
    * 1. Check if user is already registered by checking email
    * 2. Encrypt password
    * 3. Save user information in MongoDB
    */
   register(req,res,next) {

      let {firstName, lastName, email, password, repPassword, role} = req.body;
      // let email     = req.body.email;
      // let password  = req.body.password;
      // let firstName
      let hashedPassword;

      if (validations.emailValidation(email) ==! true) {
            return res.status(200)
            .json({
            status:false,
            message:'Email cannot be empty & should be valid format'
            });
      }
      else if(password) {
            User.findOne({'email': email},(err, user) => {
                  if (err) {
                        return res.status(200).json({
                              status:false,
                              message:'Error on finding user'
                        });
                  }
                  if (user && user.email === email) {
                        return res.status(200).json({
                              status:false,
                              message:'This email is already registered'
                        });
                  }
                  bcrypt.genSalt(10, (err, salt)=> {
                        bcrypt.hash(password, salt, (err1, hash)=> {
                              if (err1) {
                                    return res.status(400).json({
                                    message:'Error on Hashing Password',
                                    error:err1
                                    });
                              }
                              hashedPassword = hash;

                              let token = randtoken.generate(16);
                              let newUser = new User({
                                    'firstName': firstName,
                                    'lastName': lastName,
                                    'email': email,
                                    'password': hashedPassword,
                                    'repPassword': hashedPassword,
                                    'role': role,
                                    'email_verify_token':token
                              });
                              var transporter = nodemailer.createTransport(config.smtpConfig);
                              var mailOptions = {
                                    from:`${config.smtpConfig.auth.user}`, // sender address
                                    to: `${email}`, // reciver email
                                    subject: 'Account Activation Link', // Subject line
                                    html: `<h2>Affiliate</h2><br>
                                    <h4>Hello, Click the following link to confirm your email. </h4>
                                    <br><a href="http://localhost:1337/login/${token}">click this link</a>`
                              };
                              // send mail with defined transport object
                              transporter.sendMail(mailOptions, (error, info) => {
                                    if (error) throw error;
                                    newUser.save((err, theUser)=> {
                                          if (err) {
                                                return res.status(500).json({
                                                      message:'Something went wrong.Try again.',
                                                      error:err
                                                });
                                          }
                                          else{
                                                res.status(200).json({
                                                      status:true,
                                                      message:"Created your account and a verification email sent to your Account."
                                                });
                                          }
                                    });
                              });
                        });
                  });
            });
      }
      else{
            return res.status(200).json({
                  status : false,
                  message:"Password cannot be empty"
            });
      }
   },

   /**
    * Handle user login process via Passport-jwt
    * 1. Check user email in the database.
    * 2. Encrypt password and compare with saved password.
    * 3. Generate a token using JWT for authentication
    **/
   login(req, res, next) {

      let email = req.body.email;
      let password = req.body.password;


      if (validations.emailValidation(email) == !true) {
         return res.status(400)
            .json({
               message: 'Email cannot be empty and should be valid format'
            });
      } else if (password) {

         User.findOne({
            email: email
         }, function(err, user) {

            if (err) {
               res.status(500).json({
                  status: false,
                  error: err.message
               });
            }

            if (!user) {
               res.status(401).json({
                  success: false,
                  message: 'Authentication failed'
               });
            } else {
               bcrypt.compare(password, user.password, function(err, isMatch) {
                  if (!isMatch) {
                     return res.status(400).json({
                        status: false,
                        message: "Authentication failed"
                     });
                  } else {
                     var isVerified = user.email_verified;
                     var createdDate = user.createdAt;
                     var payload = {
                        id: user._id
                     };
                     var token;
                     var currdate = new Date().toISOString();
                     var diff = timediff(createdDate, currdate, 'H');


                     if (isMatch && !err && isVerified === true) {

                        token = jwt.sign(payload, config.auth.secret, {
                           expiresIn: '1d'
                        });
                        res.status(200).json({
                           success: true,
                           message: 'Authentication successfull',
                           verified: isVerified,
                           token
                        });
                     } else if (diff.hours < 24) {
                        token = jwt.sign(payload, config.auth.secret, {
                           expiresIn: '1d'
                        });
                        res.status(200).json({
                           success: true,
                           message: 'Authentication successfull',
                           verified: isVerified,
                           token
                        });
                     } else {
                        res.status(200).json({
                           success: false,
                           message: 'Your Email is not verified yet..!!!'
                        });
                     }
                  }
               });
            }
         });
      } else {
         res.status(200).json({
            status: false,
            message: "Password cannot be empty"
         });
      }


   },

   /**
    * Handle user login process via Passport-jwt
    * 1. Check user email in the database.
    * 2. Encrypt password and compare with saved password.
    * 3. Generate a token using JWT for authentication
    **/
   accontVerification(req, res, next) {
      var token = req.params.token;
      let email = req.body.email;
      let password = req.body.password;

      if (validations.emailValidation(email) == !true) {
         return res.status(400)
            .json({
               status: false,
               message: 'Email cannot be empty and should be valid format'
            });
      } else if (password) {
         User.findOne({
            email
         }, function(err, user) {

            if (err) {
               return res.status(400).send({
                  status: false,
                  message: err
               });
            }
            if (!user) {
               res.status(400).send({
                  status: false,
                  message: 'User not found.'
               });
            } else {
               bcrypt.compare(password, user.password, function(err, isMatch) {

                  if (!isMatch) {
                     return res.status(400).json({
                        status: false,
                        message: "Password is not matched"
                     });
                  } else {
                     var payload = {
                        id: user._id
                     };

                     if (isMatch && !err) {

                        if (token === user.email_verify_token) {

                           User.findByIdAndUpdate({
                              _id: user._id
                           }, {
                              email_verified: true,
                              email_verify_token: null
                           }, ).exec(function(err, new_user) {
                              if (err) {
                                 res.status(500).json({
                                    status: false,
                                    error: err.message
                                 });
                              } else {
                                 var token = jwt.sign(payload, config.auth.secret, {
                                    expiresIn: '1d'
                                 });
                                 res.status(200).json({
                                    success: true,
                                    message: 'Account Activated successfully',
                                    token
                                 });
                              }
                           });
                        } else {
                           res.status(400).json({
                              status: false,
                              message: 'verify code is not valid or expired'
                           });
                        }
                     } else {
                        res.status(400).json({
                           status: false,
                           message: 'Authentication failed.Passwords did not match.'
                        });
                     }
                  }
               });
            }
         });
      } else {
         res.status(400).json({
            status: false,
            message: "Password cannot be empty"
         });
      }
   },

   /**
    * Handle user Logout process via Passport
    * 1. Check user session and destroy it.
    **/
   logout(req, res, next) {
      req.logout();
      res.status(200).json({
         status: true,
         message: 'You are successfully logged out.'
      });
   },

   /**
    * Handle get alluser Request
    * 1. Get the list of all users from database.
    **/
   allusers(req, res, next) {
      User.find({}, '_id email', function(err, users) {
         if (err) {
            res.status(500).json({
               status: false,
               error: err.message
            });
         }
         res.status(200).json({
            status: true,
            users: users
         });
      });
   },

   /**
    * Handle get Single user Request
    * 1. Get the user from database by user id.
    **/
   singleUser(req, res, next) {
      var user_id = req.params.id;
      User.findById({
         _id: user_id
      }, function(err, user) {
         if (err) {
            res.status(500).json({
               status: false,
               error: err.message
            });
         }
         res.status(200).json({
            status: true,
            message: "Your Details",
            user: user
         });
      });
   },

}


export default user;