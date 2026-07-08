import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

const LOGIN_PATH = "/admin/login";
const DASHBOARD_PATH = "/admin/dashboard";

// Paths under /admin that must remain reachable WITHOUT a valid session.
// (logout must work even if the token is already invalid, otherwise you can
// get stuck.)
const PUBLIC_ADMIN_PATHS = new Set<string>([LOGIN_PATH, "/admin/logout"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const payload = await verifyAdminToken(token);
  const isAuthenticated = payload !== null;

  // 1) The login page: if already authenticated, bounce to the dashboard.
  //    Otherwise let it render (and proactively clear any stale/invalid cookie).
  if (pathname === LOGIN_PATH) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DASHBOARD_PATH, request.url));
    }
    const response = NextResponse.next();
    if (token && !isAuthenticated) {
      response.cookies.delete(AUTH_COOKIE_NAME);
    }
    return response;
  }

  // 2) Other public admin paths (e.g. logout): always allow through.
  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // 3) Every protected /admin route: require a valid session.
  if (!isAuthenticated) {
    // Redirect the browser to the login page. `next-url` lets the login page
    // send the user back where they came from after signing in (optional).
    const loginUrl = new URL(LOGIN_PATH, request.url);
    const response = NextResponse.redirect(loginUrl);
    // Clear the bad cookie so we don't loop verifying the same broken token.
    if (token) {
      response.cookies.delete(AUTH_COOKIE_NAME);
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Run only on admin routes. This intentionally matches RSC data requests
  // (…?_rsc=) for those same paths so protected data can't be fetched without
  // a session, while leaving _next static assets and public pages untouched.
  matcher: ["/admin/:path*"],
};