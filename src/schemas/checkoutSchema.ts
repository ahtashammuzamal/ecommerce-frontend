import z from "zod/v3";

export const checkoutSchema = z.object({
  firstName: z.string().min(3, "At least 3 characters required"),
  lastName: z.string().optional(),
  address: z.string().min(10, "At least 10 character"),
  appartment: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string().regex(/^\d{4,6}$/, "Invalid zip code"),
  phone: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
});
