import { Inject, Injectable } from '@nestjs/common';

import { Recipe } from '../domain/entities/recipe';
import { IRecipeRepository, IRecipeRepositoryToken } from '../domain/ports/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(@Inject(IRecipeRepositoryToken) private readonly repository: IRecipeRepository) {}

  async getAllRecipes(): Promise<Recipe[]> {
    return this.repository.findAll();
  }
}
