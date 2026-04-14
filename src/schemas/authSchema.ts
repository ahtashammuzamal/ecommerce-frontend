import z from "zod/v3";

export const registerSchema = z.object({
  name: z.string().min(3, "Name should be of atleast 3 characters"),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(6, "Min 6 characters"),
});

export const loginSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Min 6 characters"),
});
