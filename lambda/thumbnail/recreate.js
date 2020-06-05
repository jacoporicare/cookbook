const AWS = require('aws-sdk');

const resize = require('./resize');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const bucket = event.bucket;

  const listParams = {
    Bucket: bucket,
    Prefix: 'full/',
  };

  try {
    const data = await s3.listObjectsV2(listParams).promise();

    for (o of data.Contents) {
      await resize(s3, bucket, o.Key);
    }
  } catch (error) {
    console.error(error, error.stack);

    return;
  }

  console.log('Recreation complete');
};
