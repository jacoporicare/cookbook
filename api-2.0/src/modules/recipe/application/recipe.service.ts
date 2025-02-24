import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Image } from '../../image/domain/image';
import { RecipeInputType } from '../adapters/input/graphql/recipe-input.type';
import { Ingredient } from '../domain/ingredient';
import { Recipe } from '../domain/recipe';
import { IRecipeRepository, IRecipeRepositoryToken } from '../ports/output/recipe.repository';

import { Identity } from '@/modules/auth/domain/identity';
import { ImageService } from '@/modules/image/application/image.service';

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
      [],
    );

    try {
      return await this.repository.save(newRecipe);
    } catch (error) {
      if (recipe.imageStorageKey) {
        await this.imageService.delete(recipe.imageStorageKey);
      }

      throw error;
    }
  }

  async update(id: string, recipe: RecipeInputType): Promise<Recipe> {
    const existingRecipe = await this.getRecipeById(id);

    if (!existingRecipe) {
      throw new NotFoundException('Recipe not found');
    }

    const ingredients = recipe.ingredients?.map(
      ingredient =>
        new Ingredient(
          ingredient.name,
          ingredient.amount,
          ingredient.amountUnit,
          !!ingredient.isGroup,
        ),
    );

    existingRecipe
      .updateTitle(recipe.title)
      .updateDirections(recipe.directions)
      .updatePreparationTime(recipe.preparationTime)
      .updateServingCount(recipe.servingCount)
      .updateSideDish(recipe.sideDish)
      .updateIngredients(ingredients ?? [])
      .updateTags(recipe.tags ?? []);

    let existingImage: Image | null = null;

    if (recipe.imageStorageKey) {
      existingImage = existingRecipe.image;
      const image = await this.imageService.create(recipe.imageStorageKey);
      existingRecipe.updateImage(image);
    }

    try {
      const updatedRecipe = await this.repository.save(existingRecipe);

      if (existingImage) {
        await this.imageService.delete(existingImage.storageKey);
        await this.imageService.delete(existingImage.thumbnailStorageKey);
      }

      return updatedRecipe;
    } catch (error) {
      if (recipe.imageStorageKey) {
        await this.imageService.delete(recipe.imageStorageKey);
      }

      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    const recipe = await this.getRecipeById(id);

    if (!recipe) {
      return false;
    }

    if (recipe.image) {
      await this.imageService.delete(recipe.image.storageKey);
      await this.imageService.delete(recipe.image.thumbnailStorageKey);
    }

    return this.repository.delete(id);
  }
}
