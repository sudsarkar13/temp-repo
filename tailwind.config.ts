import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./node_modules/flowbite/**/*.js",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"node_modules/flowbite-react/lib/esm/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "976px",
			xl: "1440px",
			"2xl": "1536px",
		},
		extend: {
			// backgroundImage: {
			// 	"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			// 	"gradient-conic":
			// 		"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			// },
			container: {
				center: true,
				padding: "15px",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
export default config;
