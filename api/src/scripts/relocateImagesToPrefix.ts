import 'dotenv/config';

import { connectToDb } from '../db';
import logger from '../logger';
import RecipeModel from '../models/recipe';
import { copyObject, deleteObject, listKeysUnderPrefix } from '../s3';

// One-shot, idempotent relocation of recipe images from the bucket root
// (`<key>/...`) into an `images/<key>/...` prefix, so the bucket root only holds
// `images/` and `staging/`. Matches the accounting project's convention of
// storing the full prefixed key in the DB.
//
// Per recipe whose `image` is not already under `images/`:
//   1. copy every object under `<key>/` to `images/<key>/` (server-side copy),
//   2. delete the old object,
//   3. rewrite recipe.image to `images/<key>`.
//
// A broken-image window (an object mid-move, or DB rewritten just before/after
// its objects) is acceptable here — the site has very few users. Safe to
// re-run: already-prefixed recipes are skipped.
//
//   pnpm --filter api exec tsx src/scripts/relocateImagesToPrefix.ts [--dry-run]

const DRY_RUN = process.argv.includes('--dry-run');
const PREFIX = 'images/';

async function main() {
  await connectToDb();

  const recipes = await RecipeModel.find({
    image: { $exists: true, $ne: null },
  });
  logger.info(`${recipes.length} recipes with an image`);

  let relocated = 0;
  let alreadyDone = 0;
  let failed = 0;

  for (const recipe of recipes) {
    const oldKey = recipe.image;
    if (!oldKey) {
      continue;
    }

    if (oldKey.startsWith(PREFIX)) {
      alreadyDone += 1;
      continue;
    }

    const newKey = `${PREFIX}${oldKey}`;

    try {
      const objects = await listKeysUnderPrefix(`${oldKey}/`);

      if (DRY_RUN) {
        logger.info(
          `[dry-run] ${recipe.slug}: ${oldKey} -> ${newKey} (${objects.length} objects)`,
        );
        continue;
      }

      for (const objectKey of objects) {
        // objectKey is `<oldKey>/<file>`; prepend the prefix to relocate it.
        await copyObject(objectKey, `${PREFIX}${objectKey}`);
        await deleteObject(objectKey);
      }

      await RecipeModel.updateOne(
        { _id: recipe._id },
        { $set: { image: newKey } },
      );

      relocated += 1;
      logger.info(
        `${recipe.slug}: relocated ${objects.length} objects -> ${newKey}`,
      );
    } catch (e) {
      failed += 1;
      logger.error(`${recipe.slug}: relocation failed`, e);
    }
  }

  logger.info(
    DRY_RUN
      ? `Dry run complete: ${recipes.length - alreadyDone} would move, ${alreadyDone} already prefixed`
      : `Done: ${relocated} relocated, ${alreadyDone} already prefixed, ${failed} failed`,
  );
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  logger.error(e);
  process.exit(1);
});
