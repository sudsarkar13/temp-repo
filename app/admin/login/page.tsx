'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLogin() {
  const [passkey, setPasskey] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd want to handle this more securely
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      // Store passkey in secure cookie/session
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          placeholder="Enter admin passkey"
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
} 