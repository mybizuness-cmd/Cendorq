import type { AdminCommandCenterArea } from "./admin-command-center-foundation";

export type AdminCommandCenterMissionBriefInput = {
  missionId: string;
  area: AdminCommandCenterArea;
  chiefAgentRole: string;
  missionScope: string;
  sourceBoundaries: readonly string[];
  evidenceStandard: readonly string[];
  outputBoundary: string;
  escalationRules: readonly string[];
  forecastRisks: readonly string[];
  antiDriftChecks: readonly string[];
};

export type AdminCommandCenterMissionBriefProjection = {
  ok: boolean;
  missionId: string;
  area: AdminCommandCenterArea;
  chiefAgentRole: string;
  missionScope: string;
  sourceBoundaryCount: number;
  evidenceStandardCount: number;
  escalationRuleCount: number;
  forecastRiskCount: number;
  antiDriftCheckCount: number;
  reasonCodes: readonly string[];
  chiefAgentMayDispatch: boolean;
  agentMayResearch: boolean;
  scoutMayCompare: boolean;
  outputRequiresCaptainReview: true;
  ownerCommandAboveCaptain: true;
  captainAboveChiefAgents: true;
  chiefAgentsAboveAgents: true;
  safeProjectionOnly: true;
  unboundedResearchAllowed: false;
  customerFacingOutputAllowedWithoutReview: false;
  productionMutationAllowedWithoutReview: false;
  unsupportedOutcomePromiseAllowed: false;
};

export const ADMIN_COMMAND_CENTER_MISSION_BRIEF_RULES = [
  "chief-agent mission briefs require mission scope, source boundaries, evidence standards, output boundary, escalation rules, forecast risks, and anti-drift checks before dispatch",
  "agents and scouts may research, compare, draft, forecast, and pressure-test only inside the approved mission brief",
  "mission brief output requires captain review before customer-facing, production-affecting, provider-affecting, billing-affecting, security-affecting, launch-affecting, or report-affecting use",
  "mission briefs must block unbounded research, unsupported promises, and authority invention",
  "forecast risks must cover drift, stale assumptions, duplicated scope, missing implementation, weak validation, public-claim risk, and handoff risk when relevant",
] as const;

export function projectAdminCommandCenterMissionBrief(
  input: AdminCommandCenterMissionBriefInput,
): AdminCommandCenterMissionBriefProjection {
  const reasonCodes = deriveReasonCodes(input);
  const ok = reasonCodes.length === 0;
  return {
    ok,
    missionId: normalizeText(input.missionId, "mission-brief"),
    area: input.area,
    chiefAgentRole: normalizeText(input.chiefAgentRole, "chief-agent"),
    missionScope: normalizeText(input.missionScope, "mission scope pending"),
    sourceBoundaryCount: input.sourceBoundaries.length,
    evidenceStandardCount: input.evidenceStandard.length,
    escalationRuleCount: input.escalationRules.length,
    forecastRiskCount: input.forecastRisks.length,
    antiDriftCheckCount: input.antiDriftChecks.length,
    reasonCodes,
    chiefAgentMayDispatch: ok,
    agentMayResearch: ok,
    scoutMayCompare: ok,
    outputRequiresCaptainReview: true,
    ownerCommandAboveCaptain: true,
    captainAboveChiefAgents: true,
    chiefAgentsAboveAgents: true,
    safeProjectionOnly: true,
    unboundedResearchAllowed: false,
    customerFacingOutputAllowedWithoutReview: false,
    productionMutationAllowedWithoutReview: false,
    unsupportedOutcomePromiseAllowed: false,
  };
}

export function getAdminCommandCenterMissionBriefRules() {
  return ADMIN_COMMAND_CENTER_MISSION_BRIEF_RULES;
}

function deriveReasonCodes(input: AdminCommandCenterMissionBriefInput): string[] {
  const reasons: string[] = [];
  if (!normalizeText(input.missionId, "")) reasons.push("mission-id-missing");
  if (!normalizeText(input.chiefAgentRole, "")) reasons.push("chief-agent-role-missing");
  if (!normalizeText(input.missionScope, "")) reasons.push("mission-scope-missing");
  if (!normalizeText(input.outputBoundary, "")) reasons.push("output-boundary-missing");
  if (input.sourceBoundaries.length < 1) reasons.push("source-boundaries-missing");
  if (input.evidenceStandard.length < 4) reasons.push("evidence-standard-incomplete");
  if (input.escalationRules.length < 1) reasons.push("escalation-rules-missing");
  if (input.forecastRisks.length < 3) reasons.push("forecast-risks-incomplete");
  if (input.antiDriftChecks.length < 2) reasons.push("anti-drift-checks-incomplete");
  return reasons;
}

function normalizeText(value: unknown, fallback: string) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, 200);
  return cleaned || fallback;
}
