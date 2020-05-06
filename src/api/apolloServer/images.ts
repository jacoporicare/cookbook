import { S3 } from 'aws-sdk';
import { fromBuffer as fileTypeFromBuffer } from 'file-type';

import { getImageKey } from '../../utils';
import { FileUpload } from '../types';

// Credentials are automatically provided thanks to IAM role attached to EC2:
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-iam.html
// Also automatically reads configuration from env vars:
// AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
const s3 = new S3();

export async function uploadImage(slug: string, fileUpload: Promise<FileUpload>) {
  const stream = (await fileUpload).createReadStream();
  const bufs: Buffer[] = [];
  const image = await new Promise<Buffer>(resolve => {
    stream
      .on('data', (data: Buffer) => {
        bufs.push(data);
      })
      .on('end', () => {
        resolve(Buffer.concat(bufs));
      });
  });

  const ft = await fileTypeFromBuffer(image);
  const mimeType = ft?.mime ?? 'image/jpeg';

  await s3
    .putObject({
      Bucket: process.env.S3_BUCKET!,
      Key: getImageKey(slug, 'full'),
      Body: image,
      ContentType: mimeType,
      ACL: 'public-read',
    })
    .promise();
}

export async function renameImage(srcSlug: string, dstSlug: string) {
  await s3
    .copyObject({
      Bucket: process.env.S3_BUCKET!,
      CopySource: encodeURIComponent(`${process.env.S3_BUCKET}/${getImageKey(srcSlug, 'full')}`),
      Key: getImageKey(dstSlug, 'full'),
      ACL: 'public-read',
    })
    .promise();

  await s3
    .copyObject({
      Bucket: process.env.S3_BUCKET!,
      CopySource: encodeURIComponent(`${process.env.S3_BUCKET}/${getImageKey(srcSlug, 'thumb')}`),
      Key: getImageKey(dstSlug, 'thumb'),
      ACL: 'public-read',
    })
    .promise();

  await deleteImage(srcSlug);
}

export async function deleteImage(slug: string) {
  await s3
    .deleteObject({
      Bucket: process.env.S3_BUCKET!,
      Key: getImageKey(slug, 'full'),
    })
    .promise();

  await s3
    .deleteObject({
      Bucket: process.env.S3_BUCKET!,
      Key: getImageKey(slug, 'thumb'),
    })
    .promise();
}
