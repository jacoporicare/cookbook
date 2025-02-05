export class Image {
  constructor(
    public fileName: string,
    public storageKey: string,
    public mimeType: string,
    public size: number,
    public thumbnail: string,
  ) {}
}
