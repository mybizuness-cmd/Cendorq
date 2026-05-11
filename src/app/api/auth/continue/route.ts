import { readCustomerRememberedSession } from "@/lib/customer-remembered-session-runtime";
import { NextResponse, type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const requestedReturnTo = request.nextUrl.searchParams.get("returnTo");
  const session = readCustomerRememberedSession(request, requestedReturnTo);

  if (session.ok) {
    return NextResponse.redirect(new URL(session.safeReturnTo, request.url));
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("returnTo", session.safeReturnTo);
  loginUrl.searchParams.set("auth", session.reason === "not-configured" ? "session-unavailable" : "session-required");
  return NextResponse.redirect(loginUrl);
}
