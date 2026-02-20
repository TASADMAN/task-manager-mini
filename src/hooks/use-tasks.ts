import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  getTaskStats,
} from "@/lib/api/tasks";
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilters,
  SortBy,
  SortOrder,
} from "@/types/task";

// Query Keys
export const taskKeys = {
  all: ["tasks"] as const,
  lists: () => [...taskKeys.all, "list"] as const,
  list: (filters?: TaskFilters, sortBy?: SortBy, sortOrder?: SortOrder) =>
    [...taskKeys.lists(), { filters, sortBy, sortOrder }] as const,
  details: () => [...taskKeys.all, "detail"] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
  stats: () => [...taskKeys.all, "stats"] as const,
};

// Hook: ดึง Tasks ทั้งหมด
export function useTasks(
  filters?: TaskFilters,
  sortBy: SortBy = "created_at",
  sortOrder: SortOrder = "desc",
) {
  return useQuery({
    queryKey: taskKeys.list(filters, sortBy, sortOrder),
    queryFn: () => getTasks(filters, sortBy, sortOrder),
    staleTime: 1000 * 60,
  });
}

// Hook: ดึง Task เดียว
export function useTask(id: string) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });
}

// Hook: ดึงสถิติ Tasks
export function useTaskStats() {
  return useQuery({
    queryKey: taskKeys.stats(),
    queryFn: getTaskStats,
    staleTime: 1000 * 30,
  });
}

// Hook: สร้าง Task ใหม่
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task-stats"] });
      toast.success("Task created successfully!");
    },
    onError: (error: any) => {
      if (error.message?.includes("already exists")) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create task");
      }
    },
  });
}

// Hook: แก้ไข Task
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTaskInput }) =>
      updateTask(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task-stats"] });
      toast.success("Task updated successfully!"); // ← เพิ่ม success toast
    },
    onError: (error: any) => {
      // ← Handle error ที่นี่
      if (error.message?.includes("already exists")) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update task");
      }
    },
  });
}

// Hook: ลบ Task
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
      toast.success("Task deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete task: ${error.message}`);
    },
  });
}

// Hook: อัปเดตสถานะ Task
export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Task["status"] }) =>
      updateTaskStatus(id, status),

    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const previousTasks = queryClient.getQueryData(taskKeys.lists());

      queryClient.setQueriesData({ queryKey: taskKeys.lists() }, (old: any) => {
        if (!old) return old;
        return old.map((task: Task) =>
          task.id === id ? { ...task, status } : task,
        );
      });

      return { previousTasks };
    },
    onError: (error, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(taskKeys.lists(), context.previousTasks);
      }
      toast.error(`Failed to update status: ${error.message}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({ queryKey: taskKeys.stats() });
    },
  });
}
