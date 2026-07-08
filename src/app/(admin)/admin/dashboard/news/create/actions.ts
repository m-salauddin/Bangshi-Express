"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

export async function createNews(formData: FormData) {
  // ফর্ম থেকে ডাটা নিচ্ছি
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const thumbnail = formData.get("thumbnail") as string;
  const categoryId = formData.get("categoryId") as string;
  const isPublished = formData.get("isPublished") === "true";
  
  // 💥 নতুন ফিল্ডগুলো নিচ্ছি
  const subtitle = formData.get("subtitle") as string;
  const reporterName = formData.get("reporterName") as string;
  const tags = formData.get("tags") as string;

  const districtId = formData.get("districtId") as string;
  const upazilaId = formData.get("upazilaId") as string;
  const unionId = formData.get("unionId") as string;

  // ১. বেসিক ভ্যালিডেশন
  if (!title || !content || !categoryId) {
    return { error: "শিরোনাম, ক্যাটাগরি এবং বিস্তারিত সংবাদ অবশ্যই দিতে হবে!" };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  // Verify using the SHARED helper so this action, the middleware, and the login
  // action all agree on the secret and algorithm.
  const payload = await verifyAdminToken(token);
  if (!payload) {
    return { error: "সেশন শেষ হয়ে গেছে, আবার লগইন করুন।" };
  }
  const userId = payload.userId;

  try {
    await prisma.news.create({
      data: {
        title,
        content,
        categoryId: categoryId,
        authorId: userId,
        isPublished,
        // 💥 অপশনাল ফিল্ডগুলো (খালি থাকলে undefined পাঠাচ্ছি যেন ডাটাবেজে null থাকে)
        subtitle: subtitle ? subtitle : undefined,
        reporterName: reporterName ? reporterName : undefined,
        tags: tags ? tags : undefined,
        thumbnail: thumbnail ? thumbnail : undefined,
        districtId: districtId ? districtId : undefined,
        upazilaId: upazilaId ? upazilaId : undefined,
        unionId: unionId ? unionId : undefined,
      },
    });
  } catch (error) {
    console.error("Prisma Create News Error: ", error);
    return { error: "সার্ভারে সমস্যা হয়েছে! নিউজটি সেভ হয়নি।" };
  }

  redirect("/admin/dashboard/news");
}