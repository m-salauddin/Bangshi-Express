import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // fetching all published news from the database
  const newsList = await prisma.news.findMany({
    where: { isPublished: true },
    select: { id: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
  });

  // fetching all categories from the database
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });

  const baseUrl = "https://bangshiexpress.com"; //my url

  // ১. dynamic news urls generate
  const newsUrls = newsList.map((news) => ({
    url: `${baseUrl}/news/${news.id}`,
    lastModified: news.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  // ২. dynamic category urls generate
  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // ৩. fixed urls 
  const fixedUrls = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 1.0, // home page has the highest priority
    },
  ];

  return [...fixedUrls, ...categoryUrls, ...newsUrls];
}