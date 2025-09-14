import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "process.env.AZURE_CLIENT_ID": JSON.stringify(env.AZURE_CLIENT_ID),
      "process.env.AZURE_CLIENT_SECRET": JSON.stringify(env.AZURE_CLIENT_SECRET),
      "process.env.GOOGLE_CLIENT_ID": JSON.stringify(env.GOOGLE_CLIENT_ID),
      "process.env.GOOGLE_CLIENT_SECRET": JSON.stringify(env.GOOGLE_CLIENT_SECRET),
      "process.env.NEXTAUTH_SECRET": JSON.stringify(env.NEXTAUTH_SECRET),
      "process.env.NEXTAUTH_URL": JSON.stringify(env.NEXTAUTH_URL),
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },
  };
});