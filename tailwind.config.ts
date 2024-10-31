import type { Config } from "tailwindcss";
import TailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "15px",
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "960px",
			xl: "1200px",
		},
		fontFamily: {
			primary: "var(--font-jetbrains-mono)",
		},
		extend: {
			colors: {
				primary: "#1c1c22",
				accent: {
					DEFAULT: "#00ff99",
					hover: "#00e187",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
				typewriter: {
					to: {
						left: "100%",
					},
				},
				blink: {
					"0%": {
						opacity: "0",
					},
					"0.1%": {
						opacity: "1",
					},
					"50%": {
						opacity: "1",
					},
					"50.1%": {
						opacity: "0",
					},
					"100%": {
						opacity: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				typewriter: "typewriter 2s steps(11) forwards",
				caret:
					"typewriter 2s steps(11) forwards, blink 1s steps(11) infinite 2s",
			},
		},
	},
	plugins: [TailwindcssAnimate],
};
export default config;
