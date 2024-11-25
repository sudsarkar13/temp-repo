import React from "react";
import Loading from "@/components/loading/loading";
import { Project } from "@/types/project";
import WorkContent from "@/components/work/WorkContent";

// Mock data for static rendering
const INITIAL_PROJECTS: Project[] = [
  {
    _id: "1",
    num: "01",
    category: "Web Development",
    title: "Portfolio Website",
    description: "A modern portfolio website built with Next.js and TypeScript",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
    image: "/images/projects/portfolio.jpg",
    live: "https://example.com",
    github: "https://github.com/example/portfolio",
  },
];

export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  let projects: Project[] = INITIAL_PROJECTS;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/projects`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        projects = data;
      }
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <section className={`min-h-[80vh] flex flex-col justify-center py-12 xl:px-0`}>
      <div className={`container mx-auto`}>
        <WorkContent projects={projects} />
      </div>
    </section>
  );
}
