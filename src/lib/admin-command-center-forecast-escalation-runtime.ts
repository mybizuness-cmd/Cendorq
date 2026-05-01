import type { AdminCommandCenterAgentFindingProjection } from "./admin-command-center-agent-findings-runtime";

export type AdminCommandCenterForecastRiskKey =
  | "drift-risk"
  | "stale-assumption-risk"
  | "duplicate-scope-risk"
  | "overclaim-risk"
  | "under-validation-risk"
  | "customer-journey-confusion-risk"
  | "private-material-exposure-risk"
  | "production-readiness-blocker-risk"
  | "handoff-misunderstanding-risk";

export type AdminCommandCenterForecastEscalationInput = {
  reviewId: string;
  finding: AdminCommandCenterAgentFindingProjection;
  risksReviewed: readonly AdminCommandCenterForecastRiskKey[];
  mitigations: readonly string[];
  escalationOwner: "owner" | "release-captain" | "captain";
  expansionRequested: boolean;
};

export type AdminCommandCenterForecastEscalationProjection = {
  ok: boolean;
  reviewId: string;
  findingId: string;
  escalationOwner: "owner" | "release-captain" | "captain";
  decision: "allow-expansion" | "hold-for-hardening";
  reasonCodes: readonly string[];
  risksReviewed: readonly AdminCommandCenterForecastRiskKey[];
  mitigationCount: number;
  expansionRequested: boolean;
  captainReviewRequired: true;
  highRiskEscalationRequired: boolean;
  hardenBeforeExpansion: boolean;
  safeProjectionOnly: true;
  customerFacingOutputAllowedWithoutReview: false;
  productionMutationAllowedWithoutReview: false;
  unsupportedOutcomePromiseAllowed: false;
};

const REQUIRED_FORECAST_RISKS: readonly AdminCommandCenterForecastRiskKey[] = [
  "drift-risk",
  "stale-assumption-risk",
  "duplicate-scope-risk",
  "overclaim-risk",
  "under-validation-risk",
  "customer-journey-confusion-risk",
  "private-material-exposure-risk",
  "production-readiness-blocker-risk",
  "handoff-misunderstanding-risk",
];

export const ADMIN_COMMAND_CENTER_FORECAST_ESCALATION_RULES = [
  "forecast escalation review must consider drift, stale assumptions, duplicate scope, overclaiming, under-validation, customer journey confusion, private material exposure, production readiness blockers, and handoff misunderstanding before expansion",
  "expansion is held when structured findings are not accepted, forecast risk coverage is incomplete, mitigations are missing, or escalation owner is insufficient",
  "owner escalation is required when private material exposure or production readiness blocker risk is present during requested expansion",
  "release-captain or owner escalation is required when overclaim or under-validation risk is present during requested expansion",
  "forecast escalation output is a safe projection and cannot approve customer-facing output, production mutation, or unsupported outcome promises by itself",
] as const;

export function projectAdminCommandCenterForecastEscalation(
  input: AdminCommandCenterForecastEscalationInput,
): AdminCommandCenterForecastEscalationProjection {
  const reasonCodes = deriveReasonCodes(input);
  const highRiskEscalationRequired = requiresHighRiskEscalation(input);
  const ok = reasonCodes.length === 0;
  return {
    ok,
    reviewId: normalizeText(input.reviewId, "forecast-review"),
    findingId: input.finding.findingId,
    escalationOwner: input.escalationOwner,
    decision: ok ? "allow-expansion" : "hold-for-hardening",
    reasonCodes,
    risksReviewed: input.risksReviewed,
    mitigationCount: input.mitigations.length,
    expansionRequested: input.expansionRequested,
    captainReviewRequired: true,
    highRiskEscalationRequired,
    hardenBeforeExpansion: !ok,
    safeProjectionOnly: true,
    customerFacingOutputAllowedWithoutReview: false,
    productionMutationAllowedWithoutReview: false,
    unsupportedOutcomePromiseAllowed: false,
  };
}

export function getAdminCommandCenterForecastEscalationRules() {
  return ADMIN_COMMAND_CENTER_FORECAST_ESCALATION_RULES;
}

function deriveReasonCodes(input: AdminCommandCenterForecastEscalationInput): string[] {
  const reasons: string[] = [];
  if (!input.finding.ok) reasons.push("structured-finding-not-accepted");
  if (!normalizeText(input.reviewId, "")) reasons.push("review-id-missing");
  const missing = REQUIRED_FORECAST_RISKS.filter((risk) => !input.risksReviewed.includes(risk));
  if (missing.length) reasons.push("forecast-risk-coverage-incomplete");
  if (input.mitigations.length < 1) reasons.push("mitigations-missing");
  if (input.expansionRequested && requiresOwnerEscalation(input) && input.escalationOwner !== "owner") reasons.push("owner-escalation-required");
  if (input.expansionRequested && requiresReleaseCaptainEscalation(input) && input.escalationOwner === "captain") reasons.push("release-captain-escalation-required");
  return reasons;
}

function requiresHighRiskEscalation(input: AdminCommandCenterForecastEscalationInput) {
  return requiresOwnerEscalation(input) || requiresReleaseCaptainEscalation(input);
}

function requiresOwnerEscalation(input: AdminCommandCenterForecastEscalationInput) {
  return input.risksReviewed.includes("private-material-exposure-risk") || input.risksReviewed.includes("production-readiness-blocker-risk");
}

function requiresReleaseCaptainEscalation(input: AdminCommandCenterForecastEscalationInput) {
  return input.risksReviewed.includes("overclaim-risk") || input.risksReviewed.includes("under-validation-risk");
}

function normalizeText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 160);
  return cleaned || fallback;
}
