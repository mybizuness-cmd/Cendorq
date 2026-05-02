import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/production-launch-checklist-runtime.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const launchValidatorPath = "src/scripts/validate-platform-launch-readiness-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "projectProductionLaunchChecklist",
  "ProductionLaunchChecklistItem",
  "ProductionLaunchChecklistProjection",
  "projectPlatformLaunchReadiness",
  "blockedLaunchReasons",
  "readyCount",
  "blockedCount",
  "nextOperatorActions",
  "blocks-public-launch",
  "blocks-paid-launch",
  "blocks-limited-launch",
  "review-required",
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

expect(runtimePath, [
  "verified-main",
  "route-validation",
  "vercel-green",
  "production-smoke",
  "auth-provider",
  "payment-config",
  "rollback-plan",
  "audit-plan",
  "customer-handoffs",
  "reports-ready",
  "billing-ready",
  "support-command-center",
  "controlled-maintenance",
]);

expect(runtimePath, [
  "Confirm provider configuration, server-only protected config, safe failure, and verified-email gates.",
  "Confirm owner-provided payment links or provider checkout mapping before paid launch.",
  "Confirm no customer journey dead ends and every surface has a safe next action.",
  "Confirm no pending-as-final reports, raw/internal rendering, or PDF/HTML drift.",
  "Confirm checkout, webhook, entitlement, recovery, and support-safe billing posture.",
  "Confirm operator-only internal state, approval gates, and audit preservation.",
  "Confirm no uncontrolled production mutation, agent drift, validation bypass, or missing rollback.",
]);

expect(launchValidatorPath, [
  "production-launch-checklist-runtime.ts",
  "projectProductionLaunchChecklist",
  "docs/owner-maximum-protection-posture.md",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(runtimePath, [
  "launch without validation",
  "fake urgency",
  "guaranteed outcome",
  "guaranteed ROI",
  "guaranteed revenue",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "document.cookie",
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
  console.error("Production launch checklist runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production launch checklist runtime validation passed with owner maximum-protection posture coverage.");

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
