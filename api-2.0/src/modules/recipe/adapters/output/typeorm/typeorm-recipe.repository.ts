import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RecipeIngredientEntity } from './recipe-ingredient.entity';
import { RecipeEntity } from './recipe.entity';

import {
  IIngredientRepositoryToken,
  IIngredientRepository,
} from '@/modules/ingredient/ports/output/ingredient.repository';
import { Recipe } from '@/modules/recipe/domain/recipe';
import { IRecipeRepository } from '@/modules/recipe/ports/output/recipe.repository';
import {
  ISideDishRepositoryToken,
  ISideDishRepository,
} from '@/modules/side-dish/ports/output/side-dish.repository';
import { ITagRepositoryToken, ITagRepository } from '@/modules/tag/ports/output/tag.repository';

@Injectable()
export class TypeOrmRecipeRepository implements IRecipeRepository {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly repository: Repository<RecipeEntity>,
    @InjectRepository(RecipeIngredientEntity)
    private readonly recipeIngredientRepository: Repository<RecipeIngredientEntity>,
    @Inject(IIngredientRepositoryToken)
    private readonly ingredientRepository: IIngredientRepository,
    @Inject(ISideDishRepositoryToken)
    private readonly sideDishRepository: ISideDishRepository,
    @Inject(ITagRepositoryToken)
    private readonly tagRepository: ITagRepository,
  ) {}

  async findAll(): Promise<Recipe[]> {
    const entities = await this.repository.find({ order: { title: 'ASC' } });

    return entities.map(e => e.toDomain());
  }

  async findById(id: string): Promise<Recipe | null> {
    const entity = await this.repository.findOneBy({ id });

    return entity?.toDomain() ?? null;
  }

  async findBySlug(slug: string): Promise<Recipe | null> {
    const entity = await this.repository.findOneBy({ slug });

    return entity?.toDomain() ?? null;
  }

  async save(recipe: Recipe): Promise<Recipe> {
    if (recipe.sideDish) {
      await this.sideDishRepository.createIfNotExists(recipe.sideDish);
    }

    await this.tagRepository.createIfNotExists(recipe.tags);
    await this.ingredientRepository.createIfNotExists(
      recipe.ingredients.map(ingredient => ingredient.name),
    );

    await this.recipeIngredientRepository.delete({ recipe: { id: recipe.id } });

    let entity = RecipeEntity.fromDomain(recipe);
    await this.repository.save(entity);
    entity = await this.repository.findOneByOrFail({ id: recipe.id });

    await this.sideDishRepository.deleteOrphans();
    await this.tagRepository.deleteOrphans();
    await this.ingredientRepository.deleteOrphans();

    return entity.toDomain();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete({ id });

    return !!result.affected;
  }
}
