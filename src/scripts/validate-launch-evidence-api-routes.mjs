import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const evidenceRoutePath = "src/app/api/command-center/launch-readiness/evidence/route.ts";
const evidenceRecordRoutePath = "src/app/api/command-center/launch-readiness/evidence/record/route.ts";
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
]);

if (failures.length) {
  console.error("Launch evidence API routes validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Launch evidence API routes validation passed.");

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
