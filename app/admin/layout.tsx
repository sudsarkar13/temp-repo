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
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/messages", label: "Messages" },
];

// Public routes that don't require auth verification
const publicRoutes = ['/admin/login', '/admin/setup'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Skip auth check for public routes
  const isPublicRoute = publicRoutes.includes(pathname);
  
  useEffect(() => {
    if (isPublicRoute) {
      return; // Skip auth check on public routes
    }

    const checkAuth = async () => {
      try {
        // Try to fetch a protected endpoint to verify auth
        const response = await fetch('/api/auth/verify', {
          credentials: 'include' // Important for cookies
        });
        
        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsLoggedIn(false);
        router.push('/admin/login');
      }
    };

    checkAuth();
  }, [pathname, router, isPublicRoute]);

  // For public routes, render without nav
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For protected routes that are not yet authenticated, render nothing
  // This prevents flash of content before redirect
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Mobile navigation */}
      <div className="block lg:hidden fixed top-4 right-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] bg-[#27272C] border-none">
            <SheetHeader>
              <SheetTitle className="text-white">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-lg ${
                    pathname === item.href ? 'text-accent' : 'text-white'
                  } hover:text-accent transition-colors`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <LogoutButton className="mt-4" />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop navigation */}
      <div className="hidden lg:flex justify-between items-center p-8 max-w-7xl mx-auto">
        <nav className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-lg ${
                pathname === item.href ? 'text-accent' : 'text-white'
              } hover:text-accent transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LogoutButton />
      </div>

      {/* Main content */}
      <main className="p-8 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}