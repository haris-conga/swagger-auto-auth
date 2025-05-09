import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, "src/background.ts"),
        inject: resolve(__dirname, "src/inject.ts"),
        popup: resolve(__dirname, "src/popup.ts")
      },
      output: {
        entryFileNames: "[name].js"
      }
    },
    outDir: "dist",
    emptyOutDir: true,
    target: "es2020"
  }
});