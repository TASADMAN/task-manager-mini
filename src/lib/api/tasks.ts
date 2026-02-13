import { createClient } from "@/lib/supabase/client";
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilters,
  SortBy,
  SortOrder,
} from "@/types/task";

const supabase = createClient();

export async function getTasks(
  filters?: TaskFilters,
  sortBy: SortBy = "created_at",
  sortOrder: SortOrder = "desc",
) {
  let query = supabase.from("tasks").select("*");

  if (filters?.status && filters.status !== "all") {
    query = query.eq("status", filters.status);
  }

  if (filters?.priority && filters.priority !== "all") {
    query = query.eq("priority", filters.priority);
  }

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`,
    );
  }

  query = query.order(sortBy, { ascending: sortOrder === "asc" });

  const { data, error } = await query;

  if (error) throw error;
  return data as Task[];
}

export async function getTaskById(id: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Task;
}

export async function createTask(input: CreateTaskInput) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: input.title,
      description: input.description || null,
      status: input.status || "todo",
      priority: input.priority || "medium",
      user_id: input.user_id || null,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

export async function updateTask(id: string, input: UpdateTaskInput) {
  const { data, error } = await supabase
    .from("tasks")
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

export async function deleteTask(id: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);

  if (error) throw error;
  return { success: true };
}

export async function updateTaskStatus(id: string, status: Task["status"]) {
  return updateTask(id, { status });
}

export async function getTaskStats() {
  const { data, error } = await supabase.from("tasks").select("status");

  if (error) throw error;

  const stats = {
    total: data.length,
    todo: data.filter((t) => t.status === "todo").length,
    "in-progress": data.filter((t) => t.status === "in-progress").length,
    done: data.filter((t) => t.status === "done").length,
  };

  return stats;
}
