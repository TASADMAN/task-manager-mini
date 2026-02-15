"use client";

import * as React from "react";
import { Calendar, Copy, Edit, Trash2, GripVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Task } from "@/types/task";
import {
  getStatusLabel,
  getPriorityLabel,
  getStatusColor,
  getPriorityColor,
} from "@/types/task";

interface TaskItemProps {
  task: Task;
  onStatusToggle?: (taskId: string, newStatus: Task["status"]) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onCopy?: (task: Task) => void;
}

export function TaskItem({
  task,
  onStatusToggle,
  onEdit,
  onDelete,
  onCopy,
}: TaskItemProps) {
  const isCompleted = task.status === "done";

  const handleCheckboxChange = () => {
    if (onStatusToggle) {
      const newStatus: Task["status"] = isCompleted ? "todo" : "done";
      onStatusToggle(task.id, newStatus);
    }
  };

  return (
    <div className="group relative flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:shadow-md">
      {/* Drag Handle */}
      <div className="cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        <GripVertical className="h-5 w-5" />
      </div>

      {/* Checkbox */}
      <Checkbox
        checked={isCompleted}
        onCheckedChange={handleCheckboxChange}
        className="h-5 w-5"
      />

      {/* Task Info */}
      <div className="flex flex-1 items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          {/* Title */}
          <h3
            className={cn(
              "font-semibold text-base",
              isCompleted && "line-through text-muted-foreground",
            )}
          >
            {task.title}
          </h3>

          {/* Priority Badge */}
          {task.priority && (
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={cn("text-xs", getPriorityColor(task.priority))}
              >
                ✦ {getPriorityLabel(task.priority)}
              </Badge>
            </div>
          )}
        </div>

        {/* Right Side: Date, Status, Actions */}
        <div className="flex items-center gap-4">
          {/* Date */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(task.created_at), "dd MMMM yyyy")}</span>
          </div>

          {/* Status Badge */}
          <Badge
            variant="secondary"
            className={cn(
              "min-w-[100px] justify-center",
              getStatusColor(task.status),
            )}
          >
            <span className="mr-1 h-2 w-2 rounded-full bg-current" />
            {getStatusLabel(task.status)}
          </Badge>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {/* Copy */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-blue-600"
              onClick={() => onCopy?.(task)}
            >
              <Copy className="h-4 w-4" />
            </Button>

            {/* Edit */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-blue-600"
              onClick={() => onEdit?.(task)}
            >
              <Edit className="h-4 w-4" />
            </Button>

            {/* Delete */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-red-600"
              onClick={() => onDelete?.(task.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
