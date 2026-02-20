"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { TaskFilters } from "@/components/tasks/task-filters";
import { TaskList } from "@/components/tasks/task-list";
import { TaskFormDialog } from "@/components/tasks/task-form-dialog";
import { DeleteTaskDialog } from "@/components/tasks/delete-task-dialog";
import { StatsCards } from "@/components/layout/stats-card";

import { toast } from "sonner";
import type {
  TaskStatus,
  TaskPriority,
  Task,
  CreateTaskInput,
} from "@/types/task";
import {
  useCreateTask,
  useDeleteTask,
  useTasks,
  useUpdateTask,
  useUpdateTaskStatus,
} from "@/hooks/use-tasks";

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<TaskStatus | "all">(
    "all",
  );
  const [priorityFilter, setPriorityFilter] = React.useState<
    TaskPriority | "all"
  >("all");

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | undefined>();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [deletingTask, setDeletingTask] = React.useState<Task | null>(null);

  const { data: tasks, isLoading } = useTasks(
    {
      search: searchQuery,
      status: statusFilter,
      priority: priorityFilter,
    },
    "created_at",
    "desc",
  );

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();
  const updateStatusMutation = useUpdateTaskStatus();
  const deleteMutation = useDeleteTask();

  const handleAddTask = () => {
    setEditingTask(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: CreateTaskInput) => {
    if (editingTask) {
      updateMutation.mutate(
        { id: editingTask.id, input: data },
        {
          onSuccess: () => {
            setIsDialogOpen(false);
            setEditingTask(undefined);
          },
        },
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setIsDialogOpen(false);
        },
      });
    }
  };

  const handleStatusToggle = (taskId: string, newStatus: Task["status"]) => {
    updateStatusMutation.mutate({ id: taskId, status: newStatus });
  };

  const handleDelete = (taskId: string) => {
    const task = tasks?.find((t) => t.id === taskId);
    if (task) {
      setDeletingTask(task);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      deleteMutation.mutate(deletingTask.id, {
        onSuccess: () => {
          setIsDeleteDialogOpen(false);
          setDeletingTask(null);
        },
      });
    }
  };

  const handleCopy = (task: Task) => {
    navigator.clipboard.writeText(task.title);
    toast.success("Task title copied to clipboard!");
  };

  const handleMarkAllCompleted = async () => {
    if (!tasks || tasks.length === 0) return;

    try {
      await Promise.all(
        tasks.map((task) =>
          updateStatusMutation.mutateAsync({ id: task.id, status: "done" }),
        ),
      );
      toast.success(`${tasks.length} tasks marked as completed!`);
    } catch (error) {
      toast.error("Failed to update tasks");
    }
  };

  const handleMarkAllInProgress = async () => {
    if (!tasks || tasks.length === 0) return;

    try {
      await Promise.all(
        tasks.map((task) =>
          updateStatusMutation.mutateAsync({
            id: task.id,
            status: "in-progress",
          }),
        ),
      );
      toast.success(`${tasks.length} tasks marked as in progress!`);
    } catch (error) {
      toast.error("Failed to update tasks");
    }
  };

  const handleDeleteAll = async () => {
    if (!tasks || tasks.length === 0) return;

    try {
      await Promise.all(
        tasks.map((task) => deleteMutation.mutateAsync(task.id)),
      );
      toast.success(`${tasks.length} tasks deleted!`);
    } catch (error) {
      toast.error("Failed to delete tasks");
    }
  };

  return (
    <div className="max-h-screen bg-background">
      <div className="mt-6">
        <Header
          onAddTask={handleAddTask}
          onMarkAllCompleted={handleMarkAllCompleted}
          onMarkAllInProgress={handleMarkAllInProgress}
          onDeleteAll={handleDeleteAll}
          taskCount={tasks?.length || 0}
          isLoading={updateStatusMutation.isPending || deleteMutation.isPending}
        />
      </div>
      <div className="m-auto mt-18 px-4 md:px-16">
        <StatsCards />

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

        <div className="mt-8">
          <TaskList
            tasks={tasks || []}
            isLoading={isLoading}
            onStatusToggle={handleStatusToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCopy={handleCopy}
          />
        </div>
      </div>
      <TaskFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        task={editingTask}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
      <DeleteTaskDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        task={deletingTask}
        onConfirm={handleConfirmDelete}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
