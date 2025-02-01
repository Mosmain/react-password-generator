import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@react95/core/GlobalStyle";
import "@react95/core/themes/win95.css";
import "./index.css";

import { Frame, TitleBar } from "@react95/core";
import { Wininet32546, Star } from "@react95/icons";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Frame
      bgColor="$material"
      boxShadow="$out"
      style={{
        paddingTop: "0.125rem",
      }}
    >
      <TitleBar
        active
        icon={<Wininet32546 variant="16x16_4" />}
        title="password_generator.exe"
        style={{
          margin: "0 0.125rem 0.125rem 0.125rem",
        }}
      >
        <TitleBar.OptionsBox>
          <TitleBar.Option as="a" href="https://github.com/React95/React95">
            <Star variant="16x16_4" />
          </TitleBar.Option>
        </TitleBar.OptionsBox>
      </TitleBar>
      <App />
    </Frame>
  </React.StrictMode>
);
