import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/production-launch-checklist-runtime.ts";
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

if (failures.length) {
  console.error("Production launch checklist runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Production launch checklist runtime validation passed.");

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
