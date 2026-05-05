import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  "src/lib/platform-launch-readiness-contracts.ts",
  "src/lib/platform-launch-readiness-runtime.ts",
  "src/scripts/validate-platform-launch-readiness-runtime.mjs",
  "src/app/command-center/platform-launch-readiness-panel.tsx",
  "src/app/command-center/page.tsx",
  "src/scripts/validate-command-center-launch-readiness-panel.mjs",
  "src/lib/platform-launch-readiness-audit-api-contracts.ts",
  "src/scripts/validate-platform-launch-readiness-audit-api-contracts.mjs",
  "src/lib/platform-launch-readiness-api-runtime.ts",
  "src/scripts/validate-platform-launch-readiness-api-runtime.mjs",
  "src/scripts/validate-platform-launch-readiness-api-routes.mjs",
  "src/app/api/command-center/launch-readiness/route.ts",
  "src/app/api/command-center/launch-readiness/audit/route.ts",
  "src/app/api/command-center/launch-readiness/history/route.ts",
  "src/lib/production-launch-checklist-runtime.ts",
  "src/scripts/validate-production-launch-checklist-runtime.mjs",
  "src/app/command-center/production-launch-checklist-panel.tsx",
  "src/scripts/validate-command-center-production-launch-checklist-panel.mjs",
  "src/lib/production-launch-final-blocker-contracts.ts",
  "src/scripts/validate-production-launch-final-blocker-contracts.mjs",
  "src/lib/production-launch-final-blocker-runtime.ts",
  "src/scripts/validate-production-launch-final-blocker-runtime.mjs",
  "src/app/command-center/production-launch-final-blocker-panel.tsx",
  "src/scripts/validate-command-center-production-launch-final-blocker-panel.mjs",
  "src/lib/launch-evidence-persistence-contracts.ts",
  "src/scripts/validate-launch-evidence-persistence-contracts.mjs",
  "src/lib/launch-evidence-persistence-runtime.ts",
  "src/scripts/validate-launch-evidence-persistence-runtime.mjs",
  "src/app/command-center/launch-evidence-panel.tsx",
  "src/scripts/validate-command-center-launch-evidence-panel.mjs",
  "src/scripts/validate-launch-evidence-api-routes.mjs",
  "src/app/api/command-center/launch-readiness/evidence/route.ts",
  "src/app/api/command-center/launch-readiness/evidence/record/route.ts",
  "src/lib/production-smoke-target-contracts.ts",
  "src/scripts/validate-production-smoke-target-contracts.mjs",
  "src/lib/production-smoke-target-runtime.ts",
  "src/scripts/validate-production-smoke-target-runtime.mjs",
  "src/app/command-center/production-smoke-target-panel.tsx",
  "src/scripts/validate-command-center-production-smoke-target-panel.mjs",
  "src/app/api/command-center/production-smoke/route.ts",
  "src/scripts/validate-production-smoke-api-routes.mjs",
  "docs/owner-maximum-protection-posture.md",
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/lib/owner-configuration-evidence-contracts.ts",
  "src/scripts/validate-owner-configuration-evidence-contracts.mjs",
  "src/lib/owner-configuration-evidence-runtime.ts",
  "src/scripts/validate-owner-configuration-evidence-runtime.mjs",
  "package.json",
  "src/scripts/validate-routes-chain.mjs",
];

for (const path of requiredFiles) exists(path);

expect("src/lib/platform-launch-readiness-contracts.ts", [
  "PLATFORM_LAUNCH_READINESS_CONTRACT",
  "PLATFORM_LAUNCH_READINESS_BLOCKED_PATTERNS",
  "Platform Launch Readiness Contract",
  "public-entry-and-free-scan",
  "auth-session-and-welcome",
  "customer-platform-handoffs",
  "reports-and-vault",
  "billing-and-entitlements",
  "support-and-command-center",
  "maintenance-and-smoke",
  "production smoke finalization validation",
  "owner evidence/workflow protected smoke coverage",
  "latest main commit is verified before release branch creation",
  "all validators are wired into validate:routes",
  "Vercel deployment is green for the release PR",
  "rollback plan exists for auth, billing, reports, support, and public conversion changes",
  "No launch with owner configuration evidence or workflow routes exposing raw provider payloads",
  "Ready-for-owner-review does not mean public launch",
]);

