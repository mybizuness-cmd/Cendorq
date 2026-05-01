import { NextResponse, type NextRequest } from "next/server";

import {
  getCustomerEmailVerificationNoStoreHeaders,
  verifyCustomerEmailConfirmationToken,
} from "@/lib/customer-email-verification-token-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const destination = request.nextUrl.searchParams.get("destination");
  const result = await verifyCustomerEmailConfirmationToken({
    token,
    requestedDestination: destination,
    safeReleaseReady: true,
  });

  if (result.ok && result.decision === "verified-redirect") {
    const redirectUrl = new URL(result.redirectPath, request.url);
    return NextResponse.redirect(redirectUrl, {
      status: 303,
      headers: getCustomerEmailVerificationNoStoreHeaders(),
    });
  }

  return NextResponse.json(
    {
      ok: false,
      decision: result.decision,
      noStore: true,
      senderDisplay: result.senderDisplay,
      safeCustomerMessage: result.safeCustomerMessage,
      recoveryPath: "/free-check",
      dashboardPath: "/dashboard",
      tokenState: result.tokenState,
      blockedPatterns: result.blockedPatterns,
    },
    { status: 409, headers: getCustomerEmailVerificationNoStoreHeaders() },
  );
}

export async function POST(request: NextRequest) {
  const payload = await readSafeJson(request);
  const result = await verifyCustomerEmailConfirmationToken({
    token: typeof payload.token === "string" ? payload.token : null,
    requestedDestination: typeof payload.destination === "string" ? payload.destination : null,
    safeReleaseReady: payload.safeReleaseReady === true,
  });

  return NextResponse.json(result, {
    status: result.status === 303 ? 200 : result.status,
    headers: getCustomerEmailVerificationNoStoreHeaders(),
  });
}

async function readSafeJson(request: NextRequest) {
  try {
    const value = await request.json();
    if (!value || typeof value !== "object" || Array.isArray(value)) return {} as Record<string, unknown>;
    return value as Record<string, unknown>;
  } catch {
    return {} as Record<string, unknown>;
  }
}
