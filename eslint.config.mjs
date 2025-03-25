import * as TypeScriptEslintParser from "@typescript-eslint/parser";
import TypescriptEslint from "@typescript-eslint/eslint-plugin";
import Prettier from "eslint-plugin-prettier";
import EslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules", "dist"], // Ignore these folders
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: TypeScriptEslintParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": TypescriptEslint,
      prettier: Prettier,
    },
    rules: {
      ...EslintConfigPrettier.rules, // Disables conflicting ESLint rules with Prettier
      "prettier/prettier": "error", // Runs Prettier as an ESLint rule
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "warn",
    },
  },
];
