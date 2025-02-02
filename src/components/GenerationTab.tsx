import { FC } from "react";
import { LengthControl } from "./LengthControl";
import { PasswordOptions } from "./PasswordOptions";
import { PasswordResult } from "./PasswordResult";
import { GenerateButtons } from "./GenerateButtons";
import { PasswordSettings, Option, PasswordSettingKey } from "../types";
import { charSets } from "../constants";

interface GenerationTabProps {
  password: string;
  passwordLength: number;
  settings: PasswordSettings;
  copied: boolean;
  isButtonsDisabled: boolean;
  setPasswordLength: (length: number) => void;
  toggleSetting: (key: PasswordSettingKey) => void;
  regenerate: () => void;
  onCopy: () => void;
}

const options: Option[] = [
  {
    key: "upper",
    label: "Прописные буквы",
    tooltip: charSets.upper,
  },
  {
    key: "lower",
    label: "Строчные буквы",
    tooltip: charSets.lower,
  },
  { key: "numbers", label: "Цифры", tooltip: charSets.numbers },
  { key: "spaces", label: "Пробел", tooltip: "Пробел ¯\\_(ツ)_/¯" },
  {
    key: "separators",
    label: "Разделители",
    tooltip: "тире и подчеркивание",
  },
  {
    key: "symbols",
    label: "Специальные символы",
    tooltip: charSets.symbols,
  },
];

export const GenerationTab: FC<GenerationTabProps> = ({
  password,
  passwordLength,
  settings,
  isButtonsDisabled,
  copied,
  setPasswordLength,
  toggleSetting,
  onCopy,
  regenerate,
}) => {
  return (
    <>
      <PasswordOptions
        settings={settings}
        options={options}
        onToggle={toggleSetting}
      />

      <PasswordResult password={password} copied={copied} />

      <LengthControl length={passwordLength} onChange={setPasswordLength} />

      <GenerateButtons
        disabled={isButtonsDisabled}
        onCopy={onCopy}
        onReset={regenerate}
      />
    </>
  );
};
