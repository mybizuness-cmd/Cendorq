import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { cleanCendorqEmailAddress } from "@/lib/cendorq-email-sender";
import {
  issueCustomerConfirmationEmail,
  projectCustomerConfirmationEmailSafeResponse,
} from "@/lib/customer-confirmation-email-issuance-runtime";
import { resolveCendorqCustomerJourney, type CendorqJourneyEvidenceKey } from "@/lib/customer-journey-orchestrator";
import { resolveStripeEntitlementActivationDecision } from "@/lib/stripe-entitlement-idempotency-runtime";
import { getPaidCendorqPlanPrice, type CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";
import type { CustomerEmailConfirmationJourneyKey } from "@/lib/customer-email-confirmation-handoff-runtime";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type StripeWebhookEnvelope = {
  id?: string;
  type?: string;
  data?: {
    object?: Record<string, unknown>;
  };
};

const STRIPE_TOLERANCE_SECONDS = 300;
const STRIPE_WEBHOOK_SECRET_ENV = "STRIPE_WEBHOOK_SECRET";
const STRIPE_SIGNATURE_HEADER = "stripe-signature";
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet",
} as const;

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get(STRIPE_SIGNATURE_HEADER) || "";
  const webhookSecret = cleanSecret(process.env[STRIPE_WEBHOOK_SECRET_ENV]);

  if (!webhookSecret) {
    return json({ ok: false, error: "Stripe webhook is not configured.", accepted: false, entitlementActivated: false }, 503);
  }

  if (!verifyStripeSignature(rawBody, signature, webhookSecret)) {
    return json({ ok: false, error: "Invalid Stripe signature.", accepted: false, entitlementActivated: false }, 400);
  }

  let event: StripeWebhookEnvelope;
  try {
    event = JSON.parse(rawBody) as StripeWebhookEnvelope;
  } catch {
    return json({ ok: false, error: "Invalid Stripe webhook JSON.", accepted: false, entitlementActivated: false }, 400);
  }

  if (event.type !== "checkout.session.completed") {
    return json({ ok: true, ignored: true, eventType: event.type || "unknown", entitlementActivated: false }, 200);
  }

  const session = event.data?.object || {};
  const paymentStatus = stringValue(session.payment_status);
  const mode = stringValue(session.mode);
  const paidStateVerified = paymentStatus === "paid" || mode === "subscription";
  if (!paidStateVerified) {
    return json({ ok: true, ignored: true, reason: "checkout session not paid", entitlementActivated: false }, 200);
  }

  const planKey = inferPaidPlanKey(session);
  const email = inferCustomerEmail(session);
  if (!planKey || !email) {
    return json({ ok: true, held: true, reason: "missing safe plan key or customer email", entitlementActivated: false }, 200);
  }

  const plan = getPaidCendorqPlanPrice(planKey);
  const metadata = isRecord(session.metadata) ? session.metadata : {};
  const sessionId = stringValue(session.id) || event.id || "checkout-session";
  const stripeCustomerId = stringValue(session.customer) || stringValue(metadata.customer_id);
  const customerStableId = stripeCustomerId || email;
  const entitlementDecision = resolveStripeEntitlementActivationDecision({
    eventId: event.id || "",
    checkoutSessionId: sessionId,
    customerStableId,
    planKey,
    paidStateVerified,
    durableStoreReady: false,
  });
  const journey = resolveCendorqCustomerJourney({
    purchasedPlan: planKey,
    customerEmail: email,
    customerId: stripeCustomerId,
    businessId: stringValue(metadata.business_id),
    sessionId,
    source: "stripe-webhook",
    completedEvidence: inferJourneyEvidence(session),
    completedIntake: inferCompletedIntake(metadata),
  });

  const confirmationEmail = await issueCustomerConfirmationEmail({
    customerIdHash: hashStableCustomerId(customerStableId, planKey),
    signupEmailHash: hashEmail(email),
    customerEmailHash: hashEmail(email),
    journeyKey: journeyKeyForPlan(planKey),
    requestedDestination: journey.dashboardDestination,
    intakeId: cleanOptionalIdentifier(sessionId),
    baseUrl: cleanBaseUrl(process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin || "https://cendorq.com"),
    customerEmail: email,
  });
  const safeConfirmationEmail = projectCustomerConfirmationEmailSafeResponse(confirmationEmail);

  return json({
    ok: true,
    sent: safeConfirmationEmail.providerDelivery.sent,
    skipped: safeConfirmationEmail.providerDelivery.skipped,
    planKey,
    planName: plan.name,
    dashboardPath: journey.dashboardDestination,
    fulfillmentState: journey.fulfillmentState,
    backendWorkState: journey.backendWorkState,
    customerStage: journey.customerStage,
    deliveryCanStart: journey.deliveryCanStart,
    paidWorkCanStart: journey.paidWorkCanStart,
    missingRequirements: journey.missingRequirements,
    auditTags: journey.auditTags,
    confirmationEmail: safeConfirmationEmail,
    entitlementActivated: entitlementDecision.activationAllowed,
    entitlementActivation: entitlementDecision,
    accountAccess: {
      createdOrReturnedByPaymentEmail: true,
      rawEmailReturned: false,
      rawTokenReturned: false,
      destination: journey.dashboardDestination,
    },
  }, safeConfirmationEmail.providerDelivery.attempted && !safeConfirmationEmail.providerDelivery.sent && !safeConfirmationEmail.providerDelivery.skipped ? 500 : 200);
}

