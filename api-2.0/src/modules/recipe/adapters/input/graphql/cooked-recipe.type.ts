import { Field, ObjectType } from '@nestjs/graphql';

import { CookedRecipe } from '@/modules/recipe/domain/cooked-recipe';

@ObjectType('CookedRecipe')
export class CookedRecipeType {
  @Field()
  date!: Date;

  static fromDomain(cookedRecipe: CookedRecipe): CookedRecipeType {
    const type = new CookedRecipeType();
    type.date = cookedRecipe.date;

    return type;
  }
}
