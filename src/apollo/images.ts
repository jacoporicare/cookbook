import { S3 } from 'aws-sdk';

import { FileUpload } from './types';

export type ThumbExt = 'jpeg' | 'webp';

// Credentials are automatically provided thanks to IAM role attached to EC2:
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-iam.html
// Also automatically reads configuration from env vars:
// AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
const s3 = new S3();
const { RECIPE_IMAGES_S3_BUCKET, AWS_REGION } = process.env;
const BASE_URL = `https://${RECIPE_IMAGES_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com`;

const thumbExts: ThumbExt[] = ['jpeg', 'webp'];

function getFullImageKey(name: string) {
  return `full/${name}`;
}

function getThumbImageKey(name: string, ext: ThumbExt) {
  return `thumb/${name}.${ext}`;
}

export function getFullImageUrl(name: string) {
  const key = getFullImageKey(name);

  return `${BASE_URL}/${key}`;
}

export function getThumbImageUrl(name: string, ext: ThumbExt) {
  const key = getThumbImageKey(name, ext);

  return `${BASE_URL}/${key}`;
}

export async function uploadImage(name: string, fileUpload: FileUpload) {
  await s3
    .upload({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      Key: getFullImageKey(name),
      Body: fileUpload.createReadStream(),
      ContentType: fileUpload.mimetype,
    })
    .promise();
}

export async function renameImage(srcName: string, dstName: string) {
  await s3
    .copyObject({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      CopySource: encodeURIComponent(`${RECIPE_IMAGES_S3_BUCKET}/${getFullImageKey(srcName)}`),
      Key: getFullImageKey(dstName),
    })
    .promise();

  for (const ext of thumbExts) {
    await s3
      .copyObject({
        Bucket: RECIPE_IMAGES_S3_BUCKET!,
        CopySource: encodeURIComponent(
          `${RECIPE_IMAGES_S3_BUCKET}/${getThumbImageKey(srcName, ext)}`,
        ),
        Key: getThumbImageKey(dstName, ext),
      })
      .promise();
  }

  await deleteImage(srcName);
}

export async function deleteImage(name: string) {
  await s3
    .deleteObject({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      Key: getFullImageKey(name),
    })
    .promise();

  for (const ext of thumbExts) {
    await s3
      .deleteObject({
        Bucket: RECIPE_IMAGES_S3_BUCKET!,
        Key: getThumbImageKey(name, ext),
      })
      .promise();
  }
}
