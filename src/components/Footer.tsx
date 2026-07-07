"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, UserCheck } from "lucide-react"; 
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"; 
import { useLanguage } from "./LanguageProvider";

// 💥Category type update 
type Category = {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
};

export default function Footer({ categories = [] }: { categories: Category[] }) {
  // 💥 language import 
  const { t, language } = useLanguage();
  
  const footerCategories = categories.slice(0, 4);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* 1. Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-1">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Bangshi</span>
              <span className="text-3xl font-extrabold text-red-600 tracking-tight">Express</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {t("aboutText")}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" onClick={() => window.open("https://www.facebook.com/share/17hmztRGqN/", "_blank")} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-sky-500 hover:text-white transition-colors">
                <FaTwitter className="w-5 h-5" onClick={() => window.open("https://twitter.com/bangshiexpress", "_blank")} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors">
                <FaYoutube className="w-5 h-5" onClick={() => window.open("https://youtube.com/@bangshiexpress?si=Yi78r5ES5lij3mJh", "_blank")} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-red-600 hover:text-white transition-colors">
                <FaInstagram className="w-5 h-5" onClick={() => window.open("https://instagram.com/bangshiexpress", "_blank")} />
              </a>
            </div>
          </div>

          {/* 2. Editorial & Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-red-600 rounded-sm"></div>
              {t("contactUs")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                <UserCheck className="w-5 h-5 text-red-600 shrink-0" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block pb-1">{t("editorPublisher")}</span>
                  <span>{t("editorName")}</span>
                </div>
              </li>
              
              <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
                <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block pb-1">{t("office")}</span>
                  {/* 💥 Address logic */}
                  <span>{language === "BN" ? "সাভার, ঢাকা, বাংলাদেশ" : "Savar, Dhaka, Bangladesh"}</span>
                </div>
              </li>
              
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                {/* 💥 Phone number logic */}
                <span>{t("newsRoom")}: {language === "BN" ? "+৮৮০ XXXXXXXXXXXX" : "+880 XXXXXXXXXXXX"}</span>
              </li>
              
              <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <span>bangshiexpress@gmail.com</span>
              </li>
              
              {/* <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <span>{t("advertisement")}: ads@bangshiexpress.com</span>
              </li> */}
            </ul>
          </div>

          {/* 3. Category Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-red-600 rounded-sm"></div>
              {t("more")}
            </h3>
            <ul className="space-y-3">
              {footerCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`} className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors text-sm font-medium">
                    {/* 💥 category name logic */}
                    {language === "BN" ? category.nameBn : category.nameEn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-6 bg-red-600 rounded-sm"></div>
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors text-sm font-medium">
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors text-sm font-medium">
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors text-sm font-medium">
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            &copy; {currentYear} Bangshi Express. {t("allRights")}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Developed by <span className="font-bold text-gray-900 dark:text-white" onClick={() => window.open("https://github.com/m-salauddin", "_blank")}>
              Mohammad Salauddin
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}