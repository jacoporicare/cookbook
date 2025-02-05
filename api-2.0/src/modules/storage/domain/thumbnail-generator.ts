import * as sharp from 'sharp';

export interface GetSignedUrlParams {
  key: string;
  bucketName: string;
  originalFileName?: string;
  contentDisposition?: string;
}

export class ThumbnailGenerator {
  constructor(
    private readonly getSignedUrlGetObject: ({
      key,
      bucketName,
      originalFileName,
    }: GetSignedUrlParams) => Promise<string>,
  ) {}

  async generateThumbnail(
    storageKey: string,
    bucket: string,
    mimeType: string,
  ): Promise<string | null> {
    //allow only jpg, png, webp, aviv
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/apng'].includes(mimeType)) {
      return null;
    }
    const url = await this.getSignedUrlGetObject({
      key: storageKey,
      bucketName: bucket,
    });

    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const resizedBuffer = await sharp(buffer)
      .rotate()
      .resize({
        width: 200,
        height: 200,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toBuffer();

    return resizedBuffer.toString('base64');
  }
}
