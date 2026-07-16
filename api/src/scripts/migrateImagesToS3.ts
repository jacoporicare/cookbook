import 'dotenv/config';

import { connectToDb } from '../db';
import {
  generateAndUploadRenditions,
  pushJpegObjectKey,
} from '../imageProcessing';
import logger from '../logger';
import ImageModel from '../models/image';
import RecipeModel from '../models/recipe';
import { objectExists, originalObjectKey, putObject } from '../s3';

// One-shot, idempotent migration of recipe images from MongoDB (the `images`
// collection, blobs stored as Buffers) to S3.
//
// The S3 object key for each image is the image's existing Mongo ObjectId hex,
// so the migration is deterministic: running it against the .archive-restored
// DB (to populate S3) and later against production (to rewrite refs) produces
// the SAME keys — S3 objects created by the first run are detected and skipped
// by the second, and no duplicates are made.
//
// Per recipe with a picture:
//   1. key = recipe.image (the schema now types `image` as String, so a stored
//      ObjectId is read back as its hex string).
//   2. If the renditions already exist in S3, skip re-encoding.
//   3. Otherwise load the Image blob and generate + upload all renditions.
//   4. Persist recipe.image as the string key (converts the field from a BSON
//      ObjectId to a plain string in production).
//
// Run with `--drop-images` to drop the now-unused `images` collection at the
// end (do this only once you are confident the migration succeeded).
//
//   pnpm --filter api exec tsx src/scripts/migrateImagesToS3.ts [--drop-images]

const DROP_IMAGES = process.argv.includes('--drop-images');

async function isAlreadyInS3(key: string) {
  // pushJpeg is written last by generateAndUploadRenditions, so its presence
  // (together with the original) means a previous run completed this image.
  return (
    (await objectExists(originalObjectKey(key))) &&
    (await objectExists(pushJpegObjectKey(key)))
  );
}

async function main() {
  await connectToDb();

  const total = await RecipeModel.countDocuments({
    image: { $exists: true, $ne: null },
  });
  logger.info(`Migrating images for ${total} recipes with a picture`);

  const cursor = RecipeModel.find({
    image: { $exists: true, $ne: null },
  }).cursor();

  let processed = 0;
  let migrated = 0;
  let skipped = 0;
  let missingBlob = 0;
  let failed = 0;

  for await (const recipe of cursor) {
    processed += 1;
    const key = recipe.image;

    if (!key) {
      continue;
    }

    try {
      if (await isAlreadyInS3(key)) {
        skipped += 1;
        logger.info(`[${processed}/${total}] ${recipe.slug}: already in S3`);
      } else {
        const image = await ImageModel.findById(key);

        if (!image) {
          missingBlob += 1;
          logger.warn(
            `[${processed}/${total}] ${recipe.slug}: no Image blob for key ${key}, skipping`,
          );
          continue;
        }

        await putObject(originalObjectKey(key), image.data, image.contentType);
        await generateAndUploadRenditions(key, image.data);
        migrated += 1;
        logger.info(`[${processed}/${total}] ${recipe.slug}: uploaded to S3`);
      }

      // Force the stored field to the string key (idempotent; in production
      // this rewrites the BSON ObjectId reference to the S3 key).
      await RecipeModel.updateOne(
        { _id: recipe._id },
        { $set: { image: key } },
      );
    } catch (e) {
      failed += 1;
      logger.error(
        `[${processed}/${total}] ${recipe.slug}: migration failed`,
        e,
      );
    }
  }

  logger.info(
    `Done: ${migrated} uploaded, ${skipped} already in S3, ${missingBlob} missing blob, ${failed} failed`,
  );

  if (DROP_IMAGES) {
    if (failed > 0 || missingBlob > 0) {
      logger.warn(
        'Not dropping images collection: some images failed or were missing. Resolve them first.',
      );
    } else {
      await ImageModel.collection.drop().catch((e) => {
        // Already dropped on a previous run is fine.
        if (e?.codeName === 'NamespaceNotFound') {
          logger.info('images collection already dropped');
        } else {
          throw e;
        }
      });
      logger.info('Dropped images collection');
    }
  }

  process.exit(0);
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
