'use client';

import { useState, useTransition, useOptimistic } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IProject } from '@/models/Project';
import { Types } from 'mongoose';

type ProjectData = {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  _id: string;
};

interface EditProjectFormProps {
  project: IProject;
}

export default function EditProjectForm({ project: initialProject }: EditProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Convert mongoose document to plain object
  const initialData: ProjectData = {
    _id: initialProject._id.toString(),
    title: initialProject.title,
    description: initialProject.description,
    technologies: initialProject.technologies,
    imageUrl: initialProject.imageUrl,
    githubUrl: initialProject.githubUrl,
    liveUrl: initialProject.liveUrl,
    featured: initialProject.featured,
    order: initialProject.order,
    status: initialProject.status,
    createdAt: initialProject.createdAt,
    updatedAt: initialProject.updatedAt,
    viewCount: initialProject.viewCount
  };

  const [optimisticProject, updateOptimisticProject] = useOptimistic(
    initialData,
    (state: ProjectData, newData: Partial<ProjectData>) => ({ ...state, ...newData })
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: Omit<ProjectData, '_id'> = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        technologies: formData.get('technologies')?.toString().split(',').map(tech => tech.trim()) || [],
        imageUrl: formData.get('imageUrl') as string,
        githubUrl: formData.get('githubUrl') as string || undefined,
        liveUrl: formData.get('liveUrl') as string || undefined,
        featured: formData.get('featured') === 'true',
        order: parseInt(formData.get('order') as string) || 0,
        status: (formData.get('status') as 'draft' | 'published') || 'draft',
        createdAt: optimisticProject.createdAt,
        updatedAt: new Date(),
        viewCount: optimisticProject.viewCount,
      };

      // Update optimistic data immediately
      updateOptimisticProject({ ...data, _id: optimisticProject._id });

      // Start transition for router updates
      startTransition(() => {
        // Pre-cache the projects page
        router.prefetch('/admin/projects');
      });

      const response = await fetch(`/api/projects/${optimisticProject._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      const updatedProject = await response.json();

      // Update optimistic data with server response
      updateOptimisticProject(updatedProject);

      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      // Navigate after successful update
      startTransition(() => {
        router.push('/admin/projects');
        router.refresh();
      });
    } catch (error) {
      // Revert optimistic update on error
      updateOptimisticProject(initialData);

      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof ProjectData, value: any) => {
    // Update optimistic data on field change
    updateOptimisticProject({ [field]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
        <Input
          id="title"
          name="title"
          value={optimisticProject.title}
          onChange={(e) => handleFieldChange('title', e.target.value)}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          id="description"
          name="description"
          value={optimisticProject.description}
          onChange={(e) => handleFieldChange('description', e.target.value)}
          required
          className="w-full min-h-[100px]"
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
        <Input
          id="technologies"
          name="technologies"
          value={optimisticProject.technologies.join(', ')}
          onChange={(e) => handleFieldChange('technologies', e.target.value.split(',').map(tech => tech.trim()))}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">Image URL</label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={optimisticProject.imageUrl}
          onChange={(e) => handleFieldChange('imageUrl', e.target.value)}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">GitHub URL</label>
        <Input
          id="githubUrl"
          name="githubUrl"
          value={optimisticProject.githubUrl || ''}
          onChange={(e) => handleFieldChange('githubUrl', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">Live URL</label>
        <Input
          id="liveUrl"
          name="liveUrl"
          value={optimisticProject.liveUrl || ''}
          onChange={(e) => handleFieldChange('liveUrl', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium mb-2">Display Order</label>
        <Input
          id="order"
          name="order"
          type="number"
          value={optimisticProject.order}
          onChange={(e) => handleFieldChange('order', parseInt(e.target.value) || 0)}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-2">Status</label>
        <select
          id="status"
          name="status"
          value={optimisticProject.status}
          onChange={(e) => handleFieldChange('status', e.target.value as 'draft' | 'published')}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={optimisticProject.featured}
          onChange={(e) => handleFieldChange('featured', e.target.checked)}
          className="rounded border-input"
        />
        <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
          disabled={loading || isPending}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading || isPending}
          className="relative"
        >
          {(loading || isPending) && (
            <div className="absolute inset-0 flex items-center justify-center bg-primary rounded-md">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <span className={loading || isPending ? 'opacity-0' : ''}>
            Save Changes
          </span>
        </Button>
      </div>
    </form>
  );
}
