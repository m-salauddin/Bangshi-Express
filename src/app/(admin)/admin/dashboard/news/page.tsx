import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit, ExternalLink } from "lucide-react";
import DeleteButton from "./DeleteButton";
import CopyIdButton from "./CopyIdButton"; 

export default async function AdminNewsListPage() {
  // fetct news list from the database using Prisma
  const newsList = await prisma.news.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      
      {/* page header  */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          সকল সংবাদ
        </h1>
        <Link
          href="/admin/dashboard/news/create"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" /> নতুন সংবাদ যুক্ত করুন
        </Link>
      </div>

      {/* News list table  */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">ছবি</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">শিরোনাম</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">সংবাদ আইডি</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">ক্যাটাগরি</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">স্ট্যাটাস</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300">ভিউ</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {newsList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-gray-500 font-medium">
                    এখনো কোনো সংবাদ যুক্ত করা হয়নি।
                  </td>
                </tr>
              ) : (
                newsList.map((news) => (
                  <tr key={news.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                    
                    {/* Thumbnail */}
                    <td className="p-4">
                      <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                        <img 
                          src={news.thumbnail || "https://placehold.co/100x100/cccccc/white?text=News"} 
                          alt="thumbnail" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </td>
                    
                    {/* Title */}
                    <td className="p-4">
                      <p className="font-semibold text-gray-900 dark:text-white line-clamp-2 max-w-xs">
                        {news.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(news.createdAt).toLocaleDateString("bn-BD")}
                      </p>
                    </td>

                    {/* news id copy button  */}
                    <td className="p-4">
                      <CopyIdButton id={news.id} />
                    </td>
                    
                    {/* category */}
                    <td className="p-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                      {news.category.nameBn}
                    </td>
                    
                    {/* status bar  */}
                    <td className="p-4">
                      {news.isPublished ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500 border border-green-200 dark:border-green-800/50">
                          পাবলিশড
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500 border border-amber-200 dark:border-amber-800/50">
                          ড্রাফট
                        </span>
                      )}
                    </td>
                    
                    {/* Count view */}
                    <td className="p-4 text-sm font-bold text-gray-600 dark:text-gray-300">
                      {news.views}
                    </td>
                    
                    {/* all actions button */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={`/news/${news.id}`} 
                          target="_blank" 
                          title="লাইভ দেখুন"
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        
                        <Link 
                          href={`/admin/dashboard/news/${news.id}/edit`} 
                          title="এডিট করুন" 
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        
                        <DeleteButton id={news.id} />
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}