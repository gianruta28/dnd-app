/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			colors: {},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("tailwindcss"),
		require("autoprefixer"),
		function ({ addUtilities }) {
			const newUtilities = {
				".number-input::-webkit-inner-spin-button": {
					"-webkit-appearance": "none",
					margin: "0",
				},
				".number-input::-webkit-outer-spin-button": {
					"-webkit-appearance": "none",
					margin: "0",
				},
				".number-input": {
					"-moz-appearance": "textfield",
				},
			};
			addUtilities(newUtilities);
		},
	],
};
