import { RecipeDbObject } from './models/recipe';
import { publicBaseUrl } from './s3';

// Recipe images are served directly from the public S3 bucket; the API is no
// longer in the read path. `recipe.image` holds the opaque object-key prefix
// under which all renditions live (see imageProcessing.ts / migrate script).

// Bare image URL = the S3 prefix for this image. The web custom next/image
// loader appends `/<width>.webp` to pick a rendition.
export function getImageUrl(recipe: RecipeDbObject) {
  if (!recipe.image) {
    return null;
  }

  return `${publicBaseUrl}/${recipe.image}`;
}

// The square JPEG rendition used by Android push notifications. Built from the
// bare prefix returned by getImageUrl.
export function pushImageUrl(imageUrl: string) {
  return `${imageUrl}/1080x1080.jpg`;
}
