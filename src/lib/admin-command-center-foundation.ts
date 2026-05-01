import { getCaptainAuditControlRules } from "./captain-audit-hardening-control-plane";
import { getCaptainOperatingCoreRules } from "./captain-operating-core";
import { getCustomerSupportOperatorAccessContracts } from "./customer-support-operator-access-contracts";

export type AdminCommandCenterArea =
  | "support"
  | "billing"
  | "security"
  | "reports"
  | "email-dispatch"
  | "provider-configuration"
  | "plan-delivery"
  | "launch-readiness"
  | "maintenance"
  | "agent-orchestration";

export type AdminCommandCenterRole =
  | "owner"
  | "release-captain"
  | "support-admin"
  | "billing-approver"
  | "security-reviewer"
  | "report-release-reviewer"
  | "provider-config-approver"
  | "maintenance-operator"
  | "chief-agent-controller";

export type AdminCommandCenterAction =
  | "view-safe-summary"
  | "review-audit-trail"
  | "approve-report-release"
  | "approve-billing-action"
  | "approve-security-escalation"
  | "approve-provider-configuration"
  | "approve-plan-delivery"
  | "approve-launch-readiness"
  | "approve-maintenance-change"
  | "review-agent-output"
  | "approve-chief-agent-mission-brief";

export type AdminCommandCenterFoundation = {
  key: "admin-command-center-foundation";
  route: "/admin";
  defaultDecision: "deny";
  responseMode: "no-store";
  sessionLocation: "server-only-http-only-cookie";
  freshReauthRequiredForMutations: true;
  auditRequiredForEveryMutation: true;
  ownerCommandAboveCaptain: true;
  captainReviewRequiredBeforeAgentAction: true;
  chiefAgentMissionBriefRequired: true;
  agentStructuredFindingsRequired: true;
  forecastBeforeExpansionRequired: true;
  areas: readonly AdminCommandCenterArea[];
  roles: readonly AdminCommandCenterRole[];
  actions: readonly AdminCommandCenterAction[];
  safeInternalNotesMode: "internal-only-redacted-projection";
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

export const ADMIN_COMMAND_CENTER_FOUNDATION: AdminCommandCenterFoundation = {
  key: "admin-command-center-foundation",
  route: "/admin",
  defaultDecision: "deny",
  responseMode: "no-store",
  sessionLocation: "server-only-http-only-cookie",
  freshReauthRequiredForMutations: true,
  auditRequiredForEveryMutation: true,
  ownerCommandAboveCaptain: true,
  captainReviewRequiredBeforeAgentAction: true,
  chiefAgentMissionBriefRequired: true,
  agentStructuredFindingsRequired: true,
  forecastBeforeExpansionRequired: true,
  areas: ["support", "billing", "security", "reports", "email-dispatch", "provider-configuration", "plan-delivery", "launch-readiness", "maintenance", "agent-orchestration"],
  roles: ["owner", "release-captain", "support-admin", "billing-approver", "security-reviewer", "report-release-reviewer", "provider-config-approver", "maintenance-operator", "chief-agent-controller"],
  actions: ["view-safe-summary", "review-audit-trail", "approve-report-release", "approve-billing-action", "approve-security-escalation", "approve-provider-configuration", "approve-plan-delivery", "approve-launch-readiness", "approve-maintenance-change", "review-agent-output", "approve-chief-agent-mission-brief"],
  safeInternalNotesMode: "internal-only-redacted-projection",
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

export const ADMIN_COMMAND_CENTER_AREA_RULES = [
  "support area uses support operator access contracts and projects only safe support summaries",
  "billing area requires billing approval gates and customer-safe billing language",
  "security area requires security review gates and customer-safe security language",
  "reports area requires release-captain approval before report vault delivery or correction output",
  "email dispatch area may preview and dry-run but must not perform direct provider sends from admin surfaces",
  "provider configuration area requires owner approval before live provider readiness changes",
  "plan delivery area preserves Free Scan, Deep Review, Build Fix, and Ongoing Control entitlement boundaries",
  "launch readiness and maintenance areas require rollback posture, smoke expectations, and audit records before production-affecting changes",
  "agent orchestration area reviews chief-agent mission briefs, structured agent findings, forecast risks, and escalation needs only",
] as const;

export const ADMIN_COMMAND_CENTER_APPROVAL_GATES = [
  "owner approval gate",
  "release-captain report release gate",
  "billing approval gate",
  "security approval gate",
  "provider configuration approval gate",
  "plan delivery approval gate",
  "launch readiness approval gate",
  "maintenance change approval gate",
  "captain review gate for agent output",
  "chief-agent mission brief approval gate",
] as const;

export const ADMIN_COMMAND_CENTER_BLOCKED_CONTENT = [
  "customer-visible internal notes",
  "customer-visible operator identity",
  "browser-readable admin authority",
  "browser-readable provider authority",
  "browser-readable support authority",
  "browser storage authority",
  "direct provider send from admin",
  "autonomous agent mutation",
  "untrained chief-agent dispatch",
  "unstructured agent finding",
  "stale pull request blind merge",
  "unsupported report change promise",
  "unsupported billing change promise",
  "unsupported security outcome promise",
  "unsupported business result promise",
] as const;

export function getAdminCommandCenterFoundation() {
  return {
    foundation: ADMIN_COMMAND_CENTER_FOUNDATION,
    areaRules: ADMIN_COMMAND_CENTER_AREA_RULES,
    approvalGates: ADMIN_COMMAND_CENTER_APPROVAL_GATES,
    blockedContent: ADMIN_COMMAND_CENTER_BLOCKED_CONTENT,
    supportOperatorAccess: getCustomerSupportOperatorAccessContracts(),
    captainAuditRules: getCaptainAuditControlRules(),
    captainOperatingRules: getCaptainOperatingCoreRules(),
  };
}

export function projectAdminCommandCenterFoundationSummary() {
  return {
    adminCommandCenterAvailable: true,
    route: "/admin" as const,
    defaultDecision: "deny" as const,
    responseMode: "no-store" as const,
    areas: ADMIN_COMMAND_CENTER_FOUNDATION.areas,
    roles: ADMIN_COMMAND_CENTER_FOUNDATION.roles,
    actions: ADMIN_COMMAND_CENTER_FOUNDATION.actions,
    approvalGates: ADMIN_COMMAND_CENTER_APPROVAL_GATES,
    ownerCommandAboveCaptain: true,
    captainReviewRequiredBeforeAgentAction: true,
    chiefAgentMissionBriefRequired: true,
    agentStructuredFindingsRequired: true,
    forecastBeforeExpansionRequired: true,
    auditRequiredForEveryMutation: true,
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
