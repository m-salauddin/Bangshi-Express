import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

const LOGIN_PATH = "/admin/login";

// Admin paths that must stay reachable without a session.
const PUBLIC_ADMIN_PATHS = new Set<string>([LOGIN_PATH, "/admin/logout"]);

// -----------------------------------------------------------------------------
// EDGE middleware — intentionally does a CHEAP check only: "is a session cookie
// present?". It does NOT verify the JWT signature and does NOT read JWT_SECRET.
//
// Why: middleware runs on the Edge runtime, which on Vercel is a *separate*
// deployment target from the Node runtime that signs the token. Verifying the
// signature here made the app depend on JWT_SECRET being identical in both
// runtimes — and when it wasn't (the classic Vercel case) every verification
// failed, the cookie was deleted, and you were bounced to /admin/login on every
// reload. Real verification now happens in the dashboard's server-component
// layout (Node runtime, same secret as signing). This is the pattern Next.js
// officially recommends: optimistic cookie check in middleware, real auth in
// the data/layout layer.
// -----------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Login and logout are always reachable.
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // Any other /admin route requires the cookie to at least exist. If it's a
  // forged/expired token, the dashboard layout (server component) will verify
  // it properly and redirect. We do NOT delete the cookie here.
  const hasToken = request.cookies.has(AUTH_COOKIE_NAME);
  if (!hasToken) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};