import { useEffect, useState } from "react";

export interface PasswordSettings {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  spaces: boolean;
  separators: boolean;
  symbols: boolean;
}

const defaultSettings: PasswordSettings = {
  upper: true,
  lower: false,
  numbers: false,
  spaces: false,
  separators: false,
  symbols: false,
};

const charSets: Record<keyof PasswordSettings, string> = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  spaces: " ",
  separators: "-_",
  symbols: "!#$%&()*+./:;=>?@[\\]^`{|}~'\\",
};

/**
 * Хук usePasswordGenerator
 *
 * @param initialLength - начальная длина пароля (по умолчанию 6)
 * @param initialSettings - начальные настройки (по умолчанию defaultSettings)
 *
 * @returns объект с текущим паролем, длиной, настройками и функциями для управления
 */

export const usePasswordGenerator = (
  initialLength: number = 6,
  initialSettings: PasswordSettings = defaultSettings
) => {
  const [passwordLength, setPasswordLength] = useState<number>(initialLength);
  const [settings, setSettings] = useState<PasswordSettings>(initialSettings);
  const [password, setPassword] = useState<string>("");
  const [manualTrigger, setManualTrigger] = useState<boolean>(false);

  const generatePassword = () => {
    const selectedCharSets = Object.entries(settings)
      .filter(([_, value]) => value)
      .map(([key]) => charSets[key as keyof typeof charSets]);

    if (selectedCharSets.length === 0) {
      setPassword("Выберите хотя бы один параметр!");
      return;
    }

    if (passwordLength < 6) {
      setPassword("Минимальная длина 6 символов!");
      return;
    } else if (passwordLength > 30) {
      setPassword("Максимальная длина 30 символов!");
      return;
    }

    let allChars = selectedCharSets.join("");
    let requiredChars = selectedCharSets.map((set) =>
      set.charAt(Math.floor(Math.random() * set.length))
    );

    let remainingLength = passwordLength - requiredChars.length;
    let randomChars = Array.from({ length: remainingLength }, () =>
      allChars.charAt(Math.floor(Math.random() * allChars.length))
    );

    const newPassword = [...requiredChars, ...randomChars]
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength, settings, manualTrigger]);

  const toggleSetting = (key: keyof PasswordSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const regenerate = () => {
    setManualTrigger((prev) => !prev);
  };

  return {
    password,
    passwordLength,
    settings,
    setPasswordLength,
    toggleSetting,
    regenerate,
    generatePassword,
  };
};
