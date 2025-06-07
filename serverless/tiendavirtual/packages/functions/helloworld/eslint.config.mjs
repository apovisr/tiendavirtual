import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.ts", "tests/**/*.ts"],
  },
  {
    ignores: ["node_modules/**/*", "build/**/*", "coverage/**/*", "jest.config.js"],
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];