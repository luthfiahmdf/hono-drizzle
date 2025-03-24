import { z, ZodType } from "zod";

export const VSREGISTER: ZodType = z.object({
  username: z.string(),
  password: z.string().min(8),
});
export const VSLOGIN: ZodType = z.object({
  username: z.string(),
  password: z.string().min(8),
});
