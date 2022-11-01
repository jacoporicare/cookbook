import { AnyKeys } from 'mongoose';
import slug from 'slug';

import { Recipe, RecipeInput, User, UserInput } from './generated/graphql';
import { RecipeDbObject, RecipeDocument } from './models/recipe';
import { UserDbObject, UserDocument } from './models/user';
import { getImageUrl } from './recipeImage';

export function mapToRecipeGqlObject(recipeDocument: RecipeDocument): Recipe {
  const recipe = recipeDocument.toObject<RecipeDbObject>({ getters: true, versionKey: false });

  return {
    ...recipe,
    imageUrl: getImageUrl(recipe),
  };
}

export function mapToRecipeDbObject(
  recipe: RecipeInput,
  imageId?: string,
  userId?: string,
): AnyKeys<RecipeDbObject> {
  const newRecipe: AnyKeys<RecipeDbObject> = {
    title: recipe.title.trim(),
    slug: toSlug(recipe.title),
    sideDish: recipe.sideDish?.trim() || undefined,
    preparationTime: recipe.preparationTime || undefined,
    servingCount: recipe.servingCount || undefined,
    directions: recipe.directions?.trim() || undefined,
    ingredients:
      recipe.ingredients?.map(ingredient => ({
        ...ingredient,
        name: ingredient.name.trim(),
        amount: ingredient.amount || undefined,
        amountUnit: ingredient.amountUnit?.trim() || undefined,
        isGroup: ingredient.isGroup ?? false,
      })) ?? [],
    lastModifiedDate: new Date(),
    tags: recipe.tags ?? [],
  };

  if (imageId) {
    newRecipe.image = imageId;
  }

  if (userId) {
    newRecipe.user = userId;
  }

  return newRecipe;
}

export function mapToUserGqlObject(userDocument: UserDocument): User {
  return userDocument.toObject<UserDbObject>({ getters: true, versionKey: false });
}

export function mapToUserDbObject(user: UserInput): AnyKeys<UserDbObject> {
  return {
    ...user,
    username: user.username.trim(),
    displayName: user.displayName.trim(),
    isAdmin: user.isAdmin ?? false,
  };
}

function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}
