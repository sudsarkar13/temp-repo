"use client";

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import WorkSliderBtns from "@/components/buttons/WorkSliderBtns";
import { Project } from '@/types/project';
import { motion } from "framer-motion";

interface ProjectSliderProps {
  projects: Project[];
  onSlideChange?: (index: number) => void;
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects, onSlideChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setCurrentIndex(swiper.activeIndex);
    onSlideChange?.(swiper.activeIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative h-[300px] xl:h-[460px]`}>
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
    </motion.div>
  );
};

export default ProjectSlider;
