import { Inject, Injectable } from '@nestjs/common';

import { Recipe } from '../domain/entities/recipe';
import { IRecipeRepository, IRecipeRepositoryToken } from '../domain/ports/recipe.repository';

import { IStorage, IStorageToken } from '@/modules/storage/domain/storage.port';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(IRecipeRepositoryToken) private readonly repository: IRecipeRepository,
    @Inject(IStorageToken) private readonly storage: IStorage,
  ) {}

  async getAllRecipes(): Promise<Recipe[]> {
    return this.repository.findAll();
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    return this.repository.findById(id);
  }

  async getRecipeBySlug(slug: string): Promise<Recipe | null> {
    return this.repository.findBySlug(slug);
  }

  async save(recipe: Recipe): Promise<Recipe> {
    return this.repository.save(recipe);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async generatePresignedDownloadUrl(key: string): Promise<string> {
    return this.storage.generatePresignedDownloadUrl(key);
  }
}
