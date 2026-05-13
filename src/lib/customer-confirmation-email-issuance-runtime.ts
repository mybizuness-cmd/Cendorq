import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  enqueueCustomerEmailDispatch,
  updateCustomerEmailDispatchQueueState,
  type CustomerEmailDispatchQueueSafeProjection,
} from "./customer-email-dispatch-queue-runtime";
import {
  issueCustomerEmailVerificationToken,
  type IssueCustomerEmailVerificationTokenInput,
} from "./customer-email-verification-token-runtime";
import { CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT } from "./customer-email-confirmation-handoff-contracts";
import { getCustomerEmailTemplateContracts } from "./customer-email-template-contracts";
import { buildCendorqEmailLayout, buildCendorqEmailText, sendCendorqEmail } from "./cendorq-email-sender";

const FREE_SCAN_CONFIRMATION_SUBJECT = "Confirm your email to open your Cendorq results";
const ACCOUNT_ACCESS_CONFIRMATION_SUBJECT = "Confirm your email to open your Cendorq workspace";
const FREE_SCAN_INTAKE_STORAGE_FILES = [
  path.join(process.cwd(), ".cendorq-runtime", "free-check-intakes.v3.json"),
  path.join(process.cwd(), ".cendorq-runtime", "search-presence-scan-intakes.v3.json"),
  path.join(process.cwd(), ".cendorq-runtime", "search-presence-scan-intakes.v2.json"),
  path.join(process.cwd(), ".default-ai-runtime", "free-check-intakes.json"),
] as const;

export type CustomerConfirmationEmailIssuanceInput = IssueCustomerEmailVerificationTokenInput & {
  customerEmailHash: string;
  baseUrl: string;
  businessName?: string | null;
  customerEmail?: string | null;
};

export type CustomerConfirmationEmailPayload = {
  ok: true;
  queued: boolean;
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
  dispatchQueue: CustomerEmailDispatchQueueSafeProjection;
  providerDelivery: {
    attempted: boolean;
    sent: boolean;
    skipped: boolean;
    provider: "resend";
    providerMessageIdHash: string;
  };
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
    providerPayloadReturnedToBrowser: false;
    localStorageAllowed: false;
    sessionStorageAllowed: false;
  };
};

