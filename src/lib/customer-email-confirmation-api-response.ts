import { projectCustomerEmailConfirmationHandoff, type CustomerEmailConfirmationHandoffInput } from "./customer-email-confirmation-handoff-runtime";

export type CustomerEmailConfirmationApiResponse = {
  ok: boolean;
  decision: "verify-before-results" | "verified-open-destination" | "resend-confirmation" | "hold";
  status: 200 | 202 | 409;
  noStore: true;
  handoff: {
    journeyKey: string;
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
    holdReasons: readonly string[];
    blockedPatterns: readonly string[];
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

export function buildCustomerEmailConfirmationApiResponse(
  input: CustomerEmailConfirmationHandoffInput,
): CustomerEmailConfirmationApiResponse {
  const projection = projectCustomerEmailConfirmationHandoff(input);
  const decision = mapDecision(projection.decision);
  const status = decision === "hold" ? 409 : projection.showProtectedResults ? 200 : 202;

  return {
    ok: decision !== "hold",
    decision,
    status,
    noStore: true,
    handoff: {
      journeyKey: projection.journeyKey,
      senderDisplay: projection.senderDisplay,
      senderEmail: projection.senderEmail,
      subject: projection.subject,
      preheader: projection.preheader,
      checkInboxCopy: projection.checkInboxCopy,
      primaryCta: projection.primaryCta,
      verifiedDestination: projection.verifiedDestination,
      dashboardModule: projection.dashboardModule,
      reportVisibilityRule: projection.reportVisibilityRule,
      safeCustomerMessage: projection.safeCustomerMessage,
      showProtectedResults: projection.showProtectedResults,
      holdReasons: projection.holdReasons,
      blockedPatterns: projection.blockedPatterns,
    },
    safety: {
      rawPayloadStored: false,
      rawEvidenceReturned: false,
      rawBillingDataReturned: false,
      internalNotesReturned: false,
      operatorIdentityReturned: false,
      riskInternalsReturned: false,
      tokensReturned: false,
      localStorageAllowed: false,
      sessionStorageAllowed: false,
    },
  };
}

export function buildCustomerEmailConfirmationNoStoreHeaders() {
  return {
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store",
  } as const;
}

function mapDecision(decision: ReturnType<typeof projectCustomerEmailConfirmationHandoff>["decision"]): CustomerEmailConfirmationApiResponse["decision"] {
  if (decision === "send-verification") return "verify-before-results";
  if (decision === "resend-verification") return "resend-confirmation";
  if (decision === "route-verified") return "verified-open-destination";
  return "hold";
}
