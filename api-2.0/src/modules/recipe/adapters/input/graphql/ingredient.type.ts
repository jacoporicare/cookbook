import { Field, Float, ObjectType } from '@nestjs/graphql';

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
}
