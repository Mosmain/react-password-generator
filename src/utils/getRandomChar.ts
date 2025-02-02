export const getRandomChar = (set: string): string => {
  return set.charAt(Math.floor(Math.random() * set.length));
};
