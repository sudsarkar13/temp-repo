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
import WorkSliderBtns from "@/components/buttons/WorkSliderBtns";

const projects = [
	{
		num: "01",
		category: "Ubuntu",
		title: "Lenovo Dark Grub 4K",
		description:
			"A shellscript tool to seamlessly setup a fully optimized Ubuntu Desktop for web development.",
		stack: [{ name: "Ubuntu" }, { name: "GRUB" }, { name: "Open Source" }],
		image: "/assets/projects/p1.png",
		live: "https://www.gnome-look.org/p/1941975",
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
			{ name: "Setup Tool" },
			{ name: "Open Source" },
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
		live: "https://dreach.in",
		github: "",
	},
	{
		num: "04",
		category: "Full Stack",
		title: "Portfolio Website",
		description:
			"A personal portfolio website built with Next.js, Shadcn, and Tailwind CSS.",
		stack: [{ name: "Next.js" }, { name: "Shadcn" }, { name: "Tailwind CSS" }],
		image: "/assets/projects/p4.png",
		live: "https://sudeeptasarkar.in",
		github: "https://github.com/sudsarkar13/personal-portfolio",
	},
];

const WorkPage: React.FC = () => {
	const [project, setProject] = useState(projects[0]);
	const handleSlideChange = (swiper: any) => {
		// get current slide index
		const currentIndex = swiper.activeIndex;
		// update project state based on current slide index
		setProject(projects[currentIndex]);
	};
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
			}}
			className={`min-h-[80vh] flex flex-col justify-center py-12 xl:px-0`}>
			<div className={`container mx-auto`}>
				<div className={`flex flex-col xl:flex-row gap-4 xl:gap-[30px]`}>
					<div
						className={`w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none`}>
						<div className={`flex flex-col gap-[30px] h-[50%]`}>
							{/* outline num */}
							<div
								className={`text-6xl xl:text-8xl leading-none font-extrabold text-transparent text-outline`}>
								{project.num}
							</div>
							{/* project category */}
							<div className={`flex flex-col gap-2`}>
								<h1
									className={`order-2 text-[30px] xl:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500`}>
									{project.title}
								</h1>
								<h2
									className={`order-1 text-[16px] xl:text-[18px] font-bold leading-none text-white/60 group-hover:text-accent transition-all duration-500`}>
									{project.category} Project
								</h2>
							</div>
							{/* project description */}
							<p className={`text-white/60 `}>{project.description}</p>
							{/* stack */}
							<ul className={`flex flex-wrap gap-4`}>
								{project.stack.map((item, index) => {
									return (
										<li
											key={index}
											className={`text-md md:text-xl text-accent`}>
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
											<TooltipTrigger
												className={`w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group`}>
												<ArrowUpRight
													className={`text-white text-3xl group-hover:text-accent`}
												/>
											</TooltipTrigger>
											<TooltipContent>
												<p>Live Project</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Link>
								{/* github project button */}
								<Link href={project.github}>
									<TooltipProvider delayDuration={100}>
										<Tooltip>
											<TooltipTrigger
												className={`w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group`}>
												<Github
													className={`text-white text-3xl group-hover:text-accent`}
												/>
											</TooltipTrigger>
											<TooltipContent>
												<p>Github Repository</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</Link>
							</div>
						</div>
					</div>
					<div className={`w-full xl:w-[50%]`}>
						<Swiper
							spaceBetween={30}
							slidesPerView={1}
							className={`xl:h-[520px] mb-12`}
							onSlideChange={handleSlideChange}>
							{projects.map((project, index) => {
								return (
									<SwiperSlide key={index} className={`w-full`}>
										<div
											className={`h-[320px] md:h-[460px] relative group flex justify-center items-center bg-pink-50/5`}>
											{/* overlay */}
											<div
												className={`absolute top-0 bottom-0 w-full h-full bg-black/10 z-10`}></div>
											{/* image */}
											<div className={`relative w-full h-full`}>
												<Image
													src={project.image}
													alt={project.title}
													fill
													className={`object-contain`}
												/>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
							{/* Slider Buttons */}
							<WorkSliderBtns
								containerStyles={`flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none`}
								btnStyles={`bg-accent hover:bg-accent-hover text-primary text-[22px] w-[35px] h-[35px] flex justify-center items-center rounded-full shadow-lg transition-all duration-500`}
								iconStyles={`text-3xl`}
							/>
						</Swiper>
					</div>
				</div>
			</div>
		</motion.section>
	);
};

export default WorkPage;
