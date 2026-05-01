import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const auditPath = "src/lib/customer-email-dispatch-audit-runtime.ts";
const queueValidatorPath = "src/scripts/validate-customer-email-dispatch-queue-runtime.mjs";
const failures = [];

expect(auditPath, [
  "CustomerEmailDispatchAuditTransition",
  "CustomerEmailDispatchAuditSafeProjection",
  "recordCustomerEmailDispatchTransition",
  "projectCustomerEmailDispatchAuditTransition",
  "getCustomerEmailDispatchAuditRules",
  "customer-email-dispatch-audit.v3.json",
  "providerPayloadHash",
  "providerEventRefHash",
  "transitionReason",
  "requiredGuards",
  "holdReasons",
  "suppressionReasons",
]);

expect(auditPath, [
  "dispatch audit transitions are append-only records separate from browser-safe responses",
  "dispatch audit transitions record providerPayloadHash and providerEventRefHash, not raw provider payloads or provider responses",
  "dispatch audit transitions never store raw customer emails, raw tokens, token hashes, confirmation URLs, secrets, raw evidence, raw billing data, or internal notes",
  "dispatch audit transitions preserve required guards, hold reasons, and suppression reasons for operational review",
  "dispatch audit transitions allow providerCallMade and providerSecretRead only as booleans, never as provider secrets or provider response bodies",
]);

expect(auditPath, [
  "browserVisible: false",
  "rawCustomerEmailStored: false",
  "rawTokenStored: false",
  "tokenHashStored: false",
  "confirmationUrlStored: false",
  "providerPayloadStored: false",
  "providerResponseStored: false",
  "rawEvidenceStored: false",
  "rawBillingDataStored: false",
  "internalNotesStored: false",
  "secretsStored: false",
]);

expect(auditPath, [
  "ready-for-provider",
  "dry-run-ready",
  "suppressed",
  "failed",
  "cancelled",
  "sent",
  "sending",
  "held",
  "queued",
]);

expect(queueValidatorPath, [
  "src/lib/customer-email-dispatch-audit-runtime.ts",
  "validate-customer-email-dispatch-audit-runtime.mjs",
  "recordCustomerEmailDispatchTransition",
]);

forbidden(auditPath, [
  "browserVisible: true",
  "rawCustomerEmailStored: true",
  "rawTokenStored: true",
  "tokenHashStored: true",
  "confirmationUrlStored: true",
  "providerPayloadStored: true",
  "providerResponseStored: true",
  "rawEvidenceStored: true",
  "rawBillingDataStored: true",
  "internalNotesStored: true",
  "secretsStored: true",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "sendGrid",
  "resend.emails.send",
  "fetch(\"https://api",
  "process.env.RESEND_API_KEY",
  "process.env.SENDGRID_API_KEY",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer email dispatch audit runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email dispatch audit runtime validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
