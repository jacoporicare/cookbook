const AWS = require('aws-sdk');

const resize = require('./resize');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  console.log('Event', event);

  const { bucket } = event;

  const data = await s3
    .listObjectsV2({
      Bucket: bucket,
      Prefix: 'full/',
    })
    .promise();

  for (o of data.Contents) {
    await resize(s3, bucket, o.Key, 'jpeg');
    await resize(s3, bucket, o.Key, 'webp');
  }

  console.log('Recreation complete');
};
