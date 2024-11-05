"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Briefcase, GraduationCap } from "lucide-react";
import { FaHtml5, FaCss3, FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiNextdotjs } from "react-icons/si";

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
			institution: "Kalinga Institute of Industrial Technology - KIIT University, Bhubaneswar, Odisha",
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

const ResumePage: React.FC = () => {
	return (
		<main>
			<div>Resume Page</div>
		</main>
	);
};

export default ResumePage;
