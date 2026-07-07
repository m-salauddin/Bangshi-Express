"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Search, Menu, User, X, ChevronDown, Filter, LayoutDashboard, LogOut } from "lucide-react"; 
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect } from "react"; 
import SearchFilterModal from "./SearchFilterModal"; 
import { useLanguage } from "./LanguageProvider";
import SearchForm from "@/components/SearchForm";

type Category = {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
};

export default function Navbar({ 
  categories = [], 
  districts = [], 
  upazilas = [], 
  unions = [],
  isLoggedIn = false 
}: any) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const { language, toggleLanguage, t } = useLanguage();
  const pathname = usePathname(); 

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };
    const locale = language === "BN" ? "bn-BD" : "en-US";
    const formatter = new Intl.DateTimeFormat(locale, options);
    setCurrentDate(formatter.format(new Date()));
  }, [language]);

  const visibleCategories = categories?.slice(0, 6) || [];
  const hiddenCategories = categories?.slice(6) || [];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
        
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex py-3 items-center justify-between min-h-[5.5rem]">
            
            <Link href="/" className="flex items-start gap-2.5 group">
              
              
              
              <div className="flex flex-col">
                
                <div className="flex items-center  rounded-lg p-1.5 bg-white dark:bg-gray-900 shadow-sm transition-colors">
                  <span className="text-3xl sm:text-4xl font-extrabold text-black dark:text-white tracking-tight mr-1.5">
                    Bangshi
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-white bg-[#e60000] px-2.5 py-0.5 rounded-md tracking-tight">
                    Express
                  </span>
                </div>
                {/* Solid border */}
                <span className="text-[14px] font-extrabold text-black dark:text-white mt-1.5 ml-1 tracking-wide">
                  {currentDate}
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-5 mt-[-10px]">
              
              <SearchForm/>
              
              <button 
                onClick={() => setIsFilterOpen(true)} 
                className="p-2 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-300 hover:text-red-600" 
              >
                <Filter className="w-4 h-4" />
              </button>
              
              <button 
                onClick={toggleLanguage}
                className="px-3 py-1.5 text-sm font-bold border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition text-black dark:text-white"
              >
                {language === "BN" ? t("english") : t("bangla")}
              </button>
              
              <ThemeToggle />

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsProfileDropdownOpen(false), 200)}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-600 transition"
                  >
                    <User className="w-5 h-5" />
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 transition-colors font-bold">
                        <LayoutDashboard className="w-4 h-4" /> {language === "BN" ? "ড্যাশবোর্ড" : "Dashboard"}
                      </Link>
                      <Link href="/admin/logout" className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors font-bold">
                        <LogOut className="w-4 h-4" /> {language === "BN" ? "লগআউট" : "Logout"}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  href="/admin/login" 
                  className="px-4 py-1.5 text-sm font-bold text-red-600 border border-red-600 rounded-md hover:bg-red-50 dark:hover:bg-gray-800 transition"
                >
                  {t("login")}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3 md:hidden mt-[-10px]">
              <ThemeToggle />
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-black dark:text-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* 💥 category menu */}
        <div className="hidden md:block border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto px-4 md:px-8">
            <nav className="flex items-center justify-center gap-6 py-3 relative">
              <Link href="/" className={`text-[15px] font-bold transition-colors ${pathname === "/" ? "text-red-600 dark:text-red-500" : "text-black dark:text-white hover:text-red-600 dark:hover:text-red-500"}`}>
                {language === "BN" ? "সর্বশেষ" : "Latest"}
              </Link>
              {visibleCategories.map((category: Category) => (
                <Link key={category.id} href={`/category/${category.slug}`} className={`text-[15px] font-bold transition-colors ${pathname === `/category/${category.slug}` ? "text-red-600 dark:text-red-500" : "text-black dark:text-white hover:text-red-600 dark:hover:text-red-500"}`}>
                  {language === "BN" ? category.nameBn : category.nameEn}
                </Link>
              ))}
              
              {hiddenCategories.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setIsMoreDropdownOpen(!isMoreDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsMoreDropdownOpen(false), 200)}
                    className="flex items-center gap-1 text-[15px] font-bold text-black dark:text-white hover:text-red-600 dark:hover:text-red-500 transition-colors cursor-pointer"
                  >
                   {t("more")}
                   <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMoreDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMoreDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {hiddenCategories.map((category: Category) => {
                        const isActive = pathname === `/category/${category.slug}`;
                        return (
                          <Link
                            key={category.id}
                            href={`/category/${category.slug}`}
                            className={`block px-4 py-2 text-sm font-bold ${
                              isActive 
                                ? "bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-500" 
                                : "text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-500"
                            }`}
                          >
                            {language === "BN" ? category.nameBn : category.nameEn}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* 💥 Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4 space-y-4 shadow-lg absolute w-full max-h-[80vh] overflow-y-auto z-50">
            
            <div className="flex gap-2">
              <div className="w-full">
                <SearchForm />
              </div>
              <button 
                onClick={() => { setIsFilterOpen(true); setIsMobileMenuOpen(false); }} 
                className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-3 mt-2">
              <Link 
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-bold ${
                  pathname === "/" 
                    ? "text-red-600 dark:text-red-500" 
                    : "text-black dark:text-white hover:text-red-600"
                }`}
              >
                {language === "BN" ? "সর্বশেষ" : "Latest"}
              </Link>

              {categories?.map((category: Category) => {
                const isActive = pathname === `/category/${category.slug}`;
                return (
                  <Link 
                    key={category.id} 
                    href={`/category/${category.slug}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-bold ${
                      isActive 
                        ? "text-red-600 dark:text-red-500" 
                        : "text-black dark:text-white hover:text-red-600"
                    }`}
                  >
                    {language === "BN" ? category.nameBn : category.nameEn}
                  </Link>
                );
              })}
            </nav>
            <hr className="border-gray-200 dark:border-gray-800" />
            <div className="flex items-center justify-between pt-2">
              <button 
                onClick={toggleLanguage}
                className="px-3 py-1 text-sm font-bold border border-gray-300 dark:border-gray-700 rounded-md text-black dark:text-white"
              >
                {language === "BN" ? t("english") : t("bangla")}
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link href="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-1.5 text-black dark:text-white font-bold hover:text-red-600">
                    <LayoutDashboard className="w-4 h-4" /> {language === "BN" ? "ড্যাশবোর্ড" : "Dashboard"}
                  </Link>
                  <Link href="/admin/logout" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-1.5 text-red-600 font-bold">
                    <LogOut className="w-4 h-4" /> {language === "BN" ? "লগআউট" : "Logout"}
                  </Link>
                </div>
              ) : (
                <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-1 text-sm font-bold text-white bg-red-600 rounded-md">
                  {t("login")}
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      <SearchFilterModal 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        categories={categories} districts={districts} upazilas={upazilas} unions={unions}
      />
    </>
  );
}