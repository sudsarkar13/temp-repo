"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Code2, GraduationCap, User } from "lucide-react";
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// Automate Experience Year/Month Increment function.
const startDate = new Date(2024, 3); // March 2024
const currentDate = new Date();

// Calculates years and months of experience
// Returns formatted string like "2+ Years 3 Months" or "5 Months"

const calculateExperience = () => {
	const years = currentDate.getFullYear() - startDate.getFullYear();
	const months = currentDate.getMonth() - startDate.getMonth();

	let totalMonths = years * 12 + months;
	if (totalMonths < 0) totalMonths += 12;

	// If less than 12 months, show only months
	if (totalMonths < 12) {
		return `${totalMonths} Months`;
	}

	// If 12 months or more, show years and months
	const experienceYears = Math.floor(totalMonths / 12);
	const experienceMonths = totalMonths % 12;

	return `${experienceYears}+ Years${
		experienceMonths > 0 ? ` ${experienceMonths} Months` : ""
	}`;
};

// About data
const about = {
	icon: <User className={`w-10 h-10`} />,
	title: "About Me",
	description:
		"Frontend developer with an eye for detail and a passion for creating beautiful, intuitive user interfaces. Committed to crafting pixel-perfect experiences while staying current with emerging frontend trends and best practices.",
	info: [
		{
			fieldName: "Name:",
			fieldValue: "Sudeepta Sarkar",
		},
		{
			fieldName: "Email:",
			fieldValue: "sudsarkar13@gmail.com",
		},
		{
			fieldName: "Phone:",
			fieldValue: "+91 7504614781",
		},
		{
			fieldName: "Experience:",
			fieldValue: calculateExperience(),
		},
		{
			fieldName: "Company:",
			fieldValue: "Healthunity Solutions Pvt Ltd",
		},
		{
			fieldName: "Designation:",
			fieldValue: "CTO",
		},
		{
			fieldName: "Nationality:",
			fieldValue: "Indian",
		},
		{
			fieldName: "Freelance:",
			fieldValue: "Available",
		},
		{
			fieldName: "Languages:",
			fieldValue: "Bengali, English, Hindi, Odia",
		},
	],
};

// Experience Data
const experience = {
	icon: <Briefcase className={`w-10 h-10`} />,
	title: "My Experience",
	description:
		"My professional journey spans diverse roles in software development, from hands-on system engineering to technical leadership. I bring a blend of technical expertise and strategic thinking to deliver innovative solutions that drive business growth.",
	items: [
		{
			company: "Healthunity Solutions Pvt Ltd",
			position: "CTO",
			duration: "Jun 2024 - Present",
		},
		{
			company: "Healthunity Solutions Pvt Ltd",
			position: "Frontend Developer",
			duration: "Mar 2024 - May 2024",
		},
		{
			company: "ProU Education",
			position: "Campus Ambassador, KIIT University",
			duration: "Apr 2023 - Nov 2023",
		},
		{
			company: "Freelance",
			position: "System Engineer",
			duration: "May 2018 - Apr 2023",
		},
	],
};

// Education Data
const education = {
	icon: <GraduationCap className={`w-10 h-10`} />,
	title: "My Education",
	description:
		"My educational journey has been a journey of self-discovery and growth, and I am grateful for every opportunity I have had to learn and grow.",
	items: [
		{
			institution: "KIIT University, Bhubaneswar, Odisha",
			degree: "B.Tech in CSE",
			duration: "2021 - 2024",
		},
		{
			institution: "KIIT Polytechnic, Bhubaneswar, Odisha",
			degree: "Diploma in CSE",
			duration: "2018 - 2021",
		},
		{
			institution: "D.A.V. Public School, CDA, Bidanasi, Cuttack, Odisha",
			degree: "9th & Matriculation",
			duration: "2014 - 2016",
		},
		{
			institution: "D.A.V. Public School, Rajabagicha, Cuttack, Odisha",
			degree: "Nursery - 8th",
			duration: "2004 - 2014",
		},
	],
};

// Skills Data
const skills = {
	icon: <Code2 className={`w-10 h-10`} />,
	title: "My Skills",
	description:
		"Mastering the art of coding with a diverse tech stack - where creativity meets functionality. Each skill represents a tool in my arsenal for crafting exceptional digital experiences.",
	skillList: [
		{
			icon: <FaHtml5 />,
			name: "HTML",
		},
		{
			icon: <FaCss3 />,
			name: "CSS",
		},
		{
			icon: <FaJs />,
			name: "JavaScript",
		},
		{
			icon: <FaReact />,
			name: "React Js",
		},
		{
			icon: <FaNodeJs />,
			name: "Node Js",
		},
		{
			icon: <SiMongodb />,
			name: "MongoDB",
		},
		{
			icon: <SiTailwindcss />,
			name: "Tailwind CSS",
		},
		{
			icon: <SiNextdotjs />,
			name: "Next Js",
		},
	],
};

