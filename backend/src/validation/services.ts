import z from "zod";

export const createServiceValidation = z.object({
  name: z.string(),
  cost: z.number().nonnegative(),
  description: z.string().optional(),
  projectId: z.string().uuid(),
});
