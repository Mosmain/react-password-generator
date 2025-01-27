import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Cursor,
  Dropdown,
  Fieldset,
  Input,
  List,
  Tab,
  Tabs,
  TaskBar,
  Range,
  Tooltip,
} from "@react95/core";
import "./App.css";

const copyToClipboard = (text: string, setCopied: (value: boolean) => void) => {
  console.log("clicked");

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((error) => console.error("Ошибка копирования:", error));
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      setCopied(true);
    } catch (error) {
      console.error("Ошибка при копировании:", error);
    } finally {
      document.body.removeChild(textArea);
    }
  }
};

function App() {
  const [passwordLength, setPasswordLength] = useState(6);
  const [copied, setCopied] = useState(false);
  const [manualTrigger, setManualTrigger] = useState(false);
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState({
    upper: true,
    lower: false,
    numbers: false,
    spaces: false,
    separators: false,
    symbols: false,
  });

  const options: {
    key: keyof typeof settings;
    label: string;
    tooltip: string;
  }[] = [
    {
      key: "upper",
      label: "Прописные буквы",
      tooltip: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    },
    {
      key: "lower",
      label: "Строчные буквы",
      tooltip: "abcdefghijklmnopqrstuvwxyz",
    },
    { key: "numbers", label: "Цифры", tooltip: "0123456789" },
    { key: "spaces", label: "Пробел", tooltip: "Пробел ¯\\_(ツ)_/¯" },
    {
      key: "separators",
      label: "Разделители",
      tooltip: "тире и подчеркивание",
    },
    {
      key: "symbols",
      label: "Специальные символы",
      tooltip: "!#$%&()*+./:;=>?@[\\]^`{|}~'\\",
    },
  ];

  const charSets = {
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lower: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    spaces: " ",
    separators: "-_",
    symbols: "!#$%&()*+./:;=>?@[\\]^`{|}~'\\",
  };

  const generatePassword = () => {
    const selectedCharSets = Object.entries(settings)
      .filter(([key, value]) => value)
      .map(([key]) => charSets[key as keyof typeof charSets]);

    if (selectedCharSets.length === 0) {
      setPassword("Выберите хотя бы один параметр!");
      return;
    }

    if (passwordLength < 6) {
      setPassword("Минимальная длина 6 символов!");
      return;
    } else if (passwordLength > 30) {
      setPassword("Максимальная длина 30 символов!");
      return;
    }

    let allChars = selectedCharSets.join(""); // Собираем все выбранные символы
    let requiredChars = selectedCharSets.map((set) =>
      set.charAt(Math.floor(Math.random() * set.length))
    );

    // Заполняем оставшиеся символы случайным образом
    let remainingLength = passwordLength - requiredChars.length;
    let randomChars = Array.from({ length: remainingLength }, () =>
      allChars.charAt(Math.floor(Math.random() * allChars.length))
    );

    // Перемешиваем финальный пароль
    const newPassword = [...requiredChars, ...randomChars]
      .sort(() => Math.random() - 0.5)
      .join("");

    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [passwordLength, settings, manualTrigger]);

  // Генерация пароля по нажатию кнопки
  const handleManualGenerate = () => {
    console.log("test");
    setManualTrigger((prev) => !prev); // Изменяем флаг, чтобы запустить useEffect
  };

  useEffect(() => {
    let timeout: number;
    if (copied) {
      timeout = window.setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCheckboxChange = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div
      style={{
        padding: "0.625rem",
      }}
    >
      <Tabs
        width="350px"
        defaultActiveTab="Генерация"
        style={{
          paddingTop: "0.125rem",
        }}
      >
        <Tab title="Генерация">
          <Fieldset legend="Использовать" style={{ marginBottom: "0.75rem" }}>
            {options.map(({ key, label, tooltip }) => (
              <div key={key}>
                <Tooltip delay={1000} text={tooltip}>
                  <Checkbox
                    checked={settings[key]}
                    onChange={() => handleCheckboxChange(key)}
                  >
                    {label}
                  </Checkbox>
                </Tooltip>
                <br />
              </div>
            ))}
          </Fieldset>

          <Fieldset legend="Результат" style={{ marginBottom: "0.75rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* <span>{"do{6_{Bf^Z@%/3G8SX=BiKR#k``Rg?"}</span> */}
              <span>{password}</span>
              {copied && <span>Скопировано!</span>}
            </div>
          </Fieldset>

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
                value={passwordLength}
                onChange={(e) => {
                  setPasswordLength(Number(e.target.value));
                }}
              />
              <span>30</span>
            </div>

            <div
              style={{
                marginTop: 12,
              }}
            >
              <span>Текущая длина: {passwordLength}</span>
            </div>
          </Fieldset>
        </Tab>
        <Tab title="Обо мне">
          <p
            style={{
              marginTop: 0,
              marginBottom: "1.6em",
            }}
          >
            If you have problems with this program and it worked correctly on an
            earlier version of Windows, select the compatibility mode that
            matches that earlier version.
          </p>

          <Fieldset
            legend="Compatibility mode"
            style={{
              marginBottom: "1.6em",
            }}
          >
            <Checkbox readOnly checked>
              Run this program in compatibility mode for:
            </Checkbox>
            <Dropdown
              style={{
                width: 200,
              }}
              options={["Windows 95"]}
            />
          </Fieldset>

          <Fieldset legend="Display Settings">
            <Checkbox>Run in 256 colors</Checkbox>
            <Checkbox>Run in 640 x 480 screen resolution</Checkbox>
            <Checkbox>Disable visual themes</Checkbox>
          </Fieldset>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>
            Learn more about <a href="#">program compatibility.</a>
          </p>
        </Tab>
      </Tabs>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "0.625rem",
        }}
      >
        <Button
          style={{ marginRight: "0.5rem" }}
          onClick={() => copyToClipboard(password, setCopied)}
        >
          Copy
        </Button>
        <Button onClick={() => handleManualGenerate()}>Reset</Button>
      </div>
    </div>
  );
}

export default App;
