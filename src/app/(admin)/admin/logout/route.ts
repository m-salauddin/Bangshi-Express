import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

export async function GET(request: Request) {
  // Clear the admin session cookie. We pass name + path so the delete targets
  // exactly the cookie that login set (path "/"); a mismatched path would leave
  // the cookie in place and keep the user "logged in".
  const cookieStore = await cookies();
  cookieStore.delete({ name: AUTH_COOKIE_NAME, path: "/" });

  // Send the user back to the public homepage.
  return NextResponse.redirect(new URL("/", request.url));
}