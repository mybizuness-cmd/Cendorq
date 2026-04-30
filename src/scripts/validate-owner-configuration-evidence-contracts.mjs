import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/owner-configuration-evidence-contracts.ts";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(contractPath, [
  "OWNER_CONFIGURATION_EVIDENCE_CONTRACT",
  "OWNER_CONFIGURATION_EVIDENCE_BLOCKED_PATTERNS",
  "Owner Configuration Evidence Contract",
  "auth-provider-configuration",
  "payment-mapping-configuration",
  "protected-runtime-configuration",
  "launch-contact-configuration",
  "support-identity-configuration",
]);

expect(contractPath, [
  "provider selected",
  "verified-email posture confirmed",
  "safe failure posture confirmed",
  "session boundary confirmed",
  "owner payment mapping approved",
  "paid access boundary confirmed",
  "entitlement verification posture confirmed",
  "billing recovery path confirmed",
  "server-side configuration posture confirmed",
  "browser exposure excluded",
  "generic denial posture confirmed",
  "rollback path confirmed",
  "support identity confirmed",
  "safe support language confirmed",
  "no unsafe collection request confirmed",
]);

expect(contractPath, [
  "evidenceId",
  "areaKey",
  "approvalStatus",
  "safeSummary",
  "recordedAt",
  "recordedByRole",
  "auditId",
  "sourceRoute",
  "requestIdHash",
]);

expect(contractPath, [
  "rawProviderPayload",
  "paymentProviderPayload",
  "protectedConfigValue",
  "privateCredentialMaterial",
  "operatorPrivateIdentity",
  "operatorEmail",
  "operatorIp",
  "privateCustomerData",
  "internalNotes",
  "privateAuditPayload",
  "crossCustomerData",
]);

expect(contractPath, [
  "Owner configuration evidence is command-center-only and never customer-facing.",
  "Missing owner configuration evidence must not be treated as complete.",
  "Pending owner configuration evidence must not be treated as complete.",
  "Owner configuration evidence alone must not create public launch approval.",
  "Owner configuration evidence alone must not create paid launch approval.",
  "Paid access still requires provider-confirmed entitlement and customer ownership checks.",
  "Owner configuration evidence must use safe summaries instead of provider payloads or protected configuration values.",
  "Owner configuration evidence must preserve audit proof and must not claim required audit records are deleted.",
]);

expect(contractPath, [
  "Do not expose owner configuration evidence through customer routes, customer emails, notifications, support pages, billing center, report vault, public pages, or crawlers.",
  "Do not use owner configuration evidence to bypass production smoke, rollback evidence, audit evidence, or hard-lock clearance.",
  "Do not allow owner configuration evidence record deletion, rewrite, hidden overwrite, or production mutation from evidence paths.",
  "Do not present protected runtime configuration as complete until owner approval evidence is recorded.",
]);

expect(contractPath, [
  "ownerEvidencePublicProjection",
  "ownerEvidenceCustomerProjection",
  "missingOwnerConfigComplete",
  "pendingOwnerConfigComplete",
  "ownerEvidenceOnlyLaunchClaim",
  "ownerEvidenceOnlyPaidClaim",
  "ownerEvidenceBypassesSmoke",
  "ownerEvidenceBypassesRollback",
  "ownerEvidenceBypassesAudit",
  "ownerEvidenceBypassesHardLock",
  "rawProviderPayloadProjection",
  "paymentProviderPayloadProjection",
  "protectedConfigValueProjection",
  "privateCredentialMaterialProjection",
  "operatorPrivateIdentityProjection",
  "privateCustomerDataProjection",
  "privateAuditPayloadProjection",
  "crossCustomerDataProjection",
  "ownerEvidenceDeletion",
  "ownerEvidenceRewrite",
  "ownerEvidenceProductionMutation",
]);

expect(launchValidatorPath, [
  "owner-configuration-evidence-contracts.ts",
  "Owner Configuration Evidence Contract",
]);

forbidden(contractPath, [
  "missing owner configuration evidence is complete",
  "pending owner configuration evidence is complete",
  "owner evidence creates launch approval",
  "owner evidence creates paid launch approval",
  "customer-facing owner evidence allowed",
  "delete owner evidence",
  "rewrite owner evidence",
  "mutate production from owner evidence",
  "absolute security",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "document.cookie",
]);

if (failures.length) {
  console.error("Owner configuration evidence contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner configuration evidence contracts validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
