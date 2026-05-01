import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/admin-command-center-access-runtime.ts";
const foundationValidatorPath = "src/scripts/validate-admin-command-center-foundation.mjs";
const failures = [];

expect(runtimePath, [
  "AdminCommandCenterAccessInput",
  "AdminCommandCenterAccessDecision",
  "AdminCommandCenterAccessProjection",
  "ADMIN_COMMAND_CENTER_ACCESS_RUNTIME_RULES",
  "projectAdminCommandCenterAccess",
  "getAdminCommandCenterAccessRuntimeRules",
  "deriveReasonCodes",
  "deriveDecision",
  "allow-safe-read",
  "allow-reviewed-mutation",
  "deny",
]);

expect(runtimePath, [
  "role-not-recognized",
  "area-not-recognized",
  "action-not-recognized",
  "audit-context-missing",
  "fresh-session-required",
  "owner-role-required",
  "owner-approval-required",
  "release-captain-role-required",
  "release-captain-approval-required",
  "chief-agent-mission-brief-required",
  "structured-agent-findings-required",
  "forecast-review-required",
  "email-dispatch-admin-send-blocked",
]);

expect(runtimePath, [
  "admin command center access defaults to deny unless role, area, action, session, and audit context satisfy the requested operation",
  "safe read access can only return safe projections and must use no-store responses",
  "mutating admin actions require a fresh session and audit context before approval gates are evaluated",
  "owner-only actions require owner approval and cannot be approved by agents or unsupported roles",
  "release-captain actions require release-captain approval before customer-facing reports, plan delivery, or chief-agent mission control changes",
  "agent orchestration actions require approved mission briefs, structured findings, and forecast review before any reviewed mutation can proceed",
  "email dispatch admin access may preview or dry-run but cannot directly send through a provider from admin surfaces",
]);

expect(runtimePath, [
  "noStoreRequired: true",
  "auditRequired: true",
  "freshReauthRequiredForMutation: true",
  "safeProjectionOnly: true",
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

expect(foundationValidatorPath, [
  "src/scripts/validate-admin-command-center-access-runtime.mjs",
  "src/lib/admin-command-center-access-runtime.ts",
  "projectAdminCommandCenterAccess",
]);

forbidden(runtimePath, [
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
  console.error("Admin command center access runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Admin command center access runtime validation passed.");

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
