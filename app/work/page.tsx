import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/loading/loading";
import { Project } from "@/types/project";

// Dynamically import client components with no SSR
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

// Fetch projects on the server
async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
      cache: 'no-store'
    });
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function WorkPage() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">No projects available</h3>
        </div>
      </div>
    );
  }

  return (
    <section className={`min-h-[80vh] flex flex-col justify-center py-12 xl:px-0`}>
      <div className={`container mx-auto`}>
        <div className={`flex flex-col xl:flex-row gap-4 xl:gap-[30px]`}>
          <ProjectDetails project={projects[0]} />
          <div className={`w-full xl:w-[50%] order-1 xl:order-none`}>
            <ProjectSlider projects={projects} />
          </div>
        </div>
      </div>
    </section>
  );
}
