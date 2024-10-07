import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const strongPasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  );

const contactSchema = z
  .string()
  .regex(/^\d{10}$/, "Contact number must be exactly 10 digits");

export const userSignUpSchema = z.object({
  fullName: z.string().min(1, "Fullname is required"),
  email: emailSchema,
  password: strongPasswordSchema,
  contact: contactSchema,
});

export const userLoginSchema = z.object({
  email: emailSchema,
  password: strongPasswordSchema,
});

export type SignupInputState = z.infer<typeof userSignUpSchema>;
export type LoginInputState = z.infer<typeof userLoginSchema>;
