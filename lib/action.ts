"use server";

import { z } from "zod";

const UploadSchema = z.object({
  title: z.string().min(1),
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), { message: "image must be an image" })
    .refine((file) => file.size < 1024 * 1024 * 5, { message: "image must be less than 5MB" }),
});

export const uploadImage = async (prevState: any, formData: FormData) => {
  const validatedFields = UploadSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
};
