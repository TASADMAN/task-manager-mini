"use client";

import * as React from "react";
import { Search, Filter, X, Circle, Clock, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { TaskStatus, TaskPriority } from "@/types/task";

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: TaskStatus | "all";
  onStatusChange: (value: TaskStatus | "all") => void;
  priorityFilter: TaskPriority | "all";
  onPriorityChange: (value: TaskPriority | "all") => void;
}

const STATUS_OPTIONS: Array<{
  value: TaskStatus | "all";
  label: string;
  icon: React.ReactNode;
}> = [
  {
    value: "all",
    label: "All Status",
    icon: <Filter className="h-4 w-4 text-muted-foreground" />,
  },
  {
    value: "todo",
    label: "To Do",
    icon: <Circle className="h-4 w-4 text-gray-500" />,
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: <Clock className="h-4 w-4 text-orange-500" />,
  },
  {
    value: "done",
    label: "Done",
    icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  },
];

const PRIORITY_OPTIONS: Array<{
  value: TaskPriority | "all";
  label: string;
  icon: React.ReactNode;
}> = [
  {
    value: "all",
    label: "All Priorities",
    icon: <Filter className="h-4 w-4 text-muted-foreground" />,
  },
  {
    value: "low",
    label: "Low",
    icon: <span className="text-green-500">✦</span>,
  },
  {
    value: "medium",
    label: "Medium",
    icon: <span className="text-yellow-500">✦</span>,
  },
  {
    value: "high",
    label: "High",
    icon: <span className="text-red-500">✦</span>,
  },
];

export function TaskFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}: TaskFiltersProps) {
  const hasActiveFilters = statusFilter !== "all" || priorityFilter !== "all";

  const handleResetAll = () => {
    onStatusChange("all");
    onPriorityChange("all");
  };

  // Helper functions
  const getStatusOption = (status: TaskStatus | "all") => {
    return STATUS_OPTIONS.find((opt) => opt.value === status);
  };

  const getPriorityOption = (priority: TaskPriority | "all") => {
    return PRIORITY_OPTIONS.find((opt) => opt.value === priority);
  };

  const getStatusColor = (status: TaskStatus): string => {
    const colors: Record<TaskStatus, string> = {
      todo: "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
      "in-progress":
        "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400",
      done: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: TaskPriority): string => {
    const colors: Record<TaskPriority, string> = {
      low: "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400",
      medium:
        "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
      high: "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400",
    };
    return colors[priority];
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative max-w-2xl flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 w-full border-gray-200 pl-10 shadow-none dark:border-gray-800"
          />
        </div>

        {/* Filter Selects */}
        <div className="flex items-center justify-end gap-4">
          {/* Priority Filter */}
          <Select value={priorityFilter} onValueChange={onPriorityChange}>
            <SelectTrigger className="border-gray-200 shadow-none dark:border-gray-800">
              {/* {getPriorityOption(priorityFilter)?.icon} */}
              <SelectValue placeholder="By Priority" />
            </SelectTrigger>
            <SelectContent align="start" position="popper">
              {PRIORITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="border-gray-200 shadow-none dark:border-gray-800">
              {/* {getStatusOption(statusFilter)?.icon} */}
              <SelectValue placeholder="By Status" />
            </SelectTrigger>
            <SelectContent align="start" position="popper">
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          {statusFilter !== "all" && (
            <Badge
              variant="secondary"
              className={`gap-1 pr-1 ${getStatusColor(statusFilter)}`}
            >
              <span className="flex items-center gap-1.5">
                {getStatusOption(statusFilter)?.icon}
                {getStatusOption(statusFilter)?.label}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onStatusChange("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {priorityFilter !== "all" && (
            <Badge
              variant="secondary"
              className={`gap-1 pr-1 ${getPriorityColor(priorityFilter)}`}
            >
              <span className="flex items-center gap-1.5">
                {getPriorityOption(priorityFilter)?.icon}
                {getPriorityOption(priorityFilter)?.label}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => onPriorityChange("all")}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetAll}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Reset All
          </Button>
        </div>
      )}
    </div>
  );
}
