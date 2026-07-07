import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    // full screen overlay with semi-transparent background and blur effect
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
      
      {/* loading spinner */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 border-4 border-red-100 dark:border-red-900/30 rounded-full"></div>
        <Loader2 className="w-12 h-12 text-red-600 animate-spin relative z-10" />
      </div>
      
      {/* loading text */}
      <h2 className="mt-4 text-lg font-bold text-gray-800 dark:text-gray-200 tracking-wide animate-pulse">
        লোড হচ্ছে...
      </h2>
      
    </div>
  );
}