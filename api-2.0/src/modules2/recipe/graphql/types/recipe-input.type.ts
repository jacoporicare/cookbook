import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class RecipeInputType {
  @Field()
  title: string;

  @Field({ nullable: true })
  directions?: string;

  @Field({ nullable: true })
  sideDish?: string;

  @Field(() => Int, { nullable: true })
  preparationTime?: number;

  @Field(() => Int, { nullable: true })
  servingCount?: number;

  @Field(() => [IngredientInputType], { nullable: true })
  ingredients?: IngredientInputType[];

  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@InputType()
export class IngredientInputType {
  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  amountUnit?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  isGroup?: boolean;
}

@InputType()
export class ImageSizeInputType {
  @Field(() => Int)
  width: number;

  @Field(() => Int)
  height: number;
}
