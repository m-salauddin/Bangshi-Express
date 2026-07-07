"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// actions for district, upazila, and union management
export async function createDistrict(formData: FormData) {
  const nameBn = formData.get("nameBn") as string;
  const nameEn = formData.get("nameEn") as string;
  if (!nameBn || !nameEn) return { error: "বাংলা ও ইংরেজি দুটি নামই আবশ্যক।" };

  try {
    await prisma.district.create({ data: { nameBn, nameEn } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "জেলা তৈরি করতে সমস্যা হয়েছে বা এই নামে ইতিমধ্যে আছে।" };
  }
}

export async function deleteDistrict(id: string) {
  try {
    await prisma.district.delete({ where: { id } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "এই জেলাটি ডিলিট করা যাচ্ছে না! এর অধীনে উপজেলা থাকতে পারে।" };
  }
}

export async function updateDistrict(id: string, formData: FormData) {
  const nameBn = formData.get("nameBn") as string;
  const nameEn = formData.get("nameEn") as string;
  try {
    await prisma.district.update({ where: { id }, data: { nameBn, nameEn } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "জেলা আপডেট করতে সমস্যা হয়েছে।" };
  }
}


// actions for upazila management
export async function createUpazila(formData: FormData) {
  const nameBn = formData.get("nameBn") as string;
  const nameEn = formData.get("nameEn") as string;
  const districtId = formData.get("districtId") as string;
  if (!districtId) return { error: "অনুগ্রহ করে আগে জেলা নির্বাচন করুন।" };
  if (!nameBn || !nameEn) return { error: "বাংলা ও ইংরেজি দুটি নামই আবশ্যক।" };

  try {
    await prisma.upazila.create({ data: { nameBn, nameEn, districtId } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "উপজেলা তৈরি করতে সমস্যা হয়েছে।" };
  }
}

export async function deleteUpazila(id: string) {
  try {
    await prisma.upazila.delete({ where: { id } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "এই উপজেলাটি ডিলিট করা যাচ্ছে না! এর অধীনে ইউনিয়ন থাকতে পারে।" };
  }
}

export async function updateUpazila(id: string, formData: FormData) {
  const nameBn = formData.get("nameBn") as string;
  const nameEn = formData.get("nameEn") as string;
  try {
    await prisma.upazila.update({ where: { id }, data: { nameBn, nameEn } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "উপজেলা আপডেট করতে সমস্যা হয়েছে।" };
  }
}


// actions for union management
export async function createUnion(formData: FormData) {
  const nameBn = formData.get("nameBn") as string;
  const nameEn = formData.get("nameEn") as string;
  const upazilaId = formData.get("upazilaId") as string;
  if (!upazilaId) return { error: "অনুগ্রহ করে আগে উপজেলা নির্বাচন করুন।" };
  if (!nameBn || !nameEn) return { error: "বাংলা ও ইংরেজি দুটি নামই আবশ্যক।" };

  try {
    await prisma.union.create({ data: { nameBn, nameEn, upazilaId } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "ইউনিয়ন তৈরি করতে সমস্যা হয়েছে।" };
  }
}

export async function deleteUnion(id: string) {
  try {
    await prisma.union.delete({ where: { id } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "এই ইউনিয়নটি ডিলিট করা যাচ্ছে না।" };
  }
}

export async function updateUnion(id: string, formData: FormData) {
  const nameBn = formData.get("nameBn") as string;
  const nameEn = formData.get("nameEn") as string;
  try {
    await prisma.union.update({ where: { id }, data: { nameBn, nameEn } });
    revalidatePath("/admin/dashboard/locations");
    return { success: true };
  } catch (error) {
    return { error: "ইউনিয়ন আপডেট করতে সমস্যা হয়েছে।" };
  }
}