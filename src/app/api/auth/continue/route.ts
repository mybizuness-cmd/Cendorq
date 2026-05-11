import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE_NAMES = [
  "cendorq_customer_session",
  "cendorq_session",
  "cendorq_verified_customer",
] as const;

const SAFE_DASHBOARD_PATHS = [
  "/dashboard",
  "/dashboard/reports",
  "/dashboard/reports/free-scan",
  "/dashboard/billing",
  "/dashboard/support",
  "/dashboard/notifications",
] as const;

export function GET(request: NextRequest) {
  const requestedReturnTo = request.nextUrl.searchParams.get("returnTo");
  const targetPath = safeDashboardPath(requestedReturnTo) || "/dashboard";
  const hasTrustedSession = SESSION_COOKIE_NAMES.some((name) => Boolean(request.cookies.get(name)?.value));

  if (hasTrustedSession) {
    return NextResponse.redirect(new URL(targetPath, request.url));
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("returnTo", targetPath);
  loginUrl.searchParams.set("auth", "session-required");
  return NextResponse.redirect(loginUrl);
}

function safeDashboardPath(value: string | null) {
  if (!value) return null;
  return SAFE_DASHBOARD_PATHS.find((path) => value === path || value.startsWith(`${path}/`)) || null;
}
