export interface ISideDishRepository {
  findAll(): Promise<string[]>;
  createIfNotExists(name: string): Promise<void>;
}

export const ISideDishRepositoryToken = Symbol('ISideDishRepository');
