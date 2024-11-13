"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowUpRight, Github } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";

const projects = [
	{
		num: "01",
		category: "Ubuntu",
		title: "Lenovo Dark Grub 4K",
		description:
			"A shellscript tool to seamlessly setup a fully optimized Ubuntu Desktop for web development.",
		stack: [{ name: "Ubuntu" }, { name: "Shellscript" }],
		image: "/assets/projects/p1.png",
		live: "",
		github: "https://github.com/sudsarkar13/Lenovo-dark-grub-4k-ubuntu",
	},
	{
		num: "02",
		category: "Ubuntu",
		title: "Ultimate Ubuntu Setup for Web Developers",
		description:
			"A shellscript tool to seamlessly setup a fully optimized Ubuntu Desktop for web development.",
		stack: [
			{ name: "Ubuntu" },
			{ name: "Shellscript" },
			{ name: "Web Development" },
		],
		image: "/assets/projects/p2.png",
		live: "",
		github:
			"https://github.com/sudsarkar13/Ultimate-Ubuntu-Setup-for-Web-Developers",
	},
	{
		num: "03",
		category: "Frontend",
		title: "Dr. Reach - Healthunity Solutions Pvt. Ltd.",
		description: "A website for consulting and booking appointments.",
		stack: [{ name: "Next.Js" }, { name: "Tailwind CSS" }, { name: "Shadcn" }],
		image: "/assets/projects/p3.png",
		live: "",
		github: "",
	},
	{
		num: "04",
		category: "Frontend",
		title: "Portfolio Website",
		description:
			"A personal portfolio website built with Next.js, Shadcn, and Tailwind CSS.",
		stack: [{ name: "Next.js" }, { name: "Shadcn" }, { name: "Tailwind CSS" }],
		image: "/assets/projects/p4.png",
		live: "",
		github: "https://github.com/sudsarkar13/personal-portfolio",
	},
];

const WorkPage: React.FC = () => {
	const [project, setProject] = useState(projects[0]);
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className={`min-h-[80vh] flex flex-col justify-center py-12 xl:px-0`}>
			<div className={`container mx-auto`}>
				<div className={`flex flex-col xl:flex-row gap-4 xl:gap-[30px]`}>
					<div
						className={`w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none`}>
						<div className={`flex flex-col gap-[30px] h-[50%]`}>
							{/* outline num */}
							<div
								className={`text-8xl leading-none font-extrabold text-transparent text-outline`}>
								{project.num}
							</div>
							{/* project category */}
							<h2
								className={`text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500`}>
								{project.category} Project
							</h2>
							{/* project description */}
							<p className={`text-white/60 `}>{project.description}</p>
							{/* stack */}
							<ul className={`flex gap-4`}>
								{project.stack.map((item, index) => {
									return (
										<li key={index} className={`text-xl text-accent`}>
											{item.name}
											{index !== project.stack.length - 1 && ","}
										</li>
									);
								})}
							</ul>
							{/* border */}
							<div className={`border border-white/20`}></div>
							{/* buttons */}
							<div className={`flex items-center gap-4`}>
                {/* live project button */}
								<Link href={project.live}>
									<TooltipProvider delayDuration={100}>
										<Tooltip>
											<TooltipTrigger className={`w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group`}>
												<ArrowUpRight className={`text-white text-3xl group-hover:text-accent`} />
                      </TooltipTrigger>
                      <TooltipContent><p>Live Project</p></TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Link>
                {/* github project button */}
								<Link href={project.github}>
									<TooltipProvider delayDuration={100}>
										<Tooltip>
											<TooltipTrigger className={`w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group`}>
												<Github className={`text-white text-3xl group-hover:text-accent`} />
                      </TooltipTrigger>
                      <TooltipContent><p>Github Repository</p></TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Link>
							</div>
						</div>
					</div>
					<div className={`w-full xl:w-[50%]`}>slider</div>
				</div>
			</div>
		</motion.section>
	);
};

export default WorkPage;
