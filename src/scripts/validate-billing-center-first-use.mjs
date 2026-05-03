import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/billing/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "BILLING_FIRST_USE_SNAPSHOT",
  "Billing center first use snapshot",
  "Plan state",
  "Entitlement clarity",
  "Invoice posture",
  "Recoverable records",
  "Action posture",
  "Safe billing path",
  "Upgrade posture",
  "Proof-led next step",
  "BILLING_RECOVERY_ACTIONS",
  "Billing center first use guidance",
  "First billing visit",
  "Understand access before taking action.",
  "Compare plans",
  "Open notifications",
  "Request support",
  "BILLING_SAFETY_RULES",
  "Billing safety rules",
  "Never ask customers to submit card numbers, bank details, passwords, private keys, or session tokens through support copy.",
  "Show billing and entitlement state as a safe projection, not raw provider payloads or internal IDs.",
  "Explain failed-payment or invoice actions with a calm recovery path and no fake urgency.",
  "Plan upgrade guidance must separate current access, pending actions, and future entitlements.",
  "focus:outline-none",
  "focus:ring-2",
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

expect(packagePath, [
  "validate:routes",
  "validate-billing-center-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "sessionToken=",
  "csrfToken=",
  "localStorage",
  "sessionStorage",
  "card number required",
]);

if (failures.length) {
  console.error("Billing center first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing center first use validation passed with owner posture coverage.");

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
