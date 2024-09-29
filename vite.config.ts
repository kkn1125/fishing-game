import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const MODE = process.env.NODE_ENV || "production";

  dotenv.config({
    path: path.join(path.resolve(), ".env"),
  });
  dotenv.config({
    path: path.join(path.resolve(), `.env.${MODE}`),
  });

  const env = loadEnv(mode, process.cwd(), "");

  const HOST = process.env.HOST || "0.0.0.0";
  const PORT = +(process.env.PORT || 5000);

  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": {
        MODE,
        HOST,
        PORT,
      },
    },
    server: {
      host: HOST,
      port: PORT,
    },
    base: MODE === "development" ? "/" : "/fishing-game/",
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    plugins: [react(), tsconfigPaths()],
  };
});
