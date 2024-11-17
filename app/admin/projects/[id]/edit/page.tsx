'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IProject } from '@/models/Project';

interface ProjectFormData {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  status: 'draft' | 'published';
}

interface EditProjectFormProps {
  project: IProject;
}

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data: ProjectFormData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        technologies: formData.get('technologies')?.toString().split(',').map(tech => tech.trim()) || [],
        imageUrl: formData.get('imageUrl') as string,
        githubUrl: formData.get('githubUrl') as string,
        liveUrl: formData.get('liveUrl') as string,
        featured: formData.get('featured') === 'true',
        order: parseInt(formData.get('order') as string) || 0,
        status: (formData.get('status') as 'draft' | 'published') || 'draft',
      };

      const response = await fetch(`/api/projects/${project._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      toast({
        title: "Success",
        description: "Project updated successfully",
      });

      router.push('/admin/projects');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
        <Input
          id="title"
          name="title"
          defaultValue={project.title}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project.description}
          required
          className="w-full min-h-[100px]"
        />
      </div>

      <div>
        <label htmlFor="technologies" className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
        <Input
          id="technologies"
          name="technologies"
          defaultValue={project.technologies.join(', ')}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">Image URL</label>
        <Input
          id="imageUrl"
          name="imageUrl"
          defaultValue={project.imageUrl}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="githubUrl" className="block text-sm font-medium mb-2">GitHub URL</label>
        <Input
          id="githubUrl"
          name="githubUrl"
          defaultValue={project.githubUrl}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="liveUrl" className="block text-sm font-medium mb-2">Live URL</label>
        <Input
          id="liveUrl"
          name="liveUrl"
          defaultValue={project.liveUrl}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium mb-2">Display Order</label>
        <Input
          id="order"
          name="order"
          type="number"
          defaultValue={project.order}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium mb-2">Status</label>
        <select
          id="status"
          name="status"
          defaultValue={project.status}
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
          defaultChecked={project.featured}
          className="rounded border-input"
        />
        <label htmlFor="featured" className="text-sm font-medium">Featured Project</label>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/projects')}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}