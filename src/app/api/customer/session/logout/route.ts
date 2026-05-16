import { NextRequest, NextResponse } from "next/server";

import { clearCustomerRememberedSessionCookie, safeDashboardPath } from "@/lib/customer-remembered-session-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
} as const;

export async function POST(request: NextRequest) {
  return clearSessionAndRedirect(request);
}

export async function GET(request: NextRequest) {
  return clearSessionAndRedirect(request);
}

function clearSessionAndRedirect(request: NextRequest) {
  const returnTo = safeDashboardPath(request.nextUrl.searchParams.get("returnTo")) || "/dashboard";
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("auth", "signed-out");
  loginUrl.searchParams.set("returnTo", returnTo);

  const response = NextResponse.redirect(loginUrl, { status: 303 });
  clearCustomerRememberedSessionCookie(response);
  for (const [key, value] of Object.entries(NO_STORE_HEADERS)) response.headers.set(key, value);
  return response;
}
