import { createClient } from "@/lib/supabase/client";
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilters,
  SortBy,
  SortOrder,
} from "@/types/task";

// ============================================
// Get Tasks (แยกตาม user)
// ============================================
export async function getTasks(
  filters?: TaskFilters,
  sortBy: SortBy = "created_at",
  sortOrder: SortOrder = "desc",
) {
  const supabase = createClient();

  // ← เพิ่ม: Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // ← เพิ่ม: Filter by user_id
  let query = supabase.from("tasks").select("*").eq("user_id", user.id); // ← เพิ่มบรรทัดนี้

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

// ============================================
// Get Task By ID (เช็ค user)
// ============================================
export async function getTaskById(id: string) {
  const supabase = createClient();

  // ← เพิ่ม: Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id) // ← เพิ่มบรรทัดนี้
    .single();

  if (error) throw error;
  return data as Task;
}

// ============================================
// Create Task (ใส่ user_id อัตโนมัติ)
// ============================================
export async function createTask(input: CreateTaskInput) {
  const supabase = createClient();

  // ← เพิ่ม: Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert({
      title: input.title,
      description: input.description || null,
      status: input.status || "todo",
      priority: input.priority || "medium",
      user_id: user.id, // ← เปลี่ยนเป็น user.id
    })
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

// ============================================
// Update Task (เช็ค user)
// ============================================
export async function updateTask(id: string, input: UpdateTaskInput) {
  const supabase = createClient();

  // ← เพิ่ม: Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // แปลง empty string เป็น null
  const cleanedInput = {
    ...input,
    description: input.description === "" ? null : input.description,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("tasks")
    .update(cleanedInput)
    .eq("id", id)
    .eq("user_id", user.id) // ← เพิ่มบรรทัดนี้
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

// ============================================
// Delete Task (เช็ค user)
// ============================================
export async function deleteTask(id: string) {
  const supabase = createClient();

  // ← เพิ่ม: Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // ← เพิ่มบรรทัดนี้

  if (error) throw error;
  return { success: true };
}

// ============================================
// Update Task Status
// ============================================
export async function updateTaskStatus(id: string, status: Task["status"]) {
  return updateTask(id, { status });
}

// ============================================
// Get Task Stats (แยกตาม user)
// ============================================
export async function getTaskStats() {
  const supabase = createClient();

  // ← เพิ่ม: Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("status")
    .eq("user_id", user.id); // ← เพิ่มบรรทัดนี้

  if (error) throw error;

  const stats = {
    total: data.length,
    todo: data.filter((t) => t.status === "todo").length,
    "in-progress": data.filter((t) => t.status === "in-progress").length,
    done: data.filter((t) => t.status === "done").length,
  };

  return stats;
}
