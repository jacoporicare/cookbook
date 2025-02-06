import { NotImplementedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';

import { RecipeInputType } from '../types/recipe-input.type';
import { RecipeType } from '../types/recipe.type';

import { CurrentUser } from '@/modules/auth/decorators/current-user.decorator';
import { Identity } from '@/modules/auth/domain/identity';
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { ImageService } from '@/modules/recipe/application/image.service';
import { RecipeService } from '@/modules/recipe/application/recipe.service';
import { Recipe } from '@/modules/recipe/domain/entities/recipe';
import { UserType } from '@/modules/user/adapters/input/graphql/user.type';
import { UserService } from '@/modules/user/application/user.service';

@Resolver(() => RecipeType)
export class RecipeResolver {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly imageService: ImageService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [RecipeType])
  async recipes(): Promise<RecipeType[]> {
    const recipes = await this.recipeService.getAllRecipes();

    return recipes.map(RecipeType.fromDomain);
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
    const newRecipe = await this.recipeService.create(identity, recipe);

    return RecipeType.fromDomain(newRecipe);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RecipeType)
  async updateRecipe(
    @Args('id') id: string,
    @Args('recipe') recipe: RecipeInputType,
  ): Promise<RecipeType> {
    const updatedRecipe = await this.recipeService.update(id, recipe);

    return RecipeType.fromDomain(updatedRecipe);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Boolean)
  async deleteRecipe(@Args('id') id: string): Promise<boolean> {
    return this.recipeService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RecipeType)
  async recipeCooked(@Args('id') id: string, @Args('date') date: Date): Promise<RecipeType> {
    throw new NotImplementedException();
  }

  @UseGuards(AuthGuard)
  @Mutation(() => RecipeType)
  async deleteRecipeCooked(
    @Args('recipeId') recipeId: string,
    @Args('cookedId') cookedId: string,
  ): Promise<RecipeType> {
    throw new NotImplementedException();
  }

  @ResolveField('user', () => UserType, { nullable: true })
  async user(@Parent() recipe: RecipeType): Promise<UserType | null> {
    if (!recipe._domainRecipe.userId) {
      return null;
    }

    const user = await this.userService.findById(recipe._domainRecipe.userId);

    if (!user) {
      return null;
    }

    return UserType.fromDomain(user);
  }

  @ResolveField('imageUrl', () => String, { nullable: true })
  async imageUrl(@Parent() recipe: RecipeType): Promise<string | null> {
    if (!recipe._domainRecipe.image) {
      return null;
    }

    const { storageKey } = recipe._domainRecipe.image;

    return this.imageService.generatePresignedDownloadUrl(storageKey);
  }
}
