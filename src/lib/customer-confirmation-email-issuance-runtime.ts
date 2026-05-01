import { createHash } from "node:crypto";

import {
  issueCustomerEmailVerificationToken,
  type IssueCustomerEmailVerificationTokenInput,
} from "./customer-email-verification-token-runtime";
import { CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT } from "./customer-email-confirmation-handoff-contracts";
import { getCustomerEmailTemplateContracts } from "./customer-email-template-contracts";

export type CustomerConfirmationEmailIssuanceInput = IssueCustomerEmailVerificationTokenInput & {
  customerEmailHash: string;
  baseUrl: string;
  businessName?: string | null;
};

export type CustomerConfirmationEmailPayload = {
  ok: true;
  queued: true;
  emailKey: "confirm-email";
  senderName: "Cendorq Support";
  fromAddress: "support@cendorq.com";
  toHash: string;
  subject: string;
  preheader: string;
  primaryCta: string;
  confirmationUrlHash: string;
  confirmationPath: string;
  expiresAt: string;
  destination: string;
  safePreviewText: string;
  providerReadyPayload: {
    templateKey: "confirm-email";
    senderDisplay: "Cendorq Support <support@cendorq.com>";
    subject: string;
    preheader: string;
    primaryCta: string;
    bodyIntro: string;
    bodyGuidance: string;
    bodyFooter: string;
    confirmationUrl: string;
  };
  safety: {
    rawTokenReturnedToBrowser: false;
    tokenHashReturnedToBrowser: false;
    rawEmailReturnedToBrowser: false;
    rawPayloadStored: false;
    rawEvidenceReturned: false;
    rawBillingDataReturned: false;
    internalNotesReturned: false;
    localStorageAllowed: false;
    sessionStorageAllowed: false;
  };
};

export async function issueCustomerConfirmationEmail(
  input: CustomerConfirmationEmailIssuanceInput,
): Promise<CustomerConfirmationEmailPayload> {
  const token = await issueCustomerEmailVerificationToken(input);
  const subject = pickSubject(input.journeyKey, token.subject);
  const confirmationUrl = buildConfirmationUrl(input.baseUrl, token.token, token.destination);
  const sender = CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.senderIdentity;
  const businessName = cleanText(input.businessName, 80) || "your business";

  return {
    ok: true,
    queued: true,
    emailKey: "confirm-email",
    senderName: sender.fromName,
    fromAddress: sender.fromEmail,
    toHash: cleanHash(input.customerEmailHash),
    subject,
    preheader: pickPreheader(input.journeyKey),
    primaryCta: token.primaryCta,
    confirmationUrlHash: hashUrl(confirmationUrl),
    confirmationPath: "/api/customer/email/confirm",
    expiresAt: token.expiresAt,
    destination: token.destination,
    safePreviewText: `Check your inbox for ${sender.display}. Confirm once to open your Cendorq results for ${businessName}.`,
    providerReadyPayload: {
      templateKey: "confirm-email",
      senderDisplay: sender.display,
      subject,
      preheader: pickPreheader(input.journeyKey),
      primaryCta: token.primaryCta,
      bodyIntro: `Your Cendorq results for ${businessName} are protected behind one email confirmation step.`,
      bodyGuidance:
        "Use the confirmation button to verify your email and open your private Cendorq dashboard. If the email was filtered, move Cendorq to your main inbox or save support@cendorq.com as a trusted sender.",
      bodyFooter:
        "This confirmation link is single-use and expires. Cendorq will never ask for your password, card number, private key, or session token in this email.",
      confirmationUrl,
    },
    safety: {
      rawTokenReturnedToBrowser: false,
      tokenHashReturnedToBrowser: false,
      rawEmailReturnedToBrowser: false,
      rawPayloadStored: false,
      rawEvidenceReturned: false,
      rawBillingDataReturned: false,
      internalNotesReturned: false,
      localStorageAllowed: false,
      sessionStorageAllowed: false,
    },
  };
}

export function projectCustomerConfirmationEmailSafeResponse(payload: CustomerConfirmationEmailPayload) {
  return {
    ok: payload.ok,
    queued: payload.queued,
    emailKey: payload.emailKey,
    senderName: payload.senderName,
    fromAddress: payload.fromAddress,
    toHash: payload.toHash,
    subject: payload.subject,
    preheader: payload.preheader,
    primaryCta: payload.primaryCta,
    confirmationUrlHash: payload.confirmationUrlHash,
    confirmationPath: payload.confirmationPath,
    expiresAt: payload.expiresAt,
    destination: payload.destination,
    safePreviewText: payload.safePreviewText,
    safety: payload.safety,
  } as const;
}

function pickSubject(journeyKey: CustomerConfirmationEmailIssuanceInput["journeyKey"], fallback: string) {
  const byJourney = CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.recommendedSubjects.find((subject) => {
    if (journeyKey === "free-scan-submitted") return subject.key === "free-scan-results";
    if (journeyKey === "support-or-billing-entry") return subject.key === "dashboard-access";
    return subject.key === "paid-plan-access";
  });
  return byJourney?.subject || fallback;
}

function pickPreheader(journeyKey: CustomerConfirmationEmailIssuanceInput["journeyKey"]) {
  const byJourney = CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.recommendedSubjects.find((subject) => {
    if (journeyKey === "free-scan-submitted") return subject.key === "free-scan-results";
    if (journeyKey === "support-or-billing-entry") return subject.key === "dashboard-access";
    return subject.key === "paid-plan-access";
  });
  return byJourney?.preheader || "One secure step opens your private Cendorq dashboard.";
}

function buildConfirmationUrl(baseUrl: string, token: string, destination: string) {
  const url = new URL("/api/customer/email/confirm", cleanBaseUrl(baseUrl));
  url.searchParams.set("token", token);
  url.searchParams.set("destination", destination);
  return url.toString();
}

function cleanBaseUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.hostname !== "localhost") return "https://cendorq.com";
    return url.origin;
  } catch {
    return "https://cendorq.com";
  }
}

function cleanText(value: unknown, max = 120) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

function cleanHash(value: unknown) {
  if (typeof value !== "string") return "";
  const cleaned = value.trim().toLowerCase();
  return /^[a-f0-9]{24,96}$/.test(cleaned) ? cleaned : "";
}

function hashUrl(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function getConfirmationEmailTemplateContract() {
  return getCustomerEmailTemplateContracts().templates.find((template) => template.key === "confirm-email");
}
