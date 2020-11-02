import { S3 } from 'aws-sdk';
import { fromBuffer as fileTypeFromBuffer } from 'file-type';

import { FileUpload } from './types';

// Credentials are automatically provided thanks to IAM role attached to EC2:
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-iam.html
// Also automatically reads configuration from env vars:
// AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
const s3 = new S3();
const { RECIPE_IMAGES_S3_BUCKET, AWS_REGION } = process.env;

export function getImageKey(name: string, size: string) {
  return `${size}/${name}`;
}

export function getImageUrl(name: string, size: string) {
  const key = getImageKey(name, size);

  return `https://${RECIPE_IMAGES_S3_BUCKET}.s3-${AWS_REGION}.amazonaws.com/${key}`;
}

export async function fileUploadToBuffer(fileUpload: Promise<FileUpload>) {
  const stream = (await fileUpload).file.createReadStream();
  const bufs: Buffer[] = [];

  return new Promise<Buffer>(resolve => {
    stream
      .on('data', (data: Buffer) => {
        bufs.push(data);
      })
      .on('end', () => {
        resolve(Buffer.concat(bufs));
      });
  });
}

export async function uploadImage(name: string, image: Buffer) {
  const ft = await fileTypeFromBuffer(image);
  const mimeType = ft?.mime ?? 'image/jpeg';

  await s3
    .putObject({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      Key: getImageKey(name, 'full'),
      Body: image,
      ContentType: mimeType,
    })
    .promise();
}

export async function renameImage(srcName: string, dstName: string) {
  await s3
    .copyObject({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      CopySource: encodeURIComponent(`${RECIPE_IMAGES_S3_BUCKET}/${getImageKey(srcName, 'full')}`),
      Key: getImageKey(dstName, 'full'),
    })
    .promise();

  await s3
    .copyObject({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      CopySource: encodeURIComponent(`${RECIPE_IMAGES_S3_BUCKET}/${getImageKey(srcName, 'thumb')}`),
      Key: getImageKey(dstName, 'thumb'),
    })
    .promise();

  await deleteImage(srcName);
}

export async function deleteImage(name: string) {
  await s3
    .deleteObject({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      Key: getImageKey(name, 'full'),
    })
    .promise();

  await s3
    .deleteObject({
      Bucket: RECIPE_IMAGES_S3_BUCKET!,
      Key: getImageKey(name, 'thumb'),
    })
    .promise();
}
