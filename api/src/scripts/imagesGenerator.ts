import sharp from 'sharp';

import { connectToDb } from '../db';
import logger from '../logger';
import { ImageDbObject } from '../models/image';
import RecipeModel from '../models/recipe';
import {
  isSourceCached,
  pruneImageCache,
  writeSourceImage,
} from '../recipeImage';

// Pre-warm the web source rendition (a capped WebP — see writeSourceImage) for
// every recipe, so the list and detail pages are served from disk instead of
// triggering cold on-demand encodes. WebP is cheap: warming all recipes takes
// a minute or two single-threaded, nothing like the hours full-res AVIF would
// have cost (which is why this warmer melted the VM before).
//
// These are per-process settings; the forked batch process is the only thing
// they affect, not the request-serving image route in the main process.
sharp.concurrency(1);
sharp.cache(false);

async function main() {
  await connectToDb();

  const total = await RecipeModel.countDocuments();
  logger.info(`Warming image sources for ${total} recipes`);

  // Stream recipes one at a time. Loading the whole collection with
  // .populate('image') held every original image buffer in memory at once;
  // a cursor keeps only the current recipe + image resident.
  const cursor = RecipeModel.find().populate('image').cursor();

  const startedAt = Date.now();
  let processed = 0;
  let noImage = 0;
  let generated = 0;
  let upToDate = 0;
  let failed = 0;

  // Image ids still in use, to prune orphaned cache files against afterwards.
  const validIds = new Set<string>();

  for await (const recipe of cursor) {
    processed += 1;

    if (!recipe.image) {
      noImage += 1;
      logger.info(`[${processed}/${total}] ${recipe.slug}: no image, skipping`);
      continue;
    }

    // The route serves and caches by image id, so the warmer must key by it too.
    const image = recipe.image as ImageDbObject;
    validIds.add(image.id);

    if (await isSourceCached(image.id)) {
      upToDate += 1;
      logger.info(`[${processed}/${total}] ${recipe.slug}: up to date`);
      continue;
    }

    const t0 = Date.now();
    try {
      await writeSourceImage(image.id, image.data);
      generated += 1;
      logger.info(
        `[${processed}/${total}] ${recipe.slug}: warmed in ${Date.now() - t0}ms`,
      );
    } catch (e) {
      // The original is stored as-is and may not be Sharp-decodable (the image
      // route handles the same case with a 415). Isolate the failure so one bad
      // image doesn't abort warming for everything after it.
      failed += 1;
      logger.error(`[${processed}/${total}] ${recipe.slug}: warming failed`, e);
    }
  }

  // Drop cache files for images no longer referenced by any recipe. Guard
  // against an empty set (e.g. an anomalous empty scan) wiping the whole cache.
  const pruned = validIds.size > 0 ? await pruneImageCache(validIds) : 0;

  const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
  logger.info(
    `Done: ${generated} warmed, ${upToDate} up to date, ${failed} failed, ${noImage} without image, ${pruned} orphaned files pruned in ${elapsed}s`,
  );
  process.exit();
}

main().catch(logger.error);
