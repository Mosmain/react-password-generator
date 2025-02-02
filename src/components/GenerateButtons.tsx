import { FC } from "react";
import { Button } from "@react95/core";

interface GenerateButtonsProps {
  disabled: boolean;
  onCopy: () => void;
  onReset: () => void;
}

export const GenerateButtons: FC<GenerateButtonsProps> = ({
  disabled,
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
      <Button
        style={{ marginRight: "0.5rem" }}
        disabled={disabled}
        onClick={onCopy}
      >
        Copy
      </Button>
      <Button disabled={disabled} onClick={onReset}>
        Reset
      </Button>
    </div>
  );
};
