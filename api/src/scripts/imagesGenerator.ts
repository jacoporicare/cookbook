import { connectToDb } from '../db';
import logger from '../logger';
import recipeModel from '../models/recipe';
import { resizeAndWriteImage } from '../recipeImage';

async function generateImages(id: string, image: Buffer) {
  // For Android and iOS apps
  await resizeAndWriteImage(id, image, { size: [640, 640], webp: true });
  await resizeAndWriteImage(id, image, { size: [1080, 1080], webp: true });

  // For Web
  await resizeAndWriteImage(id, image);
  await resizeAndWriteImage(id, image, { webp: true });
  await resizeAndWriteImage(id, image, { size: [800, 800] });
  await resizeAndWriteImage(id, image, { size: [800, 800], webp: true });
}

async function main() {
  await connectToDb();
  const recipes = await recipeModel.find().populate('image');

  logger.info('Generating images (this can take a while)');

  for (const recipe of recipes) {
    if (recipe.image) {
      await generateImages(recipe.id, recipe.image.data);
    }
  }

  logger.info('Done');
}

main().catch(logger.error);
