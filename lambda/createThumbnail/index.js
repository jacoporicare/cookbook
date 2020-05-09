const util = require('util');

const AWS = require('aws-sdk');

const resize = require('./resize');

// get reference to S3 client
const s3 = new AWS.S3();

exports.handler = async (event, context, callback) => {
  // Read options from the event parameter.
  console.log('Reading options from event:\n', util.inspect(event, { depth: 5 }));
  const bucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  await resize(s3, bucket, srcKey);
};

exports.recreateHandler = async (event, context, callback) => {
  // Read options from the event parameter.
  console.log('Reading options from event:\n', util.inspect(event, { depth: 5 }));
  const bucket = event.bucket;

  const listParams = {
    Bucket: bucket,
    Prefix: 'recipe-images/full/',
  };

  try {
    const data = await s3.listObjectsV2(listParams).promise();

    for (o of data.Contents) {
      await resize(s3, bucket, o.Key);
    }
  } catch (error) {
    console.log(error, error.stack);

    return;
  }

  console.log('Recreation complete');
};
