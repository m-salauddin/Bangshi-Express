import { prisma } from "@/lib/prisma";
import CategoryManager from "./CategoryManager";

export default async function AdminCategoriesPage() {
  // fetching all categories from the database
  const categories = await prisma.category.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          ক্যাটাগরি ম্যানেজমেন্ট
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          এখান থেকে আপনি সংবাদের ক্যাটাগরিগুলো তৈরি, আপডেট বা ডিলিট করতে পারবেন।
        </p>
      </div>

      {/* category manager */}
      <CategoryManager categories={categories} />
    </div>
  );
}