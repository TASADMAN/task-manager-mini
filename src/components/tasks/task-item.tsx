"use client";

import * as React from "react";
import {
  Calendar,
  Copy,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  FileText,
  MoreVertical,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { Task } from "@/types/task";
import {
  getStatusLabel,
  getPriorityLabel,
  getStatusColor,
  getPriorityColor,
} from "@/types/task";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TaskItemProps {
  task: Task;
  onStatusToggle?: (taskId: string, newStatus: Task["status"]) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onCopy?: (task: Task) => void;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

export function TaskItem({
  task,
  onStatusToggle,
  onEdit,
  onDelete,
  onCopy,
  dragHandleProps,
}: TaskItemProps) {
  const [showDescription, setShowDescription] = React.useState(false);
  const isCompleted = task.status === "done";
  const hasDescription = !!task.description;

  const handleCheckboxChange = () => {
    if (onStatusToggle) {
      const newStatus: Task["status"] = isCompleted ? "todo" : "done";
      onStatusToggle(task.id, newStatus);
    }
  };

  return (
    <>
      <div
        className={cn(
          "group relative flex items-center gap-2 rounded-lg border bg-card p-3 transition-all hover:shadow-md sm:gap-4 sm:p-4",
          isCompleted && "opacity-60 hover:opacity-100",
        )}
      >
        <div
          {...dragHandleProps}
          className="hidden cursor-grab text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing sm:block"
        >
          <GripVertical className="h-5 w-5" />
        </div>

        <Checkbox
          checked={isCompleted}
          onCheckedChange={handleCheckboxChange}
          className="h-6 w-6 shrink-0 rounded-full sm:h-8 sm:w-8 shadow-none border-gray-400"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h3
              className={cn(
                "truncate text-sm font-semibold sm:text-base ",
                isCompleted && "line-through text-muted-foreground",
              )}
            >
              {task.title}
            </h3>

            <div className="flex items-center  gap-2 sm:gap-0">
              {task.priority && (
                <Badge
                  variant="secondary"
                  className={cn("text-xs", getPriorityColor(task.priority))}
                >
                  ✦ {getPriorityLabel(task.priority)}
                </Badge>
              )}

              <div className="flex items-center place-items-end gap-1 text-xs text-muted-foreground sm:hidden">
                <Calendar className="h-3 w-3" />
                <span>{format(new Date(task.created_at), "dd MMM yy")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <div className="hidden sm:block">
              {hasDescription && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-purple-600 sm:h-8 sm:w-8"
                  onClick={() => setShowDescription(true)}
                  title="View description"
                >
                  <Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              )}
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "justify-center text-xs sm:min-w-[100px]",
                getStatusColor(task.status),
              )}
            >
              <span className="mr-1 h-2 w-2 rounded-full bg-current" />
              <span className="hidden sm:inline">
                {getStatusLabel(task.status)}
              </span>

              <span className="sm:hidden">
                {task.status === "todo" && "To Do"}
                {task.status === "in-progress" && "In Progress"}
                {task.status === "done" && "Done"}
              </span>
            </Badge>

            <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(task.created_at), "dd MMMM yyyy")}</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="hidden items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100 sm:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                  onClick={() => onCopy?.(task)}
                  title="Copy task"
                >
                  <Copy className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-blue-600"
                  onClick={() => onEdit?.(task)}
                  title="Edit task"
                >
                  <Edit className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-red-600"
                  onClick={() => onDelete?.(task.id)}
                  title="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {hasDescription && (
                      <>
                        <DropdownMenuItem
                          onClick={() => setShowDescription(true)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View description
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem onClick={() => onCopy?.(task)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy task
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(task)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit task
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete?.(task.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 color="red" className="mr-2 h-4 w-4" />
                      Delete task
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showDescription} onOpenChange={setShowDescription}>
        <DialogContent className="sm:max-w-[700px]">
          <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg bg-linear-to-br from-primary/10 via-primary/5 to-background p-6 pb-8">
            <div className="relative z-10">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background shadow-sm ring-1 ring-border">
                    <Eye className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl">Task Details</DialogTitle>
                    <p className="mt-1 text-sm text-muted-foreground">
                      View complete information
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mt-4 text-lg font-semibold leading-tight">
                {task.title}
              </h3>
            </div>

            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1 rounded-lg border bg-card p-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Status
                </span>
                <Badge
                  variant="secondary"
                  className={cn("w-fit", getStatusColor(task.status))}
                >
                  <span className="mr-1 h-2 w-2 rounded-full bg-current" />
                  {getStatusLabel(task.status)}
                </Badge>
              </div>

              <div className="flex flex-col gap-1 rounded-lg border bg-card p-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Priority
                </span>
                {task.priority ? (
                  <Badge
                    variant="secondary"
                    className={cn("w-fit", getPriorityColor(task.priority))}
                  >
                    ✦ {getPriorityLabel(task.priority)}
                  </Badge>
                ) : (
                  <span className="text-sm text-muted-foreground">None</span>
                )}
              </div>

              <div className="flex flex-col gap-1 rounded-lg border bg-card p-3">
                <span className="text-xs font-medium text-muted-foreground">
                  Created
                </span>
                <span className="text-sm font-medium">
                  {format(new Date(task.created_at), "MMM dd, yyyy")}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium ">Description</label>
              {task.description ? (
                <div className="group relative mt-2">
                  <div className="rounded-lg border bg-muted/40 p-4 backdrop-blur-sm transition-colors hover:bg-muted/60">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {task.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(task.description || "");
                      toast.success("Copied to clipboard!");
                    }}
                    className="absolute right-2 top-2 h-7 gap-1 px-2 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Copy className="h-3 w-3" />
                    <span className="text-xs">Copy</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-lg border border-dashed py-8">
                  <div className="text-center">
                    <FileText className="mx-auto mb-2 h-8 w-8 text-muted-foreground/30" />
                    <p className="text-sm text-muted-foreground">
                      No description provided
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end border-t pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${task.title}\n\n${task.description || "No description"}`,
                  );
                  toast.success("Task details copied!");
                }}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy All
              </Button>
              <Button
                size="lg"
                onClick={() => {
                  setShowDescription(false);
                  onEdit?.(task);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
