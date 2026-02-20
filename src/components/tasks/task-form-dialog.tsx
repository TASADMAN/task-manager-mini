"use client";

import * as React from "react";
import { CheckCircle2, Circle, Clock, Package, Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import type {
  Task,
  CreateTaskInput,
  TaskStatus,
  TaskPriority,
} from "@/types/task";
import {
  getStatusLabel,
  getPriorityLabel,
  getStatusColor,
  getPriorityColor,
} from "@/types/task";
import { taskFormSchema, type TaskFormValues } from "@/lib/validations/task";

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task;
  onSubmit: (data: CreateTaskInput) => void;
  isLoading?: boolean;
}

const STATUS_OPTIONS: Array<{
  value: TaskStatus;
  label: string;
  icon: React.ReactNode;
}> = [
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
  value: TaskPriority;
  label: string;
  starColor: string;
}> = [
  { value: "low", label: "Low", starColor: "text-green-500" },
  { value: "medium", label: "Medium", starColor: "text-yellow-500" },
  { value: "high", label: "High", starColor: "text-red-500" },
];

function StatusBadge({ status }: { status: TaskStatus }) {
  const option = STATUS_OPTIONS.find((opt) => opt.value === status);

  return (
    <Badge variant="secondary" className={getStatusColor(status)}>
      <span className="mr-1.5">{option?.icon}</span>
      {getStatusLabel(status)}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <Badge variant="secondary" className={getPriorityColor(priority)}>
      ✦ {getPriorityLabel(priority)}
    </Badge>
  );
}

export function TaskFormDialog({
  open,
  onOpenChange,
  task,
  onSubmit,
  isLoading = false,
}: TaskFormDialogProps) {
  const isEditMode = !!task;

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        title: task?.title ?? "",
        description: task?.description || "",
        status: task?.status ?? "todo",
        priority: task?.priority ?? "medium",
      });
    }
  }, [open, task, form]);

  const handleFormSubmit = React.useCallback(
    (values: TaskFormValues) => {
      onSubmit({
        title: values.title,
        description: values.description?.trim() || "",
        status: values.status,
        priority: values.priority,
      });
    },
    [onSubmit],
  );

  const handleCancel = React.useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[720px]">
        {/* Header */}
        <DialogHeader>
          <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg bg-linear-to-br from-primary/10 via-primary/5 to-background p-6 pb-8">
            <div className="flex items-center gap-3 ">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl text-start ">
                  {isEditMode ? "Edit task" : "Add task"}
                </DialogTitle>
                <DialogDescription>
                  Fill in the form below to{" "}
                  {isEditMode ? "edit" : "add or edit"} a task
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Form */}
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-6 pt-4"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Title Field */}
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="sm:col-span-2 space-y-2 ">
                  <label
                    htmlFor="title"
                    className="text-base  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Task Title
                  </label>
                  <Input
                    {...field}
                    id="title"
                    placeholder="Task title..."
                    className="h-10 mt-2 shadow-none border-2"
                    disabled={isLoading}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <label
                    htmlFor="status"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Task status
                  </label>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="status" className="mt-2">
                      <SelectValue>
                        <StatusBadge status={field.value} />
                      </SelectValue>
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
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Priority Field */}
            <Controller
              name="priority"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <label
                    htmlFor="priority"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Task Priority
                  </label>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="priority" className="mt-2">
                      <SelectValue>
                        <PriorityBadge priority={field.value} />
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align="start" position="popper">
                      {PRIORITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <span className={option.starColor}>✦</span>
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            {/* Description Field */}
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <div className="sm:col-span-2 space-y-2">
                  <label
                    htmlFor="description"
                    className="text-base   font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Task Description{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </label>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Add task description..."
                    rows={4}
                    className="mt-2"
                    disabled={isLoading}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button
              size="lg"
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button size="lg" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  {isEditMode ? "Save changes" : "new task"}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
