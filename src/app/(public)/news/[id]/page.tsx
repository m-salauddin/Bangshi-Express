import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Calendar, Eye, User, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";
import AdBanner from "@/components/AdBanner";
import NewsLocation from "@/components/NewsLocation";
import TranslatedText from "@/components/TranslatedText";
import RelatedNews from "@/components/RelatedNews";

import { Metadata } from "next"; 

// dynamic seo 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const news = await prisma.news.findUnique({ where: { id } });

  if (!news) {
    return { title: "সংবাদ পাওয়া যায়নি | Bangshi Express" };
  }

  // get 150 word from content 
  const description = news.subtitle 
    ? news.subtitle 
    : news.content.replace(/<[^>]+>/g, '').substring(0, 150) + "...";

  return {
    title: `${news.title} | Bangshi Express`,
    description: description,
    keywords: news.tags ? news.tags.split(",") : ["News", "Bangshi Express", "Bangladesh News"],
    openGraph: {
      title: news.title,
      description: description,
      url: `https://yourwebsite.com/news/${news.id}`,
      siteName: "Bangshi Express",
      images: [
        {
          url: news.thumbnail ? getDirectMediaUrl(news.thumbnail) : "https://yourwebsite.com/default-image.jpg",
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
      locale: "bn_BD",
      type: "article",
    },
  };
}

type Props = {
  params: Promise<{ id: string }>;
};

// show drive image use proxy image 
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

export default async function NewsDetailsPage({ params }: Props) {
  const { id } = await params;

  const [news, activeAds] = await Promise.all([
    prisma.news.update({
      where: { id: id },
      data: { views: { increment: 1 } },
      include: {
        category: true,
        author: true,
        district: true,
        upazila: true,
        union: true,
      },
    }).catch(() => null),
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

  if (!news) notFound();

  const getAdForPosition = (positionName: string) => {
    const specificAd = activeAds.find(ad => ad.position === positionName && ad.newsId === news.id);
    if (specificAd) return specificAd;
    return activeAds.find(ad => ad.position === positionName && !ad.newsId);
  };

  const articleTopAd = getAdForPosition("article_top");
  const articleMiddle1Ad = getAdForPosition("article_middle_1");
  const articleMiddle2Ad = getAdForPosition("article_middle_2");
  const articleBottomAd = getAdForPosition("article_bottom");

  const paragraphs = news.content
    .split(/\n|<\/?p>/)
    .map(p => p.trim())
    .filter(p => p !== "");

  return (
    <article className="container mx-auto px-4 md:px-8 py-10 max-w-5xl">
      
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-red-600 transition-colors">হোম</Link>
        <span>/</span>
        <Link href={`/category/${news.category.slug}`} className="hover:text-red-600 transition-colors">
          <TranslatedText bn={news.category.nameBn} en={news.category.nameEn} />
        </Link>
      </nav>

      <header className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <Link href={`/category/${news.category.slug}`} className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 px-3 py-1.5 rounded-md text-sm font-semibold mb-4">
          <Tag className="w-4 h-4" /> 
          <TranslatedText bn={news.category.nameBn} en={news.category.nameEn} />
        </Link>
        
        <h1 className={`text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight ${news.subtitle ? 'mb-3' : 'mb-6'}`}>
          {news.title}
        </h1>

        {news.subtitle && (
          <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium mb-6 leading-snug">
            {news.subtitle}
          </h2>
        )}

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2 font-medium">
            <User className="w-4 h-4" /> 
            {news.reporterName ? news.reporterName : news.author.name}
          </div>
          <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(news.createdAt).toLocaleDateString("bn-BD")}</div>
          <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-red-500" /> {news.views} পড়া হয়েছে</div>
          <NewsLocation district={news.district} upazila={news.upazila} union={news.union} />
        </div>
      </header>

      {/* set image size in center */}
      {news.thumbnail && (
        <figure className="mb-8 w-full flex justify-center py-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-sm">
          <img 
            src={getDirectMediaUrl(news.thumbnail)} 
            alt={news.title} 
            className="w-auto h-auto max-w-full max-h-[350px] object-contain rounded-lg" 
          />
        </figure>
      )}

      <AdBanner ad={articleTopAd} className="mb-8" />

      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed space-y-6">
        {paragraphs.map((paragraph, index) => (
          <React.Fragment key={index}>
            <p className="mb-4">{paragraph}</p>
            {index === 1 && <AdBanner ad={articleMiddle1Ad} className="my-8" />}
            {index === 3 && <AdBanner ad={articleMiddle2Ad} className="my-8" />}
          </React.Fragment>
        ))}
      </div>

      {news.tags && (
        <div className="mt-10 flex flex-wrap gap-2 items-center">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300 mr-2 flex items-center gap-1.5">
            <Tag className="w-4 h-4" /> ট্যাগ:
          </span>
          {news.tags.split(',').map((tag, index) => {
            const trimmedTag = tag.trim();
            if (!trimmedTag) return null;
            return (
              <span 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm font-medium"
              >
                {trimmedTag}
              </span>
            );
          })}
        </div>
      )}

      <AdBanner ad={articleBottomAd} className="mt-12 mb-8 border-t border-gray-100 dark:border-gray-800 pt-8" />

      <RelatedNews 
        categoryId={news.categoryId} 
        currentNewsId={news.id} 
      />
      
    </article>
  );
}