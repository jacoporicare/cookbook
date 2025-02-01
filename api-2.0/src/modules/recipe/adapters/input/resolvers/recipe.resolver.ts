import { NotImplementedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RecipeInputType } from '../graphql/recipe-input.type';
import { RecipeType } from '../graphql/recipe.type';

import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { Identity } from '@/modules/auth/domain/identity';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { RecipeService } from '@/modules/recipe/application/recipe.service';
import { Recipe } from '@/modules/recipe/domain/entities/recipe';
import { Ingredient } from '@/modules/recipe/domain/value-objects/ingredient';

@Resolver(() => RecipeType)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => [RecipeType])
  async recipes(): Promise<RecipeType[]> {
    const recipes = await this.recipeService.getAllRecipes();

    return recipes.map(recipe => RecipeType.fromDomain(recipe));
  }

  @Query(() => RecipeType, { nullable: true })
  async recipe(
    @Args('id', { nullable: true }) id: string,
    @Args('slug', { nullable: true }) slug: string,
  ): Promise<RecipeType | null> {
    let recipe: Recipe | null = null;

    if (id) {
      recipe = await this.recipeService.getRecipeById(id);
    } else if (slug) {
      recipe = await this.recipeService.getRecipeBySlug(slug);
    }

    return recipe ? RecipeType.fromDomain(recipe) : null;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RecipeType)
  async createRecipe(
    @CurrentUser() identity: Identity,
    @Args('recipe') recipe: RecipeInputType,
  ): Promise<RecipeType> {
    const newRecipe = Recipe.createNew({
      userId: identity.userId,
      title: recipe.title,
      directions: recipe.directions,
      preparationTime: recipe.preparationTime,
      servingCount: recipe.servingCount,
      tags: recipe.tags ?? [],
      sideDish: recipe.sideDish,
      ingredients:
        recipe.ingredients?.map(
          ingredient =>
            new Ingredient(
              ingredient.name,
              ingredient.amount,
              ingredient.amountUnit,
              !!ingredient.isGroup,
            ),
        ) ?? [],
      image: null,
    });

    const savedRecipe = await this.recipeService.save(newRecipe);

    return RecipeType.fromDomain(savedRecipe);
  }

  @Mutation(() => RecipeType)
  async updateRecipe(
    @Args('id') id: string,
    @Args('recipe') recipe: RecipeInputType,
  ): Promise<RecipeType> {
    throw new NotImplementedException();
  }

  @Mutation(() => Boolean)
  async deleteRecipe(@Args('id') id: string): Promise<boolean> {
    throw new NotImplementedException();
  }

  @Mutation(() => RecipeType)
  async recipeCooked(@Args('id') id: string, @Args('date') date: Date): Promise<RecipeType> {
    throw new NotImplementedException();
  }

  @Mutation(() => RecipeType)
  async deleteRecipeCooked(
    @Args('recipeId') recipeId: string,
    @Args('cookedId') cookedId: string,
  ): Promise<RecipeType> {
    throw new NotImplementedException();
  }
}
