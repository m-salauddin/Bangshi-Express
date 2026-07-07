"use client";

import { useLanguage } from "@/components/LanguageProvider"; 
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl min-h-[60vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          {language === "BN" ? "যোগাযোগ করুন" : "Contact Us"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          {language === "BN" 
            ? "যেকোনো সংবাদ, মতামত বা বিজ্ঞাপনের জন্য আমাদের সাথে যোগাযোগ করতে পারেন। আমরা দ্রুত আপনার বার্তার উত্তর দেওয়ার চেষ্টা করব।" 
            : "You can contact us for any news, feedback, or advertisement. We will try to reply to your message promptly."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Info (Left) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-red-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-red-100 dark:border-gray-800 flex items-start gap-4">
            <div className="bg-red-600 p-3 rounded-full text-white shrink-0 mt-1">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {language === "BN" ? "অফিস ঠিকানা" : "Office Address"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {language === "BN" ? "সাভার, ঢাকা, বাংলাদেশ" : "Savar, Dhaka, Bangladesh"}
              </p>
            </div>
          </div>

          <div className="bg-sky-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-sky-100 dark:border-gray-800 flex items-start gap-4">
            <div className="bg-sky-500 p-3 rounded-full text-white shrink-0 mt-1">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {language === "BN" ? "ফোন নম্বর" : "Phone Number"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                +880 1XXX-XXXXXX
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-green-100 dark:border-gray-800 flex items-start gap-4">
            <div className="bg-green-600 p-3 rounded-full text-white shrink-0 mt-1">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {language === "BN" ? "ইমেইল" : "Email"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                bangshiexpress@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {language === "BN" ? "আমাদের বার্তা পাঠান" : "Send us a message"}
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "BN" ? "আপনার নাম" : "Your Name"}
                </label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-red-500 dark:text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === "BN" ? "আপনার ইমেইল" : "Your Email"}
                </label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-red-500 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === "BN" ? "বিষয়" : "Subject"}
              </label>
              <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-red-500 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {language === "BN" ? "আপনার বার্তা" : "Your Message"}
              </label>
              <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:border-red-500 resize-none dark:text-white"></textarea>
            </div>
            <button type="button" className="w-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              {language === "BN" ? "বার্তা পাঠান" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}