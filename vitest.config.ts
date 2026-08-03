import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    env: {
      NEXTAUTH_SECRET: "test-secret-0000000000000000000000000000",
      NEXT_PUBLIC_API_URL: "http://localhost:8080",
      NEXT_PUBLIC_API_VERSION: "v1",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
