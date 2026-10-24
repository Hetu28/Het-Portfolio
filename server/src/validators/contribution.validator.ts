import { z } from "zod";
import { sanitizeText } from "../utils/sanitize";

export const getContributionsQuerySchema = z
  .object({
    category: z
      .string()
      .trim()
      .max(60, "Category filter is too long")
      .transform(sanitizeText)
      .optional(),
  })
  .strict();
