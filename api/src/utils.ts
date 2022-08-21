import crypto from 'crypto';

import recipeModel from './models/recipe';
import { UserDbObject } from './models/user';

export async function checkUserRightsAsync(user: UserDbObject, recipeId: string) {
  const recipe = await recipeModel.findById(recipeId);

  return Boolean(recipe && (user.isAdmin || recipe.userId === user.id));
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
