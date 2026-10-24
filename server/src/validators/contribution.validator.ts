import { z } from "zod";

export const getContributionsQuerySchema = z.object({
  category: z.string().trim().optional(),
});
