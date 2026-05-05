"use client";

const FREE_SCAN_RESULTS_DESTINATION = "/dashboard/reports/free-scan";

export type FreeScanVerifyToViewDestination = typeof FREE_SCAN_RESULTS_DESTINATION | "/dashboard/reports" | "/dashboard" | "/dashboard/notifications";

export type FreeScanVerifyToViewClientInput = {
  signupEmail: string;
  intakeId: string;
  requestedDestination?: FreeScanVerifyToViewDestination;
  emailAlreadyVerified?: boolean;
  verificationTokenIssued?: boolean;
  verificationTokenExpired?: boolean;
  safeReleaseReady?: boolean;
  resendRequested?: boolean;
};

export type FreeScanVerifyToViewClientHandoff = {
  ok: boolean;
  decision: "verify-before-results" | "verified-open-destination" | "resend-confirmation" | "hold";
  status: 200 | 202 | 409;
  noStore: true;
  handoff: {
    senderDisplay: "Cendorq Support <support@cendorq.com>";
    senderEmail: "support@cendorq.com";
    subject: string;
    preheader: string;
    checkInboxCopy: string;
    primaryCta: string;
    verifiedDestination: string;
    dashboardModule: string;
    reportVisibilityRule: string;
    safeCustomerMessage: string;
    showProtectedResults: boolean;
  };
  safety: {
    rawPayloadStored: false;
    rawEvidenceReturned: false;
    rawBillingDataReturned: false;
    internalNotesReturned: false;
    operatorIdentityReturned: false;
    riskInternalsReturned: false;
    tokensReturned: false;
    localStorageAllowed: false;
    sessionStorageAllowed: false;
  };
};

export async function requestFreeScanVerifyToViewHandoff(
  input: FreeScanVerifyToViewClientInput,
): Promise<FreeScanVerifyToViewClientHandoff> {
  const response = await fetch("/api/free-scan/intake-complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      signupEmail: input.signupEmail,
      intakeId: input.intakeId,
      requestedDestination: normalizeFreeScanDestination(input.requestedDestination),
      emailAlreadyVerified: input.emailAlreadyVerified === true,
      verificationTokenIssued: input.verificationTokenIssued !== false,
      verificationTokenExpired: input.verificationTokenExpired === true,
      safeReleaseReady: input.safeReleaseReady === true,
      resendRequested: input.resendRequested === true,
    }),
  });

  const data = (await response.json().catch(() => null)) as FreeScanVerifyToViewClientHandoff | null;
  if (!data || typeof data !== "object") throw new Error("Cendorq could not prepare the confirmation handoff yet.");
  if (!isSafeVerifyToViewHandoff(data)) throw new Error("The confirmation handoff was held for safety.");
  return data;
}

export function isSafeVerifyToViewHandoff(value: FreeScanVerifyToViewClientHandoff) {
  return Boolean(
    value.noStore === true &&
      value.handoff?.senderDisplay === "Cendorq Support <support@cendorq.com>" &&
      value.handoff?.senderEmail === "support@cendorq.com" &&
      value.handoff?.primaryCta &&
      value.handoff?.verifiedDestination?.startsWith("/dashboard") &&
      value.safety?.rawPayloadStored === false &&
      value.safety?.rawEvidenceReturned === false &&
      value.safety?.rawBillingDataReturned === false &&
      value.safety?.internalNotesReturned === false &&
      value.safety?.operatorIdentityReturned === false &&
      value.safety?.riskInternalsReturned === false &&
      value.safety?.tokensReturned === false &&
      value.safety?.localStorageAllowed === false &&
      value.safety?.sessionStorageAllowed === false &&
      (value.decision !== "verified-open-destination" || value.handoff.showProtectedResults === true),
  );
}

function normalizeFreeScanDestination(destination: FreeScanVerifyToViewClientInput["requestedDestination"]) {
  if (!destination || destination === "/dashboard/reports") return FREE_SCAN_RESULTS_DESTINATION;
  return destination;
}
