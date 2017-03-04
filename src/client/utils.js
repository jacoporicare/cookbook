export function parseValue(value, type) {
  switch (type) {
    case 'number': {
      const parsedValue = Number.parseInt(value, 10);
      return !Number.isNaN(parsedValue) ? parsedValue : '';
    }

    default:
      return value;
  }
}

export function deleteNullOrUndefinedKeys(obj) {
  const result = {};

  Object.keys(obj).forEach((k) => {
    const value = obj[k];
    if (value !== undefined && value !== null) {
      result[k] = value;
    }
  });

  return result;
}
