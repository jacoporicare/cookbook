import { Field, Float, InputType } from '@nestjs/graphql';

@InputType('IngredientInput')
export class IngredientInputType {
  @Field(() => Float, { nullable: true })
  amount!: number | null;

  @Field(() => String, { nullable: true })
  amountUnit!: string | null;

  @Field()
  name!: string;

  @Field()
  isGroup!: boolean;
}
