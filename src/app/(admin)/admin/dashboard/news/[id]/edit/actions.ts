"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function updateNews(newsId: string, formData: FormData) {
  // get form data values
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const isPublished = formData.get("isPublished") === "true";

  // get location ids from form data
  const districtId = formData.get("districtId") as string;
  const upazilaId = formData.get("upazilaId") as string;
  const unionId = formData.get("unionId") as string;

  if (!title || !content || !categoryId) {
    return { error: "শিরোনাম, ক্যাটাগরি এবং বিস্তারিত সংবাদ অবশ্যই দিতে হবে!" };
  }

  try {
    // update news in the database
    await prisma.news.update({
      where: { id: newsId },
      data: {
        title,
        content,
        thumbnail: thumbnail ? thumbnail : undefined,
        categoryId,
        isPublished,
        districtId: districtId ? districtId : null,
        upazilaId: upazilaId ? upazilaId : null,
        unionId: unionId ? unionId : null,
      },
    });
  } catch (error) {
    console.error("Prisma Update News Error: ", error);
    return { error: "সার্ভারে সমস্যা হয়েছে! আপডেট হয়নি।" };
  }

  // সফল হলে লিস্ট পেজে রিডাইরেক্ট করা
  redirect("/admin/dashboard/news");
}