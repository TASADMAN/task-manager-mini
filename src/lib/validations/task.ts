import { z } from "zod";

export const taskFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  description: z
    .string()
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
  status: z.enum(["todo", "in-progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
