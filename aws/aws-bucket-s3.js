const AWS = require('aws-sdk');
const crypto = require('crypto');

//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_KEY
});

function uploadMedia(fileName, fileContent, fileType, user_id) {
  const s3 = new AWS.S3();
  const type = fileType.split('/');
  const fileExtension = type[1];
  const hash = crypto.createHmac('sha256', fileName).digest('hex');
  const userFolder = "user" + user_id + "/";
  const key = Date.now() + hash + "." + fileExtension;
  const params = {
    Bucket: process.env.BUCKET_DEV,
    Body: fileContent,
    Key: "user/" + userFolder + key
    //'4
  };
  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }

    //success
    if (data) {
      console.log("Upload success !");
      console.log("Uploaded in:", data.Location);
    }
  });

  const tab = {
    'path': key,
  };
  return tab
}
module.exports = {
  uploadMedia
}