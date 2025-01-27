export const filterEmptyValues = (obj) => {
  const filtered = {};

  const isEmptyObject = (value) => {
    return typeof value === 'object' && value !== null && Object.keys(value).length === 0 && !(value instanceof Date);
  };

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (
        value !== "" &&
        value !== null &&
        value !== undefined &&
        !isEmptyObject(value) &&
        value !== 0 &&
        !(value instanceof Date && isNaN(value.getTime()))
      ) {
        filtered[key] = value;
      }
    }
  }

  return filtered;
};
