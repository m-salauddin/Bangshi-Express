import { Settings, User, Globe, Shield } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page header  */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-red-600" />
          সিস্টেম সেটিংস
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          অ্যাডমিন প্রোফাইল এবং ওয়েবসাইটের সাধারণ কনফিগারেশন।
        </p>
      </div>

      {/* Setting  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* profile setting */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">প্রোফাইল সেটিংস</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            আপনার নাম, ইমেইল এবং পাসওয়ার্ড আপডেট করার অপশন খুব শিগগিরই এখানে যুক্ত হবে।
          </p>
          <button disabled className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-lg font-medium cursor-not-allowed">
            আপডেট প্রোফাইল (Coming Soon)
          </button>
        </div>

        {/* site setting */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">ওয়েবসাইট সেটিংস</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            ওয়েবসাইটের লোগো, সোশ্যাল মিডিয়া লিংক এবং যোগাযোগের তথ্য পরিবর্তন করার প্যানেল।
          </p>
          <button disabled className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-lg font-medium cursor-not-allowed">
            সাইট সেটিংস (Coming Soon)
          </button>
        </div>

      </div>
    </div>
  );
}