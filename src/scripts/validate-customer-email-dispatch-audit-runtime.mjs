import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const auditPath = "src/lib/customer-email-dispatch-audit-runtime.ts";
const queueValidatorPath = "src/scripts/validate-customer-email-dispatch-queue-runtime.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
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
  "dispatch audit transitions are append-only records separate from browser-safe responses",
  "dispatch audit transitions record providerPayloadHash and providerEventRefHash, not raw provider payloads or provider responses",
  "dispatch audit transitions never store raw customer emails, raw tokens, token hashes, confirmation URLs, secrets, raw evidence, raw billing data, or internal notes",
  "dispatch audit transitions preserve required guards, hold reasons, and suppression reasons for operational review",
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

expect(ownerMaximumProtectionPath, ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path.", "Operator surfaces remain private, metadata-first, and review-gated."]);
expect(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
expect(packagePath, ["validate:routes", "validate-owner-maximum-protection-posture.mjs"]);
expect(queueValidatorPath, ["src/lib/customer-email-dispatch-audit-runtime.ts", "recordCustomerEmailDispatchTransition"]);

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

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
