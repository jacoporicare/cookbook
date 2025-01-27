export interface IStorage {
  generatePresignedUploadUrl(
    folder: string,
    mimeType: string,
  ): Promise<{ url: string; method: string }>;

  generatePresignedDownloadUrl(key: string): Promise<string>;
}

export const IStorageToken = Symbol('IStorage');
