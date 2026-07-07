"use client";

import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { deleteNews } from "./actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // confirm with the user before deleting
    const confirmDelete = window.confirm("আপনি কি নিশ্চিত যে এই সংবাদটি সম্পূর্ণ ডিলিট করতে চান?");
    
    if (confirmDelete) {
      setIsDeleting(true);
      const result = await deleteNews(id);
      
      if (result?.error) {
        alert(result.error);
        setIsDeleting(false); // go previous step if there is an error
      }
      // if successful, the page will automatically revalidate and update due to the revalidatePath call in the deleteNews function
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      title="ডিলিট করুন" 
      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors disabled:opacity-50"
    >
      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin text-red-600" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}