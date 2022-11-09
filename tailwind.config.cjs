/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		colors: {
			darkBrown: "#594545",
			brown: "#815B5B",
			lightBrown: "#9E7676",
			offWhite: "#FFF8EA",
			white: "#fff",
			black: "#000",
			transparent: "transparent",
		},
		fontFamily: {
			sans: ["Ubuntu", "sans-serif"],
		},
		extend: {},
	},
	plugins: [],
};
