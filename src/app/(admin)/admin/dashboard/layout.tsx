"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { User, Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // side bar open state for mobile view 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden relative">
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Side bar container  */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* if you click sider any manue */}
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main contain area  */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* Topbar  */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 lg:px-8 shadow-sm z-10 transition-colors duration-300 shrink-0">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 -ml-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden focus:outline-none transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">অ্যাডমিন প্যানেল</h2>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-gray-200 dark:border-gray-600">
            <User className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="hidden sm:inline">অ্যাডমিন</span>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}