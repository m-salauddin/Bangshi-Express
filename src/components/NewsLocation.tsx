"use client";
import { useLanguage } from "@/components/LanguageProvider";
import { MapPin } from "lucide-react";

export default function NewsLocation({ district, upazila, union }: { district: any, upazila: any, union: any }) {
  const { language } = useLanguage();

  // Bangla and English location text generation
  const locationTextBn = [union?.nameBn, upazila?.nameBn, district?.nameBn].filter(Boolean).join(", ");
  const locationTextEn = [union?.nameEn, upazila?.nameEn, district?.nameEn].filter(Boolean).join(", ");

  // if no location data is available, return null to avoid rendering an empty component
  if (!locationTextBn && !locationTextEn) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
      <MapPin className="w-4 h-4 text-red-500" />
      <span>{language === 'BN' ? locationTextBn : locationTextEn}</span>
    </div>
  );
}