"use client";

import * as React from "react";
import { Search, Filter, X } from "lucide-react";
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

  // แก้ไขตรงนี้
  const getStatusLabel = (status: TaskStatus | "all"): string => {
    const labels: Record<TaskStatus | "all", string> = {
      all: "All Status",
      todo: "To Do",
      "in-progress": "In Progress",
      done: "Done",
    };
    return labels[status];
  };

  const getPriorityLabel = (priority: TaskPriority | "all"): string => {
    const labels: Record<TaskPriority | "all", string> = {
      all: "All Priorities",
      low: "Low",
      medium: "Medium",
      high: "High",
    };
    return labels[priority];
  };

  const getStatusColor = (status: TaskStatus): string => {
    const colors: Record<TaskStatus, string> = {
      todo: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      "in-progress": "bg-orange-100 text-orange-700 hover:bg-orange-200",
      done: "bg-green-100 text-green-700 hover:bg-green-200",
    };
    return colors[status];
  };

  const getPriorityColor = (priority: TaskPriority): string => {
    const colors: Record<TaskPriority, string> = {
      low: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
      high: "bg-red-100 text-red-700 hover:bg-red-200",
    };
    return colors[priority];
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 border-2 shadow-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <Select value={priorityFilter} onValueChange={onPriorityChange}>
            <SelectTrigger className="border-gray-200 shadow-none">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="By Priority" />
            </SelectTrigger>
            <SelectContent align="start" position="popper">
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="border-gray-200 shadow-none">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="By Status" />
            </SelectTrigger>
            <SelectContent align="start" position="popper">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilter !== "all" && (
            <Badge
              variant="secondary"
              className={`gap-1 pr-1 ${getStatusColor(statusFilter)}`}
            >
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-current" />
                {getStatusLabel(statusFilter)}
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
              <span className="flex items-center gap-1">
                ✦ {getPriorityLabel(priorityFilter)}
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
