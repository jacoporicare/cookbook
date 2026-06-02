import os from 'os';
import path from 'path';

import { Router } from 'express';
import fs from 'fs-extra';
import sharp from 'sharp';

import { ImageFormat, ImageSize, Maybe } from './generated/graphql';
import logger from './logger';
import ImageModel from './models/image';
import { RecipeDbObject } from './models/recipe';

const baseUrl = process.env.VIRTUAL_HOST
  ? `https://${process.env.VIRTUAL_HOST}`
  : 'http://localhost:4000';

// In production this must point at a persistent volume (see deploy/docker-compose.yml)
// so warmed renditions survive restarts; falls back to a tmp dir for local dev.
const cacheDir =
  process.env.IMAGE_CACHE_DIR || path.join(os.tmpdir(), 'zradelnik-img');
fs.ensureDirSync(cacheDir);
logger.info(`Image cache dir: ${cacheDir}`);

// The web source rendition: a WebP capped to this long-edge size that
// next/image fetches and resizes per viewport. The largest width any web
// component requests is 1200 (the detail lightbox), so 1920 is lossless in
// practice while keeping the source ~10-50x smaller than the original phone
// photo — serving the full original made Next download + decode huge images
// for every card and overwhelmed the API.
const SOURCE_MAX = 1920;
const SOURCE_QUALITY = 80;

// Keep each Sharp pipeline single-threaded; concurrency across requests is
// bounded separately below. Together they stop a burst of cold image requests
// from saturating every core on the shared VM.
sharp.concurrency(1);

// Bound concurrent encodes — and the full-resolution Buffer loads that precede
// them — so a page asking for many cold images can't exhaust memory/CPU.
// Renditions are cached on disk, so this only gates the one-time cold encode
// per image; warm requests are plain disk reads and never queue here.
const MAX_CONCURRENT_ENCODES = 2;
let activeEncodes = 0;
const encodeQueue: (() => void)[] = [];

function acquireEncodeSlot(): Promise<void> {
  if (activeEncodes < MAX_CONCURRENT_ENCODES) {
    activeEncodes += 1;
    return Promise.resolve();
  }

  return new Promise((resolve) => encodeQueue.push(resolve));
}

function releaseEncodeSlot() {
  const next = encodeQueue.shift();

  if (next) {
    next();
  } else {
    activeEncodes -= 1;
  }
}

async function withEncodeSlot<T>(fn: () => Promise<T>): Promise<T> {
  await acquireEncodeSlot();

  try {
    return await fn();
  } finally {
    releaseEncodeSlot();
  }
}

type ImageSizeTuple = [number, number];

export function getImageUrl(recipe: RecipeDbObject) {
  if (!recipe.image) {
    return null;
  }

  return `${baseUrl}/image/${recipe.slug}_${recipe.image}`;
}

export function appendSizeAndFormatToImageUrl(
  imageUrl: string,
  size?: Maybe<ImageSize>,
  format?: Maybe<ImageFormat>,
) {
  if (!size && !format) {
    return imageUrl;
  }

  const params: string[] = [];

  if (size) {
    params.push(`size=${size.width}x${size.height}`);
  }

  if (format) {
    params.push(`format=${format.toLowerCase()}`);
  }

  return `${imageUrl}?${params.join('&')}`;
}

function getFilePath(id: string, imageSize?: ImageSizeTuple, format?: string) {
  const size = imageSize?.join('x');

  return path.join(cacheDir, `${id}-${size}-${format}`);
}

// Path of the web source rendition (the capped WebP next/image consumes).
function getSourcePath(id: string) {
  return getFilePath(id, undefined, 'source');
}

// Whether the web source rendition is already on disk. Image ids are immutable
// — replacing a recipe's picture mints a new Image doc with a new id (see
// updateRecipe) — so an existing file is guaranteed current and can be skipped
// without any content hash.
export function isSourceCached(id: string) {
  return fs.pathExists(getSourcePath(id));
}

