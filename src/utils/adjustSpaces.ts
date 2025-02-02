/**
 * Исключает пробелы в начале и конце массива строк.
 */
export const adjustSpaces = (array: string[]): string[] => {
  const newArray = [...array];

  // Перемещаем пробелы из начала
  while (newArray[0] === " ") {
    const randomIndex = Math.floor(Math.random() * (newArray.length - 1)) + 1;
    [newArray[0], newArray[randomIndex]] = [newArray[randomIndex], newArray[0]];
  }

  // Перемещаем пробелы из конца
  while (newArray[newArray.length - 1] === " ") {
    const randomIndex = Math.floor(Math.random() * (newArray.length - 1));
    [newArray[newArray.length - 1], newArray[randomIndex]] = [
      newArray[randomIndex],
      newArray[newArray.length - 1],
    ];
  }

  // Проверяем, не осталось ли пробелов в начале или конце
  if (newArray[0] === " " || newArray[newArray.length - 1] === " ") {
    return adjustSpaces(newArray);
  }

  return newArray;
};
