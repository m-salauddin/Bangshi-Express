"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyIdButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("আইডি কপি করতে সমস্যা হয়েছে", err);
    }
  };

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-gray-500 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-1.5 rounded-lg w-fit">
      <span className="truncate max-w-[100px]" title={id}>{id}</span>
      <button
        onClick={handleCopy}
        type="button"
        className={`p-1 rounded transition-colors ${
          copied 
            ? "text-green-600 bg-green-50 dark:bg-green-900/20" 
            : "text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
        }`}
        title={copied ? "কপি হয়েছে!" : "আইডি কপি করুন"}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}