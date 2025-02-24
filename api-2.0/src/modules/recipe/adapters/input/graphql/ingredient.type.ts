import { Field, Float, ObjectType } from '@nestjs/graphql';

import { Ingredient } from '@/modules/recipe/domain/ingredient';

@ObjectType('Ingredient')
export class IngredientType {
  @Field()
  name!: string;

  @Field(() => Float, { nullable: true })
  amount!: number | null;

  @Field(() => String, { nullable: true })
  amountUnit!: string | null;

  @Field()
  isGroup!: boolean;

  static fromDomain(ingredient: Ingredient): IngredientType {
    const type = new IngredientType();
    type.name = ingredient.name;
    type.amount = ingredient.amount;
    type.amountUnit = ingredient.amountUnit;
    type.isGroup = ingredient.isGroup;

    return type;
  }
}
