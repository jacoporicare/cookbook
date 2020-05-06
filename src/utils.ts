import { runtimeConfig } from './config';

/**
 * Object -> JSON: undefined to null because undefined is not valid JSON value
 */
export function undefinedToNull<T>(o: T): T {
  const obj = Object.assign({}, o);
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      obj[key] = null;
    }
  });

  return obj;
}

export function getImageKey(slug: string, size: 'full' | 'thumb' = 'thumb') {
  return `recipe-images/${size}/${slug}`;
}

export function getImageUrl(slug: string, ts: number, size: 'full' | 'thumb' = 'thumb') {
  const key = getImageKey(slug, size);

  return `https://${runtimeConfig.s3Bucket}.s3-${runtimeConfig.awsRegion}.amazonaws.com/${key}?${ts}`;
}
