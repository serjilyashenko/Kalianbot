export const getAny = <T>(array: T[]): T => {
  const index: number = Math.floor(Math.random() * array.length);
  return array[index];
};
