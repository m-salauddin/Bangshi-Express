import Link from "next/link";
import { Clock, Eye } from "lucide-react";

// Type for the props that the NewsCard component will receive
type NewsCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  categoryName: string;
  views: number;
  date: string;
};

export default function NewsCard({ id, title, thumbnail, categoryName, views, date }: NewsCardProps) {
  return (
    <Link 
      href={`/news/${id}`} 
      className="group flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-red-100 dark:hover:border-red-900/30 transition-all duration-300"
    >
      {/* image section */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
        />
        {/* category badge */}
        <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wide">
          {categoryName}
        </span>
      </div>

      {/* text and metadata */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-2 mb-4 leading-snug">
          {title}
        </h3>
        
        <div className="mt-auto flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}