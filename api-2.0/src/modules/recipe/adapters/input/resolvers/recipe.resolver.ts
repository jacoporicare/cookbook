import { Query, Resolver } from '@nestjs/graphql';

import { RecipeType } from '../graphql/recipe.type';

import { RecipeService } from '@/modules/recipe/application/recipe.service';

@Resolver(() => RecipeType)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => [RecipeType])
  async recipes(): Promise<RecipeType[]> {
    const recipes = await this.recipeService.getAllRecipes();

    return recipes.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      slug: recipe.slug,
      directions: recipe.directions,
      preparationTime: recipe.preparationTime,
      servingCount: recipe.servingCount,
      tags: recipe.tags,
      sideDish: recipe.sideDish,
      ingredients: recipe.ingredients.map(ingredient => ({
        name: ingredient.name,
        amount: ingredient.amount,
        amountUnit: ingredient.amountUnit,
        isGroup: ingredient.isGroup,
      })),
      cookedHistory: recipe.cookedRecipes.map(cooked => ({
        date: cooked.date,
      })),
    }));
  }
}
