import type { PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export type ReportVaultReportKey =
  | "free-scan-result"
  | "ai-readiness-review-report"
  | "signal-repair-summary"
  | "readiness-control-monthly-summary";

export type ReportVaultAccessState = "available" | "requires-plan" | "requires-release-approval";

export type ReportVaultAccessDecision = {
  reportKey: ReportVaultReportKey;
  planKey: PlanValueKey;
  reportName: string;
  customerRoute: string;
  fallbackRoute: string;
  accessState: ReportVaultAccessState;
  verifiedSessionRequired: true;
  customerOwnershipRequired: true;
  planBoundaryRequired: true;
  releaseApprovalRequired: boolean;
  approvedPdfRequired: boolean;
  emailAttachmentRequired: boolean;
  finalReportVisible: boolean;
  rawReportPayloadReturned: false;
  rawPrivatePayloadReturned: false;
};

type ReportVaultAccessInput = {
  planKey: PlanValueKey;
  entitlementActive?: boolean;
  releaseApproved?: boolean;
  approvedPdfReady?: boolean;
};

export const REPORT_VAULT_PLAN_BOUNDARY_RULES = [
  "Free Scan result may be available inside the verified dashboard without paid plan depth.",
  "Paid report types require active entitlement, release approval, and approved PDF readiness before final visibility.",
  "Paid report vault entries fall back to plan pages or held status when entitlement or approval is missing.",
  "Report vault access decisions return safe route projections only.",
] as const;

const REPORT_DEFINITIONS: Record<PlanValueKey, { reportKey: ReportVaultReportKey; reportName: string; fallbackRoute: string }> = {
  "free-scan": {
    reportKey: "free-scan-result",
    reportName: "Readiness signal result",
    fallbackRoute: "/dashboard/reports/free-scan",
  },
  "deep-review": {
    reportKey: "ai-readiness-review-report",
    reportName: "AI Readiness Review report",
    fallbackRoute: "/plans/deep-review",
  },
  "build-fix": {
    reportKey: "signal-repair-summary",
    reportName: "Signal Repair summary",
    fallbackRoute: "/plans/build-fix",
  },
  "ongoing-control": {
    reportKey: "readiness-control-monthly-summary",
    reportName: "Readiness Control monthly summary",
    fallbackRoute: "/plans/ongoing-control",
  },
};

export function resolveReportVaultAccessDecision(input: ReportVaultAccessInput): ReportVaultAccessDecision {
  const definition = REPORT_DEFINITIONS[input.planKey];
  const paidPlan = input.planKey !== "free-scan";
  const entitlementActive = input.entitlementActive === true;
  const releaseApproved = input.releaseApproved === true;
  const approvedPdfReady = input.approvedPdfReady === true;
  const paidFinalReady = paidPlan && entitlementActive && releaseApproved && approvedPdfReady;
  const freeScanAvailable = input.planKey === "free-scan";
  const finalReportVisible = freeScanAvailable || paidFinalReady;
  const accessState: ReportVaultAccessState = freeScanAvailable
    ? "available"
    : !entitlementActive
      ? "requires-plan"
      : "requires-release-approval";

  return {
    reportKey: definition.reportKey,
    planKey: input.planKey,
    reportName: definition.reportName,
    customerRoute: finalReportVisible ? routeForFinalReport(input.planKey) : definition.fallbackRoute,
    fallbackRoute: definition.fallbackRoute,
    accessState,
    verifiedSessionRequired: true,
    customerOwnershipRequired: true,
    planBoundaryRequired: true,
    releaseApprovalRequired: paidPlan,
    approvedPdfRequired: paidPlan,
    emailAttachmentRequired: paidPlan,
    finalReportVisible,
    rawReportPayloadReturned: false,
    rawPrivatePayloadReturned: false,
  };
}

function routeForFinalReport(planKey: PlanValueKey) {
  if (planKey === "free-scan") return "/dashboard/reports/free-scan";
  return "/dashboard/reports";
}
