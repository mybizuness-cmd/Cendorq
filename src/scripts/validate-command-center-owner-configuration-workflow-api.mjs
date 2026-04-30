import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = "src/app/api/command-center/owner-configuration/workflow/route.ts";
const failures = [];

expect(routePath, [
  "export const dynamic = \"force-dynamic\";",
  "export const revalidate = 0;",
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "recordOwnerConfigurationEvidenceBatch",
  "projectOwnerConfigurationEvidenceApprovalWorkflow",
  "workflowMode: \"release-captain-final-review-required\"",
  "records: persistence.records",
  "workflow,",
  "X-Robots-Tag",
  "noindex, nofollow, noarchive, nosnippet",
  "Cache-Control",
  "no-store, max-age=0",
]);

expect(routePath, [
  "commandCenterOnly: true",
  "ownerApprovalRecorded: false",
  "releaseCaptainReviewed: false",
  "reviewedByRole: \"release-captain\"",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "reportLaunchAllowed: false",
  "securityReadinessApproved: false",
]);

forbidden(routePath, [
  "publicLaunchAllowed: true",
  "paidLaunchAllowed: true",
  "reportLaunchAllowed: true",
  "securityReadinessApproved: true",
  "rawProviderPayload",
  "paymentProviderPayload",
  "protectedConfigValue",
  "privateCredentialMaterial",
  "operatorPrivateIdentity",
  "privateCustomerData",
  "privateAuditPayload",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Command center owner configuration workflow API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center owner configuration workflow API validation passed.");

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
