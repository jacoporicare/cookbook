import { Field, Float, ObjectType } from '@nestjs/graphql';

import { Ingredient } from '@/modules/recipe/domain/value-objects/ingredient';

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
    return {
      name: ingredient.name,
      amount: ingredient.amount,
      amountUnit: ingredient.amountUnit,
      isGroup: ingredient.isGroup,
    };
  }
}
