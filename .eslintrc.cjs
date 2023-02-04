const config = require("@vangware/configs/.eslintrc.cjs");

module.exports = {
	...config,
	rules: {
		...config.rules,
		// FIXME: Rule is completely broken for now, check later
		"@typescript-eslint/require-await": "off",
	},
};
