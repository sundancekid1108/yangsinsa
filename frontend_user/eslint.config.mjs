import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,jsx}"]},
  {languageOptions: { globals: globals.browser }},
  {
    rules: {
      "no-console": "error",
      "no-unused-vars": "error",
      "no-undef": "error"
    }
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];