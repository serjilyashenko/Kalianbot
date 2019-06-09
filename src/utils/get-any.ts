export const getAny = (array: any[]) => {
  const index: number = Math.floor(Math.random() * array.length);
  return array[index];
};
