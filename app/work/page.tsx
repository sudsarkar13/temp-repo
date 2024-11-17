"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/buttons/WorkSliderBtns";
import Loading from "@/components/loading/loading";

// Types for our project data
interface ProjectStack {
  name: string;
}

interface Project {
  _id: string;
  num: string;
  category: string;
  title: string;
  description: string;
  stack: ProjectStack[];
  image: string;
  live: string;
  github: string;
}

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

  const handleSlideChange = (swiper: any) => {
    const currentIndex = swiper.activeIndex;
    if (projects[currentIndex]) {
      setCurrentProject(projects[currentIndex]);
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
            <div className={`relative h-[300px] xl:h-[460px]`}>
              <Swiper
                onSlideChange={handleSlideChange}
                className={`h-full relative`}
                spaceBetween={30}
                slidesPerView={1}>
                {projects.map((project) => (
                  <SwiperSlide key={project._id}>
                    <div className={`relative h-full w-full rounded-[10px] overflow-hidden`}>
                      <Image
                        src={project.image}
                        fill
                        priority
                        quality={100}
                        alt={project.title}
                        className={`object-cover object-top`}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <div className="slider-buttons">
                  <WorkSliderBtns
                    containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                    btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[35px] h-[35px] flex justify-center items-center rounded-full shadow-lg transition-all duration-500"
                    iconStyles="text-3xl"
                  />
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkPage;
