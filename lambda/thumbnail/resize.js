const sharp = require('sharp');

module.exports = async (s3, bucket, srcKey, format) => {
  try {
    const origImage = await s3
      .getObject({
        Bucket: bucket,
        Key: srcKey,
      })
      .promise();

    const dstKey = `${srcKey.replace(/^full\//, 'thumb/')}.${format}`;

    await s3
      .upload({
        Bucket: bucket,
        Key: dstKey,
        Body: sharp(origImage.Body).rotate().resize(800, 800).toFormat(format),
        ContentType: `image/${format}`,
      })
      .promise();

    console.log(
      'Successfully resized ' + bucket + '/' + srcKey + ' and uploaded to ' + bucket + '/' + dstKey,
    );
  } catch (error) {
    console.error(error);
  }
};
