export const getAny = (array: Array<any>) => {
  const index: number = Math.floor(Math.random() * array.length);
  return array[index];
};
