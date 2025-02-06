export class Image {
  constructor(
    public storageKey: string,
    public mimeType: string,
    public thumbnailStorageKey: string,
    public thumbnailMimeType: string,
  ) {}
}
