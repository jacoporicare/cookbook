import { AnyKeys } from 'mongoose';
import slug from 'slug';

import { Recipe, RecipeInput, User } from './generated/graphql';
import { RecipeDbObject, RecipeDocument } from './models/recipe';
import { UserDbObject, UserDocument } from './models/user';
import { getImageUrl } from './recipeImage';

export function mapToRecipeGqlObject(recipeDocument: RecipeDocument): Recipe {
  const recipe = recipeDocument.toObject<RecipeDbObject>({ getters: true, versionKey: false });

  return {
    ...recipe,
    deleted: Boolean(recipe.deleted),
    imageUrl: getImageUrl(recipe),
    ingredients:
      recipe.ingredients?.map(i => ({
        ...i,
        isGroup: i.isGroup ?? false,
      })) ?? null,
    user: {
      ...recipe.user,
      isAdmin: recipe.user.isAdmin ?? false,
    },
  };
}

export function mapToUserGqlObject(userDocument: UserDocument): User {
  const user = userDocument.toObject<UserDbObject>({ getters: true, versionKey: false });

  return {
    ...user,
    isAdmin: user.isAdmin ?? false,
  };
}

export function mapToUserDbObject(userDocument: UserDocument): UserDbObject {
  return userDocument.toObject<UserDbObject>({ getters: true, versionKey: false });
}

export function mapToRecipeDbObject(
  recipe: RecipeInput,
  imageId?: string,
  userId?: string,
): AnyKeys<RecipeDbObject> {
  const newRecipe: AnyKeys<RecipeDbObject> = {
    title: recipe.title.trim(),
    slug: toSlug(recipe.title),
    sideDish: recipe.sideDish ? recipe.sideDish.trim() : null,
    preparationTime: recipe.preparationTime || null,
    servingCount: recipe.servingCount || null,
    directions: recipe.directions?.trim() || null,
    ingredients:
      recipe.ingredients?.map(ingredient => ({
        ...ingredient,
        name: ingredient.name.trim(),
        amount: ingredient.amount || null,
        amountUnit: ingredient.amountUnit?.trim() || null,
      })) ?? null,
    lastModifiedDate: new Date(),
    tags: recipe.tags && recipe.tags.length > 0 ? recipe.tags : null,
  };

  if (imageId) {
    newRecipe.imageId = imageId;
  }

  if (userId) {
    newRecipe.userId = userId;
  }

  return newRecipe;
}

function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}
