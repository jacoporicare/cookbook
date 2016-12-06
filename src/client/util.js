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
