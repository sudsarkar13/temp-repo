'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardOverview from '@/components/admin/DashboardOverview';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalViews: 0,
    totalClicks: 0,
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const statsRes = await fetch('/api/admin/stats');
        const statsData = await statsRes.json();

        if (!statsRes.ok) throw new Error(statsData.message);

        // Fetch analytics data
        const analyticsRes = await fetch('/api/admin/analytics');
        const analyticsData = await analyticsRes.json();

        if (!analyticsRes.ok) throw new Error(analyticsData.message);

        setStats(statsData);
        setChartData(analyticsData.chartData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-[300px]" />
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-[300px]" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
      </div>
      <DashboardOverview stats={stats} chartData={chartData} />
    </div>
  );
}