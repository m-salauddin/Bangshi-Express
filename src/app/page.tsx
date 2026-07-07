import NewsCard from "@/components/NewsCard";
import AdBanner from "@/components/AdBanner";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

// fetching news, total count, and active ads simultaneously
type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

// google drive link to direct media url generate function
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

export default async function Home({ searchParams }: Props) {
  // pagination logic
  const params = await searchParams;
  const currentPage = Number(params.page) || 1; // default page 1
  const limit = 10; // every page have 10 news
  const skip = (currentPage - 1) * limit;

  // ২. Promise.all use fertching news, total count, and active ads simultaneously
  const [newsList, totalNews, activeAds] = await Promise.all([
    prisma.news.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: skip, 
      take: limit, 
    }),
    prisma.news.count({ where: { isPublished: true } }), 
    prisma.advertisement.findMany({
      where: {
        isActive: true,
        OR: [
          { endDate: null },             
          { endDate: { gte: new Date() } } 
        ]
      }
    })
  ]);

  // home page top ad fetch
  const homeTopAd = activeAds.find((ad) => ad.position === "home_top");
  
  // total page count calculate
  const totalPages = Math.ceil(totalNews / limit);

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 min-h-[60vh]">
      
      {/* dynamic advertisement */}
      <AdBanner ad={homeTopAd} className="mb-8" />

      <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white border-l-4 border-red-600 pl-3">
          সর্বশেষ সংবাদ
        </h2>
      </div>

      {/* news grid */}
      {newsList.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-24 bg-gray-50 dark:bg-gray-800/20 rounded-2xl">
          <p className="text-xl text-gray-500">এখনো কোনো সংবাদ প্রকাশিত হয়নি।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsList.map((news) => (
            <NewsCard 
              key={news.id}
              id={news.id}
              title={news.title}
              // server side rendering function to convert Google Drive link to direct media URL
              thumbnail={news.thumbnail ? getDirectMediaUrl(news.thumbnail) : "https://placehold.co/600x400/cccccc/white?text=No+Image"}
              categoryName={news.category?.nameBn || "অন্যান্য"} 
              views={news.views}
              date={new Date(news.createdAt).toLocaleDateString("bn-BD")}
            />
          ))}
        </div>
      )}

      {/* ৩. page navigation (Next / Previous) */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          
          {/* Previous Button */}
          {currentPage > 1 ? (
            <Link 
              href={`/?page=${currentPage - 1}`}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" /> আগের পাতা
            </Link>
          ) : (
            <button disabled className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 rounded-lg text-sm font-semibold cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" /> আগের পাতা
            </button>
          )}

          {/* Page Info */}
          <span className="text-sm font-medium text-gray-500 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">
            পেজ {currentPage} / {totalPages}
          </span>

          {/* Next Button */}
          {currentPage < totalPages ? (
            <Link 
              href={`/?page=${currentPage + 1}`}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-red-600 transition-all shadow-sm"
            >
              পরবর্তী পাতা <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <button disabled className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 rounded-lg text-sm font-semibold cursor-not-allowed">
              পরবর্তী পাতা <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

    </div>
  );
}