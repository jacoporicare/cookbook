export function parseValue(value: string, type: string) {
  switch (type) {
    case 'number': {
      const parsedValue = Number.parseFloat(value);
      return !Number.isNaN(parsedValue) ? parsedValue : '';
    }

    default:
      return value;
  }
}

export function deleteNullKeys<T>(obj: T): T {
  Object.keys(obj).forEach(key => {
    if (obj[key] === null) {
      delete obj[key];
    }
  });

  return obj;
}

/**
 * Useful when converting an object to JSON - e.g. let the API knows which keys should be cleared.
 */
export function undefinedKeysToNull<T>(obj: T): T {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      obj[key] = null;
    }
  });

  return obj;
}
