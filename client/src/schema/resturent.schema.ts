import { z } from "zod";

export const resturentSchema = z.object({
  resturentName: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters long"),
  city: z.string().min(3, "City name must be at least 3 characters long"),
  country: z.string().min(3, "Country name must be at least 3 characters long"),
  deliveryTime: z
    .number()
    .min(0, "Delivery time must be a non-negative number"),
  cuisines: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => (file ? file.size > 0 : true),
      "Image file is required if provided"
    ),
});

export type RestaurantFormSchema = z.infer<typeof resturentSchema>;
