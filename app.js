import express from 'express'; // import express module
import mongoose from 'mongoose'; // import mongoose module
import bodyParser from 'body-parser'; // import body-parser module
import passport from 'passport'; // import express passport
import config from './config/';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

dotenv.config();

// import All routes  from routes folder
import Routes from './routes';

// Create a new Express Instance
const app = express();

// compress all responses
app.use(compression());

//setting url of MongoDb
var uri = '';
if (process.env.NODE_ENV=== 'production') {
   uri = process.env.MONGODB_URI || 'mongodb://localhost/affiliate';
   console.log('===PRODUCTION===');
} else {
   uri = process.env.LOCAL_URI || 'mongodb://localhost/affiliate-dev';
   console.log('===DEVELOPMENT===');
}

// Configuration and connecting to Databse MongoDb
mongoose.connect(uri, {
   useMongoClient: true
}, (err) => {
   if (err) {
      console.log('Connection Error: ', err);
   } else {
      console.log('Successfully Connected');
   }
});

mongoose.Promise = global.Promise;

// Cors middleware to handle request cross-origin
app.use(cors());

// serving static files to the client
app.use('/public/uploads', express.static(path.join(__dirname + '/public/uploads')));
app.use('/images', express.static(path.join(__dirname + '/public/images')));


//body-parser middleware to handle form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}));

//morgan middle-ware to logs the requests.
app.use(logger('dev'));


//configuration for passport
require('./config/passport')(passport);
app.use(session({
   resave: true,
   proxy: true,
   saveUninitialized: true,
   secret: config.auth.session_secret,
   cookie:{
   secure: false,
   domain: 'localhost',
   maxAge: 1000 * 60 * 24 // 24 hours
   },
   store: new MongoStore({
       url: uri,
       autoReconnect: true
   })
}));

app.use(passport.initialize());
app.use(passport.session()); //persistent login session

// Welcome Route for api
app.get('/api', function(req, res, next) {
   res.status(200).json({
      status: true,
      message: "Welcome to Affiliate API, Ready to Handle Requests..!!"
   });
});

// Api Routes For application

app.use('/api', Routes.userRoutes);
// app.use('/api', Routes.accountSettingRoutes);
app.use('/api', Routes.searchRoutes);
// app.use('/api', Routes.publisherRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   var err = new Error("No Matching Route Please Check Again...!!");
   err.status = 404;
   next(err);
});
// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.json({
      Error: {
         message: err.message
      }
   });
});


module.exports = app;