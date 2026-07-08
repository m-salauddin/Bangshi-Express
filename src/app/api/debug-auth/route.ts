import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { AUTH_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";

// ⚠️ TEMPORARY DIAGNOSTIC ROUTE. Delete this folder after debugging.
// Visit: https://<your-site>/api/debug-auth  (AFTER logging in on the site)
// It never reveals the secret itself — only safe metadata.
export async function GET() {
  const secret = process.env.JWT_SECRET;
  const hasSecret = !!secret && secret.length > 0;

  const secretInfo = {
    hasJWT_SECRET: hasSecret,
    secretLength: secret ? secret.length : 0,
    // These catch the two most common Vercel mistakes:
    startsOrEndsWithQuote: secret
      ? /^["']|["']$/.test(secret)
      : false,
    hasLeadingOrTrailingSpace: secret ? secret !== secret.trim() : false,
    nodeEnv: process.env.NODE_ENV,
  };

  // Can this runtime sign AND verify with its own secret? (should be "OK")
  let signVerifyRoundtrip = "skipped (no secret)";
  if (hasSecret) {
    try {
      const key = new TextEncoder().encode(secret);
      const t = await new SignJWT({ test: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("5m")
        .sign(key);
      await jwtVerify(t, key, { algorithms: ["HS256"] });
      signVerifyRoundtrip = "OK";
    } catch (e) {
      signVerifyRoundtrip = "FAILED: " + (e as Error).message;
    }
  }

  // Does the browser's actual admin_token cookie verify against THIS runtime?
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  let cookieStatus: string;
  if (!token) {
    cookieStatus = "NO COOKIE (browser did not send admin_token)";
  } else {
    const payload = await verifyAdminToken(token);
    cookieStatus = payload
      ? `VALID (role=${payload.role})`
      : "INVALID — cookie exists but does NOT match this runtime's secret " +
        "(secret changed, has quotes/spaces, or cookie was signed elsewhere)";
  }

  return NextResponse.json({
    ...secretInfo,
    signVerifyRoundtrip,
    cookiePresent: !!token,
    cookieStatus,
  });
}