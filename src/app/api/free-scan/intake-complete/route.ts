import { NextResponse, type NextRequest } from "next/server";

import {
  buildCustomerEmailConfirmationApiResponse,
  buildCustomerEmailConfirmationNoStoreHeaders,
} from "@/lib/customer-email-confirmation-api-response";

const MAX_BODY_BYTES = 8_000;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      ...buildCustomerEmailConfirmationNoStoreHeaders(),
      Allow: "POST, OPTIONS",
    },
  });
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      buildCustomerEmailConfirmationApiResponse({
        journeyKey: "free-scan-submitted",
        customerIdHashPresent: false,
        signupEmailPresent: false,
        emailAlreadyVerified: false,
        verificationTokenIssued: false,
        customerOwnedDestination: false,
        requestedDestination: "/dashboard/reports",
      }),
      { status: 409, headers: buildCustomerEmailConfirmationNoStoreHeaders() },
    );
  }

  const payload = await readSafeJson(request);
  const signupEmailPresent = hasSafeEmail(payload.signupEmail);
  const intakeIdPresent = hasSafeIntakeId(payload.intakeId);
  const emailAlreadyVerified = payload.emailAlreadyVerified === true;
  const verificationTokenIssued = payload.verificationTokenIssued !== false;
  const verificationTokenExpired = payload.verificationTokenExpired === true;
  const resendRequested = payload.resendRequested === true;
  const safeReleaseReady = payload.safeReleaseReady === true;
  const requestedDestination = typeof payload.requestedDestination === "string" ? payload.requestedDestination : "/dashboard/reports";

  const response = buildCustomerEmailConfirmationApiResponse({
    journeyKey: "free-scan-submitted",
    customerIdHashPresent: intakeIdPresent,
    signupEmailPresent,
    emailAlreadyVerified,
    verificationTokenIssued,
    verificationTokenExpired,
    safeReleaseReady,
    customerOwnedDestination: intakeIdPresent,
    requestedDestination,
    resendRequested,
  });

  return NextResponse.json(response, {
    status: response.status,
    headers: buildCustomerEmailConfirmationNoStoreHeaders(),
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

function hasSafeEmail(value: unknown) {
  return typeof value === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) && value.length <= 254;
}

function hasSafeIntakeId(value: unknown) {
  return hasSafeIdentifier(value);
}

function hasSafeIdentifier(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9:_-]{8,160}$/.test(value);
}
