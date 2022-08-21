import path from 'path';

import { Router } from 'express';
import { fromBuffer } from 'file-type';
import fs from 'fs-extra';
import { FileUpload } from 'graphql-upload';
import sharp from 'sharp';

import logger from './logger';
import imageModel from './models/image';
import { RecipeDbObject } from './models/recipe';

const baseUrl = process.env.VIRTUAL_HOST
  ? `https://${process.env.VIRTUAL_HOST}`
  : 'http://localhost:4000';

const cacheDir = '/tmp/zradelnik-img';
fs.mkdirp(cacheDir).catch(logger.error);

type ImageSize = [number, number];

export function getImageUrl(recipe: RecipeDbObject) {
  if (!recipe.imageId) {
    return null;
  }

  return `${baseUrl}/image/${recipe.slug}_${recipe.imageId}`;
}

function getFilePath(id: string, imageSize?: ImageSize | string, format?: string) {
  const size = imageSize
    ? typeof imageSize === 'string'
      ? imageSize
      : imageSize.join('x')
    : undefined;

  return path.join(cacheDir, `${id}-${size}-${format}`);
}

export function recipeImageMiddleware() {
  const router = Router();

  router.get('/image/:slugAndId', async (req, res) => {
    res.set('Cache-Control', 'max-age=31536000, public');

    const id = req.params.slugAndId.substring(req.params.slugAndId.lastIndexOf('_') + 1);
    const size = req.query['size']?.toString();
    const format = req.query['format']?.toString();

    const filePath = getFilePath(id, size, format);

    if (await fs.pathExists(filePath)) {
      const buffer = await fs.readFile(filePath);
      const contentType = await fromBuffer(buffer);

      res.contentType(contentType?.mime ?? 'image/jpeg');
      return res.send(buffer);
    }

    const image = await imageModel.findById(id);

    if (!image) {
      return res.status(404).end();
    }

    if (!size && !format) {
      res.contentType(image.contentType);
      return res.send(image.data);
    }

    const imageSize = size?.split('x', 2).map(x => parseInt(x, 10)) as ImageSize | undefined;
    const webp = format === 'webp';
    const buffer = await resizeAndWriteImage(id, image.data, { size: imageSize, webp });

    res.contentType(webp ? 'image/webp' : image.contentType);
    res.send(buffer);
  });

  return router;
}

export async function resizeAndWriteImage(
  id: string,
  image: Buffer,
  options?: { size?: ImageSize; webp?: boolean },
) {
  let s = sharp(image).rotate();

  if (options?.size) {
    s = s.resize(options.size[0], options.size[1]);
  }

  if (options?.webp) {
    s = s.webp();
  }

  const buffer = await s.toBuffer();

  // No await
  const filePath = getFilePath(id, options?.size, options?.webp ? 'webp' : undefined);
  fs.writeFile(filePath, buffer).catch(logger.error);

  return buffer;
}

export async function createImage(imageFileUpload: Promise<FileUpload>) {
  const fileUpload = await imageFileUpload;

  const chunks = [];

  for await (const chunk of fileUpload.createReadStream()) {
    chunks.push(Buffer.from(chunk));
  }

  const data = Buffer.concat(chunks);

  return await imageModel.create({
    data,
    contentType: fileUpload.mimetype,
  });
}
