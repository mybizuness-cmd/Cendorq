import {
  PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS,
  PLATFORM_LAUNCH_READINESS_CONTRACT,
} from "./platform-launch-readiness-contracts";

export type PlatformLaunchDecisionState =
  | "blocked"
  | "ready-for-owner-review"
  | "ready-for-production-smoke"
  | "ready-for-limited-launch"
  | "ready-for-public-launch";

export type PlatformLaunchReadinessInput = {
  verifiedMain?: boolean;
  validateRoutesWired?: boolean;
  validateRoutesPassing?: boolean;
  vercelGreen?: boolean;
  productionSmokeConfigured?: boolean;
  productionSmokePassed?: boolean;
  ownerPaymentConfigReady?: boolean;
  authProviderConfigured?: boolean;
  serverOnlySecretsConfigured?: boolean;
  rollbackPlanReady?: boolean;
  auditPlanReady?: boolean;
  publicEntryReady?: boolean;
  freeScanReady?: boolean;
  customerHandoffsReady?: boolean;
  reportsReady?: boolean;
  billingReady?: boolean;
  supportAndCommandCenterReady?: boolean;
  maintenanceReady?: boolean;
  criticalLockActive?: boolean;
};

export type PlatformLaunchReadinessProjection = {
  decision: PlatformLaunchDecisionState;
  safeSummary: string;
  readyGroups: readonly string[];
  blockedGroups: readonly string[];
  evidenceGaps: readonly string[];
  safeNextActions: readonly string[];
  hardLaunchLocks: readonly string[];
  blockedPatterns: readonly string[];
};

export function projectPlatformLaunchReadiness(input: PlatformLaunchReadinessInput): PlatformLaunchReadinessProjection {
  const evidenceGaps = getEvidenceGaps(input);
  const readyGroups = getReadyGroups(input);
  const blockedGroups = getBlockedGroups(input);
  const decision = chooseLaunchDecision(input, evidenceGaps);

  return sanitizeProjection({
    decision,
    safeSummary: getSafeSummary(decision),
    readyGroups,
    blockedGroups,
    evidenceGaps,
    safeNextActions: getSafeNextActions(decision, evidenceGaps),
    hardLaunchLocks: PLATFORM_LAUNCH_READINESS_CONTRACT.hardLaunchLocks,
    blockedPatterns: PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS,
  });
}

function chooseLaunchDecision(input: PlatformLaunchReadinessInput, evidenceGaps: readonly string[]): PlatformLaunchDecisionState {
  if (input.criticalLockActive) return "blocked";
  if (!input.verifiedMain || !input.validateRoutesWired || !input.validateRoutesPassing) return "blocked";
  if (evidenceGaps.length > 0) return "ready-for-owner-review";
  if (!input.productionSmokeConfigured || !input.productionSmokePassed) return "ready-for-production-smoke";
  if (!input.vercelGreen) return "ready-for-production-smoke";
  if (!input.ownerPaymentConfigReady || !input.authProviderConfigured) return "ready-for-limited-launch";
  return "ready-for-public-launch";
}

function getEvidenceGaps(input: PlatformLaunchReadinessInput) {
  const gaps: string[] = [];
  if (!input.verifiedMain) gaps.push("latest main commit verification is missing");
  if (!input.validateRoutesWired) gaps.push("validate:routes wiring is missing");
  if (!input.validateRoutesPassing) gaps.push("route validation pass is missing");
  if (!input.vercelGreen) gaps.push("green Vercel deployment is missing");
  if (!input.serverOnlySecretsConfigured) gaps.push("server-only secret configuration evidence is missing");
  if (!input.rollbackPlanReady) gaps.push("rollback plan evidence is missing");
  if (!input.auditPlanReady) gaps.push("audit plan evidence is missing");
  if (!input.publicEntryReady) gaps.push("public entry readiness evidence is missing");
  if (!input.freeScanReady) gaps.push("Free Scan readiness evidence is missing");
  if (!input.customerHandoffsReady) gaps.push("customer platform handoff readiness evidence is missing");
  if (!input.reportsReady) gaps.push("report generation and vault readiness evidence is missing");
  if (!input.billingReady) gaps.push("billing checkout and entitlement readiness evidence is missing");
  if (!input.supportAndCommandCenterReady) gaps.push("support and command center readiness evidence is missing");
  if (!input.maintenanceReady) gaps.push("controlled maintenance and smoke readiness evidence is missing");
  if (input.criticalLockActive) gaps.push("critical hard launch lock is active");
  return gaps;
}

