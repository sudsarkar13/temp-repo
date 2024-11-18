'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardOverview from '@/components/admin/DashboardOverview';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const defaultStats = {
  totalProjects: 0,
  activeProjects: 0,
  totalMessages: 0,
  unreadMessages: 0,
  totalViews: 0,
  totalClicks: 0,
};

const defaultChartData = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (6 - i));
  return {
    date: date.toISOString().split('T')[0],
    views: 0,
    clicks: 0,
  };
});

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(defaultStats);
  const [chartData, setChartData] = useState(defaultChartData);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch stats
        const [statsRes, analyticsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/analytics')
        ]);

        if (!statsRes.ok) {
          throw new Error('Failed to fetch stats');
        }

        if (!analyticsRes.ok) {
          throw new Error('Failed to fetch analytics');
        }

        const [statsData, analyticsData] = await Promise.all([
          statsRes.json(),
          analyticsRes.json()
        ]);

        setStats(statsData);
        setChartData(analyticsData.chartData);
      } catch (error) {
        console.error('Dashboard data error:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive',
        });
        setStats(defaultStats);
        setChartData(defaultChartData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return <DashboardOverview stats={stats} chartData={chartData} />;
}