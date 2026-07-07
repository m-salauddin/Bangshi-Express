"use client";

import { useState } from "react";
import { Trash2, Plus, Loader2, Edit, Check, X } from "lucide-react";
import { 
  createDistrict, deleteDistrict, updateDistrict,
  createUpazila, deleteUpazila, updateUpazila,
  createUnion, deleteUnion, updateUnion
} from "./actions";

export default function LocationManager({ districts = [], upazilas = [], unions = [] }: any) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const filteredUpazilas = upazilas.filter((u: any) => u.districtId === selectedDistrict);
  const filteredUnions = unions.filter((u: any) => u.upazilaId === selectedUpazila);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, actionFunc: any, type: string) => {
    e.preventDefault();
    setIsLoading(type);
    const formData = new FormData(e.currentTarget);
    const result = await actionFunc(formData);
    if (result?.error) alert(result.error);
    else (e.target as HTMLFormElement).reset();
    setIsLoading(null);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string, actionFunc: any, type: string) => {
    e.preventDefault();
    setIsLoading(`edit-${id}`);
    const formData = new FormData(e.currentTarget);
    const result = await actionFunc(id, formData);
    if (result?.error) alert(result.error);
    setEditingId(null);
    setIsLoading(null);
  };

  const handleDelete = async (id: string, deleteFunc: any) => {
    if (window.confirm("আপনি কি এটি ডিলিট করতে নিশ্চিত?")) {
      const result = await deleteFunc(id);
      if (result?.error) alert(result.error);
    }
  };

  const renderItem = (item: any, deleteFunc: any, updateFunc: any, type: string, onClick?: () => void, isSelected?: boolean) => {
    const isEditing = editingId === item.id;
    return (
      <div 
        key={item.id} 
        onClick={onClick}
        className={`flex flex-col sm:flex-row justify-between p-3 rounded-lg cursor-pointer transition-colors mb-2 ${isSelected ? 'bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-900' : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 text-gray-700 dark:text-gray-300'}`}
      >
        {isEditing ? (
          <form 
            onSubmit={(e) => handleEditSubmit(e, item.id, updateFunc, type)} 
            className="flex flex-col gap-2 w-full"
            onClick={(e) => e.stopPropagation()} 
          >
            <input 
              name="nameBn" 
              defaultValue={item.nameBn} 
              required
              className="w-full px-2 py-1.5 text-sm border rounded bg-white dark:bg-gray-800 outline-none focus:border-red-500 text-gray-900 dark:text-white" 
              placeholder="বাংলা নাম"
            />
            <input 
              name="nameEn" 
              defaultValue={item.nameEn} 
              required
              className="w-full px-2 py-1.5 text-sm border rounded bg-white dark:bg-gray-800 outline-none focus:border-red-500 text-gray-900 dark:text-white" 
              placeholder="ইংরেজি নাম"
            />
            <div className="flex gap-2 self-end mt-1">
              <button type="submit" disabled={isLoading === `edit-${item.id}`} className="bg-green-100 text-green-700 p-1.5 hover:bg-green-200 rounded">
                {isLoading === `edit-${item.id}` ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
              </button>
              <button type="button" onClick={() => setEditingId(null)} className="bg-gray-200 text-gray-600 p-1.5 hover:bg-gray-300 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex flex-col mb-2 sm:mb-0">
              <span className="text-sm font-bold">{item.nameBn}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{item.nameEn}</span>
            </div>
            <div className="flex gap-2 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setEditingId(item.id)} className="bg-blue-50 text-blue-600 hover:bg-blue-100 p-1.5 rounded">
                <Edit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(item.id, deleteFunc)} className="bg-red-50 text-red-600 hover:bg-red-100 p-1.5 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* district column */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-[450px] lg:h-[600px]">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5 border-b pb-2">
          <div className="w-2 h-4 bg-red-600 rounded-sm"></div> ১. জেলা তালিকা
        </h2>
        <form onSubmit={(e) => handleFormSubmit(e, createDistrict, "district")} className="flex flex-col gap-2 mb-4">
          <input name="nameBn" required placeholder="বাংলা নাম (যেমন: ঢাকা)" className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 outline-none focus:border-red-500" />
          <input name="nameEn" required placeholder="English Name (Dhaka)" className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 outline-none focus:border-red-500" />
          <button type="submit" disabled={isLoading === "district"} className="w-full bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium mt-1">
            {isLoading === "district" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} যুক্ত করুন
          </button>
        </form>
        <div className="flex-1 overflow-y-auto pr-1">
          {districts.map((d: any) => renderItem(d, deleteDistrict, updateDistrict, "district", () => { setSelectedDistrict(d.id); setSelectedUpazila(""); }, selectedDistrict === d.id))}
        </div>
      </div>

      {/* upazila column */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-[450px] lg:h-[600px]">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5 border-b pb-2">
          <div className="w-2 h-4 bg-red-600 rounded-sm"></div> ২. উপজেলা তালিকা
        </h2>
        {selectedDistrict ? (
          <>
            <form onSubmit={(e) => handleFormSubmit(e, createUpazila, "upazila")} className="flex flex-col gap-2 mb-4">
              <input type="hidden" name="districtId" value={selectedDistrict} />
              <input name="nameBn" required placeholder="বাংলা নাম" className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 outline-none focus:border-red-500" />
              <input name="nameEn" required placeholder="English Name" className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 outline-none focus:border-red-500" />
              <button type="submit" disabled={isLoading === "upazila"} className="w-full bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 flex justify-center items-center gap-2 font-medium mt-1">
                {isLoading === "upazila" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} যুক্ত করুন
              </button>
            </form>
            <div className="flex-1 overflow-y-auto pr-1">
              {filteredUpazilas.length === 0 ? <p className="text-sm text-gray-400 text-center pt-8">কোনো উপজেলা নেই।</p> : filteredUpazilas.map((u: any) => renderItem(u, deleteUpazila, updateUpazila, "upazila", () => setSelectedUpazila(u.id), selectedUpazila === u.id))}
            </div>
          </>
        ) : <div className="flex-1 flex items-center justify-center text-sm text-gray-400 text-center px-4">বামপাশ থেকে জেলা সিলেক্ট করুন</div>}
      </div>

      {/* union column */}
      <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-[450px] lg:h-[600px]">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-1.5 border-b pb-2">
          <div className="w-2 h-4 bg-red-600 rounded-sm"></div> ৩. ইউনিয়ন/এলাকা
        </h2>
        {selectedUpazila ? (
          <>
            <form onSubmit={(e) => handleFormSubmit(e, createUnion, "union")} className="flex flex-col gap-2 mb-4">
              <input type="hidden" name="upazilaId" value={selectedUpazila} />
              <input name="nameBn" required placeholder="বাংলা নাম" className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 outline-none focus:border-red-500" />
              <input name="nameEn" required placeholder="English Name" className="w-full px-3 py-2 text-sm border rounded-lg bg-gray-50 dark:bg-gray-900 outline-none focus:border-red-500" />
              <button type="submit" disabled={isLoading === "union"} className="w-full bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium mt-1">
                {isLoading === "union" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} যুক্ত করুন
              </button>
            </form>
            <div className="flex-1 overflow-y-auto pr-1">
              {filteredUnions.length === 0 ? <p className="text-sm text-gray-400 text-center pt-8">কোনো ইউনিয়ন নেই।</p> : filteredUnions.map((un: any) => renderItem(un, deleteUnion, updateUnion, "union", () => {}, false))}
            </div>
          </>
        ) : <div className="flex-1 flex items-center justify-center text-sm text-gray-400 text-center px-4">মাঝখান থেকে উপজেলা সিলেক্ট করুন</div>}
      </div>
      
    </div>
  );
}