export async function GET() {
  return json({ ok: false, route: "stripe-webhook", method: "POST", entitlementActivated: false }, 405);
}

function verifyStripeSignature(rawBody: string, signatureHeader: string, secret: string) {
  const parts = signatureHeader.split(",").map((part) => part.trim());
  const timestamp = parts.find((part) => part.startsWith("t="))?.slice(2) || "";
  const signatures = parts.filter((part) => part.startsWith("v1=")).map((part) => part.slice(3));
  if (!timestamp || signatures.length === 0) return false;

  const parsedTimestamp = Number(timestamp);
  if (!Number.isFinite(parsedTimestamp)) return false;
  if (Math.abs(Date.now() / 1000 - parsedTimestamp) > STRIPE_TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  return signatures.some((candidate) => safeEqualHex(candidate, expected));
}

function inferPaidPlanKey(session: Record<string, unknown>): CendorqPaidPlanKey | "" {
  const metadata = isRecord(session.metadata) ? session.metadata : {};
  const candidates = [
    stringValue(metadata.plan_key),
    stringValue(metadata.planKey),
    stringValue(session.client_reference_id),
    stringValue(session.success_url),
    stringValue(session.cancel_url),
    stringValue(session.url),
  ].join(" ");

  if (candidates.includes("build-fix")) return "build-fix";
  if (candidates.includes("ongoing-control")) return "ongoing-control";
  if (candidates.includes("deep-review")) return "deep-review";
  return "";
}

function inferCustomerEmail(session: Record<string, unknown>) {
  const customerDetails = isRecord(session.customer_details) ? session.customer_details : {};
  return cleanCendorqEmailAddress(stringValue(customerDetails.email) || stringValue(session.customer_email));
}

function inferJourneyEvidence(session: Record<string, unknown>): CendorqJourneyEvidenceKey[] {
  const metadata = isRecord(session.metadata) ? session.metadata : {};
  const evidence = parseEvidenceList(stringValue(metadata.cendorq_evidence));
  if (stringValue(metadata.customer_ownership_verified) === "true") evidence.push("customerOwnershipVerified");
  if (stringValue(metadata.email_verified) === "true") evidence.push("emailVerified");
  if (stringValue(metadata.business_profile_exists) === "true") evidence.push("businessProfileExists");
  if (stringValue(metadata.free_scan_complete) === "true") evidence.push("freeScanComplete");
  if (stringValue(metadata.deep_review_complete) === "true") evidence.push("deepReviewComplete");
  if (stringValue(metadata.supported_diagnosis_approved) === "true") evidence.push("supportedDiagnosisApproved");
  if (stringValue(metadata.repair_scope_approved) === "true") evidence.push("repairScopeApproved");
  if (stringValue(metadata.control_baseline_approved) === "true") evidence.push("controlBaselineApproved");
  return Array.from(new Set(evidence));
}

function parseEvidenceList(value: string): CendorqJourneyEvidenceKey[] {
  const allowed = new Set<CendorqJourneyEvidenceKey>([
    "emailVerified",
    "businessProfileExists",
    "freeScanStarted",
    "freeScanComplete",
    "deepReviewPurchased",
    "deepReviewIntakeComplete",
    "deepReviewComplete",
    "supportedDiagnosisApproved",
    "repairPurchased",
    "repairScopeApproved",
    "repairComplete",
    "controlPurchased",
    "controlBaselineApproved",
    "controlActive",
    "customerOwnershipVerified",
  ]);
  return value.split(",").map((item) => item.trim()).filter((item): item is CendorqJourneyEvidenceKey => allowed.has(item as CendorqJourneyEvidenceKey));
}

function inferCompletedIntake(metadata: Record<string, unknown>) {
  return stringValue(metadata.completed_intake).split(",").map((item) => item.trim()).filter(Boolean);
}

function journeyKeyForPlan(planKey: CendorqPaidPlanKey): CustomerEmailConfirmationJourneyKey {
  if (planKey === "build-fix") return "build-fix-purchased-or-submitted";
  if (planKey === "ongoing-control") return "ongoing-control-started";
  return "deep-review-purchased-or-submitted";
}

function cleanBaseUrl(value: string) {
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return "https://cendorq.com";
  }
}

function hashStableCustomerId(value: string, planKey: CendorqPaidPlanKey) {
  return createHash("sha256").update(`paid:${planKey}:${value.trim().toLowerCase()}`).digest("hex");
}

function hashEmail(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function cleanOptionalIdentifier(value: string) {
  const cleaned = value.trim().replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, 180);
  return cleaned.length >= 8 ? cleaned : null;
}

function cleanSecret(value: string | undefined) {
  return (value || "").trim();
}

function safeEqualHex(left: string, right: string) {
  if (!isHex(left) || !isHex(right)) return false;
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

function isHex(value: string) {
  if (!value || value.length % 2 !== 0) return false;
  for (const character of value.toLowerCase()) {
    const isDigit = character >= "0" && character <= "9";
    const isHexLetter = character >= "a" && character <= "f";
    if (!isDigit && !isHexLetter) return false;
  }
  return true;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function json(body: unknown, status: number) {
  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}
