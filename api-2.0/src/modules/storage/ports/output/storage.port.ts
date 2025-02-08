export interface IStorage {
  generatePresignedUploadUrl(mimeType: string): Promise<FileUpload>;

  generatePresignedDownloadUrl(key: string): Promise<string>;

  getObjectInfo(key: string): Promise<ObjectInfo | null>;

  getObject(key: string): Promise<Uint8Array>;

  putObject(mimeType: string, data: Buffer): Promise<string>;

  deleteObject(key: string): Promise<void>;
}

export const IStorageToken = Symbol('IStorage');

export type ObjectInfo = {
  contentType: string | null;
};

export type FileUpload = {
  key: string;
  url: string;
};
