export interface ITagRepository {
  findAll(): Promise<string[]>;
  createIfNotExists(names: string[]): Promise<void>;
}

export const ITagRepositoryToken = Symbol('ITagRepository');
