export type ProtectedFreeScanResultSectionKey =
  | "scope"
  | "verified-facts"
  | "observations"
  | "assumptions"
  | "inferences"
  | "evidence-boundary"
  | "priority-model"
  | "limitations"
  | "recommendations"
  | "next-actions"
  | "plan-fit";

export type ProtectedFreeScanResultRenderInput = {
  customerOwned: boolean;
  emailVerified: boolean;
  safeReleaseApproved: boolean;
  businessName?: string | null;
  reportStatus: "pending" | "draft" | "approved" | "released" | "unavailable";
};

export type ProtectedFreeScanResultRenderProjection = {
  ok: boolean;
  reportType: "free-scan-result";
  destination: "/dashboard/reports/free-scan";
  scopeLabel: "Free Scan";
  notFullScan: true;
  customerMessage: string;
  sections: readonly ProtectedFreeScanResultSectionKey[];
  confidenceLabelRequired: true;
  evidenceBoundaryRequired: true;
  priorityModelRequired: true;
  limitationsVisible: true;
  nextRecommendedPlan: "Deep Review";
  nextRecommendedPlanPath: "/plans/deep-review";
  conversionStyle: "education-not-pressure";
  pendingReportPresentedAsFinal: false;
  unpaidDeliverableLeaked: false;
  rawPayloadRendered: false;
  rawEvidenceRendered: false;
  rawSecurityPayloadRendered: false;
  rawBillingDataRendered: false;
  internalNotesRendered: false;
  operatorIdentityRendered: false;
  riskInternalsRendered: false;
  promptRendered: false;
  secretRendered: false;
  tokenRendered: false;
  unsupportedOutcomePromise: false;
};

const FREE_SCAN_SECTIONS = [
  "scope",
  "verified-facts",
  "observations",
  "assumptions",
  "inferences",
  "evidence-boundary",
  "priority-model",
  "limitations",
  "recommendations",
  "next-actions",
  "plan-fit",
] as const satisfies readonly ProtectedFreeScanResultSectionKey[];

export const PROTECTED_FREE_SCAN_RESULTS_RENDERING_RULES = [
  "Free Scan results render only inside the protected dedicated dashboard Free Scan result page after customer ownership, email verification, and safe release approval",
  "Free Scan results must clearly label scope as Free Scan and must not deliver a paid Full Scan or Deep Review report",
  "Free Scan results must separate verified facts, observations, assumptions, inferences, evidence boundary, priority model, limitations, recommendations, next actions, and plan-fit explanation",
  "Pending, draft, unavailable, or unapproved Free Scan results must not be presented as final truth",
  "Free Scan conversion must explain why Deep Review may improve precision without pressure, fake urgency, or unpaid deliverable leakage",
  "Free Scan rendering must not expose private payloads, evidence, security material, billing material, internal notes, operator identities, risk internals, prompts, secrets, or tokens",
  "Free Scan rendering must include confidence labels, evidence boundaries, priority level, and visible limitations when making an inference",
] as const;

export function projectProtectedFreeScanResultsRendering(
  input: ProtectedFreeScanResultRenderInput,
): ProtectedFreeScanResultRenderProjection {
  const businessName = cleanBusinessName(input.businessName);
  const released = input.customerOwned === true && input.emailVerified === true && input.safeReleaseApproved === true && (input.reportStatus === "approved" || input.reportStatus === "released");
  return {
    ok: released,
    reportType: "free-scan-result",
    destination: "/dashboard/reports/free-scan",
    scopeLabel: "Free Scan",
    notFullScan: true,
    customerMessage: released
      ? `Your protected Free Scan result for ${businessName} is ready in the dedicated results page.`
      : `Your Free Scan result for ${businessName} is not ready for protected display yet.`,
    sections: FREE_SCAN_SECTIONS,
    confidenceLabelRequired: true,
    evidenceBoundaryRequired: true,
    priorityModelRequired: true,
    limitationsVisible: true,
    nextRecommendedPlan: "Deep Review",
    nextRecommendedPlanPath: "/plans/deep-review",
    conversionStyle: "education-not-pressure",
    pendingReportPresentedAsFinal: false,
    unpaidDeliverableLeaked: false,
    rawPayloadRendered: false,
    rawEvidenceRendered: false,
    rawSecurityPayloadRendered: false,
    rawBillingDataRendered: false,
    internalNotesRendered: false,
    operatorIdentityRendered: false,
    riskInternalsRendered: false,
    promptRendered: false,
    secretRendered: false,
    tokenRendered: false,
    unsupportedOutcomePromise: false,
  };
}

export function getProtectedFreeScanResultsRenderingRules() {
  return PROTECTED_FREE_SCAN_RESULTS_RENDERING_RULES;
}

function cleanBusinessName(value: unknown) {
  if (typeof value !== "string") return "your business";
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 80);
  return cleaned || "your business";
}
