import { prisma } from "@/lib/prisma";
import EditForm from "./EditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 💥 সমান্তরালভাবে নিউজ, ক্যাটাগরি এবং লোকেশনের ডাটাগুলো আনছি
  const [news, categories, districts, upazilas, unions] = await Promise.all([
    prisma.news.findUnique({ where: { id: id } }),
    prisma.category.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.district.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.upazila.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.union.findMany({ orderBy: { nameBn: "asc" } })
  ]);

  // যদি এই আইডির কোনো নিউজ না পাওয়া যায়
  if (!news) notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          সংবাদ এডিট করুন
        </h1>
        <Link 
          href="/admin/dashboard/news" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> ফিরে যান
        </Link>
      </div>

      {/* 💥 ফর্মে পুরোনো ডাটার পাশাপাশি লোকেশনগুলোও পাঠিয়ে দিচ্ছি */}
      <EditForm 
        categories={categories} 
        districts={districts}
        upazilas={upazilas}
        unions={unions}
        initialData={news} 
      />
    </div>
  );
}