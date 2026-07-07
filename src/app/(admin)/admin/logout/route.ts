import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // ১. ব্রাউজার থেকে admin_token নামের কুকিটি মুছে দিচ্ছি
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  
  // ২. কুকি মোছার পর ইউজারকে সরাসরি ওয়েবসাইটের হোমপেজে পাঠিয়ে দিচ্ছি
  return NextResponse.redirect(new URL("/", request.url));
}