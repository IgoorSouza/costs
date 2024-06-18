import { z } from "zod";

export const createProjectValidation = z.object({
  name: z.string(),
  budget: z.number().nonnegative(),
  category: z.string(),
});

export const updateProjectValidation = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  budget: z.number().nonnegative().optional(),
  category: z.string().optional(),
});
