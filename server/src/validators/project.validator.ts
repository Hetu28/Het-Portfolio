import { z } from "zod";
import { sanitizeText } from "../utils/sanitize";

export const getProjectsQuerySchema = z
  .object({
    category: z
      .string()
      .trim()
      .max(50, "Category filter is too long")
      .transform(sanitizeText)
      .optional(),
    featured: z
      .enum(["true", "false", "1", "0"])
      .optional()
      .transform((val) => (val !== undefined ? val === "true" || val === "1" : undefined)),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(50).default(20),
  })
  .strict();

export const getProjectParamSchema = z
  .object({
    id: z
      .string()
      .trim()
      .min(1, "Project slug or ID is required")
      .max(100, "Project slug is too long")
      .regex(/^[a-z0-9-_]+$/i, "Invalid project ID format"),
  })
  .strict();
