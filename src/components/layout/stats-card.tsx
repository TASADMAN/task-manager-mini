"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTaskStats } from "@/hooks/use-tasks";
import { FaCheckCircle, FaTasks, FaChartPie } from "react-icons/fa";
import { TbProgress } from "react-icons/tb";

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
    <Card className="relative border p-0 shadow-none">
      {/* Border Left */}
      <div className={`absolute left-4 top-6 h-18 w-1 ${borderColor}`} />

      <div className="flex items-start justify-between p-6 pl-8">
        {/* Content */}
        <div className="flex flex-col">
          <p className="text-base font-light text-muted-foreground">{title}</p>
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
    <Card className="relative border p-0 shadow-none">
      {/* Border Left - Animated */}
      <Skeleton className="absolute left-4 top-6 h-16 w-1" />

      <div className="flex items-start justify-between p-6 pl-8">
        {/* Content */}
        <div className="flex flex-col space-y-3">
          {/* Title */}
          <Skeleton className="h-4 w-28" />
          {/* Value */}
          <Skeleton className="h-10 w-20" />
        </div>

        {/* Icon */}
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
      {/* Total Tasks */}
      <StatCard
        title="Total Tasks"
        value={stats?.total || 0}
        icon={<FaTasks className="h-5 w-5 text-primary dark:text-primary" />}
        iconBgColor="bg-primary/10"
        borderColor="bg-primary"
      />

      {/* In Progress */}
      <StatCard
        title="In Progress"
        value={stats?.["in-progress"] || 0}
        icon={<TbProgress className="h-5 w-5 text-primary dark:text-primary" />}
        iconBgColor="bg-primary/10"
        borderColor="bg-primary"
      />

      {/* Completed */}
      <StatCard
        title="Completed"
        value={stats?.done || 0}
        icon={
          <FaCheckCircle className="h-5 w-5 text-primary dark:text-primary" />
        }
        iconBgColor="bg-primary/10"
        borderColor="bg-primary"
      />

      {/* Completion Rate */}
      <StatCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={<FaChartPie className="h-5 w-5 text-primary dark:text-primary" />}
        iconBgColor="bg-primary/10"
        borderColor="bg-primary"
      />
    </div>
  );
}
