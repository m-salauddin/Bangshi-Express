"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Dictionaries for translations
const dictionaries = {
  BN: {
    searchPlaceholder: "সংবাদ খুঁজুন...",
    login: "লগইন",
    more: "আরো",
    filter: "ফিল্টার",
    english: "English",
    bangla: "বাংলা",
    aboutUs: "আমাদের সম্পর্কে",
    aboutText: "Bangshi Express — আপনার কণ্ঠস্বর, আমাদের দায়বদ্ধতা।ঢাকা জেলার স্থানীয় সংবাদ, উন্নয়ন ও জনস্বার্থের নিরপেক্ষ ও নির্ভরযোগ্য খবর সবার আগে পৌঁছে দেওয়াই আমাদের অঙ্গীকার।সত্যের পথে, স্থানীয় সংবাদের সাথে।",
    quickLinks: "প্রয়োজনীয় লিংক",
    contactUs: "যোগাযোগ ও সম্পাদনা", 
    privacyPolicy: "প্রাইভেসি পলিসি",
    followUs: "আমাদের অনুসরণ করুন",
    allRights: "সর্বস্বত্ব সংরক্ষিত।",
    editorPublisher: "সম্পাদক ও প্রকাশক",
    editorName: "সানোয়ার হোসাইন",
    newsRoom: "বার্তা কক্ষ",
    advertisement: "বিজ্ঞাপন",
    office: "প্রধান কার্যালয়",
  },
  EN: {
    searchPlaceholder: "Search news...",
    login: "Login",
    more: "More",
    filter: "Filter",
    english: "English",
    bangla: "বাংলা",
    aboutUs: "About Us",
    aboutText: "Bangshi Express — Empowering Communities Through Truthful Journalism.Your trusted digital news platform for Dhaka District, delivering timely, accurate, and impartial local news with integrity and responsibility.",
    quickLinks: "Quick Links",
    contactUs: "Editorial & Contact",
    privacyPolicy: "Privacy Policy",
    followUs: "Follow Us",
    allRights: "All rights reserved.",
    editorPublisher: "Editor & Publisher",
    editorName: "Sanowar Hossain",
    newsRoom: "News Room",
    advertisement: "Advertisement",
    office: "Head Office",
  }
};
type Language = "BN" | "EN";
type Dictionary = typeof dictionaries.BN;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: keyof Dictionary) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("BN");

  // useEffect to load the saved language from localStorage on component mount
  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "BN" ? "EN" : "BN";
    setLanguage(newLang);
    localStorage.setItem("language", newLang); // backup the selected language in localStorage
  };

  // translation function
  const t = (key: keyof Dictionary) => {
    return dictionaries[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}