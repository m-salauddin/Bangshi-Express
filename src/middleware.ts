import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

const LOGIN_PATH = "/admin/login";

// লগইন ছাড়াও যেসব admin পেজে ঢোকা যাবে
const PUBLIC_ADMIN_PATHS = new Set<string>([LOGIN_PATH, "/admin/logout"]);

// -----------------------------------------------------------------------------
// এই middleware শুধু দেখে কুকি আছে কিনা — JWT ভেরিফাই করে না, কুকিও মোছে না।
// আসল যাচাই হয় dashboard/layout.tsx এ (Node runtime)।
// -----------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // লগইন আর লগআউট সবসময় খোলা
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // বাকি সব /admin পেজে অন্তত কুকিটা থাকতে হবে
  const hasToken = request.cookies.has(AUTH_COOKIE_NAME);
  if (!hasToken) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};