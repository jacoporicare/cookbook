import { Field, InputType, Int } from '@nestjs/graphql';

import { IngredientInputType } from './ingredient-input.type';

@InputType('RecipeInput')
export class RecipeInputType {
  @Field()
  title!: string;

  @Field(() => String, { nullable: true })
  directions!: string | null;

  @Field(() => String, { nullable: true })
  sideDish!: string | null;

  @Field(() => Int, { nullable: true })
  preparationTime!: number | null;

  @Field(() => Int, { nullable: true })
  servingCount!: number | null;

  @Field(() => [IngredientInputType], { nullable: true })
  ingredients!: IngredientInputType[] | null;

  @Field(() => [String], { nullable: true })
  tags!: string[] | null;
}
