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
  "Referrer-Policy": "same-origin",
} as const;

export async function POST(request: NextRequest) {
  return clearSessionAndRedirect(request);
}

export async function GET(request: NextRequest) {
  return clearSessionAndRedirect(request);
}

function clearSessionAndRedirect(request: NextRequest) {
  const rawReturnTo = request.nextUrl.searchParams.get("returnTo");
  const publicReturnTo = rawReturnTo === "/" ? "/" : null;
  const returnTo = publicReturnTo || safeDashboardPath(rawReturnTo) || "/login";
  const redirectUrl = new URL(returnTo === "/" ? "/" : "/login", request.url);

  if (returnTo !== "/") {
    redirectUrl.searchParams.set("auth", "signed-out");
    redirectUrl.searchParams.set("returnTo", safeDashboardPath(returnTo) || "/dashboard");
  }

  const response = NextResponse.redirect(redirectUrl, { status: 303 });
  clearCustomerRememberedSessionCookie(response);
  for (const [key, value] of Object.entries(NO_STORE_HEADERS)) response.headers.set(key, value);
  return response;
}
