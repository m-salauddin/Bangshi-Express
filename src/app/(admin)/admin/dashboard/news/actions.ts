"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteNews(id: string) {
  try {
    // delete the news item from the database using Prisma
    await prisma.news.delete({
      where: { id: id },
    });

    // update the cache for the news page to reflect the deletion
    revalidatePath("/admin/dashboard/news");
    
    return { success: true };
  } catch (error) {
    return { error: "সংবাদটি ডিলিট করতে সার্ভারে কোনো সমস্যা হয়েছে!" };
  }
}