const sharp = require('sharp');

module.exports = async (s3, bucket, srcKey, format) => {
  const dstKey = `${srcKey.replace(/^full\//, 'thumb/')}.${format}`;

  let origimage;

  try {
    const params = {
      Bucket: bucket,
      Key: srcKey,
    };
    origimage = await s3.getObject(params).promise();
  } catch (error) {
    console.error(error);

    return;
  }

  let buffer;

  try {
    buffer = await sharp(origimage.Body).rotate().resize(800, 800).toFormat(format).toBuffer();
  } catch (error) {
    console.error(error);

    return;
  }

  try {
    const destparams = {
      Bucket: bucket,
      Key: dstKey,
      Body: buffer,
      ContentType: `image/${format}`,
    };

    await s3.putObject(destparams).promise();
  } catch (error) {
    console.error(error);

    return;
  }

  console.log(
    'Successfully resized ' + bucket + '/' + srcKey + ' and uploaded to ' + bucket + '/' + dstKey,
  );
};
