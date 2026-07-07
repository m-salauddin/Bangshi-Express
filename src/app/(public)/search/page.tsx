import { prisma } from "@/lib/prisma";
import NewsCard from "@/components/NewsCard";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

// convert google drive link to direct media link
const getDirectMediaUrl = (url: string | null) => {
  if (!url) return "";
  
  let fileId = null;

  const match1 = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (match1 && match1[1]) {
    fileId = match1[1];
  } else if (match2 && match2[1]) {
    fileId = match2[1];
  }
  
  if (fileId) {
    const driveDirectUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    return `https://wsrv.nl/?url=${encodeURIComponent(driveDirectUrl)}`;
  }
  
  return url; 
};

export default async function SearchPage({ searchParams }: Props) {
  // get search params from url
  const params = await searchParams;
  const q = params.q;
  const categorySlug = params.category;
  const districtId = params.district;
  const upazilaId = params.upazila;
  const unionId = params.union;

  // use where clause to filter news based on search params
  const whereClause: any = { isPublished: true };
  
  // if there is a search query, add it to the where clause
  if (q) {
    whereClause.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { content: { contains: q, mode: "insensitive" } }
    ];
  }
  
  // logic to filter by category, district, upazila, and union
  if (categorySlug) whereClause.category = { slug: categorySlug };
  if (districtId) whereClause.districtId = districtId;
  if (upazilaId) whereClause.upazilaId = upazilaId;
  if (unionId) whereClause.unionId = unionId;

  // fetch news from database based on the where clause
  const newsList = await prisma.news.findMany({
    where: whereClause,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 min-h-[60vh]">
      {/* result header */}
      <div className="mb-8 mt-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {q ? `"${q}" এর জন্য অনুসন্ধানের ফলাফল` : "সকল সংবাদের ফলাফল"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {newsList.length} টি সংবাদ পাওয়া গেছে
        </p>
      </div>

      {/* News Cards */}
      {newsList.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-24 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
            আপনার শর্ত অনুযায়ী কোনো সংবাদ পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsList.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              // convert google drive link to direct media link
              thumbnail={news.thumbnail ? getDirectMediaUrl(news.thumbnail) : "https://placehold.co/600x400/cccccc/white?text=No+Image"}
              categoryName={news.category?.nameBn || "অন্যান্য"} 
              views={news.views}
              date={new Date(news.createdAt).toLocaleDateString("bn-BD")}
            />
          ))}
        </div>
      )}
    </div>
  );
}