import { FC } from "react";
import { Fieldset } from "@react95/core";

interface PasswordResultProps {
  password: string;
  copied: boolean;
}

export const PasswordResult: FC<PasswordResultProps> = ({
  password,
  copied,
}) => {
  return (
    <Fieldset legend="Результат" style={{ marginBottom: "0.75rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <pre style={{ margin: 0, fontFamily: "inherit" }}>{password}</pre>
        {copied && <span>Скопировано!</span>}
      </div>
    </Fieldset>
  );
};
