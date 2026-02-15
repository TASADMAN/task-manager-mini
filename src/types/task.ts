export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority | null;
  user_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  user_id?: string | null;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
}

export interface TaskFilters {
  status?: TaskStatus | "all";
  priority?: TaskPriority | "all";
  search?: string;
}

export type SortBy =
  | "created_at"
  | "updated_at"
  | "priority"
  | "status"
  | "title";
export type SortOrder = "asc" | "desc";

export type TasksResponse = Task[];

export const STATUS_CONFIG = {
  todo: {
    label: "To Do",
    variant: "default" as const,
    color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  },
  "in-progress": {
    label: "In Progress",
    variant: "secondary" as const,
    color:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
  },
  done: {
    label: "Done",
    variant: "default" as const,
    color:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
  },
} as const;

export const PRIORITY_CONFIG = {
  low: {
    label: "Low",
    variant: "outline" as const,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  },
  medium: {
    label: "Medium",
    variant: "secondary" as const,
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
  },
  high: {
    label: "High",
    variant: "destructive" as const,
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
  },
} as const;

export function getStatusLabel(status: TaskStatus): string {
  return STATUS_CONFIG[status].label;
}

export function getPriorityLabel(priority: TaskPriority): string {
  return PRIORITY_CONFIG[priority].label;
}

export function getStatusColor(status: TaskStatus): string {
  return STATUS_CONFIG[status].color;
}

export function getPriorityColor(priority: TaskPriority): string {
  return PRIORITY_CONFIG[priority].color;
}
