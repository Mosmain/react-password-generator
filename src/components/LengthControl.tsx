import React from "react";
import { Fieldset, Range } from "@react95/core";

interface LengthControlProps {
  length: number;
  onChange: (value: number) => void;
}

export const LengthControl: React.FC<LengthControlProps> = ({
  length,
  onChange,
}) => {
  return (
    <Fieldset legend="Длина">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>6</span>
        <Range
          style={{
            margin: "0 12px",
          }}
          min={6}
          max={30}
          step={1}
          value={length}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
        />
        <span>30</span>
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
