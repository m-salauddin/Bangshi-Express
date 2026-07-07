"use client";

import { usePathname } from "next/navigation";

export default function ConditionalLayout({
  children,
  navbar,
  footer,
  headerAd,
  footerAd,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
  headerAd: React.ReactNode;
  footerAd: React.ReactNode;
}) {
  const pathname = usePathname();

  // 💥 if the user is on an admin page, hide the layout
  const isHideLayout = pathname.startsWith("/admin");

  if (isHideLayout) {
    // only render the children without navbar, footer, or ads
    return <main className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</main>;
  }

  // home page, show navbar, footer, and ads
  return (
    <>
      {navbar}
      {headerAd}
      <main className="flex-grow container mx-auto px-4 md:px-8 py-6">
        {children}
      </main>
      {footerAd}
      {footer}
    </>
  );
}