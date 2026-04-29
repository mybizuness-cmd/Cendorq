import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const runtimePath = "src/lib/customer-support-lifecycle-communication-runtime.ts";
const orchestrationPath = "src/lib/customer-support-lifecycle-communication-orchestration.ts";
const packagePath = "package.json";

expect(runtimePath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RUNTIME_GUARDS",
  "buildSupportLifecycleCommunicationPlan",
  "getSupportLifecycleCommunicationRule",
  "projectSupportLifecycleCommunicationPlan",
  "CustomerSupportLifecycleCommunicationDecision",
  "CustomerSupportLifecycleCommunicationInput",
  "CustomerSupportLifecycleCommunicationPlan",
  "send",
  "hold",
  "suppress",
  "customerOwnershipVerified",
  "verifiedSession",
  "safeStatusProjectionExists",
  "alreadyCommunicatedKeys",
  "suppressionKeys",
  "allowedChannels",
  "customer ownership not verified",
  "verified session missing",
  "customer-safe status projection missing",
  "status communication already sent",
  "no allowed communication channels",
  "notificationKey",
  "emailKey",
  "primaryPath",
  "channels",
  "sendReasons",
  "holdReasons",
  "suppressionReasons",
  "requiredGuards",
  "communication runtime returns only customer-safe keys, paths, channels, reasons, and guards",
  "communication runtime never returns raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, support context keys, or rejected unsafe content",
  "communication runtime holds when customer ownership, verified session, or customer-safe status projection is missing",
  "communication runtime suppresses duplicate status communication when a status rule was already communicated",
  "communication runtime respects channel suppression and allowed channel filters before returning send decisions",
  "communication runtime routes only to support status, safe resubmission, support center, or new request paths",
]);

expect(orchestrationPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RULES",
  "CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_GLOBAL_GUARDS",
  "notificationKey",
  "emailKey",
  "dashboard-notification",
  "email",
  "support-status",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-lifecycle-communication-runtime.mjs",
]);

forbidden(runtimePath, [
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorId",
  "operatorIdHash",
  "riskScoringInternals",
  "attackerDetails",
  "adminReadKey",
  "supportContextKey",
  "sessionToken",
  "csrfToken",
  "console.log",
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "send without customer ownership",
  "send without safe status projection",
  "send without verified session",
]);

if (failures.length) {
  console.error("Customer support lifecycle communication runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support lifecycle communication runtime validation passed.");

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
