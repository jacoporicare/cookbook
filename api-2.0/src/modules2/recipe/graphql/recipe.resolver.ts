import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Scalar,
  registerEnumType,
} from '@nestjs/graphql';

import { RecipeService } from '../domain/recipe.service';

import { ImageSizeInputType, RecipeInputType } from './types/recipe-input.type';
import { RecipeType } from './types/recipe.type';

export enum ImageFormat {
  WEBP,
}

// Scalars
@Scalar('Upload')
export class UploadScalar {}

// Enums
registerEnumType(ImageFormat, {
  name: 'ImageFormat',
});

// Queries
@Resolver(() => RecipeType)
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => [RecipeType])
  recipes(deleted?: boolean): Promise<RecipeType[]> {
    return this.recipeService.findAll();
  }

  @Query(() => RecipeType, { nullable: true })
  recipe(
    @Args('id', { nullable: true }) id?: string,
    @Args('slug', { nullable: true }) slug?: string,
  ): RecipeType {
    return null;
  }

  @Query(() => [String])
  ingredients(): string[] {
    return [];
  }

  @Query(() => [String])
  sideDishes(): string[] {
    return [];
  }

  @Query(() => [String])
  tags(): string[] {
    return [];
  }

  @ResolveField(() => String, { nullable: true })
  async imageUrl(
    @Parent() recipe: RecipeType,
    @Args('size', { nullable: true }) size?: ImageSizeInputType,
    @Args('format', { nullable: true }) format?: ImageFormat,
  ): Promise<string> {
    // Implement your logic here
    return '';
  }

  @Mutation(() => RecipeType)
  createRecipe(
    @Args('recipe') recipe: RecipeInputType,
    @Args('image', { nullable: true }) image?: Upload,
  ): RecipeType {
    return null;
  }

  @Mutation(() => RecipeType)
  updateRecipe(
    @Args('id') id: string,
    @Args('recipe') recipe: RecipeInputType,
    @Args('image', { nullable: true }) image?: Upload,
  ): RecipeType {
    return null;
  }

  @Mutation(() => Boolean)
  deleteRecipe(@Args('id') id: string): boolean {
    return false;
  }

  @Mutation(() => RecipeType)
  recipeCooked(@Args('id') id: string, @Args('date') date: Date): RecipeType {
    return null;
  }

  @Mutation(() => RecipeType)
  deleteRecipeCooked(
    @Args('recipeId') recipeId: string,
    @Args('cookedId') cookedId: string,
  ): RecipeType {
    return null;
  }
}