function getReadyGroups(input: PlatformLaunchReadinessInput) {
  const groups: string[] = [];
  if (input.publicEntryReady && input.freeScanReady) groups.push("public-entry-and-free-scan");
  if (input.authProviderConfigured && input.serverOnlySecretsConfigured) groups.push("auth-session-and-welcome");
  if (input.customerHandoffsReady) groups.push("customer-platform-handoffs");
  if (input.reportsReady) groups.push("reports-and-vault");
  if (input.billingReady && input.ownerPaymentConfigReady) groups.push("billing-and-entitlements");
  if (input.supportAndCommandCenterReady) groups.push("support-and-command-center");
  if (input.maintenanceReady && input.productionSmokeConfigured) groups.push("maintenance-and-smoke");
  return groups;
}

function getBlockedGroups(input: PlatformLaunchReadinessInput) {
  const allGroups = PLATFORM_LAUNCH_READINESS_CONTRACT.readinessGroups.map((group) => group.key);
  const ready = new Set(getReadyGroups(input));
  return allGroups.filter((group) => !ready.has(group));
}

function getSafeSummary(decision: PlatformLaunchDecisionState) {
  if (decision === "blocked") return "Launch is blocked until required validation, safety, ownership, and release evidence is present.";
  if (decision === "ready-for-owner-review") return "The platform can be reviewed by the owner, but missing evidence still prevents launch.";
  if (decision === "ready-for-production-smoke") return "The platform is ready for production smoke preparation, not final public launch.";
  if (decision === "ready-for-limited-launch") return "The platform may be considered for limited launch only after owner configuration and safety checks are confirmed.";
  return "The platform is eligible for public-launch review after production smoke, owner configuration, rollback, audit, and hard-lock checks remain clear.";
}

function getSafeNextActions(decision: PlatformLaunchDecisionState, evidenceGaps: readonly string[]) {
  if (decision === "blocked") return ["Resolve blocking validation, launch-lock, or evidence gaps before any release claim.", ...evidenceGaps];
  if (decision === "ready-for-owner-review") return ["Review evidence gaps with the owner and record audited decisions before production smoke.", ...evidenceGaps];
  if (decision === "ready-for-production-smoke") return ["Configure production smoke target and run smoke checks without live secrets or production mutation."];
  if (decision === "ready-for-limited-launch") return ["Confirm owner auth/payment configuration, rollback plan, audit plan, and no active hard launch locks."];
  return ["Perform final owner review and production smoke confirmation before declaring public launch readiness."];
}

function sanitizeProjection(projection: PlatformLaunchReadinessProjection): PlatformLaunchReadinessProjection {
  return {
    ...projection,
    safeSummary: safeString(projection.safeSummary),
    readyGroups: projection.readyGroups.map(safeString),
    blockedGroups: projection.blockedGroups.map(safeString),
    evidenceGaps: projection.evidenceGaps.map(safeString),
    safeNextActions: projection.safeNextActions.map(safeString),
    hardLaunchLocks: projection.hardLaunchLocks.map(safeString),
    blockedPatterns: projection.blockedPatterns.map(safeString),
  };
}

function safeString(value: string) {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (!normalized) return "Unavailable safe launch readiness value.";

  const blockedFragments = [
    "rawPayload=",
    "rawEvidence=",
    "rawBillingData=",
    "secret=",
    "password=",
    "sessionToken=",
    "csrfToken=",
    "adminKey=",
    "supportContextKey=",
    "privateKey=",
  ];

  if (blockedFragments.some((fragment) => normalized.includes(fragment))) return "Blocked unsafe launch readiness value.";
  return normalized;
}
