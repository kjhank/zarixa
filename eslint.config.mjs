import globals from 'globals';
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ["**/*.html"],
}, ...compat.extends("airbnb-base", "airbnb-typescript/base"), {
  languageOptions: {
    globals: {
      ...globals.browser,
    },

    ecmaVersion: "latest",
    sourceType: "module",

    parserOptions: {
      project: "./tsconfig.json",
    },
  },

  rules: {
    "import/prefer-default-export": "off",

    "import/no-extraneous-dependencies": ["error", {
      devDependencies: true,
    }],
  },
}];