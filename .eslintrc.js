module.exports = {
	extends: ["eslint-config-codely/typescript"],
	parserOptions: {
		project: ["./tsconfig.json", "./tsconfig.app.json"],
	},
	rules: {
		"@typescript-eslint/no-non-null-assertion": "off",
	},
	settings: {
		"import/resolver": {
			node: {
				paths: ["src"],
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		},
	},
	overrides: [
		{
			files: ["*.js", "*.ts"],
			rules: {
				"@typescript-eslint/no-unsafe-assignment": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-argument": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-var-requires": "off",
				"@typescript-eslint/no-unsafe-enum-comparison": "off",
			},
		},
		{
			files: ["*.ts"],
			rules: {
				"@typescript-eslint/unbound-method": "off",
				"@typescript-eslint/no-unnecessary-condition": "off",
				"import/no-unresolved": "off",
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/no-misused-promises": [
					"error",
					{
						checksVoidReturn: false,
					},
				],
			},
		},
	],
};
