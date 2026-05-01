import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const auditPath = "src/lib/admin-command-center-audit-runtime.ts";
const missionBriefPath = "src/lib/admin-command-center-mission-brief-runtime.ts";
const missionBriefValidatorPath = "src/scripts/validate-admin-command-center-mission-brief-runtime.mjs";
const accessValidatorPath = "src/scripts/validate-admin-command-center-access-runtime.mjs";
const failures = [];

expect(auditPath, [
  "AdminCommandCenterAuditEventType",
  "AdminCommandCenterAuditEventInput",
  "AdminCommandCenterAuditSafeProjection",
  "ADMIN_COMMAND_CENTER_AUDIT_RULES",
  "projectAdminCommandCenterAuditEvent",
  "getAdminCommandCenterAuditRules",
  "safe-read-reviewed",
  "mutation-approved",
  "mutation-denied",
  "mission-brief-reviewed",
  "agent-output-reviewed",
  "provider-config-reviewed",
  "report-release-reviewed",
  "launch-readiness-reviewed",
]);

expect(auditPath, [
  "immutable safe projections",
  "access decisions",
  "reviewed mutations",
  "mission brief reviews",
  "agent output reviews",
  "provider configuration reviews",
  "report release reviews",
  "launch readiness reviews",
  "event id",
  "evidence reference count",
  "approval reference count",
]);

expect(auditPath, [
  "immutable: true",
  "safeProjectionOnly: true",
  "noStoreRequired: true",
  "rawPayloadStored: false",
  "privateEvidenceStored: false",
  "privateBillingStored: false",
  "internalNotesCustomerVisible: false",
  "operatorIdentityCustomerVisible: false",
  "browserAuthorityStored: false",
  "providerPayloadStored: false",
  "providerResponseStored: false",
  "unsupportedOutcomePromiseStored: false",
]);

expect(missionBriefPath, [
  "projectAdminCommandCenterMissionBrief",
  "getAdminCommandCenterMissionBriefRules",
  "chiefAgentMayDispatch",
  "agentMayResearch",
  "scoutMayCompare",
  "outputRequiresCaptainReview: true",
  "unboundedResearchAllowed: false",
  "customerFacingOutputAllowedWithoutReview: false",
  "productionMutationAllowedWithoutReview: false",
]);

expect(missionBriefValidatorPath, [
  "Admin command center mission brief runtime validation passed.",
  "src/lib/admin-command-center-mission-brief-runtime.ts",
  "projectAdminCommandCenterMissionBrief",
]);

expect(accessValidatorPath, [
  "src/scripts/validate-admin-command-center-audit-runtime.mjs",
  "src/lib/admin-command-center-audit-runtime.ts",
  "projectAdminCommandCenterAuditEvent",
]);

forbidden(auditPath, unsafePhrases());
forbidden(missionBriefPath, unsafePhrases());

if (failures.length) {
  console.error("Admin command center audit runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center audit runtime validation passed with mission brief runtime coverage.");

function unsafePhrases() {
  return [
    "immutable: false",
    "safeProjectionOnly: false",
    "noStoreRequired: false",
    "rawPayloadStored: true",
    "privateEvidenceStored: true",
    "privateBillingStored: true",
    "internalNotesCustomerVisible: true",
    "operatorIdentityCustomerVisible: true",
    "browserAuthorityStored: true",
    "providerPayloadStored: true",
    "providerResponseStored: true",
    "unsupportedOutcomePromiseStored: true",
    "unboundedResearchAllowed: true",
    "customerFacingOutputAllowedWithoutReview: true",
    "productionMutationAllowedWithoutReview: true",
    "unsupportedOutcomePromiseAllowed: true",
    "outputRequiresCaptainReview: false",
    "ownerCommandAboveCaptain: false",
    "captainAboveChiefAgents: false",
    "chiefAgentsAboveAgents: false",
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
