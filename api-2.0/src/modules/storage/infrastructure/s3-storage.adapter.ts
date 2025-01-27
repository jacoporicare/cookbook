import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IStorage } from '../domain/storage.port';

@Injectable()
export class S3StorageAdapter implements IStorage {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    this.s3 = new S3Client({
      region: config.get<string>('AWS_REGION'),
    });
    this.bucket = config.get<string>('AWS_S3_BUCKET')!;
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
