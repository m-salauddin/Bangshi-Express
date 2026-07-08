// -----------------------------------------------------------------------------
// Single source of truth for admin authentication.
//
// IMPORTANT: This file is imported by BOTH the Edge runtime (middleware.ts) and
// the Node runtime (server actions / route handlers). It must therefore stay
// edge-compatible: only `jose` (edge-safe) and `process.env` are used here.
// Do NOT import Prisma, `next/headers`, `pg`, or any Node-only module.
//
// By centralising the secret, cookie name and cookie options here, the code
// that SIGNS a token (login action) and the code that VERIFIES it (middleware)
// can never diverge — divergence is the classic cause of "login works but every
// refresh logs me out" redirect loops.
// -----------------------------------------------------------------------------

import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// The cookie name used everywhere (login, logout, middleware).
export const AUTH_COOKIE_NAME = "admin_token";

// Token / cookie lifetime in seconds (1 day).
export const AUTH_MAX_AGE = 60 * 60 * 24;

// The JWT signing algorithm. Pinned so verification can require it explicitly
// (prevents algorithm-confusion attacks and silent mismatches).
const JWT_ALG = "HS256";

/**
 * Reads and encodes the JWT secret.
 *
 * We intentionally do NOT fall back to a hard-coded "default_secret". A silent
 * fallback is dangerous: if the real secret is present in one runtime but not
 * another (or is added later), tokens signed with one key fail verification
 * with the other — producing exactly the infinite-redirect / session-drop bug.
 * Failing loudly at boot surfaces the misconfiguration immediately.
 */
function getSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error(
      "JWT_SECRET is not defined. Set it in your environment (.env locally, " +
        "and in Vercel Project Settings → Environment Variables for all " +
        "environments) before running the app."
    );
  }
  return new TextEncoder().encode(secret);
}

export interface AdminTokenPayload extends JWTPayload {
  userId: string;
  role: string;
}

/** Signs a new admin session token. */
export async function signAdminToken(payload: {
  userId: string;
  role: string;
}): Promise<string> {
  return new SignJWT({ userId: payload.userId, role: payload.role })
    .setProtectedHeader({ alg: JWT_ALG })
    .setIssuedAt()
    .setExpirationTime(`${AUTH_MAX_AGE}s`)
    .sign(getSecretKey());
}

/**
 * Verifies an admin session token.
 * Returns the decoded payload, or `null` if the token is missing/invalid/expired.
 * Never throws — callers branch on the return value.
 */
export async function verifyAdminToken(
  token: string | undefined
): Promise<AdminTokenPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: [JWT_ALG],
    });
    return payload as AdminTokenPayload;
  } catch {
    return null;
  }
}

/**
 * Cookie options shared by the login action (set) and logout route (delete).
 *
 * - httpOnly: JS on the page can never read the token (XSS hardening).
 * - secure:   HTTPS-only in production; allowed over http on localhost so dev works.
 * - sameSite: "lax" (NOT "strict"). This is the crux of the redirect-loop fix.
 *             "strict" withholds the cookie on top-level navigations that arrive
 *             via a redirect and on a range of same-origin RSC/navigation requests,
 *             which is why the session appeared to vanish on reload and sidebar
 *             navigation. "lax" still blocks cross-site POST/CSRF while sending the
 *             cookie on the normal GET navigations the admin panel relies on.
 * - path:     "/" so the cookie is sent for every route (and cleared correctly).
 */
export function getAuthCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: AUTH_MAX_AGE,
  };
}