export type CaptainOperatingLane =
  | "backend"
  | "frontend"
  | "reports"
  | "operations"
  | "launch"
  | "support"
  | "billing"
  | "security"
  | "provider-configuration"
  | "agent-orchestration";

export type CaptainCommandRole = "owner" | "captain" | "chief-agent" | "agent" | "scout" | "validator";

export type CaptainReadinessCheck =
  | "owner-command-understood"
  | "current-main-verified"
  | "active-branch-verified"
  | "open-prs-reviewed"
  | "prior-work-reviewed"
  | "roadmap-compared-to-merged-state"
  | "affected-surfaces-identified"
  | "weak-areas-identified"
  | "validation-gates-identified"
  | "next-layer-justified";

export type ChiefAgentTrainingGate =
  | "mission-scope-understood"
  | "source-boundaries-understood"
  | "evidence-standard-understood"
  | "output-boundaries-understood"
  | "escalation-rules-understood"
  | "forecast-risks-identified"
  | "anti-drift-rules-understood";

export type CaptainOperatingCoreProjection = {
  ok: true;
  universalCoreApplies: true;
  captainMaySkipTakeoverAudit: false;
  chiefAgentMayRunUntrained: false;
  agentMayRunUntrained: false;
  scoutMayRunUnboundedResearch: false;
  speedOverridesUnderstanding: false;
  vercelGreenEqualsFullQuality: false;
  contractsEqualLiveProduct: false;
  agentsMayApproveProductionWork: false;
  ownerCommandAboveCaptain: true;
  captainAboveChiefAgents: true;
  chiefAgentsAboveAgents: true;
  releaseCaptainReviewRequired: true;
  zeroToleranceForKnownDrift: true;
  lanes: readonly CaptainOperatingLane[];
  commandRoles: readonly CaptainCommandRole[];
  readinessChecks: readonly CaptainReadinessCheck[];
  chiefAgentTrainingGates: readonly ChiefAgentTrainingGate[];
  backendBoundaryRequired: true;
  frontendJourneyReviewRequired: true;
  reportTruthSeparationRequired: true;
  operationsApprovalGatesRequired: true;
  launchReadinessVerificationRequired: true;
  agentOutputCaptainReviewRequired: true;
  forecastReviewRequiredBeforeExpansion: true;
  nextCaptainMustInheritClearState: true;
};

export const CAPTAIN_OPERATING_LANES = [
  "backend",
  "frontend",
  "reports",
  "operations",
  "launch",
  "support",
  "billing",
  "security",
  "provider-configuration",
  "agent-orchestration",
] as const satisfies readonly CaptainOperatingLane[];

export const CAPTAIN_COMMAND_ROLES = ["owner", "captain", "chief-agent", "agent", "scout", "validator"] as const satisfies readonly CaptainCommandRole[];

export const CAPTAIN_READINESS_CHECKS = [
  "owner-command-understood",
  "current-main-verified",
  "active-branch-verified",
  "open-prs-reviewed",
  "prior-work-reviewed",
  "roadmap-compared-to-merged-state",
  "affected-surfaces-identified",
  "weak-areas-identified",
  "validation-gates-identified",
  "next-layer-justified",
] as const satisfies readonly CaptainReadinessCheck[];

export const CHIEF_AGENT_TRAINING_GATES = [
  "mission-scope-understood",
  "source-boundaries-understood",
  "evidence-standard-understood",
  "output-boundaries-understood",
  "escalation-rules-understood",
  "forecast-risks-identified",
  "anti-drift-rules-understood",
] as const satisfies readonly ChiefAgentTrainingGate[];

export const CAPTAIN_OPERATING_CORE_RULES = [
  "universal captain operating core applies to backend, frontend, reports, operations, launch, support, billing, security, provider configuration, and agent orchestration",
  "captain may not skip takeover audit because work feels urgent, obvious, repetitive, or easy",
  "chief agents, agents, scouts, and validators must be trained on mission scope, source boundaries, evidence standard, output boundaries, escalation rules, forecast risks, and anti-drift rules before operating",
  "speed does not override understanding; Vercel green is not full product quality; contracts are not complete live product behavior",
  "captain must understand current main, active branch, open pull requests, prior work, roadmap state, affected surfaces, weak areas, validation gates, and next-layer justification before control",
  "backend captains must verify data boundaries, server-only authority, route behavior, no-store requirements, safe projections, audit creation, idempotency, and rollback posture",
  "frontend captains must verify route fit, customer journey, CTA destinations, empty states, loading states, mobile behavior, trust language, accessibility basics, and visual hierarchy",
  "report captains must preserve verified facts, customer context, observed evidence, assumptions, inferences, limitations, confidence, recommendations, and next actions as separate concepts",
  "operations captains must preserve owner command, release-captain review, audit records, role gates, approval gates, safe internal notes, and customer-safe projections",
  "launch captains must verify auth, payment mapping, webhook entitlement verification, smoke target, rollback plan, audit plan, protected runtime configuration, support identity, launch contact identity, and Vercel status",
  "agents may research, compare, draft, forecast, and pressure-test but may not approve production-impacting, customer-facing, provider-affecting, billing-affecting, security-affecting, or launch-affecting work",
  "forecast review must identify likely drift, missing implementation, stale assumptions, duplicated scope, weak validation, public-claim risk, and operational handoff risk before expansion",
] as const;

export function projectCaptainOperatingCore(): CaptainOperatingCoreProjection {
  return {
    ok: true,
    universalCoreApplies: true,
    captainMaySkipTakeoverAudit: false,
    chiefAgentMayRunUntrained: false,
    agentMayRunUntrained: false,
    scoutMayRunUnboundedResearch: false,
    speedOverridesUnderstanding: false,
    vercelGreenEqualsFullQuality: false,
    contractsEqualLiveProduct: false,
    agentsMayApproveProductionWork: false,
    ownerCommandAboveCaptain: true,
    captainAboveChiefAgents: true,
    chiefAgentsAboveAgents: true,
    releaseCaptainReviewRequired: true,
    zeroToleranceForKnownDrift: true,
    lanes: CAPTAIN_OPERATING_LANES,
    commandRoles: CAPTAIN_COMMAND_ROLES,
    readinessChecks: CAPTAIN_READINESS_CHECKS,
    chiefAgentTrainingGates: CHIEF_AGENT_TRAINING_GATES,
    backendBoundaryRequired: true,
    frontendJourneyReviewRequired: true,
    reportTruthSeparationRequired: true,
    operationsApprovalGatesRequired: true,
    launchReadinessVerificationRequired: true,
    agentOutputCaptainReviewRequired: true,
    forecastReviewRequiredBeforeExpansion: true,
    nextCaptainMustInheritClearState: true,
  };
}

export function getCaptainOperatingCoreRules() {
  return CAPTAIN_OPERATING_CORE_RULES;
}
