export const parseValue = (value, type) => {
  switch (type) {
    case 'number': {
      const parsedValue = Number.parseInt(value, 10);
      return !Number.isNaN(parsedValue) ? parsedValue : '';
    }

    default:
      return value;
  }
};

export const deleteNullKeys = obj =>
  Object.keys(obj).reduce((acc, cur) => {
    const value = obj[cur];
    if (value !== null) {
      acc[cur] = value; // eslint-disable-line no-param-reassign
    }
    return acc;
  }, {});
