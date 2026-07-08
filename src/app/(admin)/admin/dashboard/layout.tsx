import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";
import DashboardShell from "./DashboardShell";

// This is a SERVER component (no "use client"). It runs on the Node runtime —
// the SAME runtime that signs the token in the login action — so JWT_SECRET is
// guaranteed to be the same value here as when the token was created. This is
// where the REAL authentication check happens.
//
// The middleware only checks that a cookie EXISTS (a fast, edge-safe gate).
// The actual signature/expiry verification happens here. Because signing and
// verifying now share one runtime, there is no Edge-vs-Node secret mismatch —
// which was why the session died only on Vercel.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  const payload = await verifyAdminToken(token);
  if (!payload || payload.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <DashboardShell>{children}</DashboardShell>;
}