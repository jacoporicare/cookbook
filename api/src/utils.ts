import crypto from 'crypto';

import bcrypt from 'bcrypt';

import RecipeModel from './models/recipe';
import { UserDbObject } from './models/user';

export async function checkUserRightsAsync(
  user: UserDbObject,
  recipeId: string,
) {
  const recipe = await RecipeModel.findById(recipeId);

  return Boolean(recipe && (user.isAdmin || recipe.user === user.id));
}

export function getRandomString(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

function sha512(password: string, salt: string) {
  return crypto.createHmac('sha512', salt).update(password).digest('hex');
}

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(
  password: string,
  user: { password: string; salt?: string },
): Promise<boolean> {
  if (user.salt) {
    return sha512(password, user.salt) === user.password;
  }

  return await bcrypt.compare(password, user.password);
}
