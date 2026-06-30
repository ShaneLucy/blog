import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: [
      // Force Svelte's browser build so mount() works in jsdom
      { find: /^svelte$/, replacement: resolve("./node_modules/svelte/src/index-client.js") }
    ]
  },
  test: {
    include: ["tests/unit/**/*.test.ts"],
    setupFiles: ["tests/setup.ts"],
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      include: ["src/**/*.ts", "src/**/*.svelte"],
      exclude: ["src/**/*.d.ts"]
    }
  }
});
