import { PasswordSettingKey } from "../types";

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 30;

export const charSets: Record<PasswordSettingKey, string> = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  spaces: " ",
  separators: "-_",
  symbols: "!#$%&()*+./:;=>?@[\\]^`{|}~'",
};
