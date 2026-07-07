"use client";

import { useLanguage } from "@/components/LanguageProvider"; 
import { Info, Target, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {language === "BN" ? "আমাদের সম্পর্কে" : "About Us"}
        </h1>
        <div className="w-20 h-1.5 bg-red-600 mx-auto rounded-full"></div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 space-y-8">
        
        {/* Intro */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Info className="text-red-600 w-6 h-6" />
            {language === "BN" ? "বংশী এক্সপ্রেস কী?" : "What is Bangshi Express?"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg text-justify">
            {language === "BN" 
              ? "বংশী এক্সপ্রেস হলো বাংলাদেশের একটি অত্যাধুনিক এবং নির্ভরযোগ্য অনলাইন নিউজ পোর্টাল। আমাদের মূল লক্ষ্য হলো দেশ ও বিদেশের সর্বশেষ, বস্তুনিষ্ঠ এবং সত্য সংবাদ সবার আগে পাঠকের কাছে পৌঁছে দেওয়া। রাজনীতি, অর্থনীতি, বিনোদন, খেলাধুলা থেকে শুরু করে প্রযুক্তির জগতের সব খবরের এক বিশ্বস্ত মাধ্যম হলো বংশী এক্সপ্রেস।" 
              : "Bangshi Express is a modern and reliable online news portal in Bangladesh. Our main objective is to deliver the latest, objective, and true news from home and abroad to the readers first. Bangshi Express is a trusted medium for all news ranging from politics, economics, entertainment, sports to technology."}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 dark:border-gray-800">
          {/* Mission */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <Target className="text-red-600 w-5 h-5" />
              {language === "BN" ? "আমাদের লক্ষ্য" : "Our Mission"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "BN" 
                ? "সত্য প্রকাশে আপসহীন থেকে দেশ ও মানুষের কথা তুলে ধরাই আমাদের প্রধান লক্ষ্য। আমরা বিশ্বাস করি সঠিক তথ্য একটি সুস্থ সমাজ গঠনে সাহায্য করে।" 
                : "Our primary goal is to highlight the voice of the country and the people by remaining uncompromising in publishing the truth. We believe accurate information helps build a healthy society."}
            </p>
          </div>

          {/* Development & Tech */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
              <ShieldCheck className="text-red-600 w-5 h-5" />
              {language === "BN" ? "প্রযুক্তি ও ব্যবস্থাপনা" : "Tech & Management"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === "BN" 
                ? "এই প্ল্যাটফর্মটি সর্বাধুনিক ওয়েব প্রযুক্তি ব্যবহার করে তৈরি করা হয়েছে। একটি দ্রুত, নিরাপদ এবং ইউজার-ফ্রেন্ডলি অভিজ্ঞতা নিশ্চিত করতে মোহাম্মদ সালাউদ্দিন এই প্রজেক্টটির ডিজাইন ও ডেভেলপমেন্ট করেছেন।" 
                : "This platform is built using cutting-edge web technologies. Mohammad Salauddin designed and developed this project to ensure a fast, secure, and user-friendly experience."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}