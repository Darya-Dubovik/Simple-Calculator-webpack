import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: ["js/recommended", eslintConfigPrettier],
    plugins: { js, prettier: prettierPlugin },
    languageOptions: { globals: globals.browser },
    ignores: [
      "dist/**",
      "node_modules/**",
      "webpack.config.cjs",
      "*.config.js",
    ],
  },
  {
    rules: {
      "no-unused-vars": "warn",
      eqeqeq: "error",
      "no-undef": "warn",
      "no-console": "error",
    },
  },
]);