export async function issueCustomerConfirmationEmail(input: CustomerConfirmationEmailIssuanceInput): Promise<CustomerConfirmationEmailPayload> {
  const token = await issueCustomerEmailVerificationToken(input);
  const subject = pickSubject(input.journeyKey, token.subject);
  const preheader = pickPreheader(input.journeyKey);
  const confirmationUrl = buildConfirmationUrl(input.baseUrl, token.token, token.destination);
  const confirmationUrlHash = hashUrl(confirmationUrl);
  const sender = CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.senderIdentity;
  const businessName = cleanText(input.businessName, 80) || "your business";
  const toHash = cleanHash(input.customerEmailHash);
  const emailCopy = buildEmailCopy(input.journeyKey, businessName);
  const providerReadyPayload = {
    templateKey: "confirm-email" as const,
    senderDisplay: sender.display,
    subject,
    preheader,
    primaryCta: token.primaryCta,
    bodyIntro: emailCopy.intro,
    bodyGuidance: emailCopy.guidance,
    bodyFooter: emailCopy.footer,
    confirmationUrl,
  };

  const dispatchQueue = await enqueueCustomerEmailDispatch({
    customerIdHash: input.customerIdHash,
    recipientEmailRef: toHash,
    templateKey: "confirm-email",
    subject,
    preheader,
    primaryCta: token.primaryCta,
    confirmationPath: "/api/customer/email/confirm",
    confirmationUrlHash,
    dashboardPath: normalizeDashboardPath(token.destination),
    expiresAt: token.expiresAt,
    auditEventId: token.tokenId,
  });

  const recipientEmail = await resolveCustomerConfirmationRecipientEmail(input);
  const providerDelivery = await sendConfirmationProviderEmail({ recipientEmail, subject, preheader, primaryCta: token.primaryCta, confirmationUrl, copy: emailCopy, destination: token.destination, queueId: dispatchQueue.queueId });

  if (providerDelivery.sent) {
    await updateCustomerEmailDispatchQueueState({ queueId: dispatchQueue.queueId, toState: "sent", expectedState: "queued" });
  } else if (providerDelivery.attempted && !providerDelivery.skipped) {
    await updateCustomerEmailDispatchQueueState({ queueId: dispatchQueue.queueId, toState: "failed", expectedState: "queued", failureReason: "Provider delivery failed." });
  }

  return {
    ok: true,
    queued: dispatchQueue.state === "queued",
    emailKey: "confirm-email",
    senderName: sender.fromName,
    fromAddress: sender.fromEmail,
    toHash,
    subject,
    preheader,
    primaryCta: token.primaryCta,
    confirmationUrlHash,
    confirmationPath: "/api/customer/email/confirm",
    expiresAt: token.expiresAt,
    destination: token.destination,
    safePreviewText: emailCopy.preview,
    dispatchQueue,
    providerDelivery,
    providerReadyPayload,
    safety: {
      rawTokenReturnedToBrowser: false,
      tokenHashReturnedToBrowser: false,
      rawEmailReturnedToBrowser: false,
      rawPayloadStored: false,
      rawEvidenceReturned: false,
      rawBillingDataReturned: false,
      internalNotesReturned: false,
      providerPayloadReturnedToBrowser: false,
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
    dispatchQueue: payload.dispatchQueue,
    providerDelivery: payload.providerDelivery,
    safety: payload.safety,
  } as const;
}

async function sendConfirmationProviderEmail(input: { recipientEmail: string; subject: string; preheader: string; primaryCta: string; confirmationUrl: string; copy: ReturnType<typeof buildEmailCopy>; destination: string; queueId: string }) {
  if (!input.recipientEmail) return { attempted: false, sent: false, skipped: true, provider: "resend" as const, providerMessageIdHash: "" };

  const html = buildCendorqEmailLayout({ title: input.subject, intro: input.copy.intro, ctaLabel: input.primaryCta, ctaUrl: input.confirmationUrl, secondary: input.copy.guidance });
  const text = buildCendorqEmailText({ title: input.subject, intro: input.copy.intro, ctaLabel: input.primaryCta, ctaUrl: input.confirmationUrl, secondary: input.copy.guidance });
  const result = await sendCendorqEmail({ to: input.recipientEmail, subject: input.subject, preheader: input.preheader, html, text, tags: { template: "confirm-email", destination: input.destination, queue: input.queueId } });

  return { attempted: true, sent: result.ok && !result.skipped, skipped: result.ok && result.skipped, provider: "resend" as const, providerMessageIdHash: result.ok && !result.skipped ? hashUrl(result.id) : "" };
}

async function resolveCustomerConfirmationRecipientEmail(input: CustomerConfirmationEmailIssuanceInput) {
  const directEmail = cleanEmail(input.customerEmail);
  if (directEmail) return directEmail;
  const intakeId = cleanIdentifier(input.intakeId);
  if (!intakeId) return "";
  for (const storageFile of FREE_SCAN_INTAKE_STORAGE_FILES) {
    const resolved = await resolveEmailFromFreeScanIntakeFile(storageFile, intakeId, input.customerEmailHash);
    if (resolved) return resolved;
  }
  return "";
}

async function resolveEmailFromFreeScanIntakeFile(storageFile: string, intakeId: string, expectedEmailHash: string) {
  try {
    const raw = await readFile(storageFile, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    const entries = isRecord(parsed) && Array.isArray(parsed.entries) ? parsed.entries : [];
    const match = entries.find((entry) => isRecord(entry) && cleanIdentifier(entry.id) === intakeId);
    if (!isRecord(match)) return "";
    const email = cleanEmail(match.email);
    if (!email) return "";
    const emailHash = hashEmail(email);
    return cleanHash(expectedEmailHash) === emailHash ? email : "";
  } catch { return ""; }
}

function buildEmailCopy(journeyKey: CustomerConfirmationEmailIssuanceInput["journeyKey"], businessName: string) {
  if (journeyKey === "free-scan-submitted") {
    return {
      intro: `Confirm your email to open your private Cendorq result for ${businessName}.`,
      guidance: "Use the button to verify the inbox and continue to your dashboard. The Free Scan result stays inside your workspace.",
      footer: "This secure link is single-use and expires. Cendorq will never ask for your password, card number, private key, or session token in this email.",
      preview: `Check your inbox for Cendorq Support. Confirm once to open the result for ${businessName}.`,
    };
  }
  return {
    intro: "Confirm your email to open your Cendorq workspace.",
    guidance: "Use the button to verify the inbox and continue to your dashboard. From there, you can start a Free Scan, view reports, check billing, or contact support.",
    footer: "This secure link is single-use and expires. Cendorq will never ask for your password, card number, private key, or session token in this email.",
    preview: "Check your inbox for Cendorq Support. Confirm once to open your workspace.",
  };
}

function pickSubject(journeyKey: CustomerConfirmationEmailIssuanceInput["journeyKey"], fallback: string) {
  if (journeyKey === "free-scan-submitted") return FREE_SCAN_CONFIRMATION_SUBJECT;
  if (journeyKey === "support-or-billing-entry") return ACCOUNT_ACCESS_CONFIRMATION_SUBJECT;
  const byJourney = CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.recommendedSubjects.find((subject) => {
    if (journeyKey === "support-or-billing-entry") return subject.key === "dashboard-access";
    return subject.key === "paid-plan-access";
  });
  return byJourney?.subject || fallback;
}

function pickPreheader(journeyKey: CustomerConfirmationEmailIssuanceInput["journeyKey"]) {
  if (journeyKey === "support-or-billing-entry") return "Confirm once and continue to your Cendorq dashboard.";
  const byJourney = CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT.recommendedSubjects.find((subject) => {
    if (journeyKey === "free-scan-submitted") return subject.key === "free-scan-results";
    return subject.key === "paid-plan-access";
  });
  return byJourney?.preheader || "One secure step opens your private Cendorq dashboard.";
}

function buildConfirmationUrl(baseUrl: string, token: string, destination: string) { const url = new URL("/api/customer/email/confirm", cleanBaseUrl(baseUrl)); url.searchParams.set("token", token); url.searchParams.set("destination", destination); return url.toString(); }
function normalizeDashboardPath(value: string): "/dashboard" | "/dashboard/reports" | "/dashboard/notifications" { if (value === "/dashboard/reports" || value.startsWith("/dashboard/reports/")) return "/dashboard/reports"; if (value === "/dashboard/notifications" || value.startsWith("/dashboard/notifications/")) return "/dashboard/notifications"; return "/dashboard"; }
function cleanBaseUrl(value: string) { try { const url = new URL(value); if (url.protocol !== "https:" && url.hostname !== "localhost") return "https://cendorq.com"; return url.origin; } catch { return "https://cendorq.com"; } }
function cleanText(value: unknown, max = 120) { if (typeof value !== "string") return ""; return value.replace(/\s+/g, " ").trim().slice(0, max); }
function cleanEmail(value: unknown) { if (typeof value !== "string") return ""; const cleaned = value.trim().toLowerCase(); return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : ""; }
function cleanHash(value: unknown) { if (typeof value !== "string") return ""; const cleaned = value.trim().toLowerCase(); return /^[a-f0-9]{24,96}$/.test(cleaned) ? cleaned : ""; }
function cleanIdentifier(value: unknown) { if (typeof value !== "string") return ""; return /^[a-zA-Z0-9:_-]{8,180}$/.test(value) ? value : ""; }
function hashEmail(email: string) { return createHash("sha256").update(email.trim().toLowerCase()).digest("hex"); }
function hashUrl(value: string) { return createHash("sha256").update(value).digest("hex"); }
function isRecord(value: unknown): value is Record<string, unknown> { return typeof value === "object" && value !== null && !Array.isArray(value); }
export function getConfirmationEmailTemplateContract() { return getCustomerEmailTemplateContracts().templates.find((template) => template.key === "confirm-email"); }
