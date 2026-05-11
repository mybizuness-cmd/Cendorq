import { NextResponse, type NextRequest } from "next/server";

import { setCustomerRememberedSessionCookie } from "@/lib/customer-remembered-session-runtime";
import {
  getCustomerEmailVerificationNoStoreHeaders,
  verifyCustomerEmailConfirmationToken,
  type CustomerEmailVerificationResult,
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
    const response = NextResponse.redirect(redirectUrl, {
      status: 303,
      headers: getCustomerEmailVerificationNoStoreHeaders(),
    });

    if (result.rememberedSession.eligible) {
      setCustomerRememberedSessionCookie(response, {
        customerIdHash: result.rememberedSession.customerIdHash,
        signupEmailHash: result.rememberedSession.signupEmailHash,
        destination: result.redirectPath,
      });
    }

    return response;
  }

  return NextResponse.json(projectSafeConfirmationResponse(result), {
    status: 409,
    headers: getCustomerEmailVerificationNoStoreHeaders(),
  });
}

export async function POST(request: NextRequest) {
  const payload = await readSafeJson(request);
  const result = await verifyCustomerEmailConfirmationToken({
    token: typeof payload.token === "string" ? payload.token : null,
    requestedDestination: typeof payload.destination === "string" ? payload.destination : null,
    safeReleaseReady: payload.safeReleaseReady === true,
  });

  return NextResponse.json(projectSafeConfirmationResponse(result), {
    status: result.status === 303 ? 200 : result.status,
    headers: getCustomerEmailVerificationNoStoreHeaders(),
  });
}

function projectSafeConfirmationResponse(result: CustomerEmailVerificationResult) {
  return {
    ok: result.ok,
    decision: result.decision,
    noStore: true,
    senderDisplay: result.senderDisplay,
    safeCustomerMessage: result.safeCustomerMessage,
    recoveryPath: "/free-check",
    dashboardPath: result.ok ? result.redirectPath : "/dashboard",
    tokenState: result.tokenState,
    blockedPatterns: result.blockedPatterns,
    rememberedSession: {
      eligible: result.rememberedSession.eligible,
      cookieOnly: true,
      customerIdHashReturned: false,
      signupEmailHashReturned: false,
      rawEmailReturned: false,
      rawTokenReturned: false,
    },
  } as const;
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
