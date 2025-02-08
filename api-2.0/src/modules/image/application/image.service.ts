import { Inject, Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

import { Image } from '@/modules/image/domain/image';
import { IStorage, IStorageToken, FileUpload } from '@/modules/storage/ports/output/storage.port';

@Injectable()
export class ImageService {
  constructor(@Inject(IStorageToken) private readonly storage: IStorage) {}

  async generatePresignedDownloadUrl(key: string): Promise<string> {
    return this.storage.generatePresignedDownloadUrl(key);
  }

  async generatePresignedUploadUrl(mimeType: string): Promise<FileUpload> {
    return this.storage.generatePresignedUploadUrl(mimeType);
  }

  async create(storageKey: string): Promise<Image> {
    const info = await this.storage.getObjectInfo(storageKey);

    if (!info) {
      throw new Error('Image not found');
    }

    const mimeType = info.contentType ?? 'image/jpeg';

    const obj = await this.storage.getObject(storageKey);
    const thumbnail = await sharp(obj)
      .rotate()
      .webp()
      .resize({
        width: 800,
        height: 800,
      })
      .toBuffer();

    const thumbStorageKey = await this.storage.putObject('image/webp', thumbnail);

    return new Image(storageKey, mimeType, thumbStorageKey, 'image/webp');
  }

  async delete(storageKey: string): Promise<void> {
    await this.storage.deleteObject(storageKey);
  }
}
