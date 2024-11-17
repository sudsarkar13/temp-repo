import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  FolderKanban,
  MessageSquare,
  Eye,
  MousePointerClick,
} from 'lucide-react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

interface DashboardOverviewProps {
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalMessages: number;
    unreadMessages: number;
    totalViews: number;
    totalClicks: number;
  };
  chartData: {
    date: string;
    views: number;
    clicks: number;
  }[];
}

export default function DashboardOverview({
  stats,
  chartData,
}: DashboardOverviewProps) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects.toString()}
          description={`${stats.activeProjects} active projects`}
          icon={<FolderKanban className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Messages"
          value={stats.totalMessages.toString()}
          description={`${stats.unreadMessages} unread messages`}
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toString()}
          description="All-time portfolio views"
          icon={<Eye className="h-4 w-4 text-muted-foreground" />}
        />
        <StatCard
          title="Total Clicks"
          value={stats.totalClicks.toString()}
          description="Project link clicks"
          icon={<MousePointerClick className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
          <CardDescription>
            Portfolio views and project clicks over time
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar
                dataKey="views"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="clicks"
                fill="hsl(var(--chart-2))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
