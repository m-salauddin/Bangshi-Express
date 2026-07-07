"use client";

import { useState } from "react";
import { updateNews } from "./actions";
import { Loader2, Save } from "lucide-react";


type Category = { id: string; nameBn: string; nameEn: string };
type Location = { id: string; nameBn: string; nameEn: string; districtId?: string; upazilaId?: string };

type NewsData = {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  categoryId: string;
  isPublished: boolean;
  districtId: string | null;
  upazilaId: string | null;
  unionId: string | null;
};

export default function EditForm({ 
  categories, 
  districts = [], 
  upazilas = [], 
  unions = [], 
  initialData 
}: { 
  categories: Category[]; 
  districts?: Location[];
  upazilas?: Location[];
  unions?: Location[];
  initialData: NewsData;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // location state for dropdowns
  const [selectedDistrict, setSelectedDistrict] = useState(initialData.districtId || "");
  const [selectedUpazila, setSelectedUpazila] = useState(initialData.upazilaId || "");
  const [selectedUnion, setSelectedUnion] = useState(initialData.unionId || "");

  // filter upazilas and unions based on selected district and upazila
  const filteredUpazilas = upazilas.filter(u => u.districtId === selectedDistrict);
  const filteredUnions = unions.filter(u => u.upazilaId === selectedUpazila);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await updateNews(initialData.id, formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
      
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">সংবাদের শিরোনাম</label>
        <input
          name="title"
          type="text"
          required
          defaultValue={initialData.title} 
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ক্যাটাগরি</label>
          <select
            name="categoryId"
            required
            defaultValue={initialData.categoryId} 
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nameBn}</option> /* 💥 nameBn ব্যবহার করা হলো */
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ছবির লিংক (Thumbnail URL)</label>
          <input
            name="thumbnail"
            type="url"
            defaultValue={initialData.thumbnail || ""}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
      </div>

      {/* location dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">জেলা (ঐচ্ছিক)</label>
          <select
            name="districtId"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedUpazila(""); 
              setSelectedUnion("");
            }}
            className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
          >
            <option value="">নির্বাচন করুন</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>{d.nameBn}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">উপজেলা (ঐচ্ছিক)</label>
          <select
            name="upazilaId"
            value={selectedUpazila}
            onChange={(e) => {
              setSelectedUpazila(e.target.value);
              setSelectedUnion("");
            }}
            disabled={!selectedDistrict}
            className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none disabled:opacity-50"
          >
            <option value="">নির্বাচন করুন</option>
            {filteredUpazilas.map((u) => (
              <option key={u.id} value={u.id}>{u.nameBn}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ইউনিয়ন (ঐচ্ছিক)</label>
          <select
            name="unionId"
            value={selectedUnion}
            onChange={(e) => setSelectedUnion(e.target.value)}
            disabled={!selectedUpazila}
            className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none disabled:opacity-50"
          >
            <option value="">নির্বাচন করুন</option>
            {filteredUnions.map((u) => (
              <option key={u.id} value={u.id}>{u.nameBn}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">মূল সংবাদ (বিস্তারিত)</label>
        <textarea
          name="content"
          required
          rows={10}
          defaultValue={initialData.content} 
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 outline-none resize-none"
        ></textarea>
      </div>

      <div className="flex items-center gap-3">
        <input 
          type="checkbox" 
          name="isPublished" 
          value="true" 
          id="isPublished" 
          className="w-5 h-5 accent-red-600" 
          defaultChecked={initialData.isPublished} 
        />
        <label htmlFor="isPublished" className="text-gray-700 dark:text-gray-300 font-medium">পাবলিশড অবস্থায় রাখুন</label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
      >
        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> আপডেট হচ্ছে...</> : <><Save className="w-5 h-5" /> পরিবর্তন সেভ করুন</>}
      </button>

    </form>
  );
}