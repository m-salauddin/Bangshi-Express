import Link from "next/link";

export default function AdBanner({ ad, className = "" }: { ad: any, className?: string }) {
  // if ads is null or undefined, return null
  if (!ad) return null;

  return (
    <div className={`w-full flex justify-center my-4 px-4 md:px-8 ${className}`}>
      {/* Max width */}
      <div className="relative group max-w-[728px] w-full bg-gray-50 dark:bg-gray-800/30 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:shadow-md flex justify-center items-center">
        
        {/* ads tags*/}
        <span className="absolute top-0 left-0 bg-gray-900/60 dark:bg-gray-950/60 text-white text-[10px] px-2 py-0.5 rounded-br z-10 backdrop-blur-md">
          বিজ্ঞাপন
        </span>

        {ad.link ? (
          <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block relative w-full text-center">
            <img 
              src={ad.imageUrl} 
              alt={ad.title} 
              // max height 90px এবং hover এ scale effect added
              className="w-full h-auto max-h-[90px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.01]" 
            />
            {ad.buttonText && (
               <div className="absolute bottom-1 right-2 bg-red-600 text-white text-[10px] font-medium px-2 py-1 rounded shadow-lg group-hover:bg-red-700 transition-colors">
                 {ad.buttonText}
               </div>
            )}
          </a>
        ) : (
          <div className="block relative w-full text-center">
             <img 
               src={ad.imageUrl} 
               alt={ad.title} 
               className="w-full h-auto max-h-[90px] object-contain mx-auto" 
             />
          </div>
        )}
      </div>
    </div>
  );
}