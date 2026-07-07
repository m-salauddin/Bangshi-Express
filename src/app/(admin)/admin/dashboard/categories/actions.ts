"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// new category create function
export async function createCategory(formData: FormData) {
  try {
    const nameBn = formData.get("nameBn")?.toString().trim() || "";
    const nameEn = formData.get("nameEn")?.toString().trim() || "";
    let slug = formData.get("slug")?.toString().trim().toLowerCase() || "";

    if (!nameBn || !nameEn || !slug) {
      return { error: "সবগুলো ঘর পূরণ করা আবশ্যক।" };
    }

    // replace spaces with hyphens in the slug
    slug = slug.replace(/\s+/g, '-');

    await prisma.category.create({
      data: {
        nameBn,
        nameEn,
        slug,
      },
    });

    revalidatePath("/admin/dashboard/categories");
    return { success: true };
  } catch (error) {
    return { error: "ক্যাটাগরি তৈরি করতে সমস্যা হয়েছে অথবা এই স্লাগটি আগেই ব্যবহৃত হয়েছে।" };
  }
}

// ২. category update function
export async function updateCategory(id: string, formData: FormData) {
  try {
    const nameBn = formData.get("nameBn")?.toString().trim() || "";
    const nameEn = formData.get("nameEn")?.toString().trim() || "";
    let slug = formData.get("slug")?.toString().trim().toLowerCase() || "";

    if (!nameBn || !nameEn || !slug) {
      return { error: "সবগুলো ঘর পূরণ করা আবশ্যক।" };
    }

    slug = slug.replace(/\s+/g, '-');

    await prisma.category.update({
      where: { id },
      data: {
        nameBn,
        nameEn,
        slug,
      },
    });

    revalidatePath("/admin/dashboard/categories");
    return { success: true };
  } catch (error) {
    return { error: "ক্যাটাগরি আপডেট করতে সমস্যা হয়েছে।" };
  }
}

// category delete function
export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/dashboard/categories");
    return { success: true };
  } catch (error) {
    return { error: "ক্যাটাগরি ডিলিট করতে সমস্যা হয়েছে।" };
  }
}