export type CaptainAuditReviewKey =
  | "buyer-path-conversion"
  | "production-safety-operations"
  | "maintenance-backend-readiness";

export type CaptainAuditHardeningPassKey =
  | "route-discovery"
  | "language-trust"
  | "privacy-configuration"
  | "integration-backend-readiness"
  | "manual-qa-release";

export type CaptainAuditWeakAreaKey =
  | "phrase-based-validation"
  | "contracts-ahead-of-implementation"
  | "admin-command-center-gap"
  | "open-pr-triage"
  | "visual-qa-gap"
  | "production-readiness-gap"
  | "live-provider-send-blocked"
  | "report-generation-depth-gap"
  | "agent-orchestration-not-production"
  | "backend-zip-intake-not-started";

export type CaptainAuditControlPlaneProjection = {
  ok: true;
  ownerCommandAboveCaptain: true;
  captainMustAuditBeforeExpansion: true;
  latestMainVerifiedBeforeWork: boolean;
  activeBranchVerifiedBeforeWork: boolean;
  openPullRequestsReviewedBeforeMerge: boolean;
  handoffComparedToGithubState: boolean;
  weakAreasIdentifiedBeforeFeatureExpansion: boolean;
  branchLoopRequired: true;
  vercelGreenBeforeMergeRequired: true;
  stalePrBlindMergeAllowed: false;
  uncontrolledAgentApprovalAllowed: false;
  unsupportedGuaranteeAllowed: false;
  browserSecretExposureAllowed: false;
  rawCustomerDataExposureAllowed: false;
  providerPayloadExposureAllowed: false;
  customerFacingInternalNotesAllowed: false;
  reviews: readonly CaptainAuditReviewKey[];
  hardeningPasses: readonly CaptainAuditHardeningPassKey[];
  weakAreas: readonly CaptainAuditWeakAreaKey[];
  nextCorrectLayer: "admin-command-center-foundation";
};

export const CAPTAIN_AUDIT_REVIEWS = [
  "buyer-path-conversion",
  "production-safety-operations",
  "maintenance-backend-readiness",
] as const satisfies readonly CaptainAuditReviewKey[];

export const CAPTAIN_AUDIT_HARDENING_PASSES = [
  "route-discovery",
  "language-trust",
  "privacy-configuration",
  "integration-backend-readiness",
  "manual-qa-release",
] as const satisfies readonly CaptainAuditHardeningPassKey[];

export const CAPTAIN_AUDIT_WEAK_AREAS = [
  "phrase-based-validation",
  "contracts-ahead-of-implementation",
  "admin-command-center-gap",
  "open-pr-triage",
  "visual-qa-gap",
  "production-readiness-gap",
  "live-provider-send-blocked",
  "report-generation-depth-gap",
  "agent-orchestration-not-production",
  "backend-zip-intake-not-started",
] as const satisfies readonly CaptainAuditWeakAreaKey[];

export const CAPTAIN_AUDIT_CONTROL_RULES = [
  "captain takeover must verify latest main, active branch status, open pull requests, handoff accuracy, and weak areas before expansion",
  "buyer path, production safety, and maintenance readiness are separate reviews and cannot be collapsed into blind feature delivery",
  "route discovery, language trust, privacy configuration, integration readiness, and manual QA release are separate hardening passes",
  "owner command remains above captain command; agents never approve merges, launches, customer claims, provider configuration, billing decisions, or security readiness",
  "every meaningful change must use a fresh branch, scoped diff, validation wiring, PR, Vercel check, and merge only when green and mergeable",
  "older open pull requests require triage before merge, revival, or abandonment",
  "contracts may guide the platform, but contracts alone are not complete live product behavior",
  "admin command center foundation is the next correct continuation layer after this audit hardening gate",
] as const;

export function projectCaptainAuditHardeningControlPlane({
  latestMainVerifiedBeforeWork,
  activeBranchVerifiedBeforeWork,
  openPullRequestsReviewedBeforeMerge,
  handoffComparedToGithubState,
  weakAreasIdentifiedBeforeFeatureExpansion,
}: {
  latestMainVerifiedBeforeWork: boolean;
  activeBranchVerifiedBeforeWork: boolean;
  openPullRequestsReviewedBeforeMerge: boolean;
  handoffComparedToGithubState: boolean;
  weakAreasIdentifiedBeforeFeatureExpansion: boolean;
}): CaptainAuditControlPlaneProjection {
  return {
    ok: true,
    ownerCommandAboveCaptain: true,
    captainMustAuditBeforeExpansion: true,
    latestMainVerifiedBeforeWork,
    activeBranchVerifiedBeforeWork,
    openPullRequestsReviewedBeforeMerge,
    handoffComparedToGithubState,
    weakAreasIdentifiedBeforeFeatureExpansion,
    branchLoopRequired: true,
    vercelGreenBeforeMergeRequired: true,
    stalePrBlindMergeAllowed: false,
    uncontrolledAgentApprovalAllowed: false,
    unsupportedGuaranteeAllowed: false,
    browserSecretExposureAllowed: false,
    rawCustomerDataExposureAllowed: false,
    providerPayloadExposureAllowed: false,
    customerFacingInternalNotesAllowed: false,
    reviews: CAPTAIN_AUDIT_REVIEWS,
    hardeningPasses: CAPTAIN_AUDIT_HARDENING_PASSES,
    weakAreas: CAPTAIN_AUDIT_WEAK_AREAS,
    nextCorrectLayer: "admin-command-center-foundation",
  };
}

export function getCaptainAuditControlRules() {
  return CAPTAIN_AUDIT_CONTROL_RULES;
}
