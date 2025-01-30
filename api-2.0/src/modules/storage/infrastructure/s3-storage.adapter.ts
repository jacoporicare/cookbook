import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

import { IStorage } from '../domain/storage.port';

import { Config } from '@/config';

@Injectable()
export class S3StorageAdapter implements IStorage {
  private readonly s3: S3Client;
  private readonly bucket: string | undefined;

  constructor(readonly config: Config) {
    this.s3 = new S3Client({ region: config.awsRegion });
    this.bucket = config.awsS3Bucket;
  }

  async generatePresignedUploadUrl(
    folder: string,
    mimeType: string,
  ): Promise<{ url: string; method: string }> {
    const key = `${folder}/${Date.now()}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: mimeType,
    });

    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return { url, method: 'PUT' };
  }

  async generatePresignedDownloadUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return getSignedUrl(this.s3, command, { expiresIn: 3600 });
  }
}
