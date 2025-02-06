import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { RecipeInputType } from '../adapters/input/graphql/recipe-input.type';
import { Recipe } from '../domain/entities/recipe';
import { IRecipeRepository, IRecipeRepositoryToken } from '../domain/ports/recipe.repository';
import { Ingredient } from '../domain/value-objects/ingredient';

import { ImageService } from './image.service';

import { Identity } from '@/modules/auth/domain/identity';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(IRecipeRepositoryToken) private readonly repository: IRecipeRepository,
    private readonly imageService: ImageService,
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

  async create(identity: Identity, recipe: RecipeInputType): Promise<Recipe> {
    const image = recipe.imageStorageKey
      ? await this.imageService.create(recipe.imageStorageKey)
      : null;

    const newRecipe = Recipe.createNew(
      identity.userId,
      recipe.title,
      recipe.directions,
      recipe.preparationTime,
      recipe.servingCount,
      recipe.sideDish,
      image,
      recipe.ingredients?.map(
        ingredient =>
          new Ingredient(
            ingredient.name,
            ingredient.amount,
            ingredient.amountUnit,
            !!ingredient.isGroup,
          ),
      ) ?? [],
      recipe.tags ?? [],
    );

    return this.repository.save(newRecipe);
  }

  async update(id: string, recipe: RecipeInputType): Promise<Recipe> {
    const existingRecipe = await this.getRecipeById(id);

    if (!existingRecipe) {
      throw new NotFoundException('Recipe not found');
    }

    existingRecipe.update(
      recipe.title,
      recipe.directions,
      recipe.preparationTime,
      recipe.servingCount,
      recipe.sideDish,
      recipe.ingredients?.map(
        ingredient =>
          new Ingredient(
            ingredient.name,
            ingredient.amount,
            ingredient.amountUnit,
            !!ingredient.isGroup,
          ),
      ) ?? [],
      recipe.tags ?? [],
    );

    let existingImageStorageKey: string | undefined;

    if (recipe.imageStorageKey) {
      existingImageStorageKey = existingRecipe.image?.storageKey;
      const image = await this.imageService.create(recipe.imageStorageKey);
      existingRecipe.updateImage(image);
    }

    const updatedRecipe = await this.repository.save(existingRecipe);

    if (existingImageStorageKey) {
      await this.imageService.delete(existingImageStorageKey);
    }

    return updatedRecipe;
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
