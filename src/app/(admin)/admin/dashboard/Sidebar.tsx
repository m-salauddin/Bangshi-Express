"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Layers, LogOut, Settings, MapPin, MonitorPlay, Globe } from "lucide-react"; // 💥 Globe আইকন যুক্ত করা হলো

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "ড্যাশবোর্ড", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "সকল সংবাদ", icon: FileText, href: "/admin/dashboard/news" },
    { name: "ক্যাটাগরি", icon: Layers, href: "/admin/dashboard/categories" },
    { name: "লোকেশন", icon: MapPin, href: "/admin/dashboard/locations" }, 
    { name: "বিজ্ঞাপন", icon: MonitorPlay, href: "/admin/dashboard/ads" },
    { name: "সেটিংস", icon: Settings, href: "/admin/dashboard/settings" },
  ];

  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0 transition-colors duration-300">
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <span className="text-xl font-bold text-red-600 dark:text-red-500 tracking-tight">Bangshi Express</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive 
                  ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-500 shadow-sm" 
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* main website and log out button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        
        {/* Main website link */}
        <Link 
          href="/"
          onClick={onClose}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
        >
          <Globe className="w-5 h-5" />
          মূল ওয়েবসাইট
        </Link>

        {/* logout button */}
        <Link 
          href="/admin/logout"
          onClick={onClose}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          লগআউট
        </Link>

      </div>
    </aside>
  );
}