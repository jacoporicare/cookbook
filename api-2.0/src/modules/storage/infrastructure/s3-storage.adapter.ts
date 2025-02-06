import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { IStorage, ObjectInfo } from '../domain/storage.port';

import { Config } from '@/config';

@Injectable()
export class S3StorageAdapter implements IStorage {
  private readonly s3Client: S3Client;

  constructor(private readonly config: Config) {
    this.s3Client = new S3Client({ region: config.awsRegion });
  }

  async generatePresignedUploadUrl(fileName: string, mimeType: string): Promise<string> {
    const ext = fileName.split('.').pop();
    const key = `${uuidv4()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: this.config.awsS3Bucket,
      Key: key,
      ContentType: mimeType,
      Metadata: {
        filename: fileName,
      },
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  async generatePresignedDownloadUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.awsS3Bucket,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  async getObjectInfo(key: string): Promise<ObjectInfo | null> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.config.awsS3Bucket,
        Key: key,
      });

      const output = await this.s3Client.send(command);

      return {
        size: output.ContentLength ?? 0,
        fileName: output.Metadata?.filename ?? null,
        contentType: output.ContentType ?? null,
      };
    } catch (err) {
      if (err instanceof NotFound) {
        return null;
      }

      throw err;
    }
  }

  async getObject(key: string): Promise<Uint8Array> {
    const response = await this.s3Client.send(
      new GetObjectCommand({
        Bucket: this.config.awsS3Bucket,
        Key: key,
      }),
    );

    if (!response.Body) {
      throw new Error('Object not found');
    }

    return response.Body?.transformToByteArray();
  }

  async deleteObject(key: string): Promise<void> {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.config.awsS3Bucket,
        Key: key,
      }),
    );
  }
}
