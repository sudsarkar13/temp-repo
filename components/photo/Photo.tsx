"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import { getGithubStats } from "@/utils/github";
import { Github } from "lucide-react";
import { username } from "@/utils/github";

const Photo: React.FC = () => {
	const [githubStats, setGithubStats] = useState({
		collaborations: 0,
		joinedYear: new Date().getFullYear(),
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchStats = async () => {
		try {
			setIsLoading(true);
			// Add type check for username before calling API
			if (!username) {
				throw new Error("Username is required");
			}
			const stats = await getGithubStats(username);
			setGithubStats({
				collaborations: stats.collaborations,
				joinedYear: stats.joinedYear,
			});
		} catch (error) {
			// console.error("Error fetching GitHub stats:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchStats();
		const intervalId = setInterval(fetchStats, 10000);
		return () => clearInterval(intervalId);
	}, []);

	const currentYear = new Date().getFullYear();
	const yearsOnGitHub = currentYear - githubStats.joinedYear;

	const stats = [
		{
			num: yearsOnGitHub,
			text: `Years on GitHub (Since ${githubStats.joinedYear})`,
			loading: isLoading,
		},
		{
			num: githubStats.collaborations,
			text: "Collaborations",
			loading: isLoading,
		},
	];

	return (
		<main>
			<div className={`w-full h-full relative`}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 2, duration: 0.4, ease: "easeIn" },
					}}>
					{/* image */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
						}}
						className={`w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute`}>
						<Image
							src={"/assets/images/Sudeepta.png"}
							alt="Sudeepta Sarkar"
							priority
							quality={100}
							fill
							className={`object-contain rounded-full backdrop:blur-xl`}
						/>
					</motion.div>
				</motion.div>
				{/* circle */}
				<motion.svg
					className={`w-[300px] h-[300px] xl:w-[506px] xl:h-[506px]`}
					fill="transparent"
					viewBox={"0 0 506 506"}
					xmlns={"http://www.w3.org/2000/svg"}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 2, duration: 0.4, ease: "easeIn" },
					}}>
					<motion.circle
						cx={"253"}
						cy={"253"}
						r={"250"}
						stroke={"#00ff99"}
						strokeWidth={"4"}
						strokeLinecap={"round"}
						strokeLinejoin={"round"}
						initial={{ opacity: 0, strokeDasharray: "24 10 0 0" }}
						animate={{
							opacity: 100,
							strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
							rotate: [120, 360],
						}}
						transition={{
							duration: 20,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					/>
				</motion.svg>
				{/* Github Hover Card */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 2, duration: 0.4, ease: "easeIn" },
					}}
					className="absolute -bottom-2 -md:bottom-24 lg:bottom-0 -right-6 md:-right-24 lg:-right-24 p-2 sm:p-2 lg:p-4 rounded-xl backdrop-blur-sm bg-black/20 
						shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/10 
						w-[240px] sm:w-[260px] lg:w-[280px] xl:w-[400px]">
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
						}}
						className="flex flex-col gap-1.5 sm:gap-3">
						<div className="flex items-center mb-1 sm:mb-2">
							<Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-white/70" />
						</div>
						{stats.map((stat, index) => {
							return (
								<div
									key={index}
									className="flex items-center">
									<div className="w-full">
										<div className="flex flex-row gap-1.5 xl:gap-6 items-center justify-between">
											<CountUp
												end={stat.num}
												duration={2}
												delay={0}
												className="text-2xl xl:text-6xl font-extrabold text-white/90"
											/>
											{stat.loading && (
												<span className="absolute top-[12px] right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
											)}
											<p className="text-white/70 flex-1 text-right text-xs xl:text-base leading-snug">
												{stat.text}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</motion.div>
				</motion.div>
			</div>
		</main>
	);
};

export default Photo;
