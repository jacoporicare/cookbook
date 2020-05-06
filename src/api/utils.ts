/* eslint-disable no-console */
import crypto from 'crypto';

import {
  CopyObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3-node';
import { fromBuffer as fileTypeFromBuffer } from 'file-type';
import slug from 'slug';

import { getImageKey } from '../utils';

import recipeModel, { Recipe } from './models/recipe';
import { User } from './models/user';
import { FileUpload, RecipeInput } from './types';

export function prepareRecipe(
  recipe: RecipeInput,
  hasImage?: boolean,
  user?: User,
): Partial<Recipe> {
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
    tags: recipe.tags || undefined,
  };

  if (hasImage !== undefined) {
    newRecipe = {
      ...newRecipe,
      hasImage,
    };
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

// Credentials are automatically provided thanks to IAM role attached to EC2:
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-iam.html
// Also automatically reads configuration from env vars:
// AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
const s3 = new S3Client({});

export async function uploadImageToS3(slug: string, fileUpload: Promise<FileUpload>) {
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

  const ft = await fileTypeFromBuffer(image);
  const mimeType = ft?.mime ?? 'image/jpeg';

  const putObjectCommand = new PutObjectCommand({
    Body: image,
    Bucket: process.env.S3_BUCKET!,
    Key: getImageKey(slug, 'full'),
    ACL: 'public-read',
    ContentType: mimeType,
  });

  await s3.send(putObjectCommand);
}

export async function renameImageInS3(srcSlug: string, dstSlug: string) {
  const copyFull = new CopyObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    CopySource: encodeURIComponent(`${process.env.S3_BUCKET}/${getImageKey(srcSlug, 'full')}`),
    Key: getImageKey(dstSlug, 'full'),
    ACL: 'public-read',
  });

  await s3.send(copyFull);

  const copyThumb = new CopyObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    CopySource: encodeURIComponent(`${process.env.S3_BUCKET}/${getImageKey(srcSlug, 'thumb')}`),
    Key: getImageKey(dstSlug, 'thumb'),
    ACL: 'public-read',
  });

  await s3.send(copyThumb);

  await deleteImageFromS3(srcSlug);
}

export async function deleteImageFromS3(slug: string) {
  const deleteFull = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: getImageKey(slug, 'full'),
  });

  await s3.send(deleteFull);

  const deleteThumb = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: getImageKey(slug, 'thumb'),
  });

  await s3.send(deleteThumb);
}
