import configs from "@vangware/configs/eslint.config.js";

export default [
	...configs,
	{
		rules: {
			// FIXME: Rule is completely broken for now, check later
			"@typescript-eslint/require-await": "off",
		},
	},
];
