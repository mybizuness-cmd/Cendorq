import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const notificationsPath = "src/lib/customer-notification-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(notificationsPath, [
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "CUSTOMER_NOTIFICATION_GLOBAL_GUARDS",
  "getCustomerNotificationContracts",
  "email-confirmation-required",
  "welcome-dashboard-ready",
  "free-scan-ready",
  "deep-review-onboarding",
  "billing-action-required",
  "support-request-received",
  "security-reauth-required",
  "customer ownership",
  "route authorization",
  "report release approval",
  "blocked-claim scan",
  "webhook signature verification",
  "entitlement boundary",
  "session rotation",
  "token revocation path",
  "no customer notification without customer ownership and route authorization",
  "no notification renders raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
  "no conversion notification without proof, confidence, limitation, and plan-stage logic",
  "no billing notification without entitlement and billing-state checks",
  "no security notification reveals attacker details, risk-scoring internals, or secrets",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect("src/lib/customer-lifecycle-automation.ts", ["CUSTOMER_LIFECYCLE_AUTOMATION_RULES"]);
expect("src/lib/customer-email-template-contracts.ts", ["CUSTOMER_EMAIL_TEMPLATE_CONTRACTS"]);
expect("src/lib/cendorq-shield-standard.ts", ["CENDORQ_SHIELD_RULES"]);
expect(packagePath, ["validate:routes", "validate-customer-notification-contracts.mjs", "validate-owner-maximum-protection-posture.mjs"]);

forbidden(notificationsPath, [
  "raw evidence allowed",
  "raw security payloads allowed",
  "raw billing IDs allowed",
  "attacker details allowed",
  "risk-scoring internals allowed",
  "guaranteed ROI allowed",
  "fake urgency allowed",
  "false scarcity allowed",
]);

if (failures.length) {
  console.error("Customer notification contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer notification contracts validation passed with owner posture coverage.");

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
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
