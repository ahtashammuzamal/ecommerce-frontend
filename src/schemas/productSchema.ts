import z from "zod/v3";

export const productSchema = z.object({
  title: z.string().min(10, "At least 10 characters"),
  description: z.string().min(50, "At least 50 characters required"),
  images: z
    .array(z.union([z.instanceof(File), z.string()]))
    .max(5, "Maximum 5 images allowed")
    .min(1, "At least 1 image is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  categoryId: z.coerce
    .number({ invalid_type_error: "" })
    .int()
    .positive("Please select a category"),
});
