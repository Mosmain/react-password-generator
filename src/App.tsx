import { Tabs, Tab } from "@react95/core";
import { GenerationTab } from "./components/GenerationTab";
import { AboutMeTab } from "./components/AboutMeTab";
import { usePasswordGenerator } from "./hooks/usePasswordGenerator";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";

function App() {
  const {
    password,
    passwordLength,
    settings,
    isButtonsDisabled,
    setPasswordLength,
    toggleSetting,
    regenerate,
  } = usePasswordGenerator();

  const { copied, copyToClipboard } = useCopyToClipboard();

  const onCopy = () => {
    copyToClipboard(password);
  };

  return (
    <div style={{ padding: "0.625rem" }}>
      <Tabs
        width="350px"
        defaultActiveTab="Генерация"
        style={{ paddingTop: "0.125rem" }}
      >
        <Tab title="Генерация">
          <GenerationTab
            password={password}
            passwordLength={passwordLength}
            settings={settings}
            copied={copied}
            isButtonsDisabled={isButtonsDisabled}
            setPasswordLength={setPasswordLength}
            toggleSetting={toggleSetting}
            regenerate={regenerate}
            onCopy={onCopy}
          />
        </Tab>
        <Tab title="Обо мне">
          <AboutMeTab />
        </Tab>
      </Tabs>
    </div>
  );
}

export default App;
