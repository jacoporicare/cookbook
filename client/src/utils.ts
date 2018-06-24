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

export function getImageUrl(
  slug: string,
  lastModifiedDate: string,
  size: 'full' | 'thumb' = 'thumb',
) {
  const ts = new Date(lastModifiedDate).valueOf();

  return `/api/recipes/${slug}/image-${size}?${ts}`;
}
