'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [passkey, setPasskey] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const hasAdminToken = cookies.some(cookie => 
        cookie.trim().startsWith('admin_token=')
      );
      
      if (hasAdminToken) {
        router.push('/admin/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey }),
        credentials: 'include'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      toast({
        title: "Success!",
        description: "Login successful. Redirecting...",
      });

      // Clear form
      setPasskey('');
      
      // Redirect to dashboard
      router.push('/admin/dashboard');
      router.refresh();

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid passkey",
        variant: "destructive",
      });
      setPasskey('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Admin Login</h2>
          <p className="mt-2 text-gray-600">Enter your passkey to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            type="password"
            placeholder="Enter passkey"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            required
            autoComplete="off"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
}