import React from "react";
import { Button } from "@react95/core";

interface GenerateButtonsProps {
  onCopy: () => void;
  onReset: () => void;
}

export const GenerateButtons: React.FC<GenerateButtonsProps> = ({
  onCopy,
  onReset,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        paddingTop: "0.625rem",
      }}
    >
      <Button style={{ marginRight: "0.5rem" }} onClick={onCopy}>
        Copy
      </Button>
      <Button onClick={onReset}>Reset</Button>
    </div>
  );
};
