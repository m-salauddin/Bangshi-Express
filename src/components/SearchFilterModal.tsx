"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Filter } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function SearchFilterModal({ 
  isOpen, onClose, categories = [], districts = [], upazilas = [], unions = [] 
}: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [union, setUnion] = useState("");

  // url query params set on modal open
  useEffect(() => {
    if (isOpen) {
      setCategory(searchParams.get("category") || "");
      setDistrict(searchParams.get("district") || "");
      setUpazila(searchParams.get("upazila") || "");
      setUnion(searchParams.get("union") || "");
    }
  }, [isOpen, searchParams]);

  if (!isOpen) return null;

  // dependent dropdowns filtering
  const filteredUpazilas = upazilas.filter((u: any) => u.districtId === district);
  const filteredUnions = unions.filter((u: any) => u.upazilaId === upazila);

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    // if there's already a search query in the URL, preserve it
    const q = searchParams.get("q");
    if (q) params.append("q", q);

    if (category) params.append("category", category);
    if (district) params.append("district", district);
    if (upazila) params.append("upazila", upazila);
    if (union) params.append("union", union);

    router.push(`/search?${params.toString()}`);
    onClose();
  };

  const handleClear = () => {
    setCategory("");
    setDistrict("");
    setUpazila("");
    setUnion("");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Filter className="w-5 h-5 text-red-600" />
            {language === "BN" ? "খবর ফিল্টার করুন" : "Filter News"}
          </h3>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* filter form */}
        <form onSubmit={handleApplyFilter} className="p-6 space-y-4">
          
          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === "BN" ? "ক্যাটাগরি" : "Category"}
            </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-red-500 dark:text-white">
              <option value="">{language === "BN" ? "সকল ক্যাটাগরি" : "All Categories"}</option>
              {categories.map((c: any) => (
                <option key={c.id} value={c.slug}>{language === "BN" ? c.nameBn : c.nameEn}</option>
              ))}
            </select>
          </div>

          {/* district */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === "BN" ? "জেলা" : "District"}
            </label>
            <select value={district} onChange={(e) => { setDistrict(e.target.value); setUpazila(""); setUnion(""); }} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-red-500 dark:text-white">
              <option value="">{language === "BN" ? "জেলা নির্বাচন করুন" : "Select District"}</option>
              {districts.map((d: any) => (
                <option key={d.id} value={d.id}>{language === "BN" ? d.nameBn : d.nameEn}</option>
              ))}
            </select>
          </div>

          {/* upazila and union */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === "BN" ? "উপজেলা" : "Upazila"}
            </label>
            <select disabled={!district} value={upazila} onChange={(e) => { setUpazila(e.target.value); setUnion(""); }} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-red-500 dark:text-white disabled:opacity-50">
              <option value="">{language === "BN" ? "উপজেলা নির্বাচন করুন" : "Select Upazila"}</option>
              {filteredUpazilas.map((u: any) => (
                <option key={u.id} value={u.id}>{language === "BN" ? u.nameBn : u.nameEn}</option>
              ))}
            </select>
          </div>

          {/* union and upazila */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {language === "BN" ? "ইউনিয়ন/এলাকা" : "Union/Area"}
            </label>
            <select disabled={!upazila} value={union} onChange={(e) => setUnion(e.target.value)} className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none focus:border-red-500 dark:text-white disabled:opacity-50">
              <option value="">{language === "BN" ? "ইউনিয়ন নির্বাচন করুন" : "Select Union"}</option>
              {filteredUnions.map((un: any) => (
                <option key={un.id} value={un.id}>{language === "BN" ? un.nameBn : un.nameEn}</option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800 mt-6">
            <button type="button" onClick={handleClear} className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">
              {language === "BN" ? "ক্লিয়ার করুন" : "Clear"}
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition">
              {language === "BN" ? "খবর খুঁজুন" : "Apply Filter"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}