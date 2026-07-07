"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function createAd(formData: FormData) {
  try {
    const title = formData.get("title")?.toString() || "";
    const position = formData.get("position")?.toString() || "";
    
    const rawLink = formData.get("link")?.toString();
    const link = (rawLink && rawLink.trim() !== "") ? rawLink.trim() : null;

    const rawButtonText = formData.get("buttonText")?.toString();
    const buttonText = (rawButtonText && rawButtonText.trim() !== "") ? rawButtonText.trim() : null;

    const rawNewsId = formData.get("newsId")?.toString();
    const newsId = (rawNewsId && rawNewsId.trim() !== "") ? rawNewsId.trim() : null;

    // Auto expiry date parsing
    const rawEndDate = formData.get("endDate")?.toString();
    const endDate = (rawEndDate && rawEndDate.trim() !== "") ? new Date(rawEndDate) : null;

    const uploadType = formData.get("uploadType")?.toString();
    let imageUrl = "";

    if (uploadType === "file") {
      const file = formData.get("imageFile") as File;
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
        const uploadDir = path.join(process.cwd(), "public/uploads");
        
        await mkdir(uploadDir, { recursive: true });
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);
        imageUrl = `/uploads/${filename}`; 
      }
    } else {
      imageUrl = formData.get("imageUrl")?.toString() || "";
    }

    const adData: any = {
      title: title,
      imageUrl: imageUrl,
      position: position,
    };

    if (link) adData.link = link;
    if (buttonText) adData.buttonText = buttonText;
    if (newsId) adData.newsId = newsId;
    if (endDate) adData.endDate = endDate; // Database-e date-time set hocche

    await prisma.advertisement.create({
      data: adData
    });
    
    revalidatePath("/admin/dashboard/ads");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "বিজ্ঞাপন তৈরি করতে সমস্যা হয়েছে।" };
  }
}

export async function deleteAd(id: string) {
  try {
    await prisma.advertisement.delete({ where: { id } });
    revalidatePath("/admin/dashboard/ads");
    return { success: true };
  } catch (error) {
    return { error: "বিজ্ঞাপন ডিলিট করতে সমস্যা হয়েছে।" };
  }
}

export async function toggleAdStatus(id: string, isActive: boolean) {
  try {
    await prisma.advertisement.update({
      where: { id },
      data: { isActive: !isActive }
    });
    revalidatePath("/admin/dashboard/ads");
    return { success: true };
  } catch (error) {
    return { error: "স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।" };
  }
}