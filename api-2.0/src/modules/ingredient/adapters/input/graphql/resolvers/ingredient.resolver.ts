import { Query, Resolver } from '@nestjs/graphql';

import { IngredientService } from '@/modules/ingredient/application/ingredient.service';

@Resolver()
export class IngredientResolver {
  constructor(private readonly ingredientService: IngredientService) {}

  @Query(() => [String])
  async ingredients(): Promise<string[]> {
    return this.ingredientService.getAllIngredients();
  }
}
