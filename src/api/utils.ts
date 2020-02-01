/* eslint-disable no-console */
import path from 'path';
import crypto from 'crypto';

import fs from 'fs-extra';
import slug from 'slug';

import recipeModel, { Recipe } from '../models/recipe';
import { User } from '../models/user';

import { RecipeInput, FileUpload } from './types';

export async function prepareRecipe(
  recipe: RecipeInput,
  fileUpload?: Promise<FileUpload>,
  user?: User,
): Promise<Partial<Recipe>> {
  const slug = toSlug(recipe.title);
  let newRecipe: Partial<Recipe> = {
    ...recipe,
    title: recipe.title.trim(),
    slug,
    sideDish: recipe.sideDish ? recipe.sideDish.trim() : undefined,
    preparationTime: recipe.preparationTime || undefined,
    servingCount: recipe.servingCount || undefined,
    directions: recipe.directions || undefined,
    ingredients: recipe.ingredients
      ? recipe.ingredients.map(ingredient => ({
          ...ingredient,
          name: ingredient.name.trim(),
        }))
      : [],
    lastModifiedDate: new Date(),
  };

  if (fileUpload) {
    const stream = (await fileUpload).createReadStream();
    const bufs: Buffer[] = [];
    const image = await new Promise<Buffer>(resolve => {
      stream
        .on('data', (data: Buffer) => {
          bufs.push(data);
        })
        .on('end', () => {
          resolve(Buffer.concat(bufs));
        });
    });

    newRecipe = {
      ...newRecipe,
      image,
      hasImage: true,
    };

    const thumbPath = getThumbPath(slug);
    await fs.remove(thumbPath);
  }

  if (user) {
    newRecipe = {
      ...newRecipe,
      user,
    };
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

export function getThumbPath(slug: string): string {
  return path.join(`/tmp/cookbook/thumbs/${slug}.jpg`);
}

export function getRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

export function sha512(password: string, salt: string) {
  return crypto
    .createHmac('sha512', salt)
    .update(password)
    .digest('hex');
}

export function saltHashPassword(password: string) {
  const salt = getRandomString(16);

  return {
    hash: sha512(password, salt),
    salt,
  };
}
