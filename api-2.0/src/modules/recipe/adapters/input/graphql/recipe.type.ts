import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { CookedRecipeType } from './cooked-recipe.type';
import { IngredientType } from './ingredient.type';

import { Recipe } from '@/modules/recipe/domain/entities/recipe';

@ObjectType('Recipe')
export class RecipeType {
  @Field(() => ID)
  id!: string;

  userId!: string | null;

  @Field()
  title!: string;

  @Field()
  slug!: string;

  @Field(() => String, { nullable: true })
  directions!: string | null;

  @Field(() => Int, { nullable: true })
  preparationTime!: number | null;

  @Field(() => Int, { nullable: true })
  servingCount!: number | null;

  @Field(() => [String])
  tags!: string[];

  @Field(() => String, { nullable: true })
  sideDish!: string | null;

  @Field()
  creationDate!: Date;

  @Field()
  lastModifiedDate!: Date;

  @Field(() => [IngredientType])
  ingredients!: IngredientType[];

  @Field(() => [CookedRecipeType])
  cookedHistory!: CookedRecipeType[];

  static fromDomain(recipe: Recipe): RecipeType {
    return {
      id: recipe.id,
      userId: recipe.userId,
      title: recipe.title,
      slug: recipe.slug,
      directions: recipe.directions,
      preparationTime: recipe.preparationTime,
      servingCount: recipe.servingCount,
      tags: recipe.tags,
      sideDish: recipe.sideDish,
      creationDate: recipe.createdDate,
      lastModifiedDate: recipe.updatedDate,
      ingredients: recipe.ingredients.map(ingredient => IngredientType.fromDomain(ingredient)),
      cookedHistory: recipe.cookedRecipes.map(cooked => CookedRecipeType.fromDomain(cooked)),
    };
  }
}
