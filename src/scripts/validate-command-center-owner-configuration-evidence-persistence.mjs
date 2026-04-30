import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/owner-configuration-evidence-persistence-runtime.ts";
const routePath = "src/app/api/command-center/owner-configuration/evidence/route.ts";
const failures = [];

expect(runtimePath, [
  "OwnerConfigurationEvidencePersistenceAccess",
  "OwnerConfigurationEvidencePersistenceRecord",
  "OwnerConfigurationEvidencePersistenceResponse",
  "recordOwnerConfigurationEvidenceBatch",
  "getOwnerConfigurationEvidenceHistoryResponse",
  "safeSummaryHash",
  "ownerApprovalRecorded",
  "releaseCaptainReviewed",
  "launchApprovalDerivedFromEvidence: false",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
  "sanitizePersistenceRecord",
  "redacted-safe-value",
]);

expect(routePath, [
  "recordOwnerConfigurationEvidenceBatch",
  "persistenceMode: \"safe-projection-only\"",
  "persistenceMode: \"audit-safe-record-projection\"",
  "ownerApprovalRecorded",
  "releaseCaptainReviewed",
  "records: persistence.records",
  "acceptedInput: \"safe-summary-only\"",
  "credential=",
]);

forbidden(runtimePath, [
  "deleteOwnerConfigurationEvidence",
  "rewriteOwnerConfigurationEvidence",
  "rawProviderPayload",
  "paymentProviderPayload",
  "protectedConfigValue",
  "privateCredentialMaterial",
  "operatorPrivateIdentity",
  "privateCustomerData",
  "privateAuditPayload",
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "reportLaunchAllowed: true",
  "securityReadinessApproved: true",
  "launchApprovalDerivedFromEvidence: true",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "liability-free",
]);

forbidden(routePath, [
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "reportLaunchAllowed: true",
  "securityReadinessApproved: true",
  "launchApprovalDerivedFromEvidence: true",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center owner configuration evidence persistence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center owner configuration evidence persistence validation passed.");

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
