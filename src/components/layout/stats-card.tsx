"use client";

import { Card } from "@/components/ui/card";
import { ClipboardList, CheckCircle2, Clock, TrendingUp } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { useTaskStats } from "@/hooks/use-tasks";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBgColor: string;
  borderColor: string;
}

function StatCard({
  title,
  value,
  icon,
  iconBgColor,
  borderColor,
}: StatCardProps) {
  return (
    <Card className="relative p-0 border shadow-none ">
      {/* Border Left */}
      <div
        className={`absolute left-4 items-center  h-18 top-6 w-1 ${borderColor}`}
      />

      <div className="flex items-start justify-between p-6 pl-8">
        {/* Content */}
        <div className="flex flex-col">
          <p className="text-base font-light text-gray-500">{title}</p>
          <h3 className="mt-2 text-4xl font-bold">{value}</h3>
        </div>

        {/* Icon */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-md ${iconBgColor}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-muted" />
      <div className="flex items-start justify-between p-6 pl-8">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-16" />
        </div>
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </Card>
  );
}

export function StatsCards() {
  const { data: stats, isLoading } = useTaskStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const completionRate = stats?.total
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Tasks"
        value={stats?.total || 0}
        icon={
          <ClipboardList className="h-5 w-5 text-green-600 dark:text-green-400" />
        }
        iconBgColor="bg-green-100 dark:bg-green-900/20"
        borderColor="bg-primary"
      />

      <StatCard
        title="Completed"
        value={stats?.done || 0}
        icon={
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
        }
        iconBgColor="bg-green-100 dark:bg-green-900/20"
        borderColor="bg-primary"
      />

      {/* In Progress */}
      <StatCard
        title="In Progress"
        value={stats?.["in-progress"] || 0}
        icon={<Clock className="h-5 w-5 text-green-600 dark:text-green-400" />}
        iconBgColor="bg-green-100 dark:bg-green-900/20"
        borderColor="bg-primary"
      />

      <StatCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        }
        iconBgColor="bg-green-100 dark:bg-green-900/20"
        borderColor="bg-primary"
      />
    </div>
  );
}
