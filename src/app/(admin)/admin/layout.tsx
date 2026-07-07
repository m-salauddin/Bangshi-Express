import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bangshi Express",
  description: "Secure Admin Control Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //set admin panel defierent layout 
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 selection:bg-red-500 selection:text-white">
      {children}
    </div>
  );
}