expect("docs/owner-maximum-protection-posture.md", [
  "# Owner Maximum Protection Posture",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "AI and automation may assist, but cannot approve launches, reports, billing behavior, provider setup, or customer-facing claims.",
]);

expect("src/lib/owner-configuration-evidence-contracts.ts", [
  "OWNER_CONFIGURATION_EVIDENCE_CONTRACT",
  "OWNER_CONFIGURATION_EVIDENCE_BLOCKED_PATTERNS",
  "Owner Configuration Evidence Contract",
  "Owner configuration evidence is command-center-only and never customer-facing.",
  "Owner configuration evidence alone must not create public launch approval.",
]);
expect("src/lib/owner-configuration-evidence-runtime.ts", [
  "projectOwnerConfigurationEvidence",
  "summarizeOwnerConfigurationEvidence",
  "publicLaunchAllowed: false",
  "paidLaunchAllowed: false",
  "redacted-safe-value",
]);

expect("src/lib/production-smoke-target-contracts.ts", [
  "PRODUCTION_SMOKE_TARGET_CONTRACT",
  "PRODUCTION_SMOKE_TARGET_BLOCKED_PATTERNS",
  "Production Smoke Target Contract",
  "Production smoke target must be owner-approved before public launch review.",
  "Default smoke must be read-only and non-mutating.",
  "public-conversion-routes",
  "protected-api-routes",
  "command-center-routes",
  "operator-only-safe-projection",
]);
expect("src/lib/production-smoke-target-runtime.ts", [
  "projectProductionSmokeTarget",
  "projectProductionSmokeRoute",
  "ProductionSmokeTargetSummary",
  "publicLaunchAllowed: false",
  "redacted-safe-value",
]);
expect("src/app/command-center/production-smoke-target-panel.tsx", [
  "ProductionSmokeTargetPanel",
  "projectProductionSmokeTarget",
  "Production smoke target",
  "Passing route posture does not equal public launch approval",
  "do not store raw route output",
  "smokeTarget.records",
  "smokeTarget.publicLaunchAllowed",
]);
expect("src/app/api/command-center/production-smoke/route.ts", [
  "export async function GET",
  "resolveCommandCenterAccessState",
  "projectProductionSmokeTarget",
  "safeDeniedResponse",
  "safeLaunchReadinessHeaders",
  "cache: \"no-store\"",
]);

expect("src/lib/launch-evidence-persistence-contracts.ts", [
  "LAUNCH_EVIDENCE_PERSISTENCE_CONTRACT",
  "Launch Evidence Persistence Contract",
  "Launch evidence records must be append-only.",
  "Launch evidence records must be operator-only and never customer-facing.",
]);
expect("src/lib/launch-evidence-persistence-runtime.ts", [
  "projectLaunchEvidence",
  "projectLaunchEvidenceBatch",
  "summarizeLaunchEvidenceReadiness",
  "appendOnly: true",
  "publicClaimAllowed: false",
  "redacted-safe-value",
]);
expect("src/app/command-center/launch-evidence-panel.tsx", [
  "LaunchEvidencePanel",
  "projectLaunchEvidenceBatch",
  "summarizeLaunchEvidenceReadiness",
  "Launch evidence",
  "does not create public, paid, or report launch claims",
]);
expect("src/app/api/command-center/launch-readiness/evidence/route.ts", [
  "export async function GET",
  "resolveCommandCenterAccessState",
  "projectLaunchEvidenceBatch",
  "summarizeLaunchEvidenceReadiness",
  "safeDeniedResponse",
]);
expect("src/app/api/command-center/launch-readiness/evidence/record/route.ts", [
  "export async function POST",
  "resolveCommandCenterAccessState",
  "projectLaunchEvidence",
  "readSafeEvidenceBody",
  "Launch evidence submitted for operator review.",
]);

