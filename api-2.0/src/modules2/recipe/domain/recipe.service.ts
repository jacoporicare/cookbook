import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as slug from 'slug';
import { Repository } from 'typeorm';

import { AuthPayload } from '../../auth/entities/auth-payload.entity';
import { IngredientService } from '../../ingredient/ingredient.service';
import { SideDishService } from '../../side-dish/side-dish.service';
import { TagService } from '../../tag/tag.service';
import { UserService } from '../../user/user.service';
import { RecipeIngredientEntity } from '../data/entities/recipe-ingredient.entity';
import { RecipeTagEntity } from '../data/entities/recipe-tag.entity';
import { RecipeEntity } from '../data/entities/recipe.entity';
import { CreateRecipeDto, CreateRecipeIngredientDto } from '../dto/create-recipe.dto';
import { UpdateRecipeDto } from '../dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @InjectRepository(RecipeIngredientEntity)
    private readonly recipeIngredientRepository: Repository<RecipeIngredientEntity>,
    @InjectRepository(RecipeTagEntity)
    private readonly recipeTagRepository: Repository<RecipeTagEntity>,
    private readonly userService: UserService,
    private readonly ingredientService: IngredientService,
    private readonly sideDishService: SideDishService,
    private readonly tagService: TagService,
  ) {}

  async create(userId: string, createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
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
        (await Promise.all(createRecipeDto.ingredients.map(it => this.mapIngredient(it)))),
      tags:
        createRecipeDto.tags &&
        (await Promise.all(createRecipeDto.tags.map(it => this.mapTag(it)))),
    });

    return this.recipeRepository.save(recipe);
  }

  findAll(): Promise<RecipeEntity[]> {
    return this.recipeRepository.find({
      order: { createdDate: 'DESC' },
    });
  }

  findOne(id: string): Promise<RecipeEntity | null> {
    return this.recipeRepository.findOneBy({ id });
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto): Promise<RecipeEntity> {
    const recipe = await this.recipeRepository.findOneByOrFail({ id });

    let intermediateSave = false;

    if (updateRecipeDto.ingredients) {
      recipe.ingredients = [];
      intermediateSave = true;
    }

    if (updateRecipeDto.tags) {
      recipe.tags = [];
      intermediateSave = true;
    }

    if (intermediateSave) {
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
        (await Promise.all(updateRecipeDto.ingredients.map(it => this.mapIngredient(it)))),
      tags:
        updateRecipeDto.tags &&
        (await Promise.all(updateRecipeDto.tags.map(it => this.mapTag(it)))),
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
  ): Promise<RecipeIngredientEntity> {
    const ingredient = await this.ingredientService.getOrCreate(
      createRecipeIngredientDto.name.trim(),
    );

    return this.recipeIngredientRepository.create({
      ingredient: ingredient,
      amount: createRecipeIngredientDto.amount ?? null,
      amountUnit: createRecipeIngredientDto.amountUnit?.trim() ?? null,
      isGroup: createRecipeIngredientDto.isGroup ?? false,
    });
  }

  private async mapTag(tagString: string): Promise<RecipeTagEntity> {
    const tag = await this.tagService.getOrCreate(tagString.trim());

    return this.recipeTagRepository.create({ tag });
  }

  private toSlug(title: string): string {
    return slug(title.trim(), slug.defaults.modes.rfc3986);
  }
}
