const express = require('express');
const Claim = require('../models/Claim');
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')


const router = express.Router();
const { generateAwsKey } = require('../utils/generateUtils')

let s3 = new AWS.S3({
  signatureVersion: 'v4',
  secretAccessKey: process.env.AWS_SECRETACCESSKEY,
  accessKeyId: process.env.AWS_ACCESSKEYID,
  region: 'ap-southeast-2'
});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      console.log(file)
      cb(null, req.headers.businessid + '-' + req.headers.claimid + '-' + generateAwsKey() )
    },
    contentType: multerS3.AUTO_CONTENT_TYPE
  })
}).array('file'); 


router.route('/')
  .post(upload, async (req, res) => {
    
    const { claimid } = req.headers
    try {
      const foundClaim = await Claim.findOne({id: claimid})
      if (!foundClaim) {
        return res.status(400).send('claim not found')
      }
      for (const file of req.files) {
        console.log()
        let splitUrl = file.location.split('m/')
        console.log('splitUrl:', splitUrl[1])
        await foundClaim.attachments.push(splitUrl[1])
      }
      let savedClaim = await foundClaim.save()
      console.log("file upload success. savedClaim.attachments:", savedClaim.attachments);
      res.status(200).send(savedClaim)
    } catch (error) {
      res.send(error.message)
    }
  })
  .get(async (req, res) => {
    const { url } = req.headers;
    console.log('url:', url)
    
    
    let params = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: url,
      Expires: 3600
    }
    
    await s3.getSignedUrl('getObject', params, function(err, url){
      if (err) {
        res.send(error.message)
      } else {
        res.status(200).send(url)
      }
    });
    
  })

module.exports = router
