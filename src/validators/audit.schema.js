import { z } from "zod";

export const auditSchema = z.object({
  url: z
    .string()
    .min(3)
    .max(2048)
});