import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const foundationPath = "src/lib/admin-command-center-foundation.ts";
const accessRuntimePath = "src/lib/admin-command-center-access-runtime.ts";
const accessRuntimeValidatorPath = "src/scripts/validate-admin-command-center-access-runtime.mjs";
const captainAuditValidatorPath = "src/scripts/validate-captain-audit-hardening-control-plane.mjs";
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

expect(accessRuntimePath, [
  "projectAdminCommandCenterAccess",
  "getAdminCommandCenterAccessRuntimeRules",
  "allow-safe-read",
  "allow-reviewed-mutation",
  "deny",
  "role-not-recognized",
  "audit-context-missing",
  "fresh-session-required",
  "owner-approval-required",
  "release-captain-approval-required",
  "chief-agent-mission-brief-required",
  "structured-agent-findings-required",
  "forecast-review-required",
  "email-dispatch-admin-send-blocked",
]);

expect(accessRuntimeValidatorPath, [
  "Admin command center access runtime validation passed.",
  "src/lib/admin-command-center-access-runtime.ts",
  "projectAdminCommandCenterAccess",
]);

expect(captainAuditValidatorPath, [
  "src/scripts/validate-admin-command-center-foundation.mjs",
  "src/lib/admin-command-center-foundation.ts",
  "projectAdminCommandCenterFoundationSummary",
]);

forbidden(foundationPath, unsafePhrases());
forbidden(accessRuntimePath, unsafePhrases());

if (failures.length) {
  console.error("Admin command center foundation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center foundation validation passed with access runtime coverage.");

function unsafePhrases() {
  return [
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
  ];
}

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
