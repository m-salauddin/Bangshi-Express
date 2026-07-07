import { prisma } from "@/lib/prisma";
import CreateForm from "./CreateForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateNewsPage() {
  // ক্যাটাগরি এবং লোকেশনের ডাটাগুলো একসাথে আনছি
  // ক্যাটাগরি এবং লোকেশনের ডাটাগুলো একসাথে আনছি
  const [categories, districts, upazilas, unions] = await Promise.all([
    // 💥 name এর জায়গায় nameBn দেওয়া হয়েছে
    prisma.category.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.district.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.upazila.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.union.findMany({ orderBy: { nameBn: "asc" } }),
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          নতুন সংবাদ যুক্ত করুন
        </h1>
        <Link 
          href="/admin/dashboard/news" 
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> ফিরে যান
        </Link>
      </div>

      {/* ফর্মে সমস্ত ডাটা প্রপস হিসেবে পাঠিয়ে দিচ্ছি */}
      <CreateForm 
        categories={categories} 
        districts={districts}
        upazilas={upazilas}
        unions={unions}
      />
    </div>
  );
}