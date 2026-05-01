import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const foundationPath = "src/lib/admin-command-center-foundation.ts";
const ownerValidatorPath = "src/scripts/validate-owner-operating-manual.mjs";
const failures = [];

expect(foundationPath, [
  "AdminCommandCenterArea",
  "AdminCommandCenterRole",
  "AdminCommandCenterAction",
  "AdminCommandCenterFoundation",
  "ADMIN_COMMAND_CENTER_FOUNDATION",
  "ADMIN_COMMAND_CENTER_AREA_RULES",
  "ADMIN_COMMAND_CENTER_APPROVAL_GATES",
  "ADMIN_COMMAND_CENTER_BLOCKED_CONTENT",
  "getAdminCommandCenterFoundation",
  "projectAdminCommandCenterFoundationSummary",
]);

expect(foundationPath, [
  "support",
  "billing",
  "security",
  "reports",
  "email-dispatch",
  "provider-configuration",
  "plan-delivery",
  "launch-readiness",
  "maintenance",
  "agent-orchestration",
]);

expect(foundationPath, [
  "owner",
  "release-captain",
  "support-admin",
  "billing-approver",
  "security-reviewer",
  "report-release-reviewer",
  "provider-config-approver",
  "maintenance-operator",
  "chief-agent-controller",
  "ownerCommandAboveCaptain: true",
  "captainReviewRequiredBeforeAgentAction: true",
]);

expect(foundationPath, [
  "view-safe-summary",
  "review-audit-trail",
  "approve-report-release",
  "approve-billing-action",
  "approve-security-escalation",
  "approve-provider-configuration",
  "approve-plan-delivery",
  "approve-launch-readiness",
  "approve-maintenance-change",
  "review-agent-output",
  "approve-chief-agent-mission-brief",
]);

expect(foundationPath, [
  "defaultDecision: \"deny\"",
  "responseMode: \"no-store\"",
  "server-only-http-only-cookie",
  "freshReauthRequiredForMutations: true",
  "auditRequiredForEveryMutation: true",
  "safeInternalNotesMode: \"internal-only-redacted-projection\"",
  "chiefAgentMissionBriefRequired: true",
  "agentStructuredFindingsRequired: true",
  "forecastBeforeExpansionRequired: true",
]);

expect(foundationPath, [
  "customerVisibleInternalNotesAllowed: false",
  "operatorIdentityCustomerVisibleAllowed: false",
  "browserReadableAdminAuthorityAllowed: false",
  "browserReadableProviderAuthorityAllowed: false",
  "browserReadableSupportAuthorityAllowed: false",
  "browserStorageAuthorityAllowed: false",
  "directProviderSendFromAdminAllowed: false",
  "uncontrolledAgentMutationAllowed: false",
  "untrainedChiefAgentDispatchAllowed: false",
  "unstructuredAgentFindingAllowed: false",
  "stalePrBlindMergeAllowed: false",
  "unsupportedOutcomePromiseAllowed: false",
]);

expect(foundationPath, [
  "support area uses support operator access contracts and projects only safe support summaries",
  "billing area requires billing approval gates and customer-safe billing language",
  "security area requires security review gates and customer-safe security language",
  "reports area requires release-captain approval before report vault delivery or correction output",
  "email dispatch area may preview and dry-run but must not perform direct provider sends from admin surfaces",
  "provider configuration area requires owner approval before live provider readiness changes",
  "agent orchestration area reviews chief-agent mission briefs, structured agent findings, forecast risks, and escalation needs only",
]);

expect(foundationPath, [
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
]);

expect(foundationPath, [
  "getCustomerSupportOperatorAccessContracts",
  "getCaptainAuditControlRules",
  "getCaptainOperatingCoreRules",
]);

expect(ownerValidatorPath, [
  "src/scripts/validate-admin-command-center-foundation.mjs",
  "src/lib/admin-command-center-foundation.ts",
  "projectAdminCommandCenterFoundationSummary",
]);

forbidden(foundationPath, [
  "defaultDecision: \"allow\"",
  "customerVisibleInternalNotesAllowed: true",
  "operatorIdentityCustomerVisibleAllowed: true",
  "browserReadableAdminAuthorityAllowed: true",
  "browserReadableProviderAuthorityAllowed: true",
  "browserReadableSupportAuthorityAllowed: true",
  "browserStorageAuthorityAllowed: true",
  "directProviderSendFromAdminAllowed: true",
  "uncontrolledAgentMutationAllowed: true",
  "untrainedChiefAgentDispatchAllowed: true",
  "unstructuredAgentFindingAllowed: true",
  "stalePrBlindMergeAllowed: true",
  "unsupportedOutcomePromiseAllowed: true",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed deliverability",
  "guaranteed inbox placement",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Admin command center foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center foundation validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
