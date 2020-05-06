/* eslint-disable @typescript-eslint/no-explicit-any */

export const runtimeConfig =
  typeof window !== 'undefined'
    ? {
        // client
        awsRegion: (window as any).env.awsRegion,
        s3Bucket: (window as any).env.s3Bucket,
      }
    : {
        // server
        awsRegion: process.env.AWS_REGION!,
        s3Bucket: process.env.S3_BUCKET!,
      };
