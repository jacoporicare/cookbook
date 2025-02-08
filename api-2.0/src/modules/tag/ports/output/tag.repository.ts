export interface ITagRepository {
  findAll(): Promise<string[]>;
  createIfNotExists(names: string[]): Promise<void>;
  deleteOrphans(): Promise<void>;
}

export const ITagRepositoryToken = Symbol('ITagRepository');
