import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  description: z.string().min(20, { message: "description is required" }),
  price: z.number().min(0, { message: "Price can not be negative" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});
export type MenuFormSchema = z.infer<typeof menuSchema>;
