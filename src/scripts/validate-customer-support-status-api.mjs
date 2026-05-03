import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const statusApiPath = "src/app/api/customer/support/status/route.ts";
const statusContractsPath = "src/lib/customer-support-status-contracts.ts";
const communicationRuntimePath = "src/lib/customer-support-lifecycle-communication-runtime.ts";
const requestApiPath = "src/app/api/customer/support/request/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(statusApiPath, [
  "export async function OPTIONS",
  "export async function GET",
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "GET,OPTIONS",
  "jsonNoStore",
  "optionsNoStore",
  "cleanGatewayString",
  "requireCustomerSession",
  "requireVerifiedEmail: true",
  "buildSupportLifecycleCommunicationPlan",
  "projectSupportLifecycleCommunicationPlan",
  "Open support status from the authenticated customer dashboard and try again.",
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "CustomerSupportStatusView",
  "supportRequestId",
  "customerVisibleStatus",
  "customerSafeStatus",
  "statusLabel",
  "statusCopy",
  "primaryCta",
  "primaryPath",
  "communicationPlan",
  "customerOwnershipVerified: true",
  "verifiedSession: true",
  "safeStatusProjectionExists: true",
  "ownedEntries = envelope.entries.filter((entry) => entry.customerIdHash === sessionAccess.customerIdHash)",
  "No authorized support status was found.",
  "projectSupportStatus",
  "mapCustomerVisibleStatus",
  "waiting-on-customer",
  "in-specialist-review",
  "reviewing",
  "received",
  "rawPayloadStored: false",
  "customerOwnershipRequired: true",
  "supportAuditRequired: true",
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

expect(statusContractsPath, [
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "CUSTOMER_SUPPORT_STATUS_PROJECTION",
  "CUSTOMER_SUPPORT_STATUS_GLOBAL_GUARDS",
  "no customer support status without customer ownership and session authorization",
  "no support status page or API reveals raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
]);

expect(communicationRuntimePath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_COMMUNICATION_RUNTIME_GUARDS",
  "buildSupportLifecycleCommunicationPlan",
  "projectSupportLifecycleCommunicationPlan",
  "communication runtime returns only customer-safe keys, paths, channels, reasons, and guards",
]);

expect(requestApiPath, [
  "STORAGE_FILE = path.join(STORAGE_DIR, \"customer-support-requests.v3.json\")",
  "rawPayloadStored: false",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-status-api.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(statusApiPath, [
  "verifyAdminReadAccess",
  "x-support-admin-key",
  "SUPPORT_CONSOLE_READ_KEY",
  "INTAKE_ADMIN_KEY",
  "verifyCustomerSupportContext",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "rawPayload:",
  "rawEvidence:",
  "rawSecurityPayload:",
  "rawBillingData:",
  "internalNotes:",
  "operatorId:",
  "operatorIdHash:",
  "riskScoringInternals:",
  "attackerDetails:",
  "adminReadKey:",
  "supportContextKey:",
  "sessionToken:",
  "csrfToken:",
  "console.log",
  "customerIdHash:",
]);

if (failures.length) {
  console.error("Customer support status API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support status API validation passed with owner posture coverage.");

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
