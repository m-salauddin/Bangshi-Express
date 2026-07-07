import { prisma } from "@/lib/prisma";
import NewsCard from "./NewsCard";
import TranslatedText from "./TranslatedText"; 

type Props = {
  categoryId: string;
  currentNewsId: string;
};

export default async function RelatedNews({ categoryId, currentNewsId }: Props) {
  // 💥 Fetch related news from the database using Prisma
  const relatedNewsList = await prisma.news.findMany({
    where: {
      categoryId: categoryId,
      isPublished: true,
      id: { not: currentNewsId }, // currentNewsId skiped
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
    take: 4, 
  });

  if (relatedNewsList.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-red-600 pl-3">
          
          <TranslatedText bn="সম্পর্কিত আরও খবর" en="Related News" />
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedNewsList.map((news) => (
          <NewsCard
            key={news.id}
            id={news.id}
            title={news.title}
            thumbnail={news.thumbnail || "https://placehold.co/600x400/cccccc/white?text=No+Image"}
            categoryName={news.category?.nameBn || "অন্যান্য"} 
            views={news.views}
            date={new Date(news.createdAt).toLocaleDateString("bn-BD")}
          />
        ))}
      </div>
    </div>
  );
}