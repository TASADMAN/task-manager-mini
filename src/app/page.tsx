"use client";
import { Header } from "@/components/layout/header";
import { StatsCards } from "@/components/layout/stats-card";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskList } from "@/components/tasks/task-list";
import {
  useDeleteTask,
  useTasks,
  useUpdateTaskStatus,
} from "@/hooks/use-tasks";

import { Task, TaskPriority, TaskStatus } from "@/types/task";
import React from "react";
import { toast } from "sonner";

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<TaskStatus | "all">(
    "all",
  );
  const [priorityFilter, setPriorityFilter] = React.useState<
    TaskPriority | "all"
  >("all");

  // Fetch tasks with filters
  const { data: tasks, isLoading } = useTasks(
    {
      search: searchQuery,
      status: statusFilter,
      priority: priorityFilter,
    },
    "created_at",
    "desc",
  );

  const updateStatusMutation = useUpdateTaskStatus();
  const deleteMutation = useDeleteTask();

  const handleStatusToggle = (taskId: string, newStatus: Task["status"]) => {
    updateStatusMutation.mutate({ id: taskId, status: newStatus });
  };

  const handleEdit = (task: Task) => {
    // TODO: Open edit dialog
    console.log("Edit task:", task);
  };

  const handleDelete = (taskId: string) => {
    // TODO: Show confirmation dialog
    if (confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(taskId);
    }
  };

  const handleCopy = (task: Task) => {
    navigator.clipboard.writeText(task.title);
    toast.success("Task title copied to clipboard!");
  };

  return (
    <div className="max-h-screen bg-background">
      <div className="mt-6">
        <Header />
      </div>
      <main className=" mx-16  px-4 py-6 md:px-8 mt-18">
        <StatsCards />

        {/* Search & Filters */}
        <div className="mt-18">
          <TaskFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
          />
        </div>

        <TaskList
          tasks={tasks || []}
          isLoading={isLoading}
          onStatusToggle={handleStatusToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCopy={handleCopy}
        />
      </main>
    </div>
  );
}
