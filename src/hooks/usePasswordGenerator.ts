import { useEffect, useState } from "react";
import {
  charSets,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../constants";
import {
  adjustSpaces,
  getRandomChar,
  limitSpaces,
  shuffleArray,
} from "../utils";
import { PasswordSettingKey, PasswordSettings } from "../types";

const defaultSettings: PasswordSettings = {
  upper: true,
  lower: false,
  numbers: false,
  spaces: false,
  separators: false,
  symbols: false,
};

/**
 * Хук usePasswordGenerator генерирует пароль на основе заданных настроек
 *
 * @param initialLength - начальная длина пароля (по умолчанию MIN_PASSWORD_LENGTH)
 * @param initialSettings - начальные настройки (по умолчанию defaultSettings)
 *
 * @returns объект с текущим паролем, длиной, настройками и функциями для управления
 */
export const usePasswordGenerator = (
  initialLength: number = MIN_PASSWORD_LENGTH,
  initialSettings: PasswordSettings = defaultSettings
) => {
  const [passwordLength, setPasswordLength] = useState<number>(initialLength);
  const [settings, setSettings] = useState<PasswordSettings>(initialSettings);
  const [password, setPassword] = useState<string>("");
  const [manualTrigger, setManualTrigger] = useState<boolean>(false);
  const [isButtonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  /**
   * Возвращает активные ключи настроек.
   */
  const getActiveKeys = (): PasswordSettingKey[] => {
    return Object.entries(settings)
      .filter(([_, value]) => value)
      .map(([key]) => key as PasswordSettingKey);
  };

  /**
   * Возвращает допустимые ключи (исключая пробелы и разделители).
   */
  const getValidKeys = (): PasswordSettingKey[] => {
    const activeKeys = getActiveKeys();
    return activeKeys.filter((key) => key !== "spaces" && key !== "separators");
  };

  /**
   * Возвращает выбранные наборы символов на основе активных ключей.
   */
  const getSelectedCharSets = (): string[] => {
    const activeKeys = getActiveKeys();
    return activeKeys.map((key) => charSets[key]);
  };

  const validateSettings = (): boolean => {
    const activeKeys = getActiveKeys();
    const validKeys = getValidKeys();

    if (activeKeys.length === 0) {
      setPassword("Выберите хотя бы один параметр!");
      setButtonsDisabled(true);

      return false;
    }

    if (validKeys.length === 0) {
      setPassword("Нельзя выбрать только пробелы и/или разделители!");
      setButtonsDisabled(true);

      return false;
    }

    if (
      passwordLength < MIN_PASSWORD_LENGTH ||
      passwordLength > MAX_PASSWORD_LENGTH
    ) {
      const message =
        passwordLength < MIN_PASSWORD_LENGTH
          ? `Минимальная длина ${MIN_PASSWORD_LENGTH} символов!`
          : `Максимальная длина ${MAX_PASSWORD_LENGTH} символов!`;

      setPassword(message);
      setButtonsDisabled(true);

      return false;
    }

    return true;
  };

  const generatePassword = (): void => {
    if (!validateSettings()) return;

    const selectedCharSets = getSelectedCharSets();
    const allChars = selectedCharSets.join("");
    let requiredChars = selectedCharSets.map(getRandomChar);

    const remainingLength = passwordLength - requiredChars.length;
    let randomChars = Array.from({ length: remainingLength }, () =>
      getRandomChar(allChars)
    );

    // Объединяем и перемешиваем символы
    let passwordArray = [...requiredChars, ...randomChars];
    passwordArray = shuffleArray(passwordArray);

    // Ограничиваем количество пробелов
    passwordArray = limitSpaces(passwordArray, allChars);

    // Корректируем позиции пробелов
    passwordArray = adjustSpaces(passwordArray);

    const newPassword = passwordArray.join("");

    setButtonsDisabled(false);
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength, settings, manualTrigger]);

  /**
   * Переключает значение настройки по ключу.
   *
   * @param key - Ключ настройки (например, "upper", "lower").
   */
  const toggleSetting = (key: PasswordSettingKey): void => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const regenerate = (): void => {
    setManualTrigger((prev) => !prev);
  };

  return {
    password,
    passwordLength,
    settings,
    isButtonsDisabled,
    setPasswordLength,
    toggleSetting,
    regenerate,
    generatePassword,
  };
};
