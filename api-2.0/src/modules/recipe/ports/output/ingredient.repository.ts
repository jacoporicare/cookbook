export interface IIngredientRepository {
  findAll(): Promise<string[]>;
  createIfNotExists(names: string[]): Promise<void>;
  deleteOrphans(): Promise<void>;
}

export const IIngredientRepositoryToken = Symbol('IIngredientRepository');
