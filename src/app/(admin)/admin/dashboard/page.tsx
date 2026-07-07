import { prisma } from "@/lib/prisma";
import { FileText, Layers, Eye, Users } from "lucide-react";


export default async function DashboardPage() {
  // fatch total news, total categories, and total views from the database using Prisma
  const totalNews = await prisma.news.count();
  const totalCategories = await prisma.category.count();
  
  // set total views to 0 if there are no news items to avoid null value
  const viewsData = await prisma.news.aggregate({
    _sum: { views: true },
  });
  const totalViews = viewsData._sum.views || 0;

  // stats array to display in the dashboard cards
  const stats = [
    { title: "মোট সংবাদ", value: totalNews, icon: FileText, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/20" },
    { title: "মোট ক্যাটাগরি", value: totalCategories, icon: Layers, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/20" },
    { title: "সর্বমোট ভিউ", value: totalViews, icon: Eye, color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/20" },
    { title: "অ্যাডমিন", value: 1, icon: Users, color: "text-orange-600", bg: "bg-orange-100 dark:bg-orange-900/20" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        ড্যাশবোর্ড ওভারভিউ
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
              <div className={`p-4 rounded-lg ${stat.bg}`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">স্বাগতম!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          এটি আপনার ওয়েবসাইটের কন্ট্রোল প্যানেল। এখান থেকে আপনি নতুন সংবাদ প্রকাশ, ক্যাটাগরি যুক্ত এবং ওয়েবসাইটের অন্যান্য তথ্য ম্যানেজ করতে পারবেন।
        </p>
      </div>
    </div>
  );
}