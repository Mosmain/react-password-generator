import { FC } from "react";
import { Fieldset, Tooltip, Checkbox } from "@react95/core";
import { Option, PasswordSettingKey, PasswordSettings } from "../types";

interface PasswordOptionsProps {
  settings: PasswordSettings;
  options: Option[];
  onToggle: (key: PasswordSettingKey) => void;
}

export const PasswordOptions: FC<PasswordOptionsProps> = ({
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
