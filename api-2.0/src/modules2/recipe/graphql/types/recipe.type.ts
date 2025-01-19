import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

import { UserType } from '@/modules2/user/graphql/types/user.type';

@ObjectType()
export class RecipeType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field({ nullable: true })
  directions?: string;

  @Field({ nullable: true })
  sideDish?: string;

  @Field(() => Int, { nullable: true })
  preparationTime?: number;

  @Field(() => Int, { nullable: true })
  servingCount?: number;

  @Field(() => UserType)
  user: UserType;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => Date)
  lastModifiedDate: Date;

  @Field(() => [IngredientType])
  ingredients: IngredientType[];

  @Field(() => [String])
  tags: string[];

  @Field(() => [RecipeCookedType])
  cookedHistory: RecipeCookedType[];

  @Field()
  deleted: boolean;
}

@ObjectType()
export class IngredientType {
  @Field(() => ID)
  id: string;

  @Field(() => Float, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  amountUnit?: string;

  @Field()
  name: string;

  @Field()
  isGroup: boolean;
}

@ObjectType()
export class RecipeCookedType {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  date: Date;

  @Field(() => UserType)
  user: UserType;
}
