import { shuffleArray } from "./shuffleArray";

/**
 * Ограничитель количества пробелов в массиве строк
 *
 * @param array - массив строк
 * @param allChars - доступный набор символов для пароля
 *
 * @returns массив строк с количеством пробелов <= Math.floor(array.length / 2)
 */
export const limitSpaces = (array: string[], allChars: string): string[] => {
  const maxLength = Math.floor(array.length / 2);
  const spaceCount = array.filter((char) => char === " ").length;

  if (spaceCount <= maxLength) return array;

  // Оставляем только допустимое количество пробелов
  const nonSpaceChars = array.filter((char) => char !== " ");
  const allowedSpaces = Array(maxLength).fill(" ");

  const newArray = [...nonSpaceChars, ...allowedSpaces];

  const allCharsWithoutSpaces = allChars.replace(/ /g, "");

  // Если длина массива меньше исходной, добавляем недостающие символы
  while (newArray.length < array.length) {
    const randomChar =
      allCharsWithoutSpaces[
        Math.floor(Math.random() * allCharsWithoutSpaces.length)
      ];
    newArray.push(randomChar);
  }

  return shuffleArray(newArray);
};
