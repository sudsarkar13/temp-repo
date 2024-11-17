'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function NewProject() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

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

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create project');

      toast({
        title: "Success",
        description: "Project created successfully",
      });
      
      router.push('/admin/projects');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">New Project</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <label>Number</label>
          <Input name="num" required />
        </div>
        
        <div className="space-y-2">
          <label>Title</label>
          <Input name="title" required />
        </div>

        <div className="space-y-2">
          <label>Category</label>
          <Input name="category" required />
        </div>

        <div className="space-y-2">
          <label>Description</label>
          <Textarea name="description" required />
        </div>

        <div className="space-y-2">
          <label>Stack (comma-separated)</label>
          <Input name="stack" required />
        </div>

        <div className="space-y-2">
          <label>Project Image</label>
          <ImageUpload
            value={formData.get('image') as string || ''}
            onChange={(url) => {
              const form = document.querySelector('form');
              if (form) {
                const input = form.querySelector('input[name="image"]');
                if (input) {
                  (input as HTMLInputElement).value = url;
                }
              }
            }}
          />
          <Input
            type="hidden"
            name="image"
            required
          />
        </div>

        <div className="space-y-2">
          <label>Live URL</label>
          <Input name="live" />
        </div>

        <div className="space-y-2">
          <label>Github URL</label>
          <Input name="github" />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </div>
  );
} 