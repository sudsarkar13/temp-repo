"use client";

import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getGithubCommitCount } from "@/utils/github";

const Stats: React.FC = () => {
	const [commitCount, setCommitCount] = useState<number>(0);

	useEffect(() => {
		const fetchCommits = async () => {
			// Replace 'your-github-username' with your actual GitHub username
			const count = await getGithubCommitCount("sudsarkar13");
			setCommitCount(count);
		};

		fetchCommits();
	}, []);

	const stats = [
		{
			num: 2,
			text: "Years of Experience",
		},
		{
			num: 5,
			text: "Projects Completed",
		},
		{
			num: 5,
			text: "Technologies Hands On Experience",
		},
		{
			num: commitCount,
			text: "GitHub Commits",
		},
	];

	return (
		<main className={`container mx-auto`}>
			<div className={`flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none`}>
				{stats.map((stat, index) => {
					return (
						<div key={index} className={``}>
							<CountUp
								end={stat.num}
								duration={5}
								delay={2}
								className={`text-4xl xl:text-6xl font-extrabold`}
							/>
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default Stats;
