import { prisma } from "@/lib/prisma";
import LocationManager from "./LocationManager";

export default async function AdminLocationsPage() {
  // fetching all locations (districts, upazilas, unions) from the database in parallel
  const [districts, upazilas, unions] = await Promise.all([
    prisma.district.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.upazila.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.union.findMany({ orderBy: { nameBn: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          লোকেশন ম্যানেজমেন্ট
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          এখান থেকে আপনি ওয়েবসাইটের জন্য জেলা, উপজেলা ও ইউনিয়ন ডায়নামিকালি নিয়ন্ত্রণ করতে পারবেন।
        </p>
      </div>

      {/* location manager */}
      <LocationManager 
        districts={districts} 
        upazilas={upazilas} 
        unions={unions} 
      />
    </div>
  );
}