"use client";

import { useState } from "react";
import { Trash2, Plus, Loader2, Edit, Check, X } from "lucide-react";
import { createCategory, deleteCategory, updateCategory } from "./actions";

export default function CategoryManager({ categories = [] }: { categories: any[] }) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // new category create function
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("create");
    const formData = new FormData(e.currentTarget);
    const result = await createCategory(formData);
    
    if (result?.error) alert(result.error);
    else (e.target as HTMLFormElement).reset();
    
    setIsLoading(null);
  };

  // save the edited category
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setIsLoading(`edit-${id}`);
    const formData = new FormData(e.currentTarget);
    const result = await updateCategory(id, formData);
    
    if (result?.error) alert(result.error);
    
    setEditingId(null);
    setIsLoading(null);
  };

  // category delete function
  const handleDelete = async (id: string) => {
    if (window.confirm("আপনি কি এই ক্যাটাগরিটি ডিলিট করতে নিশ্চিত?")) {
      const result = await deleteCategory(id);
      if (result?.error) alert(result.error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm w-full">
      
      {/* new category form */}
      <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-3 mb-8 bg-gray-50 dark:bg-gray-900/30 p-4 rounded-lg border border-gray-100 dark:border-gray-800">
        <input 
          name="nameBn" 
          placeholder="বাংলা নাম (যেমন: রাজনীতি)" 
          required 
          className="flex-1 px-4 py-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-red-500 text-sm"
        />
        <input 
          name="nameEn" 
          placeholder="English Name (Politics)" 
          required 
          className="flex-1 px-4 py-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-red-500 text-sm"
        />
        <input 
          name="slug" 
          placeholder="URL slug (politics)" 
          required 
          className="flex-1 px-4 py-2.5 border rounded-lg dark:bg-gray-900 dark:border-gray-700 outline-none focus:border-red-500 text-sm lowercase" 
        />
      
        <button 
          type="submit" 
          disabled={isLoading === "create"} 
          className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 font-medium whitespace-nowrap"
        >
          {isLoading === "create" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          যুক্ত করুন
        </button>
      </form>

      {/* category list */}
      <div className="space-y-3">
        {categories.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">এখনো কোনো ক্যাটাগরি যুক্ত করা হয়নি।</p>
        ) : (
          categories.map((category: any) => (
            <div 
              key={category.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all gap-4"
            >
              {editingId === category.id ? (
                // edit mode
                <form 
                  onSubmit={(e) => handleEditSubmit(e, category.id)} 
                  className="flex flex-col sm:flex-row items-center gap-3 w-full"
                >
                  <input 
                    name="nameBn" 
                    defaultValue={category.nameBn} 
                    required
                    placeholder="বাংলা নাম"
                    className="w-full sm:flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 outline-none focus:border-red-500 text-sm" 
                  />
                  <input 
                    name="nameEn" 
                    defaultValue={category.nameEn} 
                    required
                    placeholder="English Name"
                    className="w-full sm:flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 outline-none focus:border-red-500 text-sm" 
                  />
                  <input 
                    name="slug" 
                    defaultValue={category.slug} 
                    required
                    placeholder="slug"
                    className="w-full sm:flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 outline-none focus:border-red-500 text-sm lowercase" 
                  />
                  
                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button type="submit" disabled={isLoading === `edit-${category.id}`} className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500 p-2 hover:bg-green-200 dark:hover:bg-green-900/50 rounded-lg transition-colors">
                      {isLoading === `edit-${category.id}` ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                    </button>
                    <button type="button" onClick={() => setEditingId(null)} className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              ) : (
                // view mode
                <>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-lg">
                      {category.nameBn} 
                      <span className="text-gray-300 dark:text-gray-600 font-light">|</span> 
                      <span className="text-gray-600 dark:text-gray-400 text-base">{category.nameEn}</span>
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded font-mono border border-blue-100 dark:border-blue-800/30">
                        /{category.slug}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                    <button 
                      onClick={() => setEditingId(category.id)} 
                      className="flex-1 sm:flex-none flex justify-center items-center gap-1 text-blue-600 hover:text-white bg-blue-50 hover:bg-blue-600 dark:bg-blue-900/20 dark:hover:bg-blue-600 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Edit className="w-4 h-4" /> <span className="sm:hidden">এডিট</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(category.id)} 
                      className="flex-1 sm:flex-none flex justify-center items-center gap-1 text-red-600 hover:text-white bg-red-50 hover:bg-red-600 dark:bg-red-900/20 dark:hover:bg-red-600 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" /> <span className="sm:hidden">ডিলিট</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}