const express = require('express');
const Claim = require('../models/Claim');
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const router = express.Router();

let s3 = new AWS.S3({
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
      cb(null, req.headers.businessid + '-' + req.headers.claimid + '-' + Date.now().toString())
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
        res.status(400).send('claim not found')
      }
      for (const file of req.files) {
        await foundClaim.attachments.push(file.location)
      }
      let savedClaim = await foundClaim.save()
      console.log("file upload and attachment ref url success:", savedClaim.attachments);
      res.status(200).send(savedClaim)
    } catch (error) {
      res.send(error.message)
    }
  })
  .get(async (req, res) => {
    const { claimid } = req.headers;

    const foundClaim = await Claim.findOne({id: claimid})
    
    const { attachments: urls }  = foundClaim
    
    let params = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: ""
    }

    for (const url of urls) {
      let files = []
      params.Key = url
      await s3.getSignedUrl('getObject', params, function(err, url){
        if (err) {
          res.send(error.message)
        } else {
          files.push(url)
          console.log(files)
        }
        return files
      });
    }
    res.status(200).send(files)
  })

module.exports = router
