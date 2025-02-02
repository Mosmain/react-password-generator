import { FC } from "react";
import { Fieldset, Range } from "@react95/core";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "../constants";

interface LengthControlProps {
  length: number;
  onChange: (value: number) => void;
}

export const LengthControl: FC<LengthControlProps> = ({ length, onChange }) => {
  return (
    <Fieldset legend="Длина">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>{MIN_PASSWORD_LENGTH}</span>
        <Range
          style={{
            margin: "0 12px",
          }}
          min={MIN_PASSWORD_LENGTH}
          max={MAX_PASSWORD_LENGTH}
          step={1}
          value={length}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
        />
        <span>{MAX_PASSWORD_LENGTH}</span>
      </div>

      <div
        style={{
          marginTop: 12,
        }}
      >
        <span>Текущая длина: {length}</span>
      </div>
    </Fieldset>
  );
};
