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

function selectedPlanKey(rawPlan?: string | string[]): CendorqPaidPlanKey {
  const value = Array.isArray(rawPlan) ? rawPlan[0] : rawPlan;
  return PAID_PLAN_KEYS.includes(value as CendorqPaidPlanKey) ? (value as CendorqPaidPlanKey) : "deep-review";
}

export default function CheckoutStartPage({ searchParams }: { searchParams?: { plan?: string | string[] } }) {
  const planKey = selectedPlanKey(searchParams?.plan);
  const plan = getPaidCendorqPlanPrice(planKey);
  redirect(plan.paymentLink || "/plans");
}
