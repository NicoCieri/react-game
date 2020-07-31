export const isArrayEqual = (a, b) =>
  a.length === b.length && a.every((value, i) => value === b[i]);
