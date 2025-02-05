import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { CookedRecipeType } from './cooked-recipe.type';
import { ImageType } from './image.type';
import { IngredientType } from './ingredient.type';

import { Recipe } from '@/modules/recipe/domain/entities/recipe';
import { UserType } from '@/modules/user/adapters/input/graphql/user.type';

@ObjectType('Recipe')
export class RecipeType {
  @Field(() => ID)
  id!: string;

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

  // Resolved field
  @Field(() => UserType, { nullable: true })
  user!: UserType | null;

  // Resolved field
  @Field(() => ImageType, { nullable: true })
  image!: ImageType | null;

  _domainRecipe!: Recipe;

  static fromDomain(recipe: Recipe): RecipeType {
    const type = new RecipeType();
    type._domainRecipe = recipe;
    type.id = recipe.id;
    type.title = recipe.title;
    type.slug = recipe.slug;
    type.directions = recipe.directions;
    type.preparationTime = recipe.preparationTime;
    type.servingCount = recipe.servingCount;
    type.tags = recipe.tags;
    type.sideDish = recipe.sideDish;
    type.creationDate = recipe.createdDate;
    type.lastModifiedDate = recipe.updatedDate;
    type.ingredients = recipe.ingredients.map(IngredientType.fromDomain);
    type.cookedHistory = recipe.cookedRecipes.map(CookedRecipeType.fromDomain);

    return type;
  }
}
