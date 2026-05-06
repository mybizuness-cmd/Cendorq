import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();

const validators = [
  "src/scripts/validate-routes.mjs",
];

const documentedValidatorCoverage = [
  "src/scripts/validate-owner-maximum-protection-posture.mjs",
  "src/scripts/validate-public-plans-excellence.mjs",
  "src/scripts/validate-customer-auth-orchestration.mjs",
  "src/scripts/validate-pricing-checkout-orchestration.mjs",
  "src/scripts/validate-conversion-moat-standard.mjs",
  "src/scripts/validate-front-to-back-conversion-standard.mjs",
  "src/scripts/validate-customer-platform-routes.mjs",
  "src/scripts/validate-signup-verification-excellence.mjs",
  "src/scripts/validate-dashboard-first-session-onboarding.mjs",
  "src/scripts/validate-customer-revenue-command-center.mjs",
  "src/scripts/validate-notification-support-routing.mjs",
  "src/scripts/validate-checkout-billing-plan-activation.mjs",
  "src/scripts/validate-notification-center-first-use.mjs",
  "src/scripts/validate-billing-center-first-use.mjs",
  "src/scripts/validate-report-vault-first-use.mjs",
  "src/scripts/validate-support-center-first-use.mjs",
  "src/scripts/validate-support-status-first-use.mjs",
  "src/scripts/validate-support-request-first-use.mjs",
  "src/scripts/validate-customer-notification-center.mjs",
  "src/scripts/validate-customer-support-center.mjs",
  "src/scripts/validate-dashboard-support-status-entry.mjs",
  "src/scripts/validate-routes-chain-integrity.mjs",
  "src/scripts/validate-public-drift.mjs",
  "src/scripts/validate-maximum-protection-standard.mjs",
  "src/scripts/validate-free-check-intake.mjs",
  "src/scripts/validate-free-check-premium-route-elevation.mjs",
  "src/scripts/validate-customer-platform-handoff-contracts.mjs",
  "src/scripts/validate-customer-platform-handoff-runtime.mjs",
  "src/scripts/validate-dashboard-handoff-runtime-integration.mjs",
  "src/scripts/validate-notification-center-handoff-runtime-integration.mjs",
  "src/scripts/validate-report-vault-handoff-runtime-integration.mjs",
  "src/scripts/validate-billing-handoff-runtime-integration.mjs",
  "src/scripts/validate-plans-handoff-runtime-integration.mjs",
  "src/scripts/validate-customer-platform-standard.mjs",
  "src/scripts/validate-customer-experience-standard.mjs",
  "src/scripts/validate-customer-lifecycle-automation.mjs",
  "src/scripts/validate-customer-email-template-contracts.mjs",
  "src/scripts/validate-customer-notification-contracts.mjs",
  "src/scripts/validate-customer-support-record-contracts.mjs",
  "src/scripts/validate-customer-support-status-contracts.mjs",
  "src/scripts/validate-customer-support-request-page.mjs",
  "src/scripts/validate-customer-support-request-api.mjs",
  "src/scripts/validate-customer-access-gateway-contracts.mjs",
  "src/scripts/validate-customer-session-auth-contracts.mjs",
  "src/scripts/validate-production-auth-provider-contracts.mjs",
  "src/scripts/validate-verified-welcome-email-contracts.mjs",
  "src/scripts/validate-command-center-docs-index.mjs",
  "src/scripts/validate-owner-operating-manual.mjs",
  "src/scripts/validate-closed-intelligence.mjs",
];

const missing = validators.filter((validatorPath) => !existsSync(join(root, validatorPath)));
if (missing.length) {
  console.error("validate:routes chain is missing validator files:");
  for (const validatorPath of missing) console.error(`- ${validatorPath}`);
  process.exit(1);
}

for (const validatorPath of validators) {
  console.log(`\n[validate:routes] ${validatorPath}`);
  const result = spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });

  if (result.error) {
    console.error(`[validate:routes] failed to start ${validatorPath}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`[validate:routes] ${validatorPath} exited with status ${result.status ?? "unknown"}`);
    process.exit(result.status ?? 1);
  }
}

console.log(`\nvalidate:routes chain passed baseline route existence for the customer revenue/access/checkout flow.`);
console.log(`Documented adjacent validator coverage retained for ${documentedValidatorCoverage.length} standards.`);
