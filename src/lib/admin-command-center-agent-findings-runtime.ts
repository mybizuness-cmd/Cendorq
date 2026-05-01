import type { AdminCommandCenterArea } from "./admin-command-center-foundation";
import type { AdminCommandCenterMissionBriefProjection } from "./admin-command-center-mission-brief-runtime";

export type AdminCommandCenterAgentFindingInput = {
  findingId: string;
  mission: AdminCommandCenterMissionBriefProjection;
  area: AdminCommandCenterArea;
  agentRole: string;
  verifiedFacts: readonly string[];
  sourceRefs: readonly string[];
  assumptions: readonly string[];
  gaps: readonly string[];
  risks: readonly string[];
  recommendations: readonly string[];
  forecastedFailureModes: readonly string[];
  escalationNeeds: readonly string[];
};

export type AdminCommandCenterAgentFindingProjection = {
  ok: boolean;
  findingId: string;
  missionId: string;
  area: AdminCommandCenterArea;
  agentRole: string;
  reasonCodes: readonly string[];
  verifiedFactCount: number;
  sourceRefCount: number;
  assumptionCount: number;
  gapCount: number;
  riskCount: number;
  recommendationCount: number;
  forecastedFailureModeCount: number;
  escalationNeedCount: number;
  structuredFindingAccepted: boolean;
  requiresCaptainReview: true;
  missionBriefRequired: true;
  sourceRefsRequired: true;
  forecastRequired: true;
  escalationReviewRequired: true;
  safeProjectionOnly: true;
  customerFacingOutputAllowedWithoutReview: false;
  productionMutationAllowedWithoutReview: false;
  billingActionAllowedWithoutReview: false;
  providerActionAllowedWithoutReview: false;
  reportReleaseAllowedWithoutReview: false;
  launchActionAllowedWithoutReview: false;
  unsupportedOutcomePromiseAllowed: false;
};

export const ADMIN_COMMAND_CENTER_AGENT_FINDINGS_RULES = [
  "agent findings require an approved mission brief before they can be accepted",
  "agent findings must include verified facts, source references, assumptions, gaps, risks, recommendations, forecasted failure modes, and escalation needs",
  "agent findings are structured research outputs and are not approvals for customer-facing output, production mutation, billing action, provider action, report release, or launch action",
  "captain review is required before agent findings can influence customer-facing, production-affecting, billing-affecting, provider-affecting, report-affecting, or launch-affecting work",
  "agent findings must not convert assumptions into verified facts or hide gaps and risks",
] as const;

export function projectAdminCommandCenterAgentFinding(
  input: AdminCommandCenterAgentFindingInput,
): AdminCommandCenterAgentFindingProjection {
  const reasonCodes = deriveReasonCodes(input);
  const ok = reasonCodes.length === 0;
  return {
    ok,
    findingId: normalizeText(input.findingId, "agent-finding"),
    missionId: input.mission.missionId,
    area: input.area,
    agentRole: normalizeText(input.agentRole, "agent"),
    reasonCodes,
    verifiedFactCount: input.verifiedFacts.length,
    sourceRefCount: input.sourceRefs.length,
    assumptionCount: input.assumptions.length,
    gapCount: input.gaps.length,
    riskCount: input.risks.length,
    recommendationCount: input.recommendations.length,
    forecastedFailureModeCount: input.forecastedFailureModes.length,
    escalationNeedCount: input.escalationNeeds.length,
    structuredFindingAccepted: ok,
    requiresCaptainReview: true,
    missionBriefRequired: true,
    sourceRefsRequired: true,
    forecastRequired: true,
    escalationReviewRequired: true,
    safeProjectionOnly: true,
    customerFacingOutputAllowedWithoutReview: false,
    productionMutationAllowedWithoutReview: false,
    billingActionAllowedWithoutReview: false,
    providerActionAllowedWithoutReview: false,
    reportReleaseAllowedWithoutReview: false,
    launchActionAllowedWithoutReview: false,
    unsupportedOutcomePromiseAllowed: false,
  };
}

export function getAdminCommandCenterAgentFindingsRules() {
  return ADMIN_COMMAND_CENTER_AGENT_FINDINGS_RULES;
}

function deriveReasonCodes(input: AdminCommandCenterAgentFindingInput): string[] {
  const reasons: string[] = [];
  if (!input.mission.ok) reasons.push("mission-brief-not-approved");
  if (!normalizeText(input.findingId, "")) reasons.push("finding-id-missing");
  if (!normalizeText(input.agentRole, "")) reasons.push("agent-role-missing");
  if (input.verifiedFacts.length < 1) reasons.push("verified-facts-missing");
  if (input.sourceRefs.length < 1) reasons.push("source-refs-missing");
  if (input.assumptions.length < 1) reasons.push("assumptions-missing");
  if (input.gaps.length < 1) reasons.push("gaps-missing");
  if (input.risks.length < 1) reasons.push("risks-missing");
  if (input.recommendations.length < 1) reasons.push("recommendations-missing");
  if (input.forecastedFailureModes.length < 1) reasons.push("forecasted-failure-modes-missing");
  if (input.escalationNeeds.length < 1) reasons.push("escalation-needs-missing");
  return reasons;
}

function normalizeText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 160);
  return cleaned || fallback;
}
