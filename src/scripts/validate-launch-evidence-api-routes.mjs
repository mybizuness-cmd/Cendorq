import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const evidenceRoutePath = "src/app/api/command-center/launch-readiness/evidence/route.ts";
const evidenceRecordRoutePath = "src/app/api/command-center/launch-readiness/evidence/record/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(evidenceRoutePath, [
  "export async function GET",
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "projectLaunchEvidenceBatch",
  "summarizeLaunchEvidenceReadiness",
  "safeDeniedResponse",
  "safeLaunchReadinessHeaders",
  "NextResponse.json",
  "force-dynamic",
  "revalidate = 0",
  "owner-configuration-evidence",
  "production-smoke-evidence",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance-evidence",
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

expect(evidenceRecordRoutePath, [
  "export async function POST",
  "resolveCommandCenterAccessState",
  "commandCenterPreviewHeaderName",
  "projectLaunchEvidence",
  "readSafeEvidenceBody",
  "safeDeniedResponse",
  "safeLaunchReadinessHeaders",
  "LaunchEvidenceInput",
  "sourceRoute: \"/api/command-center/launch-readiness/evidence/record\"",
  "Launch evidence submitted for operator review.",
  "Launch evidence submission could not be parsed safely.",
]);

for (const path of [evidenceRoutePath, evidenceRecordRoutePath]) {
  expect(path, [
    "@/lib/command-center/access",
    "@/lib/launch-evidence-persistence-runtime",
    "@/lib/platform-launch-readiness-api-runtime",
    "NextResponse",
    "safeDeniedResponse",
    "safeLaunchReadinessHeaders",
  ]);

  forbidden(path, [
    "rawPayload=",
    "rawEvidence=",
    "rawBillingData=",
    "internalNotes=",
    "operatorIdentity=",
    "databaseUrl=",
    "providerSecret=",
    "webhookSecret=",
    "paymentProviderSecret=",
    "sessionToken=",
    "csrfToken=",
    "adminKey=",
    "supportContextKey=",
    "privateKey=",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "document.cookie",
    "delete evidence",
    "rewrite evidence",
    "mutate production",
    "guaranteed ROI",
    "impossible to hack",
    "liability-free",
  ]);
}

expect(launchValidatorPath, [
  "validate-launch-evidence-api-routes.mjs",
  "launch-readiness/evidence/route.ts",
  "launch-readiness/evidence/record/route.ts",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
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
  console.error("Launch evidence API routes validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Launch evidence API routes validation passed with owner posture coverage.");

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
