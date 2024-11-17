'use client';

import { useState, useEffect } from "react";
import { LogoutButton } from "@/components/admin/LogoutButton";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/messages", label: "Messages" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Don't check auth for login page
  const isLoginPage = pathname === '/admin/login';
  
  useEffect(() => {
    if (isLoginPage) {
      return; // Skip auth check on login page
    }

    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const hasAdminToken = cookies.some(cookie => 
        cookie.trim().startsWith('admin_token=')
      );
      setIsLoggedIn(hasAdminToken);
      
      if (!hasAdminToken) {
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [router, isLoginPage]);

  // Return only children for login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Return loading or null while checking auth
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 p-4 border-b bg-background z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-primary">
            <SheetHeader>
              <SheetTitle className="text-white">Admin Dashboard</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm text-white hover:bg-primary/80 rounded-md"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-auto pt-4">
                <LogoutButton />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 w-64 border-r bg-background">
        <div className="flex flex-col h-full p-4">
          <h2 className="text-lg font-semibold px-4 mb-8">Admin Dashboard</h2>
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm hover:bg-accent rounded-md"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-4">
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0">
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 