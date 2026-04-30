import {
  REPORT_EVIDENCE_CONFIDENCE_CONTRACTS,
  REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS,
  REPORT_EVIDENCE_PLAN_FIT_CONTRACTS,
  REPORT_EVIDENCE_SOURCE_CONTRACTS,
  type ReportEvidencePlanFit,
  type ReportEvidenceSourceTier,
  type ReportEvidenceTrustLevel,
} from "./report-evidence-orchestration";

export type ReportEvidenceRuntimeInput = {
  evidenceKey: string;
  sourceTier: ReportEvidenceSourceTier;
  trustLevel: ReportEvidenceTrustLevel;
  planFit?: ReportEvidencePlanFit;
  summary?: string;
  customerClaimPresent?: boolean;
  customerClaimSupported?: boolean;
  hasRawPrivatePayload?: boolean;
  hasEvidenceConflict?: boolean;
  limitationsVisible?: boolean;
  safeNextActionVisible?: boolean;
  planFitEvidencePresent?: boolean;
  releaseCaptainReviewed?: boolean;
};

export type ReportEvidenceRuntimeProjection = {
  evidenceKey: string;
  sourceTier: ReportEvidenceSourceTier;
  sourceLabel: string;
  trustLevel: ReportEvidenceTrustLevel;
  planFit?: ReportEvidencePlanFit;
  safeSummary: string;
  customerOutputState: "allowed" | "needs-release-captain-review" | "blocked";
  releaseCaptainRequired: boolean;
  customerFacingAllowed: boolean;
  blockedPatterns: readonly string[];
  safeNextActions: readonly string[];
};

export type ReportEvidenceRuntimeSummary = {
  evidenceCount: number;
  allowedCount: number;
  reviewCount: number;
  blockedCount: number;
  conflictCount: number;
  missingCount: number;
  customerOutputAllowed: boolean;
  releaseCaptainRequired: boolean;
  dominantTrustLevel: ReportEvidenceTrustLevel;
  planFitsRepresented: readonly ReportEvidencePlanFit[];
  blockedPatterns: readonly string[];
  safeNextActions: readonly string[];
  projections: readonly ReportEvidenceRuntimeProjection[];
};

const TRUST_ORDER: readonly ReportEvidenceTrustLevel[] = ["missing", "conflicted", "limited", "moderate", "strong", "verified"];

export function projectReportEvidenceRuntime(inputs: readonly ReportEvidenceRuntimeInput[]): ReportEvidenceRuntimeSummary {
  const projections = inputs.map(projectReportEvidenceItem);
  const blockedPatterns = unique(projections.flatMap((projection) => projection.blockedPatterns));
  const safeNextActions = unique(projections.flatMap((projection) => projection.safeNextActions));
  const planFitsRepresented = uniquePlanFits(projections.map((projection) => projection.planFit).filter(Boolean) as ReportEvidencePlanFit[]);
  const releaseCaptainRequired = projections.some((projection) => projection.releaseCaptainRequired);
  const blockedCount = projections.filter((projection) => projection.customerOutputState === "blocked").length;

  return {
    evidenceCount: projections.length,
    allowedCount: projections.filter((projection) => projection.customerOutputState === "allowed").length,
    reviewCount: projections.filter((projection) => projection.customerOutputState === "needs-release-captain-review").length,
    blockedCount,
    conflictCount: projections.filter((projection) => projection.trustLevel === "conflicted" || projection.blockedPatterns.includes("ignoredEvidenceConflict")).length,
    missingCount: projections.filter((projection) => projection.trustLevel === "missing").length,
    customerOutputAllowed: projections.length > 0 && blockedCount === 0 && !releaseCaptainRequired,
    releaseCaptainRequired,
    dominantTrustLevel: chooseDominantTrustLevel(projections),
    planFitsRepresented,
    blockedPatterns,
    safeNextActions,
    projections,
  };
}

