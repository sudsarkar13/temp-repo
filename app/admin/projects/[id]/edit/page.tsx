import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Project } from '@/models/Project';
import { connectDB } from '@/lib/db';
import EditProjectForm from './EditProjectForm';
import type { EditPageProps } from './types';

async function getProject(id: string) {
  try {
    await connectDB();
    const project = await Project.findById(id);
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectEditPage({ params }: EditPageProps) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <EditProjectForm project={project} />
        </Suspense>
      </div>
    </div>
  );
}