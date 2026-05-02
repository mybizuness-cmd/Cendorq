import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/platform-launch-readiness-panel.tsx";
const pagePath = "src/app/command-center/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(panelPath, [
  "PlatformLaunchReadinessPanel",
  "PLATFORM_LAUNCH_READINESS_AUDIT_API_CONTRACT",
  "projectPlatformLaunchReadiness",
  "Private launch readiness",
  "Operator-only release state, blockers, evidence gaps, hard launch locks, and safe API posture.",
  "Private operator-only launch readiness projection. Not customer-facing.",
  "command-center-only no-store API routes",
  "without raw payloads, raw evidence, raw billing data, secrets, prompts, internal notes, operator identities, or customer data",
  "launchReadiness.decision",
  "launchReadiness.safeSummary",
  "launchReadiness.safeNextActions",
  "launchReadiness.readyGroups",
  "launchReadiness.blockedGroups",
  "launchReadiness.evidenceGaps",
  "launchReadiness.hardLaunchLocks",
  "launchReadinessApiSurfaces",
  "launchReadinessAuditEvents",
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

expect(panelPath, [
  "Command-center API posture",
  "These routes are operator-only, no-store, and aligned to generic denial.",
  "Closed by default",
  "Audit event coverage",
  "Launch readiness reviews must be append-only, role-based, and safe-projected.",
  "provider payloads",
  "tokens",
  "keys",
  "private customer data",
]);

expect(panelPath, [
  "verifiedMain: true",
  "validateRoutesWired: true",
  "validateRoutesPassing: true",
  "vercelGreen: true",
  "productionSmokeConfigured: false",
  "productionSmokePassed: false",
  "ownerPaymentConfigReady: false",
  "authProviderConfigured: false",
  "serverOnlySecretsConfigured: false",
  "rollbackPlanReady: false",
  "auditPlanReady: false",
  "criticalLockActive: false",
]);

expect(pagePath, [
  "PlatformLaunchReadinessPanel",
  "./platform-launch-readiness-panel",
  "<OperatorControlInterfacePanel />",
  "<PlatformLaunchReadinessPanel />",
  "<OperatorReadinessMatrix />",
  "resolveCommandCenterAccessState",
  "ClosedCommandCenterPanel",
]);

expect(launchValidatorPath, [
  "Platform launch readiness contracts validation passed",
  "platform-launch-readiness-runtime.ts",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(panelPath, [
  "rawPayload=",
  "rawEvidence=",
  "rawBillingData=",
  "secret=",
  "password=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "privateKey=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "never liable",
  "liability-free",
  "delete audit records",
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
  console.error("Command center launch readiness panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Command center launch readiness panel validation passed with API posture and owner posture coverage.");

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
