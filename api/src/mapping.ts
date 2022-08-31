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
    deleted: Boolean(recipe.deleted),
    imageUrl: getImageUrl(recipe),
    ingredients: recipe.ingredients?.map(i => ({
      ...i,
      isGroup: i.isGroup ?? false,
    })),
    user: {
      ...recipe.user,
      isAdmin: recipe.user.isAdmin ?? false,
    },
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
    sideDish: recipe.sideDish ? recipe.sideDish.trim() : undefined,
    preparationTime: recipe.preparationTime || undefined,
    servingCount: recipe.servingCount || undefined,
    directions: recipe.directions?.trim() || undefined,
    ingredients:
      recipe.ingredients?.map(ingredient => ({
        ...ingredient,
        name: ingredient.name.trim(),
        amount: ingredient.amount || undefined,
        amountUnit: ingredient.amountUnit?.trim() || undefined,
        isGroup: ingredient.isGroup || undefined,
      })) ?? undefined,
    lastModifiedDate: new Date(),
    tags: recipe.tags && recipe.tags.length > 0 ? recipe.tags : undefined,
  };

  if (imageId) {
    newRecipe.imageId = imageId;
  }

  if (userId) {
    newRecipe.userId = userId;
  }

  return newRecipe;
}

export function mapToUserGqlObject(userDocument: UserDocument): User {
  const user = userDocument.toObject<UserDbObject>({ getters: true, versionKey: false });

  return {
    ...user,
    isAdmin: user.isAdmin ?? false,
  };
}

export function mapToUserDbObject(user: UserInput): AnyKeys<UserDbObject> {
  return {
    ...user,
    username: user.username.trim(),
    displayName: user.displayName.trim(),
    isAdmin: user.isAdmin || undefined,
  };
}

function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}
