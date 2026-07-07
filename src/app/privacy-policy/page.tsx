"use client";

import { useLanguage } from "@/components/LanguageProvider"; 

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[60vh]">
      
      <div className="border-b border-gray-100 dark:border-gray-800 pb-6 mb-8 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
          {language === "BN" ? "গোপনীয়তা নীতি (Privacy Policy)" : "Privacy Policy"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          {language === "BN" ? "সর্বশেষ আপডেট: জানুয়ারি ২০২৬" : "Last Updated: January 2026"}
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
        
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          {language === "BN" ? "১. তথ্য সংগ্রহ" : "1. Information Collection"}
        </h2>
        <p>
          {language === "BN" 
            ? "আমরা আপনার ব্যক্তিগত তথ্য যেমন নাম, ইমেইল অ্যাড্রেস বা ফোন নম্বর তখনই সংগ্রহ করি, যখন আপনি স্বেচ্ছায় আমাদের ওয়েবসাইটে কোনো ফর্ম পূরণ করেন বা নিউজলেটারে সাবস্ক্রাইব করেন। এছাড়া গুগলের মতো থার্ড-পার্টি টুলের মাধ্যমে ব্রাউজিং ডাটা (যেমন IP address, browser type) অ্যানালিটিক্সের জন্য স্বয়ংক্রিয়ভাবে সংগৃহীত হতে পারে।" 
            : "We collect your personal information such as name, email address, or phone number only when you voluntarily fill out a form on our website or subscribe to our newsletter. Additionally, browsing data (such as IP address, browser type) may be automatically collected for analytics via third-party tools like Google."}
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          {language === "BN" ? "২. কুকিজ (Cookies) এর ব্যবহার" : "2. Use of Cookies"}
        </h2>
        <p>
          {language === "BN" 
            ? "আপনাকে একটি উন্নত ব্রাউজিং অভিজ্ঞতা দিতে আমাদের ওয়েবসাইট কুকিজ ব্যবহার করে। কুকিজ হলো ছোট ডাটা ফাইল যা আপনার ডিভাইসে সংরক্ষিত থাকে। আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে কুকিজ বন্ধ করে রাখতে পারেন।" 
            : "Our website uses cookies to provide you with a better browsing experience. Cookies are small data files stored on your device. You can disable cookies from your browser settings if you wish."}
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          {language === "BN" ? "৩. তথ্যের ব্যবহার ও নিরাপত্তা" : "3. Use and Security of Information"}
        </h2>
        <p>
          {language === "BN" 
            ? "আপনার সংগৃহীত তথ্য শুধুমাত্র আমাদের ওয়েবসাইটের সেবার মান উন্নয়নে এবং আপনাকে লেটেস্ট খবরের আপডেট পাঠানোর জন্য ব্যবহৃত হয়। আমরা আপনার ব্যক্তিগত তথ্য কোনো থার্ড-পার্টি কোম্পানির কাছে বিক্রি বা শেয়ার করি না। আপনার ডাটা সুরক্ষিত রাখতে আমরা সব ধরনের প্রযুক্তিগত নিরাপত্তা ব্যবস্থা গ্রহণ করেছি।" 
            : "Your collected information is used solely to improve the quality of our website's services and to send you the latest news updates. We do not sell or share your personal information with third-party companies. We have taken all technical security measures to keep your data secure."}
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          {language === "BN" ? "৪. থার্ড-পার্টি বিজ্ঞাপন" : "4. Third-Party Advertising"}
        </h2>
        <p>
          {language === "BN" 
            ? "আমাদের সাইটে থার্ড-পার্টি বিজ্ঞাপনদাতারা (যেমন Google AdSense) বিজ্ঞাপন প্রদর্শন করতে পারে, যারা ব্যবহারকারীর আগ্রহ অনুযায়ী বিজ্ঞাপন দেখাতে কুকিজ ব্যবহার করতে পারে। থার্ড-পার্টি সাইটগুলোর নিজস্ব প্রাইভেসি পলিসি রয়েছে যার জন্য আমরা দায়ী নই।" 
            : "Third-party advertisers (such as Google AdSense) may display ads on our site, who may use cookies to serve ads based on user interests. Third-party sites have their own privacy policies for which we are not responsible."}
        </p>
      </div>

    </div>
  );
}