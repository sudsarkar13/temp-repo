'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function NewProjectPage() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        num: formData.get('num'),
        category: formData.get('category'),
        title: formData.get('title'),
        description: formData.get('description'),
        stack: formData.get('stack')?.toString().split(',').map(name => ({ name: name.trim() })),
        image: imageUrl,
        live: formData.get('live'),
        github: formData.get('github'),
      };

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to create project');

      toast({
        title: "Success",
        description: "Project created successfully",
      });

      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ImageUpload
          value={imageUrl}
          onChange={setImageUrl}
          disabled={loading}
        />
        <Input
          name="num"
          placeholder="Project Number"
          required
        />
        <Input
          name="category"
          placeholder="Category"
          required
        />
        <Input
          name="title"
          placeholder="Project Title"
          required
        />
        <Textarea
          name="description"
          placeholder="Project Description"
          required
        />
        <Input
          name="stack"
          placeholder="Technologies (comma-separated)"
          required
        />
        <Input
          name="live"
          placeholder="Live URL"
          required
        />
        <Input
          name="github"
          placeholder="GitHub URL"
          required
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </div>
  );
} 