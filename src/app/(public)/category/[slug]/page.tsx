import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";

type Props = {
  params: Promise<{ slug: string }>;
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

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // ১. Prothome category slug diye checking korchi jeta database-e ache kina
  const category = await prisma.category.findUnique({
    where: { slug: slug },
  });

  // Category na thakle 404 dekhabe
  if (!category) {
    notFound();
  }

  // ২. Oi category-r odhine thaka shob published news niye ashchi
  const newsList = await prisma.news.findMany({
    where: {
      categoryId: category.id,
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc", // Shorboshesh khobor agey dekhabe
    },
  });

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      
      {/* Category Header */}
      <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white border-l-4 border-red-600 pl-3">
          ক্যাটাগরি: {category.nameBn || category.nameEn}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          মোট {newsList.length} টি সংবাদ পাওয়া গেছে
        </p>
      </div>

      {/* News Grid (Fully Responsive Senior Dev Layout) */}
      {newsList.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-24 bg-gray-50 dark:bg-gray-800/20 rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-xl font-medium text-gray-500 dark:text-gray-400">
            এই ক্যাটাগরিতে এই মুহূর্তে কোনো সংবাদ পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsList.map((news) => (
            <NewsCard
              key={news.id}
              id={news.id}
              title={news.title}
              // use convert function
              thumbnail={news.thumbnail ? getDirectMediaUrl(news.thumbnail) : "https://placehold.co/600x400/cccccc/white?text=No+Image"}
              categoryName={category.nameBn || category.nameEn}
              views={news.views}
              date={new Date(news.createdAt).toLocaleDateString("bn-BD")}
            />
          ))}
        </div>
      )}

    </div>
  );
}