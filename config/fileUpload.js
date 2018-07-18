import multer from 'multer';
import fs from 'fs';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk'
import config from './index';

var s3 = new aws.S3({
   accessKeyId: config.awsS3.accessKeyId,
   secretAccessKey: config.awsS3.secretAccessKey
 });


export const storage =  multerS3({
    s3: s3,
    bucket: 'risorso',
     acl: 'public-read',
    metadata: function (req, file, cb) {

      cb(null, {fieldName: file.fieldname,ContentType:file.mimetype});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + file.originalname.replace(/\s+/g, ''));
    }
  });


export const imageFileFilter = (req, file, cb) => {
  // reject a file
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {

    cb(new Error("Send valid Image Type"));
  } else {

    cb(null, true);
  }
};

export const videoFileFilter = (req, file, cb) => {
  // reject a file
  if (!file.originalname.match(/\.(mp4|avi|mkv|mov)$/)) {

    cb(new Error("Send valid Video Type"));

  } else {

    cb(null, true);
  }

};