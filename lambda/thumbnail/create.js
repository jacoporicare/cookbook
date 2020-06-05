const AWS = require('aws-sdk');

const resize = require('./resize');

const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  const bucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  await resize(s3, bucket, srcKey);
};
