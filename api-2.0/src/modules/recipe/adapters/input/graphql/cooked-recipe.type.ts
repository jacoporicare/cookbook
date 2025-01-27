import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('CookedRecipe')
export class CookedRecipeType {
  @Field()
  date!: Date;
}