const ResumePage: React.FC = () => {
	return (
		<main>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
				}}
				className={`min-h-[80vh] flex items-center justify-center py-12 xl:py-0`}>
				<div className={`container mx-auto`}>
					<Tabs
						defaultValue="about"
						className={`flex flex-col lg:flex-row gap-[60px]`}>
						<TabsList
							className={`flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6`}>
							<TabsTrigger value="about">About Me</TabsTrigger>
							<TabsTrigger value="education">Education</TabsTrigger>
							<TabsTrigger value="experience">Experience</TabsTrigger>
							<TabsTrigger value="skills">Skills</TabsTrigger>
						</TabsList>

						{/* content */}
						<div className={`min-h-[70vh] w-full`}>
							{/* About */}
							<TabsContent
								value="about"
								className={`w-full text-center xl:text-left`}>
								<div className={`flex flex-col gap-[30px] `}>
									<div
										className={`flex flex-col lg:flex-row items-center gap-8 text-4xl`}>
										<span className={`text-accent`}>{about.icon}</span>
										<h3 className={`font-bold`}>{about.title}</h3>
									</div>
									<p className={`max-w-[600px] text-white/60 mx-auto xl:mx-0`}>
										{about.description}
									</p>
									<ul
										className={`grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0`}>
										{about.info.map((item, index) => {
											return (
												<li
													key={index}
													className={`flex items-center justify-center xl:justify-start gap-4`}>
													<span className={`text-white/60`}>
														{item.fieldName}
													</span>
													<span className={`text-md leading-snug`}>
														{item.fieldValue}
													</span>
												</li>
											);
										})}
									</ul>
								</div>
							</TabsContent>
							{/* Education */}
							<TabsContent value="education" className={`w-full`}>
								<div
									className={`flex flex-col gap-[30px] text-center xl:text-left`}>
									<div
										className={`flex flex-col lg:flex-row items-center gap-8 text-4xl`}>
										<span className={`text-accent`}>{education.icon}</span>
										<h3 className={`font-bold`}>{education.title}</h3>
									</div>
									<p className={`max-w-[650px] text-white/60 mx-auto xl:mx-0 `}>
										{education.description}
									</p>
									<ScrollArea className={`h-[400px]`}>
										<ul
											className={`grid grid-cols-1 lg:grid-cols-2 gap-[30px]`}>
											{education.items.map((item, index) => {
												return (
													<li
														key={index}
														className={`bg-[#232329] h-[184px] py-6 px-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1`}>
														<span className={`text-accent`}>
															{item.duration}
														</span>
														<h3
															className={`text-xl max-w-[260px] min-h-[60px] text-center lg:text-left`}>
															{item.degree}
														</h3>
														<div className={`flex items-center gap-3`}>
															{/* dot */}
															<span
																className={`w-[6px] h-[6px] bg-accent rounded-full animate-pulse`}></span>
															<p className={`text-white/60`}>
																{item.institution}
															</p>
														</div>
													</li>
												);
											})}
										</ul>
									</ScrollArea>
								</div>
							</TabsContent>
							{/* Experience */}
							<TabsContent value="experience" className={`w-full`}>
								<div
									className={`flex flex-col gap-[30px] text-center xl:text-left`}>
									<div
										className={`flex flex-col lg:flex-row items-center gap-8 text-4xl`}>
										<span className={`text-accent`}>{experience.icon}</span>
										<h3 className={`font-bold`}>{experience.title}</h3>
									</div>
									<p className={`max-w-[650px] text-white/60 mx-auto xl:mx-0 `}>
										{experience.description}
									</p>
									<ScrollArea className={`h-[400px]`}>
										<ul
											className={`grid grid-cols-1 lg:grid-cols-2 gap-[30px]`}>
											{experience.items.map((item, index) => {
												return (
													<li
														key={index}
														className={`bg-[#232329] h-[184px] py-6 px-6 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1`}>
														<span className={`text-accent`}>
															{item.duration}
														</span>
														<h3
															className={`text-xl max-w-[260px] min-h-[60px] text-center lg:text-left`}>
															{item.position}
														</h3>
														<div className={`flex items-center gap-3`}>
															{/* dot */}
															<span
																className={`w-[6px] h-[6px] bg-accent rounded-full animate-pulse`}></span>
															<p className={`text-white/60`}>{item.company}</p>
														</div>
													</li>
												);
											})}
										</ul>
									</ScrollArea>
								</div>
							</TabsContent>
							{/* Skills */}
							<TabsContent value="skills" className={`w-full h-full`}>
								<div className={`flex flex-col gap-[30px]`}>
									<div
										className={`flex flex-col gap-[30px] text-center xl:text-left`}>
										<div
											className={`flex flex-col lg:flex-row items-center gap-8 text-4xl`}>
											<span className={`text-accent`}>{skills.icon}</span>
											<h3 className={`font-bold`}>{skills.title}</h3>
										</div>
										<p
											className={`max-w-[600px] text-white/60 mx-auto xl:mx-0`}>
											{skills.description}
										</p>
									</div>
									<ul
										className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]`}>
										{skills.skillList.map((skill, index) => {
											return (
												<li key={index}>
													<TooltipProvider delayDuration={100}>
														<Tooltip>
															<TooltipTrigger
																className={`w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group`}>
																<div
																	className={`text-6xl group-hover:text-accent transition-all duration-300`}>
																	{skill.icon}
																</div>
															</TooltipTrigger>
															<TooltipContent>
																<p className={``}>{skill.name}</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												</li>
											);
										})}
									</ul>
								</div>
							</TabsContent>
						</div>
					</Tabs>
				</div>
			</motion.div>
		</main>
	);
};

export default ResumePage;
