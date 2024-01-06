const AWS = require('aws-sdk');

const uploadToS3=(data, fileName) =>{
    return new Promise((res, rej) => {
      const BUCKET_NAME = 'expensetrading';
      const IAM_USER_KEY = 'AKIAWSIOHABV7WNMHBMJ';
      const IAM_USER_SECRET = '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';
  
      let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
      });
  
        var params = {
          Bucket: BUCKET_NAME,
          Key: fileName,
          Body: data,
          ACL: 'public-read'
        };
  
        s3bucket.upload(params, (err, s3response) => {
          if (err) {
            console.log(err);
            rej(err);
          } else {
    //        console.log('success',s3response);
            res(s3response.Location);
          }
        });
    });
  }

  module.exports={
    uploadToS3
  }