expect("src/lib/production-launch-final-blocker-contracts.ts", [
  "PRODUCTION_LAUNCH_FINAL_BLOCKER_CONTRACT",
  "Production Launch Final Blocker Contract",
  "owner-configuration",
  "production-smoke-target",
  "rollback-evidence",
  "audit-evidence",
  "hard-lock-clearance",
  "Do not state public launch readiness until every blocker group has complete evidence.",
]);
expect("src/lib/production-launch-final-blocker-runtime.ts", [
  "projectProductionLaunchFinalBlockers",
  "allLaunchClaimEvidenceComplete",
  "publicClaimAllowed: allLaunchClaimEvidenceComplete",
  "paidClaimAllowed: allLaunchClaimEvidenceComplete",
  "reportClaimAllowed: allLaunchClaimEvidenceComplete",
  "ready-for-release-captain-launch-review",
]);
expect("src/app/command-center/production-launch-final-blocker-panel.tsx", [
  "ProductionLaunchFinalBlockerPanel",
  "projectProductionLaunchFinalBlockers",
  "Final blocker control",
  "This panel does not launch the platform.",
  "finalBlockers.blockers",
]);

expect("src/lib/platform-launch-readiness-runtime.ts", [
  "projectPlatformLaunchReadiness",
  "safeSummary",
  "readyGroups",
  "blockedGroups",
  "evidenceGaps",
  "safeNextActions",
  "hardLaunchLocks",
  "blockedPatterns",
]);
expect("src/app/command-center/platform-launch-readiness-panel.tsx", [
  "PlatformLaunchReadinessPanel",
  "projectPlatformLaunchReadiness",
  "Private launch readiness",
  "safe API posture",
]);
expect("src/app/command-center/page.tsx", [
  "PlatformLaunchReadinessPanel",
  "ProductionLaunchChecklistPanel",
  "ProductionLaunchFinalBlockerPanel",
  "LaunchEvidencePanel",
  "ProductionSmokeTargetPanel",
  "ClosedCommandCenterPanel",
]);
expect("src/lib/platform-launch-readiness-audit-api-contracts.ts", [
  "PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT",
  "Platform Launch Readiness Audit and API Contract",
  "/api/command-center/launch-readiness",
  "/api/command-center/launch-readiness/audit",
  "/api/command-center/launch-readiness/history",
  "append-only audit event",
]);
expect("src/lib/platform-launch-readiness-api-runtime.ts", [
  "getLaunchReadinessProjectionResponse",
  "recordLaunchReadinessAudit",
  "getLaunchReadinessAuditHistoryResponse",
  "safeLaunchReadinessHeaders",
  "safeDeniedResponse",
  "redacted-safe-value",
]);
expect("src/app/api/command-center/launch-readiness/route.ts", ["export async function GET", "resolveCommandCenterAccessState", "getLaunchReadinessProjectionResponse", "safeDeniedResponse"]);
expect("src/app/api/command-center/launch-readiness/audit/route.ts", ["export async function POST", "resolveCommandCenterAccessState", "recordLaunchReadinessAudit", "readSafeAuditBody"]);
expect("src/app/api/command-center/launch-readiness/history/route.ts", ["export async function GET", "resolveCommandCenterAccessState", "getLaunchReadinessAuditHistoryResponse", "safeHistory"]);
expect("src/lib/production-launch-checklist-runtime.ts", [
  "projectProductionLaunchChecklist",
  "blockedLaunchReasons",
  "nextOperatorActions",
  "verified-main",
  "route-validation",
  "production-smoke",
  "auth-provider",
  "payment-config",
  "rollback-plan",
  "audit-plan",
  "controlled-maintenance",
]);
expect("src/app/command-center/production-launch-checklist-panel.tsx", [
  "ProductionLaunchChecklistPanel",
  "projectProductionLaunchChecklist",
  "Private launch checklist",
  "not customer-facing",
  "does not declare public launch",
]);
expect("package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
expect("src/scripts/validate-routes-chain.mjs", ["validate-platform-launch-readiness-contracts.mjs", "validate-owner-maximum-protection-posture.mjs"]);

for (const path of requiredFiles.filter((path) => path.startsWith("src/scripts/validate-"))) {
  expectAny(path, ["validation passed", "Validation passed", "validation failed", "Validation failed", "console.log", "console.error"]);
}

forbidden("src/lib/platform-launch-readiness-contracts.ts", ["launch without validation", "launch without vercel", "launch without smoke", "fake urgency is allowed", "guaranteed outcome is allowed", "client-only success redirect activates entitlement", "unverified webhook activates entitlement", "browser-stored session token allowed", "delete audit records", "localStorage.setItem", "sessionStorage.setItem", "sessionToken=", "csrfToken=", "adminKey=", "supportContextKey="]);
forbidden("src/lib/production-launch-final-blocker-runtime.ts", ["paidClaimAllowed: ownerComplete && hardLocksClear", "reportClaimAllowed: smokeComplete && rollbackComplete && auditComplete && hardLocksClear", "publicClaimAllowed: allComplete", "ready-for-public-launch-review"]);

for (const guardedPath of requiredFiles.filter((path) => !path.startsWith("src/scripts/validate-") && !path.endsWith("package.json"))) {
  forbidden(guardedPath, [
    "return rawPayload",
    "return rawEvidence",
    "return rawBillingData",
    "return internalNotes",
    "return operatorIdentity",
    "return databaseUrl",
    "return sessionToken",
    "return csrfToken",
    "return supportContextKey",
    "delete audit",
    "rewrite audit",
    "mutate production",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "document.cookie",
    "guaranteed ROI",
    "guaranteed revenue",
    "impossible to hack",
    "never liable",
    "liability-free",
  ]);
}

if (failures.length) {
  console.error("Platform launch readiness contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform launch readiness contracts validation passed, including owner maximum-protection posture, owner configuration evidence runtime coverage, owner workflow launch-approval locks, and final blocker all-evidence claim locking.");

function exists(path) {
  if (!existsSync(join(root, path))) failures.push(`Missing dependency: ${path}`);
}

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

function expectAny(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path).toLowerCase();
  if (!phrases.some((phrase) => text.includes(phrase.toLowerCase()))) failures.push(`${path} missing durable validation signal: ${phrases.join(" | ")}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (containsUnsafeClaim(text, phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function containsUnsafeClaim(text, phrase) {
  let index = text.indexOf(phrase);
  while (index !== -1) {
    const paragraphStart = Math.max(0, text.lastIndexOf("\n\n", index));
    const nextParagraphBreak = text.indexOf("\n\n", index);
    const paragraphEnd = nextParagraphBreak === -1 ? text.length : nextParagraphBreak;
    const paragraph = text.slice(paragraphStart, paragraphEnd);
    const window = text.slice(Math.max(0, index - 240), Math.min(text.length, index + phrase.length + 240));
    const context = `${paragraph}\n${window}`;
    const safeProhibition = [
      "must never",
      "must not",
      "do not",
      "does not",
      "not to",
      "not an",
      "not a",
      "never claim",
      "never imply",
      "avoid",
      "without",
      "cannot",
      "blocked",
      "disallowed",
      "non-mutating",
      "read-only",
      "prevent",
      "prevents",
      "protected from",
      "false",
      "allowed: false",
    ].some((marker) => context.includes(marker));

    if (!safeProhibition) return true;
    index = text.indexOf(phrase, index + phrase.length);
  }
  return false;
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
