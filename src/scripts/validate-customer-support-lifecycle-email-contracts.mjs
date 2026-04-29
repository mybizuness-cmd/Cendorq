import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const emailPath = "src/lib/customer-support-lifecycle-email-contracts.ts";
const baseEmailPath = "src/lib/customer-email-template-contracts.ts";
const lifecycleNotificationPath = "src/lib/customer-support-lifecycle-notification-contracts.ts";
const packagePath = "package.json";

expect(emailPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_GLOBAL_GUARDS",
  "getCustomerSupportLifecycleEmailContracts",
  "support-email-received-status-ready",
  "support-email-reviewing",
  "support-email-waiting-on-customer",
  "support-email-specialist-review",
  "support-email-resolved",
  "support-email-closed",
  "senderName: \"Cendorq Support\"",
  "fromAddress: \"support@cendorq.com\"",
  "support request id",
  "request type",
  "/dashboard/support/status",
  "/dashboard/support/request",
  "/dashboard/support",
  "requiredPersonalization",
  "requiredTrustElements",
  "requiredComplianceControls",
  "suppressionRules",
  "blockedContent",
  "all support lifecycle emails use Cendorq Support <support@cendorq.com>",
  "no support lifecycle email sends before customer ownership, verified session, and customer-safe status projection are confirmed",
  "no support lifecycle email contains passwords, raw tokens, payment data, raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
  "no support lifecycle email promises refunds, legal outcomes, report changes, billing changes, security outcomes, or guaranteed business results without approval",
  "every support lifecycle email has suppression rules to prevent duplicate anxiety or spam",
  "support lifecycle email sending must respect preference, unsubscribe, bounce, complaint, and suppression controls where required",
]);

expect(baseEmailPath, [
  "CUSTOMER_EMAIL_TEMPLATE_CONTRACTS",
  "support@cendorq.com",
  "every support/correction email keeps support path visible and avoids unapproved legal, refund, or outcome promises",
]);

expect(lifecycleNotificationPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_GLOBAL_GUARDS",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-lifecycle-email-contracts.mjs",
]);

forbidden(emailPath, [
  "fromAddress: \"noreply@",
  "senderName: \"No Reply",
  "raw payload customer email",
  "raw evidence customer email",
  "internal notes customer email",
  "operator identity customer email",
  "risk score customer email",
  "attacker details customer email",
  "refund approved automatically",
  "legal outcome guaranteed",
  "report change guaranteed",
  "billing change guaranteed",
  "guaranteed business results",
  "no suppression rules",
  "password in email allowed",
  "token in email allowed",
]);

if (failures.length) {
  console.error("Customer support lifecycle email contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support lifecycle email contracts validation passed.");

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
