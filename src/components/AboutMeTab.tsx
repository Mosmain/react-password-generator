import { FC } from "react";
import {
  Fieldset,
  Avatar,
  Frame,
} from "@react95/core";

export const AboutMeTab: FC = () => {
  return (
    <>
      <Frame
        display="inline-flex"
        gap="8px"
        style={{ alignContent: "center", marginBottom: "1rem" }}
      >
        <Avatar
          src="avatar.jpg"
          style={{ flexShrink: 0 }}
          size="64px"
          alt="photo"
          title="avatar.jpg (859B)"
        />
        <p>
          Салют, я frontend-разработчик на Vue, но хочу расширить стек React'ом
        </p>
      </Frame>

      <Fieldset legend="Навыки">
        <Frame display="flex" flexDirection="column">
          <h3 style={{ margin: 0, marginBottom: "0.5rem" }}>Commercial</h3>
          <span>
            <b>Языки:</b> JavaScript, TypeScript
          </span>
          <span>
            <b>Фреймворки:</b> Vue 3 (Composition API), Vue 2
          </span>
          <span>
            <b>State Management:</b> Vuex, Pinia
          </span>
          <span>
            <b>API & Data:</b> Axios, TanStack Query
          </span>
          <span>
            <b>UI-библиотеки:</b> Element Plus, Ant Design
          </span>
          <span>
            <b>Сборка:</b> Vite, Webpack
          </span>

          <h3 style={{ margin: "0.5rem 0" }}>Non-commercial (yet)</h3>
          <span>React</span>
        </Frame>
      </Fieldset>

      <p>
        Контакты{" "}
        <a href="https://t.me/mosmain" target="_blank" rel="noreferrer">
          Telegram
        </a>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/mosmain"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://career.habr.com/mosmain"
          target="_blank"
          rel="noreferrer"
        >
          Habr.Career
        </a>
      </p>
    </>
  );
};
