import { Inject, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

import { Image } from '../domain/value-objects/image';

import { IStorage, IStorageToken } from '@/modules/storage/domain/storage.port';

@Injectable()
export class ImageService {
  constructor(@Inject(IStorageToken) private readonly storage: IStorage) {}

  async generatePresignedDownloadUrl(key: string): Promise<string> {
    return this.storage.generatePresignedDownloadUrl(key);
  }

  async generatePresignedUploadUrl(fileName: string, mimeType: string): Promise<string> {
    return this.storage.generatePresignedUploadUrl(fileName, mimeType);
  }

  async create(storageKey: string): Promise<Image> {
    const info = await this.storage.getObjectInfo(storageKey);

    if (!info) {
      throw new Error('Image not found');
    }

    const mimeType = info.contentType ?? 'image/jpeg';
    const thumbnail = await this.generateThumbnail(storageKey);

    return new Image(info.fileName ?? storageKey, storageKey, mimeType, info.size, thumbnail);
  }

  async delete(storageKey: string): Promise<void> {
    await this.storage.deleteObject(storageKey);
  }

  async generateThumbnail(storageKey: string): Promise<string> {
    const data = await this.storage.getObject(storageKey);
    const resizedBuffer = await sharp(data)
      .rotate()
      .resize({
        width: 800,
        height: 800,
      })
      .toBuffer();

    return resizedBuffer.toString('base64');
  }
}
