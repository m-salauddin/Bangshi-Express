import { prisma } from "@/lib/prisma";
import AdManager from "./AdManager";

export default async function AdminAdsPage() {
  // fetching all ads from the database
  const ads = await prisma.advertisement.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          বিজ্ঞাপন ম্যানেজমেন্ট
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          এখান থেকে আপনি ওয়েবসাইটের বিভিন্ন পজিশনে ডাইনামিক বিজ্ঞাপন যুক্ত এবং কন্ট্রোল করতে পারবেন।
        </p>
      </div>

      <AdManager ads={ads} />
    </div>
  );
}