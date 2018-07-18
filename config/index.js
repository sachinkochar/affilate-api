  /*
  * Basic configuration object
  */

 import dotenv from 'dotenv';
 dotenv.config();
 var url = '';

  if(process.env.NODE_ENV === 'production'){
     url = 'http://18.195.238.14'
  } else {
       url = 'http://18.195.238.14:1337'
  }
 module.exports = {
    url,
    auth: {
       secret: 'my_secret_key',
       session_secret: "Affiliate_Secret_API_key"
    },
    awsS3: {
      accessKeyId:'AKIAJP656YSBA5ZUU6XQ',
      secretAccessKey:'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'
    },
    smtpConfig: {
       host: 'smtp.yandex.com',
       port: 465,
       secure: true, // use SSL
       auth: {
          user: 'dharam@risorso.com',
          pass: 'technical@123'
       }
    }
 };
