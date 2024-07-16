"use server";

import { z } from "zod";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImagesById } from "@/lib/data";

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

  const { title, image } = validatedFields.data;

  const { url } = await put(image.name, image, { access: "public", multipart: true });

  try {
    await prisma.upload.create({
      data: {
        title,
        image: url,
      },
    });
  } catch (error) {
    return { message: "Failed to upload image" };
  }

  revalidatePath("/");
  redirect("/");
};

export const deleteImage = async (id: string) => {
  const data = await getImagesById(id);
  if (!data) return { message: "No image found" };

  await del(data.image);
  try {
    await prisma.upload.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return { message: "Failed to delete data" };
  }
};

revalidatePath("/");
