"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // useSearchParams add
import { Search } from "lucide-react";
import { useLanguage } from "./LanguageProvider"; 

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams(); // url query params access 
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // preserve existing filters in the URL when performing a new search
      const params = new URLSearchParams(searchParams.toString()); 
      
      // new search query seted
      params.set("q", query.trim()); 

      // now push the new URL with the search query and existing filters
      router.push(`/search?${params.toString()}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative hidden md:flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="w-48 lg:w-64 px-4 py-2 pl-10 text-sm border border-gray-200 dark:border-gray-700 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
      />
      <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
      <button type="submit" className="sr-only">Search</button>
    </form>
  );
}