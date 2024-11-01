"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getGithubStats } from "@/utils/github";
import { motion } from "framer-motion";
import { username } from "@/utils/github";

const Stats: React.FC = () => {
	const [githubStats, setGithubStats] = useState({
		commitCount: 0,
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
				commitCount: stats.totalCommits,
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

	const stats = [
		{
			num: 2,
			text: "Years of Experience",
		},
		{
			num: 4,
			text: "Projects Completed",
		},
		{
			num: 5,
			text: "Technologies Hands On Experience",
		},
		{
			num: githubStats.commitCount,
			text: "GitHub Commits",
			loading: isLoading,
		},
	];

	return (
		<main>
			<section className={`pt-4 pb-12 xl:pt-0 xl:pb-0`}>
				<div className={`container mx-auto`}>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: { delay: 2, duration: 0.4, ease: "easeIn" },
						}}
						className={`flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none pb-4`}>
						{stats.map((stat, index) => {
							return (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{
										opacity: 1,
										transition: {
											delay: 2.4,
											duration: 0.4,
											ease: "easeInOut",
										},
									}}
									key={index}
									className={`flex-1 flex gap-4 items-center justify-center xl:justify-start`}>
									<div className="relative">
										<CountUp
											end={stat.num}
											duration={2}
											delay={0}
											className={`text-4xl xl:text-6xl font-extrabold`}
										/>
										{stat.loading && (
											<span className="absolute top-4 md:-top-4 -right-28 md:-right-24 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
										)}
									</div>
									<p
										className={`${
											stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
										} leading-snug text-white/80`}>
										{stat.text}
									</p>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</section>
		</main>
	);
};

export default Stats;
