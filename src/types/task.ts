export type TaskStatus = "todo" | "in-progress" | "complated";

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

export const statusConfig = {
  todo: {
    label: "To Do",
    variant: "default" as const,
    color: "bg-gray-100 text-gray-800",
  },
  "in-progress": {
    label: "In Progress",
    variant: "secondary" as const,
    color: "bg-blue-100 text-blue-800",
  },
  done: {
    label: "Done",
    variant: "default" as const,
    color: "bg-green-100 text-green-800",
  },
};

export const priorityConfig = {
  low: {
    label: "Low",
    variant: "outline" as const,
    color: "bg-gray-100 text-gray-600",
  },
  medium: {
    label: "Medium",
    variant: "secondary" as const,
    color: "bg-yellow-100 text-yellow-800",
  },
  high: {
    label: "High",
    variant: "destructive" as const,
    color: "bg-red-100 text-red-800",
  },
};
