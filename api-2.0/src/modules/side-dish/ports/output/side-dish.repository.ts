export interface ISideDishRepository {
  findAll(): Promise<string[]>;
  createIfNotExists(name: string): Promise<void>;
  deleteOrphans(): Promise<void>;
}

export const ISideDishRepositoryToken = Symbol('ISideDishRepository');
