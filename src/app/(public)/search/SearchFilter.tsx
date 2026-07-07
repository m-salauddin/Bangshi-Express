"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, MapPin, Layers, Filter } from "lucide-react";

type Props = {
  categories: any[];
  districts: any[];
  upazilas: any[];
  unions: any[];
};

export default function SearchFilter({ categories, districts, upazilas, unions }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // url perams use for initial state
  const [q, setQ] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [upazila, setUpazila] = useState(searchParams.get("upazila") || "");
  const [union, setUnion] = useState(searchParams.get("union") || "");

  // update filter state when url params change (for back button)
  const filteredUpazilas = upazilas.filter((u) => u.districtId === district);
  const filteredUnions = unions.filter((u) => u.upazilaId === upazila);

  // update upazila and union when district changes
  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    if (district) params.set("district", district);
    if (upazila) params.set("upazila", upazila);
    if (union) params.set("union", union);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8">
      <form onSubmit={handleAction} className="space-y-6">
        
        {/* main search filter  */}
        <div className="relative">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="সংবাদের শিরোনাম বা কিওয়ার্ড দিয়ে খুঁজুন..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
          />
          <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
        </div>

        {/* filter section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
            <option value="">সকল ক্যাটাগরি</option>
            {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>

          <select value={district} onChange={(e) => { setDistrict(e.target.value); setUpazila(""); setUnion(""); }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm">
            <option value="">জেলা</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>

          <select value={upazila} onChange={(e) => { setUpazila(e.target.value); setUnion(""); }} disabled={!district} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm disabled:opacity-50">
            <option value="">উপজেলা</option>
            {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>

          <select value={union} onChange={(e) => setUnion(e.target.value)} disabled={!upazila} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm disabled:opacity-50">
            <option value="">ইউনিয়ন</option>
            {filteredUnions.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
          সার্চ ও ফিল্টার প্রয়োগ করুন
        </button>
      </form>
    </div>
  );
}