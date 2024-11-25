'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { LogoutButton } from '@/components/admin/LogoutButton';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const NavItem = ({ href, label, icon, active }: NavItemProps) => (
  <Link href={href}>
    <Button
      variant={active ? 'default' : 'ghost'}
      className={cn(
        'w-full justify-start gap-2',
        active && 'bg-accent text-primary'
      )}
    >
      {icon}
      {label}
    </Button>
  </Link>
);

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/admin/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      href: '/admin/projects',
      label: 'Projects',
      icon: <FolderKanban className="h-4 w-4" />,
    },
    {
      href: '/admin/messages',
      label: 'Messages',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      href: '/admin/analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: '/admin/settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 items-center border-b border-border px-4">
            <h1 className="text-lg font-semibold text-primary">
              Admin Dashboard
            </h1>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-2 py-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={pathname === item.href}
                />
              ))}
            </nav>

            <Separator className="my-4" />

            {/* Logout button */}
            <LogoutButton className="w-full justify-start gap-2" />
          </ScrollArea>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
