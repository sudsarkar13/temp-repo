"use client";

import React from 'react';
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { Project } from '@/types/project';
import { motion } from "framer-motion";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
        <p className={`text-white/60`}>{project.description}</p>
        {/* stack */}
        <ul className={`flex flex-wrap gap-4`}>
          {project.stack.map((item, index) => (
            <li
              key={index}
              className={`text-md md:text-xl text-accent`}>
              {item.name}
              {index !== project.stack.length - 1 && ","}
            </li>
          ))}
        </ul>
      </div>
      {/* buttons */}
      <div className={`flex flex-col gap-4`}>
        {/* links */}
        <div className={`flex gap-[30px] mt-4`}>
          {project.live && (
            <Link
              href={project.live}
              target="_blank"
              className={`flex items-center gap-2 text-white hover:text-accent transition-all duration-300`}>
              <ArrowUpRight />
              <span>Live</span>
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className={`flex items-center gap-2 text-white hover:text-accent transition-all duration-300`}>
              <Github />
              <span>Code</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
