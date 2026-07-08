"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import {
  AUTH_COOKIE_NAME,
  getAuthCookieOptions,
  signAdminToken,
} from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // Find the user by email.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Invalid credentials.
    if (!user || user.password !== password) {
      return { error: "ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে!" };
    }

    // Not an admin.
    if (user.role !== "ADMIN") {
      return { error: "আপনার এই প্যানেলে প্রবেশের অনুমতি নেই!" };
    }

    // Sign the session token using the SHARED helper/secret.
    const token = await signAdminToken({
      userId: String(user.id),
      role: user.role,
    });

    // Set the cookie using the SHARED options (sameSite: "lax", path: "/").
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

    // ⚠️ IMPORTANT: do NOT call redirect() here.
    // Setting a cookie AND redirect()-ing inside the same server action drops
    // the Set-Cookie header on Vercel/production (a known Next.js issue), so the
    // cookie never reaches the browser — which is exactly why the session died
    // only after deploying. Instead we return success and let the CLIENT do a
    // hard navigation (window.location) so the browser makes a fresh request
    // that carries the freshly-set cookie.
    return { success: true };
  } catch (error) {
    console.error("Admin login failed:", error);
    return { error: "সার্ভারে কোনো সমস্যা হয়েছে। একটু পর আবার চেষ্টা করুন।" };
  }
}