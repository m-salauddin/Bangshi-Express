"use client";

import { useState } from "react";
import { Trash2, Plus, Loader2, Power, ExternalLink, Image as ImageIcon, Link as LinkIcon, Clock } from "lucide-react";
import { createAd, deleteAd, toggleAdStatus } from "./actions";

export default function AdManager({ ads = [] }: { ads: any[] }) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [selectedPosition, setSelectedPosition] = useState<string>("header");

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("create");
    const formData = new FormData(e.currentTarget);
    formData.append("uploadType", uploadType); 
    
    const result = await createAd(formData);
    
    if (result?.error) alert(result.error);
    else (e.target as HTMLFormElement).reset();
    
    setIsLoading(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("আপনি কি এই বিজ্ঞাপনটি ডিলিট করতে নিশ্চিত?")) {
      const result = await deleteAd(id);
      if (result?.error) alert(result.error);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    setIsLoading(`toggle-${id}`);
    const result = await toggleAdStatus(id, currentStatus);
    if (result?.error) alert(result.error);
    setIsLoading(null);
  };

  return (
    <div className="space-y-8">
      {/* Ad Creation Form */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">নতুন বিজ্ঞাপন যুক্ত করুন</h2>
        
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">বিজ্ঞাপনের নাম (Title)</label>
              <input name="title" required placeholder="যেমন: GP Eid Offer" className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-red-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">কোথায় দেখাবে (Position)</label>
              <select name="position" value={selectedPosition} onChange={(e) => setSelectedPosition(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-red-500 font-medium">
                <option value="header">হেডার (লোগোর নিচে)</option>
                <option value="home_top">হোমপেজ (উপরে)</option>
                <option value="sidebar">সাইডবার (ডানপাশে)</option>
                <option value="article_top">সংবাদের ভেতরে - একদম শুরুতে</option>
                <option value="article_middle_1">সংবাদের ভেতরে - ২য় প্যারাগ্রাফের পর</option>
                <option value="article_middle_2">সংবাদের ভেতরে - ৪র্থ প্যারাগ্রাফের পর</option>
                <option value="article_bottom">সংবাদের ভেতরে - একদম শেষে</option>
                <option value="footer">ফুটার (নিচে)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">নির্দিষ্ট সংবাদের আইডি (ঐচ্ছিক)</label>
              <input name="newsId" placeholder="News ID দিন..." className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-red-500" />
            </div>

            {/* Auto Off (Ad Expiration) Date Time Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Clock className="w-4 h-4 text-red-500" /> অটো বন্ধের সময় (ঐচ্ছিক)
              </label>
              <input type="datetime-local" name="endDate" className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-red-500 text-sm" />
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-gray-900 dark:text-white">বিজ্ঞাপনের ছবি</label>
                <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                  <button type="button" onClick={() => setUploadType("file")} className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1.5 ${uploadType === "file" ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900' : 'text-gray-500'}`}><ImageIcon className="w-3.5 h-3.5" /> ডিভাইস থেকে</button>
                  <button type="button" onClick={() => setUploadType("url")} className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1.5 ${uploadType === "url" ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900' : 'text-gray-500'}`}><LinkIcon className="w-3.5 h-3.5" /> লিংক দিন</button>
                </div>
              </div>
              {uploadType === "file" ? <input type="file" name="imageFile" accept="image/*" required className="w-full px-4 py-2 border border-dashed border-gray-300 rounded-lg dark:bg-gray-900 text-sm" /> : <input name="imageUrl" type="url" required placeholder="https://example.com/image.jpg" className="w-full px-4 py-2.5 border rounded-lg dark:bg-gray-900 text-sm" />}
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-900 dark:text-white block">ক্লিক অ্যাকশন (ঐচ্ছিক)</label>
              <div className="flex gap-3">
                <input name="buttonText" placeholder="বাটন টেক্সট (যেমন: Click Here)" className="w-1/3 px-4 py-2.5 border rounded-lg dark:bg-gray-900 text-sm" />
                <input name="link" type="url" placeholder="টার্গেট লিংক (URL)..." className="flex-1 px-4 py-2.5 border rounded-lg dark:bg-gray-900 text-sm" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={isLoading === "create"} className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 font-bold ml-auto md:w-auto w-full">
            {isLoading === "create" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />} সেভ করুন
          </button>
        </form>
      </div>

      {/* Control Panel List & Details View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ads.map((ad: any) => {
          const isExpired = ad.endDate ? new Date(ad.endDate) < new Date() : false;

          return (
            <div key={ad.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden flex flex-col">
              <div className="relative h-40 bg-gray-50 p-4 flex items-center justify-center border-b border-gray-100 dark:border-gray-700">
                <img src={ad.imageUrl} alt={ad.title} className="max-w-full max-h-full object-contain rounded" />
                <div className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-bold rounded-full ${isExpired ? 'bg-red-100 text-red-700' : ad.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {isExpired ? 'Expired' : ad.isActive ? 'Active' : 'Paused'}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 dark:text-white text-base truncate" title={ad.title}>{ad.title}</h3>
                
                <div className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between"><span>পজিশন:</span><span className="font-semibold text-red-600">{ad.position}</span></div>
                  <div className="flex justify-between truncate"><span>নিউজ ID:</span><span className="font-mono text-gray-500">{ad.newsId || "সব সংবাদ"}</span></div>
                  
                  {/* Dynamic Time Duration Checker */}
                  <div className="flex justify-between items-center text-[11px] pt-1 border-t border-dashed mt-2">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-400" /> মেয়াদ শেষ:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {ad.endDate ? new Date(ad.endDate).toLocaleString("bn-BD", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "সীমাহীন"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex gap-2">
                    <button onClick={() => handleToggle(ad.id, ad.isActive)} disabled={isExpired} className={`p-2 rounded-lg ${ad.isActive && !isExpired ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {isLoading === `toggle-${ad.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Power className="w-4 h-4" />}
                    </button>
                    {ad.link && <a href={ad.link} target="_blank" rel="noreferrer" className="p-2 bg-blue-50 text-blue-600 rounded-lg"><ExternalLink className="w-4 h-4" /></a>}
                  </div>
                  <button onClick={() => handleDelete(ad.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}