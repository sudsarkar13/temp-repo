'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        const data = await response.json();
        setProject(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch project",
          variant: "destructive",
        });
      }
    };

    fetchProject();
  }, [params.id, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        num: formData.get('num'),
        title: formData.get('title'),
        category: formData.get('category'),
        description: formData.get('description'),
        stack: formData.get('stack')?.toString().split(',').map(name => ({ name: name.trim() })),
        image: formData.get('image'),
        live: formData.get('live'),
        github: formData.get('github'),
      };

      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update project');

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

  if (!project) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <label>Number</label>
          <Input name="num" defaultValue={project.num} required />
        </div>
        
        <div className="space-y-2">
          <label>Title</label>
          <Input name="title" defaultValue={project.title} required />
        </div>

        <div className="space-y-2">
          <label>Category</label>
          <Input name="category" defaultValue={project.category} required />
        </div>

        <div className="space-y-2">
          <label>Description</label>
          <Textarea name="description" defaultValue={project.description} required />
        </div>

        <div className="space-y-2">
          <label>Stack (comma-separated)</label>
          <Input 
            name="stack" 
            defaultValue={project.stack.map((s: any) => s.name).join(', ')} 
            required 
          />
        </div>

        <div className="space-y-2">
          <label>Image URL</label>
          <Input name="image" defaultValue={project.image} required />
        </div>

        <div className="space-y-2">
          <label>Live URL</label>
          <Input name="live" defaultValue={project.live} />
        </div>

        <div className="space-y-2">
          <label>Github URL</label>
          <Input name="github" defaultValue={project.github} />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Project'}
        </Button>
      </form>
    </div>
  );
} 