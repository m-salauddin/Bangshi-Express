import type { Metadata } from "next";
import { cookies } from "next/headers"; 
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import ConditionalLayout from "@/components/ConditionalLayout"; 
import { prisma } from "@/lib/prisma";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/LanguageProvider";
import NextTopLoader from 'nextjs-toploader';


// global metadata for the application
export const metadata: Metadata = {
  title: "Bangshi Express | সর্বশেষ ও বস্তুনিষ্ঠ সংবাদ",
  description: "বংশী এক্সপ্রেস - বাংলাদেশের সর্বশেষ সংবাদ, রাজনীতি, অর্থনীতি, খেলাধুলা, এবং বিনোদন জগতের সব খবর সবার আগে।",
  keywords: ["Bangshi Express", "Bangla News", "Bangladesh", "Latest News in Bengali", "বংশী এক্সপ্রেস", "বাংলা খবর"],
  openGraph: {
    title: "Bangshi Express | সর্বশেষ ও বস্তুনিষ্ঠ সংবাদ",
    description: "বাংলাদেশের সর্বশেষ সংবাদ সবার আগে জানতে চোখ রাখুন বংশী এক্সপ্রেসে।",
    url: "https://bangshiexpress.com",
    siteName: "Bangshi Express",
    images: [
      {
        url: "https://bangshiexpress.com/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Bangshi Express Logo",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ১. Check if the user is logged in by checking for the presence of an admin token in cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const isLoggedIn = !!token; 

  // ২. fetching categories, districts, upazilas, unions, and active ads simultaneously
  const [categories, districts, upazilas, unions, activeAds] = await Promise.all([
    prisma.category.findMany({ orderBy: { nameBn: "asc" } }), 
    prisma.district.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.upazila.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.union.findMany({ orderBy: { nameBn: "asc" } }),
    prisma.advertisement.findMany({
      where: {
        isActive: true,
        OR: [
          { endDate: null },             
          { endDate: { gte: new Date() } } 
        ]
      }
    })
  ]);

  // separate header and footer ads from activeAds
  const headerAd = activeAds.find((ad) => ad.position === "header");
  const footerAd = activeAds.find((ad) => ad.position === "footer");

  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            
            
            {/* use conditional layout */}
            <ConditionalLayout
              navbar={
                <Navbar 
                  categories={categories} 
                  districts={districts} 
                  upazilas={upazilas} 
                  unions={unions} 
                  isLoggedIn={isLoggedIn} // send login status to Navbar
                />
              }
              headerAd={<AdBanner ad={headerAd} />}
              footerAd={<AdBanner ad={footerAd} className="mb-8" />}
              footer={<Footer categories={categories} />}
            >
              {children}
            </ConditionalLayout>

          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}