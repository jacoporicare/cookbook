import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as slug from 'slug';
import { Repository } from 'typeorm';

import { Ingredient } from '../ingredient/entities/ingredient.entity';
import { User } from '../user/entities/user.entity';

import { CreateRecipeDto, CreateRecipeIngredientDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userId: string, createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const user = await this.userRepository.findOneByOrFail({ id: userId });

    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      user,
      slug: this.toSlug(createRecipeDto.title),
      ingredients:
        createRecipeDto.ingredients &&
        (await Promise.all(
          createRecipeDto.ingredients.map(ingredient => this.mapIngredient(ingredient)),
        )),
    });

    return this.recipeRepository.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  findOne(id: string): Promise<Recipe | null> {
    return this.recipeRepository.findOneBy({ id });
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneByOrFail({ id });
    const updatedRecipe = this.recipeRepository.merge(recipe, {
      ...updateRecipeDto,
      slug: updateRecipeDto.title && this.toSlug(updateRecipeDto.title),
    });

    return this.recipeRepository.save(updatedRecipe);
  }

  async remove(id: string): Promise<void> {
    await this.recipeRepository.softDelete({ id });
  }

  private async mapIngredient(
    createRecipeIngredientDto: CreateRecipeIngredientDto,
  ): Promise<RecipeIngredient> {
    let ingredient = await this.ingredientRepository.findOneBy({
      name: createRecipeIngredientDto.name,
    });

    if (!ingredient) {
      ingredient = new Ingredient();
      ingredient.name = createRecipeIngredientDto.name;

      await this.ingredientRepository.save(ingredient);
    }

    const recipeIngredient = new RecipeIngredient();
    recipeIngredient.ingredient = ingredient;
    recipeIngredient.amount = createRecipeIngredientDto.amount ?? null;
    recipeIngredient.amountUnit = createRecipeIngredientDto.amountUnit?.trim() ?? null;
    recipeIngredient.isGroup = createRecipeIngredientDto.isGroup ?? false;

    return recipeIngredient;
  }

  private toSlug(title: string): string {
    return slug(title.trim(), slug.defaults.modes.rfc3986);
  }
}