// Remove cached renditions whose image id isn't in `validIds` — files left
// behind by recipes/images that no longer exist. File names are
// `<imageId>-<size>-<format>` and an ObjectId hex contains no '-', so the id is
// the prefix before the first dash. Returns the number of files removed.
export async function pruneImageCache(validIds: Set<string>) {
  const files = await fs.readdir(cacheDir);
  let removed = 0;

  for (const file of files) {
    const dash = file.indexOf('-');

    // Skip anything not matching our naming scheme rather than risk deleting it.
    if (dash <= 0) {
      continue;
    }

    if (validIds.has(file.substring(0, dash))) {
      continue;
    }

    try {
      await fs.remove(path.join(cacheDir, file));
      removed += 1;
    } catch (e) {
      logger.error(e);
    }
  }

  return removed;
}

export function recipeImageMiddleware() {
  const router = Router();

  router.get('/image/:slugAndId', async (req, res) => {
    res.set('Cache-Control', 'max-age=31536000, public');

    const id = req.params.slugAndId.substring(
      req.params.slugAndId.lastIndexOf('_') + 1,
    );

    const size = req.query['size']
      ?.toString()
      .split('x', 2)
      .map((x) => parseInt(x, 10)) as ImageSizeTuple | undefined;
    const format = req.query['format']?.toString();

    // Bare request (no size, no format): the web source — a WebP capped to
    // SOURCE_MAX that next/image fetches and resizes per viewport. Cached on
    // disk (pre-warmed by imagesGenerator), so this is normally a plain file
    // read; only a never-seen image falls through to a one-time cold encode.
    if (!size && !format) {
      const sourcePath = getSourcePath(id);

      if (await fs.pathExists(sourcePath)) {
        res.contentType('image/webp');
        return res.send(await fs.readFile(sourcePath));
      }

      try {
        // Load + encode inside the concurrency gate so a burst of cold cards
        // can't hold many full-resolution Buffers in memory at once.
        const buffer = await withEncodeSlot(async () => {
          const image = await ImageModel.findById(id);
          return image ? writeSourceImage(id, image.data) : null;
        });

        if (!buffer) {
          return res.status(404).end();
        }

        res.contentType('image/webp');
        return res.send(buffer);
      } catch (e) {
        // Original is stored as-is; if Sharp can't decode it, fail loud rather
        // than hang the request.
        logger.error(e);
        return res.status(415).end();
      }
    }

    // Sized / explicit-format request (e.g. push-notification 1080×1080): a
    // fast WebP or JPEG rendition, cached to disk. AVIF is intentionally
    // unsupported — AV1 encoding is far too slow for this VM.
    const webp = format === 'webp';
    const contentType = webp ? 'image/webp' : 'image/jpeg';

    // Cache key must match the suffix resizeAndWriteImage writes.
    const filePath = getFilePath(id, size, webp ? 'webp' : 'jpeg');

    if (await fs.pathExists(filePath)) {
      res.contentType(contentType);
      return res.send(await fs.readFile(filePath));
    }

    try {
      const buffer = await withEncodeSlot(async () => {
        const image = await ImageModel.findById(id);
        return image
          ? resizeAndWriteImage(id, image.data, { size, webp })
          : null;
      });

      if (!buffer) {
        return res.status(404).end();
      }

      res.contentType(contentType);
      res.send(buffer);
    } catch (e) {
      logger.error(e);
      res.status(415).end();
    }
  });

  return router;
}

// Generate (and cache) the web source rendition: the original capped to
// SOURCE_MAX on its long edge, re-encoded as WebP. Cheap enough to do on
// demand or warm in bulk — unlike AVIF, which is what previously melted the VM.
export async function writeSourceImage(id: string, image: Buffer) {
  const buffer = await sharp(image)
    .rotate()
    .resize(SOURCE_MAX, SOURCE_MAX, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: SOURCE_QUALITY })
    .toBuffer();

  try {
    await fs.writeFile(getSourcePath(id), buffer);
  } catch (e) {
    logger.error(e);
  }

  return buffer;
}

async function resizeAndWriteImage(
  id: string,
  image: Buffer,
  options?: { size?: ImageSizeTuple; webp?: boolean },
) {
  let s = sharp(image).rotate();

  if (options?.size) {
    s = s.resize(options.size[0], options.size[1]);
  }

  if (options?.webp) {
    s = s.webp();
  } else {
    s = s.jpeg({ mozjpeg: true });
  }

  const buffer = await s.toBuffer();
  const filePath = getFilePath(
    id,
    options?.size,
    options?.webp ? 'webp' : 'jpeg',
  );

  try {
    await fs.writeFile(filePath, buffer);
  } catch (e) {
    logger.error(e);
  }

  return buffer;
}
