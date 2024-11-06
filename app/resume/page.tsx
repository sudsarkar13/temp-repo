"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, Code2, GraduationCap } from "lucide-react";
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

const calculateExperience = () => {
	const years = currentDate.getFullYear() - startDate.getFullYear();
	const months = currentDate.getMonth() - startDate.getMonth();

	let totalMonths = years * 12 + months;
	if (totalMonths < 0) totalMonths += 12;

	const experienceYears = Math.floor(totalMonths / 12);
	const experienceMonths = totalMonths % 12;

	return `${experienceYears}+ Years${
		experienceMonths > 0 ? ` ${experienceMonths} Months` : ""
	}`;
};

// About data
const data = {
	title: "About Me",
	description:
		"I am a full stack developer with a passion for creating web applications that are both functional and aesthetically pleasing. I have experience with a variety of programming languages and frameworks, including JavaScript, React, Node.js, and MongoDB. I am a quick learner and always looking for new challenges to tackle.",
	info: [
		{
			fieldName: "Name",
			fieldValue: "Sudeepta Sarkar",
		},
		{
			fieldName: "Email",
			fieldValue: "sudsarkar13@gmail.com",
		},
		{
			fieldName: "Phone",
			fieldValue: "+91 7504614781",
		},
		{
			fieldName: "Address",
			fieldValue: "P.C. Sarkar Lane, Arunodaya Nagar, Cuttack, Odisha, India",
		},
		{
			fieldName: "LinkedIn",
			fieldValue: "https://www.linkedin.com/in/sudeepta-sarkar",
		},
		{
			fieldName: "Github",
			fieldValue: "https://github.com/sudsarkar13",
		},
		{
			fieldName: "Experience",
			fieldValue: calculateExperience(),
		},
		{
			fieldName: "Nationality",
			fieldValue: "Indian",
		},
		{
			fieldName: "Freelance",
			fieldValue: "Available",
		},
		{
			fieldName: "Languages",
			fieldValue: "Bengali, English, Hindi, Odia",
		},
	],
};

// Experience Data
const experience = {
	icon: <Briefcase />,
	title: "My Experience",
	description:
		"Seeking a position in a company where I can launch my career, make the best use of my potential, and contribute to the company’s growth. A highly motivated individual with the ability to work well in groups as well as manage tasks individually within tight time frames when needed.",
	items: [
		{
			company: "Healthunity Solutions Pvt Ltd",
			position: "CTO",
			role: "Frontend Developer Lead",
			duration: "2024 - Present",
		},
	],
};

// Education Data
const education = {
	icon: <GraduationCap />,
	title: "My Education",
	description: "",
	items: [
		{
			institution:
				"Kalinga Institute of Industrial Technology - KIIT University, Bhubaneswar, Odisha",
			degree: "B.Tech in Computer Science and Engineering",
			duration: "2021 - 2024",
		},
		{
			institution: "KIIT Polytechnic, Bhubaneswar, Odisha",
			degree: "Diploma in Computer Science and Engineering",
			duration: "2018 - 2021",
		},
		{
			institution: "D.A.V. Public School, CDA, Bidanasi, Cuttack, Odisha",
			degree: "Matriculation",
			duration: "2016 - 2017",
		},
	],
};

// Skills Data
const skills = {
	icon: <Code2 />,
	title: "My Skills",
	description: "",
	item: [
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
							<TabsContent value="about" className={`w-full`}>About Me</TabsContent>
							{/* Education */}
							<TabsContent value="education" className={`w-full`}>Education</TabsContent>
							{/* Experience */}
							<TabsContent value="experience" className={`w-full`}>Experience</TabsContent>
							{/* Skills */}
							<TabsContent value="skills" className={`w-full`}>Skills</TabsContent>
						</div>
					</Tabs>
				</div>
			</motion.div>
		</main>
	);
};

export default ResumePage;
