"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import ProjectSlider from "@/components/work/ProjectSlider";
import Loading from "@/components/loading/loading";
import { Project } from "@/types/project";

const WorkPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        if (data.length > 0) {
          setCurrentProject(data[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSlideChange = (index: number) => {
    if (projects[index]) {
      setCurrentProject(projects[index]);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Failed to load projects</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No projects available</h3>
        </div>
      </div>
    );
  }

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
                {currentProject.num}
              </div>
              {/* project category */}
              <div className={`flex flex-col gap-2`}>
                <h1
                  className={`order-2 text-[30px] xl:text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500`}>
                  {currentProject.title}
                </h1>
                <h2
                  className={`order-1 text-[16px] xl:text-[18px] font-bold leading-none text-white/60 group-hover:text-accent transition-all duration-500`}>
                  {currentProject.category} Project
                </h2>
              </div>
              {/* project description */}
              <p className={`text-white/60`}>{currentProject.description}</p>
              {/* stack */}
              <ul className={`flex flex-wrap gap-4`}>
                {currentProject.stack.map((item, index) => (
                  <li
                    key={index}
                    className={`text-md md:text-xl text-accent`}>
                    {item.name}
                    {index !== currentProject.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
            </div>
            {/* buttons */}
            <div className={`flex flex-col gap-4`}>
              {/* links */}
              <div className={`flex gap-[30px] mt-4`}>
                {currentProject.live && (
                  <Link
                    href={currentProject.live}
                    target="_blank"
                    className={`flex items-center gap-2 text-white hover:text-accent transition-all duration-300`}>
                    <ArrowUpRight />
                    <span>Live</span>
                  </Link>
                )}
                {currentProject.github && (
                  <Link
                    href={currentProject.github}
                    target="_blank"
                    className={`flex items-center gap-2 text-white hover:text-accent transition-all duration-300`}>
                    <Github />
                    <span>Code</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* image */}
          <div className={`w-full xl:w-[50%] order-1 xl:order-none`}>
            <ProjectSlider projects={projects} onSlideChange={handleSlideChange} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkPage;
