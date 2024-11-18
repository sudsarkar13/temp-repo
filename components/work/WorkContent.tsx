"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import Loading from "@/components/loading/loading";
import { Project } from '@/types/project';

const ProjectSlider = dynamic(
  () => import("@/components/work/ProjectSlider"),
  { 
    ssr: false,
    loading: () => <Loading />
  }
);

const ProjectDetails = dynamic(
  () => import("@/components/work/ProjectDetails"),
  {
    ssr: false,
    loading: () => <Loading />
  }
);

interface WorkContentProps {
  projects: Project[];
}

const WorkContent: React.FC<WorkContentProps> = ({ projects }) => {
  return (
    <div className={`flex flex-col xl:flex-row gap-4 xl:gap-[30px]`}>
      <ProjectDetails project={projects[0]} />
      <div className={`w-full xl:w-[50%] order-1 xl:order-none`}>
        <ProjectSlider projects={projects} />
      </div>
    </div>
  );
};

export default WorkContent;
