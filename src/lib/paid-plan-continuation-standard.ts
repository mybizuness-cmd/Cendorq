import type { CendorqFulfillmentState } from "@/lib/customer-journey-orchestrator";
import type { CendorqPaidPlanKey } from "@/lib/pricing-checkout-orchestration";

export type PaidPlanContinuationAction = {
  label: string;
  title: string;
  customerCopy: string;
  href: "/dashboard" | "/dashboard/reports" | "/dashboard/support/request" | "/dashboard/billing" | "/free-check" | "/plans/deep-review";
};

export function resolvePaidPlanContinuationAction(input: {
  planKey: CendorqPaidPlanKey;
  fulfillmentState: CendorqFulfillmentState;
  dashboardDestination: string;
  customerNextAction: string;
}): PaidPlanContinuationAction {
  if (input.fulfillmentState === "held-intake-required" || input.fulfillmentState === "ready-for-intake") {
    return {
      label: "Complete business context first",
      title: "Business context is required first.",
      customerCopy: input.customerNextAction || "Cendorq needs business context before paid work can safely begin.",
      href: "/free-check",
    };
  }

  if (input.fulfillmentState === "held-prerequisite-required") {
    return {
      label: "Complete prerequisite first",
      title: "A required step comes first.",
      customerCopy: input.customerNextAction || "Cendorq is holding this plan until the required earlier diagnosis, baseline, or approved scope is connected.",
      href: input.planKey === "build-fix" || input.planKey === "ongoing-control" ? "/plans/deep-review" : normalizeDashboardDestination(input.dashboardDestination),
    };
  }

  if (input.fulfillmentState === "held-ownership-required") {
    return {
      label: "Confirm workspace access",
      title: "Confirm the right workspace.",
      customerCopy: input.customerNextAction || "Cendorq needs to connect this purchase to the right verified business workspace before work begins.",
      href: "/dashboard",
    };
  }

  if (input.fulfillmentState === "held-evidence-required") {
    return {
      label: "Open required evidence step",
      title: "Evidence is required first.",
      customerCopy: input.customerNextAction || "Cendorq is checking the required evidence before work can safely begin.",
      href: normalizeDashboardDestination(input.dashboardDestination),
    };
  }

  return {
    label: "Open paid workflow",
    title: "Open the paid workflow.",
    customerCopy: input.customerNextAction || "Your plan is connected and ready for the next dashboard step.",
    href: normalizeDashboardDestination(input.dashboardDestination),
  };
}

function normalizeDashboardDestination(value: string): PaidPlanContinuationAction["href"] {
  if (value === "/dashboard/support/request" || value === "/dashboard/billing" || value === "/dashboard/reports") return value;
  return "/dashboard";
}
