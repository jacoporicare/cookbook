export interface IStorage {
  generatePresignedUploadUrl(fileName: string, mimeType: string): Promise<string>;

  generatePresignedDownloadUrl(key: string): Promise<string>;

  getObjectInfo(key: string): Promise<ObjectInfo | null>;

  getObject(key: string): Promise<Uint8Array>;

  deleteObject(key: string): Promise<void>;
}

export const IStorageToken = Symbol('IStorage');

export type ObjectInfo = {
  size: number;
  fileName: string | null;
  contentType: string | null;
};
