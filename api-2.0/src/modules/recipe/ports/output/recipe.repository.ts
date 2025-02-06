import { Recipe } from '../../domain/entities/recipe';

export interface IRecipeRepository {
  findAll(): Promise<Recipe[]>;
  findById(id: string): Promise<Recipe | null>;
  findBySlug(slug: string): Promise<Recipe | null>;
  save(recipe: Recipe): Promise<Recipe>;
  delete(id: string): Promise<boolean>;
}

export const IRecipeRepositoryToken = Symbol('IRecipeRepository');
