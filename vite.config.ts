import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // или '0.0.0.0' для явного указания
    port: 5173, // при необходимости можно сменить порт
  },
});
