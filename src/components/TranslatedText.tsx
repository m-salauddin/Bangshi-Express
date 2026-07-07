"use client";
import { useLanguage } from "@/components/LanguageProvider";

export default function TranslatedText({ bn, en }: { bn: string, en: string }) {
  const { language } = useLanguage();
  
  // return the appropriate text based on the current language
  return <>{language === 'BN' ? bn : en}</>;
}