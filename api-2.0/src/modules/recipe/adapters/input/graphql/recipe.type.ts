import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

import { CookedRecipeType } from './cooked-recipe.type';
import { IngredientType } from './ingredient.type';

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

  @Field(() => [IngredientType])
  ingredients!: IngredientType[];

  @Field(() => [CookedRecipeType])
  cookedHistory!: CookedRecipeType[];
}
