import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import PageTransition from "@/components/page/PageTransition";
import StairTransition from "@/components/page/StairTransition";

const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
	variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
	title: "Sudeepta Sarkar | Portfolio",
	description: "Sudeepta Sarkar's Portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${jetBrainsMono.variable} antialiased`}
				suppressHydrationWarning>
				<Header />
				<StairTransition />
				<PageTransition>{children}</PageTransition>
			</body>
		</html>
	);
}
