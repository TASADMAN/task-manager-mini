"use client";

import * as React from "react";
import { TaskItem } from "./task-item";
import { EmptyState } from "./empty-state";
import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  isLoading?: boolean;
  onStatusToggle?: (taskId: string, newStatus: Task["status"]) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onCopy?: (task: Task) => void;
}

export function TaskList({
  tasks,
  isLoading,
  onStatusToggle,
  onEdit,
  onDelete,
  onCopy,
}: TaskListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  // จัดกลุ่ม tasks ตาม status
  const groupedTasks = React.useMemo(() => {
    const groups: Record<string, Task[]> = {
      "in-progress": [],
      todo: [],
      done: [],
    };

    tasks.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });

    return groups;
  }, [tasks]);

  const statusOrder = ["in-progress", "todo", "done"] as const;
  const statusLabels = {
    "in-progress": "In Progress",
    todo: "To Do",
    done: "Completed",
  };

  return (
    <div className="space-y-8">
      {statusOrder.map((status) => {
        const statusTasks = groupedTasks[status];
        if (statusTasks.length === 0) return null;

        return (
          <div key={status} className="space-y-4">
            {/* Section Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                {statusLabels[status]}
              </h2>
              <span className="text-sm text-muted-foreground">
                {statusTasks.length}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Tasks */}
            <div className="space-y-3">
              {statusTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onStatusToggle={onStatusToggle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onCopy={onCopy}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
