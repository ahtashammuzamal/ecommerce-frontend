import z from "zod/v3";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "Min 6 characters"),
    newPassword: z.string().min(6, "Min 6 character"),
    confirmNewPassword: z.string().min(6, "Min 6 character"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Password does not match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });
