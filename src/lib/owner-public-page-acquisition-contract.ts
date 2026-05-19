import type { OwnerPublicCompanyUrlSafetyResult } from "./owner-public-company-url-safety";

export type OwnerPublicPageAcquisitionTarget = {
  normalizedUrl: string;
  mode: "owner-public-company-preview-acquisition";
  allowedInput: "safe-public-url-only";
  fetchAllowed: boolean;
  screenshotAllowed: boolean;
  robotsRespectRequired: true;
  timeoutMs: number;
  maxBytes: number;
  rawHtmlStored: false;
  rawScreenshotStored: false;
  credentialsAllowed: false;
  privateNetworkAllowed: false;
};

export type OwnerPublicPageAcquisitionProjection = {
  ok: boolean;
  status: "ready" | "blocked";
  reason: string;
  target?: OwnerPublicPageAcquisitionTarget;
  safeOutput: {
    publicUrlOnly: true;
    textSummaryAllowed: boolean;
    screenshotSummaryAllowed: boolean;
    rawHtmlReturned: false;
    rawScreenshotReturned: false;
    privateCredentialReturned: false;
    customerDeliveryApproved: false;
    reportReleaseApproved: false;
    billingMutationAllowed: false;
    entitlementMutationAllowed: false;
  };
};

export const OWNER_PUBLIC_PAGE_ACQUISITION_STANDARD = [
  "Only safe public company URLs may enter owner report test acquisition.",
  "Acquisition may summarize public HTML and screenshots, but must not store or return raw HTML, raw screenshots, credentials, session data, private network responses, or private customer data.",
  "Acquisition must stay owner-only, no-store, no customer delivery, no report release, no billing mutation, and no entitlement mutation.",
  "Acquisition output must be used as evidence input for report previews, not as a customer-delivered report by itself.",
] as const;

export function buildOwnerPublicPageAcquisitionProjection(urlSafety: OwnerPublicCompanyUrlSafetyResult): OwnerPublicPageAcquisitionProjection {
  if (!urlSafety.ok || !urlSafety.fetchAllowed || !urlSafety.screenshotsAllowed) {
    return blocked(urlSafety.reason);
  }

  return {
    ok: true,
    status: "ready",
    reason: "public-acquisition-ready",
    target: {
      normalizedUrl: urlSafety.normalizedUrl,
      mode: "owner-public-company-preview-acquisition",
      allowedInput: "safe-public-url-only",
      fetchAllowed: true,
      screenshotAllowed: true,
      robotsRespectRequired: true,
      timeoutMs: 8000,
      maxBytes: 500000,
      rawHtmlStored: false,
      rawScreenshotStored: false,
      credentialsAllowed: false,
      privateNetworkAllowed: false,
    },
    safeOutput: safeOutput(true),
  };
}

function blocked(reason: string): OwnerPublicPageAcquisitionProjection {
  return {
    ok: false,
    status: "blocked",
    reason,
    safeOutput: safeOutput(false),
  };
}

function safeOutput(summaryAllowed: boolean) {
  return {
    publicUrlOnly: true,
    textSummaryAllowed: summaryAllowed,
    screenshotSummaryAllowed: summaryAllowed,
    rawHtmlReturned: false,
    rawScreenshotReturned: false,
    privateCredentialReturned: false,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  } as const;
}
