import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const orchestrationPath = "src/lib/customer-support-lifecycle-communication-orchestration.ts";
const notificationPath = "src/lib/customer-support-lifecycle-notification-contracts.ts";
const emailPath = "src/lib/customer-support-lifecycle-email-contracts.ts";
const statusPath = "src/lib/customer-support-status-contracts.ts";
const packagePath = "package.json";

expect(orchestrationPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RULES",
  "CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_GLOBAL_GUARDS",
  "getCustomerSupportLifecycleCommunicationOrchestration",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS",
  "communicate-support-received",
  "communicate-support-reviewing",
  "communicate-support-waiting-on-customer",
  "communicate-support-specialist-review",
  "communicate-support-resolved",
  "communicate-support-closed",
  "status: \"received\"",
  "status: \"reviewing\"",
  "status: \"waiting-on-customer\"",
  "status: \"in-specialist-review\"",
  "status: \"resolved\"",
  "status: \"closed\"",
  "notificationKey",
  "emailKey",
  "support-request-received-status-ready",
  "support-email-received-status-ready",
  "support-request-reviewing",
  "support-email-reviewing",
  "support-request-waiting-on-customer",
  "support-email-waiting-on-customer",
  "support-request-specialist-review",
  "support-email-specialist-review",
  "support-request-resolved",
  "support-email-resolved",
  "support-request-closed",
  "support-email-closed",
  "dashboard-notification",
  "email",
  "support-status",
  "sendWhen",
  "holdWhen",
  "suppressionRules",
  "requiredGuards",
  "blockedContent",
  "no support lifecycle communication without customer ownership, verified session, and customer-safe status projection",
  "no support lifecycle communication sends before both the dashboard notification contract and email contract exist for the status",
  "no support lifecycle communication sends if suppression, preference, unsubscribe, bounce, complaint, or duplicate guards block the channel",
  "no support lifecycle communication contains raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, support context keys, or rejected unsafe content",
  "no support lifecycle communication promises refunds, legal outcomes, report changes, billing changes, security outcomes, or guaranteed business results without approval",
  "every support lifecycle communication routes to support status, safe resubmission, support center, or new request paths only",
]);

expect(notificationPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "support-request-received-status-ready",
  "support-request-reviewing",
  "support-request-waiting-on-customer",
  "support-request-specialist-review",
  "support-request-resolved",
  "support-request-closed",
]);

expect(emailPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS",
  "support-email-received-status-ready",
  "support-email-reviewing",
  "support-email-waiting-on-customer",
  "support-email-specialist-review",
  "support-email-resolved",
  "support-email-closed",
]);

expect(statusPath, [
  "CustomerSupportCustomerVisibleStatus",
  "received",
  "reviewing",
  "waiting-on-customer",
  "in-specialist-review",
  "resolved",
  "closed",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-lifecycle-communication-orchestration.mjs",
]);

forbidden(orchestrationPath, [
  "raw payload customer communication",
  "raw evidence customer communication",
  "internal notes customer communication",
  "operator identity customer communication",
  "risk score customer communication",
  "attacker details customer communication",
  "refund approved automatically",
  "legal outcome guaranteed",
  "report change guaranteed",
  "billing change guaranteed",
  "guaranteed business results",
  "send without customer ownership",
  "send without safe status projection",
  "send without suppression",
]);

if (failures.length) {
  console.error("Customer support lifecycle communication orchestration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support lifecycle communication orchestration validation passed.");

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
