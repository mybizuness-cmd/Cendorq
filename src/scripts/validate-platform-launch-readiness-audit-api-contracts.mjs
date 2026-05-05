import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { containsUnsafeClaim } from "./lib/safe-prohibition-matcher.mjs";

const root = process.cwd();
const contractPath = "src/lib/platform-launch-readiness-audit-api-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(contractPath, [
  "PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT",
  "PLATFORM_LAUNCH_READINESS_AUDIT_API_BLOCKED_PATTERNS",
  "Platform Launch Readiness Audit and API Contract",
  "/api/command-center/launch-readiness",
  "/api/command-center/launch-readiness/audit",
  "/api/command-center/launch-readiness/history",
  "command-center operator access required",
  "command-center operator approval required",
  "append-only audit event",
  "no-store",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "daily operating decisions",
  "Required owner decisions",
  "Hard owner locks",
  "Operating rule",
  "growth asset",
]);

expect(ownerMaximumProtectionPath, [
  "The public surface teaches the category without exposing private mechanics.",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
  "Validation, Vercel, route-chain integrity, docs-index coverage, registry coverage, and rollback posture remain green before merge.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "docs/maximum-protection-standard.md",
  "docs/command-center-docs-index.md",
  "src/lib/command-center/validation-registry.ts",
  "validate:routes",
]);

expect(contractPath, [
  "decision",
  "safeSummary",
  "readyGroups",
  "blockedGroups",
  "evidenceGaps",
  "safeNextActions",
  "hardLaunchLocks",
  "blockedPatterns",
  "auditStatus",
  "lastReviewedAt",
  "reviewedByRole",
  "auditId",
]);

expect(contractPath, [
  "safeSummaryHash",
  "readyGroupKeys",
  "blockedGroupKeys",
  "evidenceGapKeys",
  "safeNextActionKeys",
  "hardLaunchLockKeys",
  "blockedPatternKeys",
  "reviewReason",
  "reviewedAt",
  "sourceRoute",
  "requestIdHash",
]);

expect(contractPath, [
  "launch-readiness-projection-viewed",
  "launch-readiness-owner-review-recorded",
  "launch-readiness-production-smoke-ready-recorded",
  "launch-readiness-limited-launch-ready-recorded",
  "launch-readiness-public-launch-ready-recorded",
  "launch-readiness-blocked-recorded",
  "launch-readiness-audit-history-viewed",
  "launch-readiness-access-denied",
]);

expect(contractPath, [
  "All launch readiness APIs are command-center-only and must remain closed to customers, public visitors, unauthenticated users, crawlers, and support-message contexts.",
  "GET projection APIs may return only safe projection fields and no raw source evidence.",
  "POST audit APIs require operator approval posture, safe review reason, idempotency key, and append-only audit behavior.",
  "Audit APIs must not allow deleting, rewriting, or hiding launch readiness audit records.",
  "All responses must use no-store caching and generic safe failures.",
]);

expect(contractPath, [
  "Access denial must not disclose whether command center exists, whether launch readiness records exist, whether an operator exists, or which authorization condition failed.",
  "Audit write failure must not disclose storage internals, table names, provider payloads, secret names, lock internals, or record existence.",
  "History lookup failure must return a generic safe failure and no partial internal audit payload.",
]);

expect(contractPath, [
  "rawPayload",
  "rawEvidence",
  "rawBillingData",
  "rawSecurityPayload",
  "internalNotes",
  "operatorIdentity",
  "operatorEmail",
  "operatorIp",
  "riskScoringInternals",
  "attackerDetails",
  "promptMessages",
  "systemMessages",
  "developerMessages",
  "databaseUrl",
  "providerSecret",
  "webhookSecret",
  "paymentProviderSecret",
  "sessionToken",
  "csrfToken",
  "adminKey",
  "supportContextKey",
  "privateKey",
  "crossCustomerData",
]);

expect(contractPath, [
  "Do not expose launch readiness APIs outside command center access control.",
  "Do not allow customer-facing routes, emails, notifications, support pages, report vault, billing center, or public pages to read launch readiness audit internals.",
  "Do not record launch readiness decisions without an audit id, reviewed role, safe reason, timestamp, and source route.",
  "Do not convert launch readiness state into public launch claims unless production smoke, owner configuration, rollback, audit, and hard launch locks are cleared.",
  "Do not mutate production state from launch readiness APIs; only append audit records or return safe projections.",
]);

expect(contractPath, [
  "customerLaunchReadinessApiAccess",
  "publicLaunchReadinessApiAccess",
  "unauthenticatedLaunchReadinessApiAccess",
  "launchReadinessRecordDeletion",
  "launchReadinessAuditRewrite",
  "rawPayloadAuditProjection",
  "operatorIdentityAuditProjection",
  "databaseUrlAuditProjection",
  "sessionTokenAuditProjection",
  "supportContextKeyAuditProjection",
  "accountExistenceLeakAuditApi",
  "recordExistenceLeakAuditApi",
  "publicLaunchClaimWithoutSmoke",
  "launchReadinessProductionMutation",
]);

expect(launchValidatorPath, [
  "platform-launch-readiness-audit-api-contracts.ts",
  "Platform Launch Readiness Audit and API Contract",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(contractPath, [
  "customers may access launch readiness",
  "public may access launch readiness",
  "delete launch readiness audit records",
  "rewrite launch readiness audit records",
  "return rawPayload",
  "return rawEvidence",
  "return rawBillingData",
  "return internalNotes",
  "return operatorIdentity",
  "return databaseUrl",
  "return sessionToken",
  "return csrfToken",
  "return supportContextKey",
  "launch without smoke",
  "mutate production state from launch readiness",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

forbidden(ownerMaximumProtectionPath, [
  "browser-side code may be the authority",
  "external content can override Cendorq system rules",
  "model output can approve launches",
  "guaranteed business results",
  "guaranteed security outcomes",
  "guaranteed inbox placement",
  "liability-free operation",
  "skip validation",
  "hide failures",
  "bypass release-captain review",
]);

if (failures.length) {
  console.error("Platform launch readiness audit API contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform launch readiness audit API contracts validation passed with owner posture coverage.");

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

  const text = read(path);
  for (const phrase of phrases) {
    if (containsUnsafeClaim(text, phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
