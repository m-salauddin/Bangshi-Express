"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

    // Sign the session token using the SHARED helper/secret so the token the
    // middleware verifies is guaranteed to match what we sign here.
    const token = await signAdminToken({
      userId: String(user.id),
      role: user.role,
    });

    // Set the cookie using the SHARED options (sameSite: "lax", path: "/").
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
  } catch (error) {
    // NOTE: keep this catch for DB/JWT errors only. `redirect()` below MUST stay
    // outside the try block: redirect() works by throwing a control-flow signal,
    // and catching it here would swallow the navigation.
    console.error("Admin login failed:", error);
    return { error: "সার্ভারে কোনো সমস্যা হয়েছে। একটু পর আবার চেষ্টা করুন।" };
  }

  // Success — the cookie is now attached to this response. Redirecting from the
  // server action commits the Set-Cookie header and navigates in one step.
  redirect("/admin/dashboard");
}