import { Field, ObjectType } from '@nestjs/graphql';

import { CookedRecipe } from '@/modules/recipe/domain/value-objects/cooked-recipe';

@ObjectType('CookedRecipe')
export class CookedRecipeType {
  @Field()
  date!: Date;

  static fromDomain(cookedRecipe: CookedRecipe): CookedRecipeType {
    return {
      date: cookedRecipe.date,
    };
  }
}
