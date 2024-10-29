"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Stairs from "./Stairs";

const PageTransition: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const pathname = usePathname();
	return (
		<main>
			<AnimatePresence mode="wait">
				<div key={pathname}>
					<motion.div
						initial={{ opacity: 1 }}
						animate={{
							opacity: 0,
							transition: { delay: 1, duration: 0.4, ease: "easeInOut" },
						}}
						className={`h-screen w-screen fixed bg-primary top-0 pointer-events-none`}
					/>
					<Stairs />
					{children}
				</div>
			</AnimatePresence>
		</main>
	);
};

export default PageTransition;
