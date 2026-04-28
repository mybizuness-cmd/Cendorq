import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const intakePath = "src/lib/customer-support-intake-architecture.ts";
const recordsPath = "src/lib/customer-support-record-contracts.ts";
const supportPath = "src/app/dashboard/support/page.tsx";
const shieldPath = "src/lib/cendorq-shield-standard.ts";
const packagePath = "package.json";

expect(intakePath, [
  "CUSTOMER_SUPPORT_INTAKE_FLOWS",
  "CUSTOMER_SUPPORT_INTAKE_RISK_RULES",
  "CUSTOMER_SUPPORT_INTAKE_GLOBAL_GUARDS",
  "getCustomerSupportIntakeArchitecture",
  "report-question",
  "correction-request",
  "billing-help",
  "security-concern",
  "plan-guidance",
  "businessContext",
  "safeDescription",
  "customerAcknowledgement",
  "Report question",
  "Correction request",
  "Billing help",
  "Security concern",
  "Plan guidance",
  "safeSummaryRequirements",
  "requiredGuards",
  "blockedBehaviors",
  "secret-or-token-submission",
  "payment-data-submission",
  "raw-evidence-dump",
  "hostile-instruction-or-prompt-injection",
  "unsafe-promise-demand",
  "no support intake without authenticated customer ownership and route authorization",
  "no support intake accepts passwords, raw tokens, payment data, secrets, or private keys",
  "no support intake stores raw evidence dumps, raw security payloads, or private report internals",
  "no support intake creates correction, refund, billing, legal, report-change, or outcome promises without approval",
  "every support intake must generate a safe customer summary before downstream routing",
  "every support intake must map to a support request record and audit event",
  "security intake must support reauthentication, session rotation, token revocation, and operator review",
  "billing intake must support entitlement checks, billing-state checks, cancellation help, and refund review boundaries",
]);

expect(recordsPath, [
  "CUSTOMER_SUPPORT_RECORD_CONTRACTS",
  "customer-support-request",
  "customer-support-audit",
  "rawPayloadStored: false",
]);

expect(supportPath, [
  "Support and corrections",
  "safe summaries",
  "passwords, raw tokens, payment details",
]);

expect(shieldPath, [
  "Hostile input rejection",
  "AI prompt injection shield",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-intake-architecture.mjs",
]);

forbidden(intakePath, [
  "rawPayloadStored: true",
  "password accepted",
  "payment data accepted",
  "raw token accepted",
  "refund approved automatically",
  "guaranteed outcome allowed",
  "prompt override allowed",
  "report mutation without review",
]);

if (failures.length) {
  console.error("Customer support intake architecture validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support intake architecture validation passed.");

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
