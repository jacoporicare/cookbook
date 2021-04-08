/* eslint-disable no-console */
import crypto from 'crypto';

import slug from 'slug';

import { getFullImageUrl, getThumbImageUrl } from './images';
import recipeModel, { Recipe, RecipeDocument } from './models/recipe';
import { User } from './models/user';
import { RecipeInput } from './types';

export function mapRecipe(recipeDocument: RecipeDocument | null) {
  if (!recipeDocument) {
    return null;
  }

  const recipe = recipeDocument.toObject({ virtuals: true });

  if (recipe.imageName) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (recipe as any).image = {
      fullUrl: getFullImageUrl(recipe.imageName),
      thumbUrl: getThumbImageUrl(recipe.imageName, 'jpeg'),
      thumbWebPUrl: getThumbImageUrl(recipe.imageName, 'webp'),
    };
  }

  recipe.deleted = Boolean(recipe.deleted);

  return recipe;
}

export function prepareRecipe(
  recipe: RecipeInput,
  hasImage?: boolean,
  user?: User,
  origRecipe?: RecipeDocument,
): Partial<Recipe> {
  const newRecipe: Partial<Recipe> = {
    ...recipe,
    title: recipe.title.trim(),
    slug: toSlug(recipe.title),
    sideDish: recipe.sideDish ? recipe.sideDish.trim() : undefined,
    preparationTime: recipe.preparationTime || undefined,
    servingCount: recipe.servingCount || undefined,
    directions: recipe.directions?.trim() || undefined,
    ingredients:
      recipe.ingredients && recipe.ingredients.length > 0
        ? recipe.ingredients.map(ingredient => ({
            ...ingredient,
            name: ingredient.name.trim(),
            amount: ingredient.amount || undefined,
            amountUnit: ingredient.amountUnit?.trim() || undefined,
          }))
        : undefined,
    lastModifiedDate: new Date(),
    tags: recipe.tags && recipe.tags.length > 0 ? recipe.tags : undefined,
  };

  if (
    hasImage === true ||
    (origRecipe && origRecipe.imageName && origRecipe.slug !== newRecipe.slug)
  ) {
    newRecipe.imageName = `${newRecipe.slug}_${Date.now()}`;
  } else if (hasImage === false) {
    newRecipe.imageName = undefined;
  }

  if (user) {
    newRecipe.user = user;
  }

  return newRecipe;
}

export function toSlug(title: string) {
  return slug(title.trim(), slug.defaults.modes.rfc3986);
}

export async function checkUserRightsAsync(user: User | null, recipeId: string) {
  const recipe = await recipeModel.findById(recipeId);

  return Boolean(user && recipe && (user.isAdmin || recipe.user === user._id));
}

export function getRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

export function sha512(password: string, salt: string) {
  return crypto.createHmac('sha512', salt).update(password).digest('hex');
}

export function saltHashPassword(password: string) {
  const salt = getRandomString(16);

  return {
    hash: sha512(password, salt),
    salt,
  };
}
