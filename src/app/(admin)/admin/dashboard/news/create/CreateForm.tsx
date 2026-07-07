"use client";

import { useState } from "react";
import { createNews } from "./actions";
import { Loader2, Send } from "lucide-react";

type Category = { id: string; nameBn: string; nameEn: string };
type District = { id: string; nameBn: string; nameEn: string };
type Upazila = { id: string; nameBn: string; nameEn: string; districtId: string };
type Union = { id: string; nameBn: string; nameEn: string; upazilaId: string };

export default function CreateForm({ 
  categories, districts, upazilas, unions 
}: { 
  categories: Category[]; 
  districts: District[];
  upazilas: Upazila[];
  unions: Union[];
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  const filteredUpazilas = upazilas.filter(u => u.districtId === selectedDistrict);
  const filteredUnions = unions.filter(u => u.upazilaId === selectedUpazila);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createNews(formData);

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
      
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg">{error}</div>}

      {/* 💥 শিরোনাম এবং সাব-টাইটেল */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">সংবাদের শিরোনাম <span className="text-red-500">*</span></label>
          <input name="title" type="text" required className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500" placeholder="যেমন: সাভারে নতুন প্রযুক্তি পার্ক..." />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">সাব-টাইটেল (ঐচ্ছিক)</label>
          <input name="subtitle" type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500" placeholder="যেমন: বিপুল কর্মসংস্থানের আশা করছেন স্থানীয়রা..." />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ক্যাটাগরি <span className="text-red-500">*</span></label>
          <select name="categoryId" required className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500">
            <option value="">ক্যাটাগরি নির্বাচন করুন</option>
            {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.nameBn}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ছবির লিংক (Thumbnail)</label>
          <input name="thumbnail" type="url" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500" placeholder="https://example.com/image.jpg" />
        </div>
      </div>

      {/* 💥 প্রতিবেদক এবং ট্যাগ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">প্রতিবেদকের নাম (ঐচ্ছিক)</label>
          <input name="reporterName" type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500" placeholder="যেমন: শফিকুল ইসলাম" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">ট্যাগ (কমা দিয়ে লিখুন) (ঐচ্ছিক)</label>
          <input name="tags" type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500" placeholder="যেমন: সাভার, আইটি পার্ক, কর্মসংস্থান" />
        </div>
      </div>

      <div className="p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">লোকেশন ট্যাগ (ঐচ্ছিক)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">জেলা</label>
            <select 
              name="districtId" 
              value={selectedDistrict}
              onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedUpazila(""); }}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500"
            >
              <option value="">জেলা নির্বাচন করুন</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.nameBn}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">উপজেলা</label>
            <select 
              name="upazilaId" 
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500 disabled:opacity-50"
            >
              <option value="">উপজেলা নির্বাচন করুন</option>
              {filteredUpazilas.map(u => <option key={u.id} value={u.id}>{u.nameBn}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">ইউনিয়ন/এলাকা</label>
            <select 
              name="unionId" 
              disabled={!selectedUpazila}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500 disabled:opacity-50"
            >
              <option value="">ইউনিয়ন নির্বাচন করুন</option>
              {filteredUnions.map(u => <option key={u.id} value={u.id}>{u.nameBn}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">মূল সংবাদ (বিস্তারিত) <span className="text-red-500">*</span></label>
        <textarea name="content" required rows={8} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-red-500 resize-none"></textarea>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" name="isPublished" value="true" id="isPublished" className="w-5 h-5 accent-red-600" defaultChecked />
        <label htmlFor="isPublished" className="text-gray-700 dark:text-gray-300 font-medium">সরাসরি পাবলিশ করুন</label>
      </div>

      <button type="submit" disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70">
        {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" /> সেভ করা হচ্ছে...</> : <><Send className="w-5 h-5" /> সংবাদ প্রকাশ করুন</>}
      </button>

    </form>
  );
}