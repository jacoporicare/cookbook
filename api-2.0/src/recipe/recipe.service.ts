import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as slug from 'slug';
import { Repository } from 'typeorm';

import { AuthPayload } from '../auth/entities/auth-payload.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { SideDishService } from '../side-dish/side-dish.service';
import { UserService } from '../user/user.service';

import { CreateRecipeDto, CreateRecipeIngredientDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeIngredient } from './entities/recipe-ingredient.entity';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private readonly userService: UserService,
    private readonly ingredientService: IngredientService,
    private readonly sideDishService: SideDishService,
  ) {}

  async create(userId: string, createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      user,
      title: createRecipeDto.title.trim(),
      slug: this.toSlug(createRecipeDto.title.trim()),
      sideDish: createRecipeDto.sideDish
        ? await this.sideDishService.getOrCreate(createRecipeDto.sideDish.trim())
        : null,
      ingredients:
        createRecipeDto.ingredients &&
        (await Promise.all(
          createRecipeDto.ingredients.map(ingredient => this.mapIngredient(ingredient)),
        )),
    });

    return this.recipeRepository.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      order: { createdDate: 'DESC' },
    });
  }

  findOne(id: string): Promise<Recipe | null> {
    return this.recipeRepository.findOneBy({ id });
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOneByOrFail({ id });

    if (updateRecipeDto.ingredients) {
      recipe.ingredients = [];

      await this.recipeRepository.save(recipe);
    }

    this.recipeRepository.merge(recipe, {
      ...updateRecipeDto,
      title: updateRecipeDto.title && updateRecipeDto.title.trim(),
      slug: updateRecipeDto.title && this.toSlug(updateRecipeDto.title.trim()),
      sideDish:
        updateRecipeDto.sideDish !== undefined
          ? await this.sideDishService.getOrCreate(updateRecipeDto.sideDish.trim())
          : recipe.sideDish,
      ingredients:
        updateRecipeDto.ingredients &&
        (await Promise.all(
          updateRecipeDto.ingredients.map(ingredient => this.mapIngredient(ingredient)),
        )),
    });

    return this.recipeRepository.save(recipe);
  }

  async remove(id: string): Promise<void> {
    await this.recipeRepository.softDelete({ id });
  }

  async canUpdate(id: string, user: AuthPayload): Promise<boolean> {
    if (user.isAdmin) {
      return true;
    }

    const recipe = await this.recipeRepository.findOneByOrFail({ id });

    return recipe.user?.id === user.sub;
  }

  private async mapIngredient(
    createRecipeIngredientDto: CreateRecipeIngredientDto,
  ): Promise<RecipeIngredient> {
    const ingredient = await this.ingredientService.getOrCreate(
      createRecipeIngredientDto.name.trim(),
    );

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
