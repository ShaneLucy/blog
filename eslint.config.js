import prettier from "eslint-config-prettier";
import path from "node:path";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import sonarjs from "eslint-plugin-sonarjs";
import { defineConfig, includeIgnoreFile } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

const COGNITIVE_COMPLEXITY_LIMIT = 15;

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  { ignores: ["src/sonar-test-bad-code.ts"] },
  js.configs.recommended,
  ts.configs.recommended,
  svelte.configs.recommended,
  prettier,
  svelte.configs.prettier,
  sonarjs.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      "no-undef": "off",
      "no-console": "error", // S106
      "no-duplicate-imports": "error", // S3863
      "@typescript-eslint/no-non-null-assertion": "error", // S2966
      "no-magic-numbers": [
        "error",
        {
          ignore: [-1, 0, 1, 2, 3],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          enforceConst: true
        }
      ] // S109
    }
  },
  {
    // Type-aware rules for plain TypeScript files
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["vitest.config.ts"]
        }
      }
    },
    rules: {
      "@typescript-eslint/no-unnecessary-type-assertion": "error" // S4325
    }
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"],
        parser: ts.parser,
        svelteConfig
      }
    },
    rules: {
      "@typescript-eslint/no-unnecessary-type-assertion": "error" // S4325
    }
  },
  {
    // CLI scripts: console output and numeric literals are intentional
    files: ["scripts/**"],
    rules: {
      "no-console": "off",
      "no-magic-numbers": "off"
    }
  },
  {
    // images.ts is the single source of truth for rendition widths — the array literal IS the constant definition
    files: ["src/lib/images.ts"],
    rules: {
      "no-magic-numbers": "off"
    }
  },
  {
    rules: {
      curly: ["error", "all"],
      "prefer-template": "error",
      "no-continue": "error",
      "sonarjs/cognitive-complexity": ["error", COGNITIVE_COMPLEXITY_LIMIT],
      "sonarjs/elseif-without-else": "error"
    }
  }
);
