import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPaidCendorqPlanPrice, type CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";

export const metadata = buildMetadata({
  title: "Start checkout | Cendorq",
  description: "Continue from the selected Cendorq plan to secure Stripe payment.",
  path: "/checkout/start",
  noIndex: true,
});

const PAID_PLAN_KEYS: CendorqPaidPlanKey[] = ["deep-review", "build-fix", "ongoing-control"];

type CheckoutStartSearchParams = {
  plan?: string | string[];
  email?: string | string[];
  customerEmail?: string | string[];
  scanId?: string | string[];
  reportId?: string | string[];
  source?: string | string[];
};

function selectedPlanKey(rawPlan?: string | string[]): CendorqPaidPlanKey {
  const value = Array.isArray(rawPlan) ? rawPlan[0] : rawPlan;
  return PAID_PLAN_KEYS.includes(value as CendorqPaidPlanKey) ? (value as CendorqPaidPlanKey) : "deep-review";
}

export default function CheckoutStartPage({ searchParams }: { searchParams?: CheckoutStartSearchParams }) {
  const planKey = selectedPlanKey(searchParams?.plan);
  const plan = getPaidCendorqPlanPrice(planKey);
  redirect(buildCheckoutDestination(plan.paymentLink, planKey, searchParams));
}

function buildCheckoutDestination(paymentLink: string | null, planKey: CendorqPaidPlanKey, searchParams: CheckoutStartSearchParams | undefined) {
  if (!paymentLink) return "/plans";

  const url = new URL(paymentLink);
  const customerEmail = cleanEmail(firstParam(searchParams?.customerEmail) || firstParam(searchParams?.email));
  const scanId = cleanIdentifier(firstParam(searchParams?.scanId), 120);
  const reportId = cleanIdentifier(firstParam(searchParams?.reportId), 120);
  const source = cleanIdentifier(firstParam(searchParams?.source), 80) || "cendorq-plan-page";

  url.searchParams.set("client_reference_id", ["cendorq", planKey, source, scanId || reportId || "direct"].join(":"));
  if (customerEmail) url.searchParams.set("prefilled_email", customerEmail);
  if (scanId) url.searchParams.set("scan_id", scanId);
  if (reportId) url.searchParams.set("report_id", reportId);
  url.searchParams.set("cendorq_plan", planKey);
  url.searchParams.set("cendorq_source", source);

  return url.toString();
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value || "";
}

function cleanEmail(value: string) {
  const cleaned = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}

function cleanIdentifier(value: string, maxLength: number) {
  return value.trim().replace(/[^a-zA-Z0-9:_-]/g, "").slice(0, maxLength);
}