export function projectReportEvidenceItem(input: ReportEvidenceRuntimeInput): ReportEvidenceRuntimeProjection {
  const sourceContract = REPORT_EVIDENCE_SOURCE_CONTRACTS.find((contract) => contract.tier === input.sourceTier);
  const confidenceContract = REPORT_EVIDENCE_CONFIDENCE_CONTRACTS.find((contract) => contract.trustLevel === input.trustLevel);
  const planFitContract = input.planFit ? REPORT_EVIDENCE_PLAN_FIT_CONTRACTS.find((contract) => contract.planFit === input.planFit) : undefined;
  const blockedPatterns = collectBlockedPatterns(input);
  const releaseCaptainRequired = Boolean(
    input.releaseCaptainReviewed !== true &&
      (input.trustLevel === "verified" || input.trustLevel === "strong" || input.hasEvidenceConflict || input.planFit === "build-fix" || input.planFit === "ongoing-control"),
  );
  const blocked = blockedPatterns.length > 0;

  return {
    evidenceKey: safeToken(input.evidenceKey),
    sourceTier: input.sourceTier,
    sourceLabel: sourceContract?.label ?? "Unknown evidence source",
    trustLevel: input.trustLevel,
    planFit: input.planFit,
    safeSummary: safeSummary(input.summary),
    customerOutputState: blocked ? "blocked" : releaseCaptainRequired ? "needs-release-captain-review" : "allowed",
    releaseCaptainRequired,
    customerFacingAllowed: !blocked && !releaseCaptainRequired,
    blockedPatterns,
    safeNextActions: buildSafeNextActions(input, confidenceContract?.allowedReportLanguage, planFitContract?.allowedRecommendation),
  };
}

function collectBlockedPatterns(input: ReportEvidenceRuntimeInput): string[] {
  const blockedPatterns: string[] = [];

  if (input.customerClaimPresent && !input.customerClaimSupported) blockedPatterns.push("customerClaimAsVerifiedFact");
  if (input.hasRawPrivatePayload) blockedPatterns.push("customerFacingRawPayload", "customerFacingPrivateEvidence");
  if (input.hasEvidenceConflict && input.trustLevel !== "conflicted") blockedPatterns.push("ignoredEvidenceConflict");
  if ((input.trustLevel === "limited" || input.trustLevel === "missing" || input.trustLevel === "conflicted") && !input.limitationsVisible) blockedPatterns.push("unlabeledLowConfidence");
  if (input.trustLevel === "missing") blockedPatterns.push("hiddenEvidenceGap");
  if (input.planFit && !input.planFitEvidencePresent) blockedPatterns.push("unsupportedPlanRecommendation");
  if (input.planFit === "build-fix" && !input.planFitEvidencePresent) blockedPatterns.push("fixWithoutDiagnosis");
  if (!input.safeNextActionVisible) blockedPatterns.push("hiddenEvidenceGap");

  return blockedPatterns.filter((pattern) => REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS.includes(pattern as (typeof REPORT_EVIDENCE_ORCHESTRATION_BLOCKED_PATTERNS)[number]));
}

function buildSafeNextActions(input: ReportEvidenceRuntimeInput, confidenceLanguage?: string, planFitLanguage?: string) {
  const nextActions = [];

  if (input.customerClaimPresent && !input.customerClaimSupported) nextActions.push("Keep the customer claim labeled as customer-provided until supporting evidence is gathered.");
  if (input.hasEvidenceConflict) nextActions.push("Resolve or disclose the evidence conflict before raising confidence or strengthening the recommendation.");
  if (input.trustLevel === "missing") nextActions.push("Name the missing evidence class and gather the next safe evidence source before customer-facing output.");
  if (input.planFit && !input.planFitEvidencePresent) nextActions.push("Tie the plan recommendation to observed blocker depth, evidence confidence, and customer readiness before output.");
  if (input.releaseCaptainReviewed !== true) nextActions.push("Return material report claims, conflicts, and plan-fit recommendations to release-captain review.");
  if (confidenceLanguage) nextActions.push(confidenceLanguage);
  if (planFitLanguage) nextActions.push(planFitLanguage);

  return unique(nextActions);
}

function chooseDominantTrustLevel(projections: readonly ReportEvidenceRuntimeProjection[]): ReportEvidenceTrustLevel {
  if (!projections.length) return "missing";

  return projections.reduce((best, projection) => (TRUST_ORDER.indexOf(projection.trustLevel) > TRUST_ORDER.indexOf(best) ? projection.trustLevel : best), "missing" as ReportEvidenceTrustLevel);
}

function safeSummary(value: string | undefined) {
  if (!value) return "redacted-safe-value";

  const unsafePattern = /raw|payload|secret|token|password|private key|csrf|admin key|support context|operator note|internal note/gi;
  const compact = value.replace(unsafePattern, "redacted-safe-value").replace(/\s+/g, " ").trim();
  return compact || "redacted-safe-value";
}

function safeToken(value: string) {
  return value.replace(/[^a-zA-Z0-9._:-]/g, "-").slice(0, 96) || "report-evidence";
}

function unique(values: readonly string[]) {
  return [...new Set(values.filter(Boolean))];
}

function uniquePlanFits(values: readonly ReportEvidencePlanFit[]) {
  return [...new Set(values)];
}
