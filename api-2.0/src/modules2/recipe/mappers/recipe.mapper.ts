import { Injectable } from '@nestjs/common';

import { RecipeEntity } from '../data/entities/recipe.entity';
import { Recipe } from '../domain/recipe';

@Injectable()
export class RecipeMapper {
  constructor(private readonly userMapper: UserMapper) {}

  toDomain(recipeEntity: RecipeEntity): Recipe {
    return new Recipe(
      recipeEntity.id,
      recipeEntity.title,
      recipeEntity.slug,
      recipeEntity.createdDate,
      recipeEntity.updatedDate,
      recipeEntity.user ? this.userMapper.toDomain(recipeEntity.user) : null,
      recipeEntity.sideDish ? toDomainSideDish(recipeEntity.sideDish) : null,
      recipeEntity.ingredients?.map(toDomainIngredient) || [],
      recipeEntity.tags?.map(toDomainTag) || [],
      recipeEntity.directions,
      recipeEntity.preparationTime,
      recipeEntity.servingCount,
      recipeEntity.image ? toDomainImage(recipeEntity.image) : null,
      recipeEntity.deletedAt,
    );
  }

  fromDomain(recipe: Recipe): RecipeEntity {
    const recipeEntity = new RecipeEntity();
    recipeEntity.id = recipe.id;
    recipeEntity.title = recipe.title;
    recipeEntity.slug = recipe.slug;
    recipeEntity.createdDate = recipe.createdDate;
    recipeEntity.updatedDate = recipe.updatedDate;
    recipeEntity.user = recipe.user ? this.userMapper.fromDomain(recipe.user) : null;
    recipeEntity.sideDish = recipe.sideDish ? fromDomainSideDish(recipe.sideDish) : null;
    recipeEntity.ingredients = recipe.ingredients.map(fromDomainIngredient);
    recipeEntity.tags = recipe.tags.map(fromDomainTag);
    recipeEntity.directions = recipe.directions;
    recipeEntity.preparationTime = recipe.preparationTime;
    recipeEntity.servingCount = recipe.servingCount;
    recipeEntity.image = recipe.image ? fromDomainImage(recipe.image) : null;
    recipeEntity.deletedAt = recipe.deletedAt;
    return recipeEntity;
  }
}
