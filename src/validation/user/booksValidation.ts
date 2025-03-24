import { z, ZodType } from "zod";

export const VSCREATEBOOK: ZodType = z.object({
  booksName: z.string().min(3),
  categoryId: z.string(),
  bookSourceId: z.string(),
});
export const VSCREATECATEGORY: ZodType = z.object({
  name: z.string().min(3),
});
export const VSCREATEBOOKSOURCE: ZodType = z.object({
  name: z.string().min(3),
});
