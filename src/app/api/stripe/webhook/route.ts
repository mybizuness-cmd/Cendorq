import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { buildCendorqEmailLayout, buildCendorqEmailText, cleanCendorqEmailAddress, sendCendorqEmail } from "@/lib/cendorq-email-sender";
import { CENDORQ_POST_PAYMENT_EMAILS, getPaidCendorqPlanPrice, type CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type StripeWebhookEnvelope = {
  id?: string;
  type?: string;
  data?: {
    object?: Record<string, unknown>;
  };
};

const PLAN_DESTINATION: Record<CendorqPaidPlanKey, { label: string; dashboardPath: string; cta: string; intro: string }> = {
  "deep-review": {
    label: "AI Readiness Review",
    dashboardPath: "/dashboard/reports",
    cta: "Open review dashboard",
    intro: "Your AI Readiness Review is confirmed. Open the dashboard to confirm the review focus and track the next step.",
  },
  "build-fix": {
    label: "Signal Repair",
    dashboardPath: "/dashboard/support/request",
    cta: "Open repair intake",
    intro: "Your Signal Repair is confirmed. Open the dashboard to confirm the repair target, approved details, and next required action.",
  },
  "ongoing-control": {
    label: "Readiness Control",
    dashboardPath: "/dashboard/billing",
    cta: "Open control dashboard",
    intro: "Your Readiness Control subscription is active. Open the dashboard to choose the first monthly focus and review billing status.",
  },
};

const STRIPE_TOLERANCE_SECONDS = 300;
const NO_STORE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "X-Content-Type-Options": "nosniff",
} as const;

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature") || "";
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

  if (webhookSecret && !verifyStripeSignature(rawBody, signature, webhookSecret)) {
    return json({ ok: false, error: "Invalid Stripe signature." }, 400);
  }

  let event: StripeWebhookEnvelope;
  try {
    event = JSON.parse(rawBody) as StripeWebhookEnvelope;
  } catch {
    return json({ ok: false, error: "Invalid Stripe webhook JSON." }, 400);
  }

  if (event.type !== "checkout.session.completed") {
    return json({ ok: true, ignored: true, eventType: event.type || "unknown" }, 200);
  }

  const session = event.data?.object || {};
  const paymentStatus = stringValue(session.payment_status);
  const mode = stringValue(session.mode);
  if (paymentStatus && paymentStatus !== "paid" && mode !== "subscription") {
    return json({ ok: true, ignored: true, reason: "checkout session not paid" }, 200);
  }

  const planKey = inferPaidPlanKey(session);
  const email = inferCustomerEmail(session);
  if (!planKey || !email) {
    return json({ ok: true, held: true, reason: "missing safe plan key or customer email" }, 200);
  }

  const plan = getPaidCendorqPlanPrice(planKey);
  const destination = PLAN_DESTINATION[planKey];
  const kickoff = CENDORQ_POST_PAYMENT_EMAILS.find((item) => item.planKey === planKey);
  const baseUrl = cleanBaseUrl(process.env.NEXT_PUBLIC_APP_URL || "https://cendorq.com");
  const dashboardUrl = new URL(destination.dashboardPath, baseUrl).toString();
  const subject = kickoff?.subject || `${destination.label} is confirmed`;
  const preheader = kickoff?.customerGoal || `Open your ${destination.label} dashboard in Cendorq.`;
  const secondary = `${plan.name} ${plan.price}. ${plan.primaryCustomerPromise}`;

  const result = await sendCendorqEmail({
    to: email,
    subject,
    preheader,
    html: buildCendorqEmailLayout({ title: subject, intro: destination.intro, ctaLabel: destination.cta, ctaUrl: dashboardUrl, secondary }),
    text: buildCendorqEmailText({ title: subject, intro: destination.intro, ctaLabel: destination.cta, ctaUrl: dashboardUrl, secondary }),
    tags: { template: "paid-plan-kickoff", plan: planKey, event: event.id || "checkout-session" },
  });

  return json({ ok: result.ok, sent: result.ok && !result.skipped, skipped: result.ok && result.skipped, planKey, dashboardPath: destination.dashboardPath }, result.ok ? 200 : 500);
}

export async function GET() {
  return json({ ok: true, route: "stripe-webhook", method: "POST" }, 200);
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

function cleanBaseUrl(value: string) {
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return "https://cendorq.com";
  }
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
