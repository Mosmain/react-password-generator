/**
 * Перемешивает массив символов случайным образом.
 */
export const shuffleArray = (array: string[]): string[] => {
  return array.sort(() => Math.random() - 0.5);
};
