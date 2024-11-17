'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('image')) {
      return toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={onUpload}
        disabled={disabled || loading}
        className="hidden"
        id="imageUpload"
      />
      {value ? (
        <div className="relative w-full h-[200px]">
          <Image
            src={value}
            alt="Upload"
            fill
            className="object-cover rounded-lg"
          />
          <Button
            onClick={() => onChange('')}
            className="absolute top-2 right-2"
            variant="destructive"
            size="icon"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          disabled={disabled || loading}
          variant="secondary"
          onClick={() => document.getElementById('imageUpload')?.click()}
        >
          <Upload className="h-4 w-4 mr-2" />
          {loading ? 'Uploading...' : 'Upload Image'}
        </Button>
      )}
    </div>
  );
}; 