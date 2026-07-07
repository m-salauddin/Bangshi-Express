import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret"
);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("admin_token")?.value;

  // if the user is trying to access the login page
  if (path === "/admin/login") {
    if (token) {
      try {
        await jwtVerify(token, secretKey);
        // if the token is valid, redirect the user to the dashboard
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch (error) {
        // if the token is invalid or expired, delete the cookie and redirect to the login page
        const response = NextResponse.next();
        response.cookies.delete("admin_token");
        return response;
      }
    }
    return NextResponse.next();
  }

  // if the user is trying to access any other admin page
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(token, secretKey);
      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};