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

export function getImageUrl(slug: string, size: 'full' | 'thumb' = 'thumb') {
  const key = getImageKey(slug, size);
  let s3Url = process.env.RAZZLE_S3_URL!;

  if (s3Url.endsWith('/')) {
    s3Url = s3Url.slice(0, -1);
  }

  return `${process.env.RAZZLE_S3_URL}/${key}`;
}
