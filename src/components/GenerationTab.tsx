import { PasswordSettings } from "../hooks/usePasswordGenerator";
import { LengthControl } from "./LengthControl";
import { Option, PasswordOptions } from "./PasswordOptions";
import { PasswordResult } from "./PasswordResult";

interface GenerationTabProps {
  password: string;
  passwordLength: number;
  settings: PasswordSettings;
  copied: boolean;
  setPasswordLength: (length: number) => void;
  toggleSetting: (key: keyof PasswordSettings) => void;
}

const options: Option[] = [
  {
    key: "upper",
    label: "Прописные буквы",
    tooltip: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  },
  {
    key: "lower",
    label: "Строчные буквы",
    tooltip: "abcdefghijklmnopqrstuvwxyz",
  },
  { key: "numbers", label: "Цифры", tooltip: "0123456789" },
  { key: "spaces", label: "Пробел", tooltip: "Пробел ¯\\_(ツ)_/¯" },
  {
    key: "separators",
    label: "Разделители",
    tooltip: "тире и подчеркивание",
  },
  {
    key: "symbols",
    label: "Специальные символы",
    tooltip: "!#$%&()*+./:;=>?@[\\]^`{|}~'\\",
  },
];

export const GenerationTab: React.FC<GenerationTabProps> = ({
  password,
  passwordLength,
  settings,
  copied,
  setPasswordLength,
  toggleSetting,
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
    </>
  );
};
