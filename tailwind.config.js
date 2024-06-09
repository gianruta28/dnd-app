/** @type {import("tailwindcss").Config} */
module.exports = {
	content: ["./src/**/*.{html,ts}"],
	theme: {
		extend: {
			colors: {
				red50: "rgba(185,28,28, 0.9)",
			},
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
