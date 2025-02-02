export interface PasswordSettings {
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  spaces: boolean;
  separators: boolean;
  symbols: boolean;
}

export type PasswordSettingKey = keyof PasswordSettings;
