import { z } from "zod";

export const getProjectsQuerySchema = z.object({
  category: z.string().trim().optional(),
  featured: z
    .enum(["true", "false", "1", "0"])
    .optional()
    .transform((val) => (val !== undefined ? val === "true" || val === "1" : undefined)),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(20),
});

export const getProjectParamSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "Project slug or ID is required")
    .regex(/^[a-z0-9-_]+$/i, "Invalid project ID format"),
});
