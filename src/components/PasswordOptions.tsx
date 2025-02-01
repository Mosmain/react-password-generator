import { Fieldset, Tooltip, Checkbox } from "@react95/core";
import { PasswordSettings } from "../hooks/usePasswordGenerator";

export interface Option {
  key: keyof PasswordSettings;
  label: string;
  tooltip: string;
}

interface PasswordOptionsProps {
  settings: PasswordSettings;
  options: Option[];
  onToggle: (key: keyof PasswordSettings) => void;
}

export const PasswordOptions: React.FC<PasswordOptionsProps> = ({
  settings,
  options,
  onToggle,
}) => {
  return (
    <Fieldset legend="Использовать" style={{ marginBottom: "0.75rem" }}>
      {options.map(({ key, label, tooltip }) => (
        <div key={key}>
          <Tooltip delay={1000} text={tooltip}>
            <Checkbox checked={settings[key]} onChange={() => onToggle(key)}>
              {label}
            </Checkbox>
          </Tooltip>
          <br />
        </div>
      ))}
    </Fieldset>
  );
};
