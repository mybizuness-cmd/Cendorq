import type { AdminCommandCenterAction, AdminCommandCenterArea, AdminCommandCenterRole } from "./admin-command-center-foundation";
import { ADMIN_COMMAND_CENTER_FOUNDATION } from "./admin-command-center-foundation";

export type AdminCommandCenterAccessInput = {
  role: AdminCommandCenterRole | "unknown";
  area: AdminCommandCenterArea;
  action: AdminCommandCenterAction;
  sessionFresh: boolean;
  mutationRequested: boolean;
  auditContextPresent: boolean;
  ownerApprovalPresent?: boolean;
  releaseCaptainApprovalPresent?: boolean;
  missionBriefApproved?: boolean;
  structuredFindingsPresent?: boolean;
  forecastReviewPresent?: boolean;
};

export type AdminCommandCenterAccessDecision = "allow-safe-read" | "allow-reviewed-mutation" | "deny";

export type AdminCommandCenterAccessProjection = {
  ok: boolean;
  decision: AdminCommandCenterAccessDecision;
  area: AdminCommandCenterArea;
  action: AdminCommandCenterAction;
  role: AdminCommandCenterRole | "unknown";
  reasonCodes: readonly string[];
  noStoreRequired: true;
  auditRequired: true;
  freshReauthRequiredForMutation: true;
  safeProjectionOnly: true;
  customerVisibleInternalNotesAllowed: false;
  operatorIdentityCustomerVisibleAllowed: false;
  browserReadableAdminAuthorityAllowed: false;
  browserReadableProviderAuthorityAllowed: false;
  browserReadableSupportAuthorityAllowed: false;
  browserStorageAuthorityAllowed: false;
  directProviderSendFromAdminAllowed: false;
  uncontrolledAgentMutationAllowed: false;
  untrainedChiefAgentDispatchAllowed: false;
  unstructuredAgentFindingAllowed: false;
  stalePrBlindMergeAllowed: false;
  unsupportedOutcomePromiseAllowed: false;
};

const OWNER_ONLY_ACTIONS: readonly AdminCommandCenterAction[] = [
  "approve-provider-configuration",
  "approve-launch-readiness",
  "approve-maintenance-change",
];

const RELEASE_CAPTAIN_ACTIONS: readonly AdminCommandCenterAction[] = [
  "approve-report-release",
  "approve-plan-delivery",
  "approve-chief-agent-mission-brief",
  "review-agent-output",
];

export const ADMIN_COMMAND_CENTER_ACCESS_RUNTIME_RULES = [
  "admin command center access defaults to deny unless role, area, action, session, and audit context satisfy the requested operation",
  "safe read access can only return safe projections and must use no-store responses",
  "mutating admin actions require a fresh session and audit context before approval gates are evaluated",
  "owner-only actions require owner approval and cannot be approved by agents or unsupported roles",
  "release-captain actions require release-captain approval before customer-facing reports, plan delivery, or chief-agent mission control changes",
  "agent orchestration actions require approved mission briefs, structured findings, and forecast review before any reviewed mutation can proceed",
  "email dispatch admin access may preview or dry-run but cannot directly send through a provider from admin surfaces",
] as const;

export function projectAdminCommandCenterAccess(input: AdminCommandCenterAccessInput): AdminCommandCenterAccessProjection {
  const reasonCodes = deriveReasonCodes(input);
  const decision = deriveDecision(input, reasonCodes);
  return {
    ok: decision !== "deny",
    decision,
    area: input.area,
    action: input.action,
    role: input.role,
    reasonCodes,
    noStoreRequired: true,
    auditRequired: true,
    freshReauthRequiredForMutation: true,
    safeProjectionOnly: true,
    customerVisibleInternalNotesAllowed: false,
    operatorIdentityCustomerVisibleAllowed: false,
    browserReadableAdminAuthorityAllowed: false,
    browserReadableProviderAuthorityAllowed: false,
    browserReadableSupportAuthorityAllowed: false,
    browserStorageAuthorityAllowed: false,
    directProviderSendFromAdminAllowed: false,
    uncontrolledAgentMutationAllowed: false,
    untrainedChiefAgentDispatchAllowed: false,
    unstructuredAgentFindingAllowed: false,
    stalePrBlindMergeAllowed: false,
    unsupportedOutcomePromiseAllowed: false,
  };
}

export function getAdminCommandCenterAccessRuntimeRules() {
  return ADMIN_COMMAND_CENTER_ACCESS_RUNTIME_RULES;
}

function deriveReasonCodes(input: AdminCommandCenterAccessInput): string[] {
  const reasons: string[] = [];
  if (!ADMIN_COMMAND_CENTER_FOUNDATION.roles.includes(input.role as AdminCommandCenterRole)) reasons.push("role-not-recognized");
  if (!ADMIN_COMMAND_CENTER_FOUNDATION.areas.includes(input.area)) reasons.push("area-not-recognized");
  if (!ADMIN_COMMAND_CENTER_FOUNDATION.actions.includes(input.action)) reasons.push("action-not-recognized");
  if (!input.auditContextPresent) reasons.push("audit-context-missing");
  if (input.mutationRequested && !input.sessionFresh) reasons.push("fresh-session-required");
  if (OWNER_ONLY_ACTIONS.includes(input.action) && input.role !== "owner") reasons.push("owner-role-required");
  if (OWNER_ONLY_ACTIONS.includes(input.action) && input.ownerApprovalPresent !== true) reasons.push("owner-approval-required");
  if (RELEASE_CAPTAIN_ACTIONS.includes(input.action) && input.role !== "release-captain" && input.role !== "owner") reasons.push("release-captain-role-required");
  if (RELEASE_CAPTAIN_ACTIONS.includes(input.action) && input.releaseCaptainApprovalPresent !== true && input.role !== "owner") reasons.push("release-captain-approval-required");
  if (input.area === "agent-orchestration" && input.missionBriefApproved !== true) reasons.push("chief-agent-mission-brief-required");
  if (input.area === "agent-orchestration" && input.structuredFindingsPresent !== true) reasons.push("structured-agent-findings-required");
  if (input.area === "agent-orchestration" && input.forecastReviewPresent !== true) reasons.push("forecast-review-required");
  if (input.area === "email-dispatch" && input.action !== "view-safe-summary" && input.action !== "review-audit-trail") reasons.push("email-dispatch-admin-send-blocked");
  return reasons;
}

function deriveDecision(input: AdminCommandCenterAccessInput, reasonCodes: readonly string[]): AdminCommandCenterAccessDecision {
  if (reasonCodes.length) return "deny";
  if (!input.mutationRequested) return "allow-safe-read";
  return "allow-reviewed-mutation";
}
