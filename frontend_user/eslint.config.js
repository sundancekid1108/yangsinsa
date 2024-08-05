import globals from "globals";
import pluginReact from "eslint-plugin-react";

export default [
	js.configs.recommended,
	{ files: ["**/*.{js,mjs,cjs,jsx}"] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginReact.configs.flat.recommended,
	{
		extends: ["airbnb"],
	},
];
