import { Fieldset } from "@react95/core";

interface PasswordResultProps {
  password: string;
  copied: boolean;
}

export const PasswordResult: React.FC<PasswordResultProps> = ({
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
        <span>{password}</span>
        {copied && <span>Скопировано!</span>}
      </div>
    </Fieldset>
  );
};
