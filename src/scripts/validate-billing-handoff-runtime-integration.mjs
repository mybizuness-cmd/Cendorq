import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/billing/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-billing-handoff-runtime-integration.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "BILLING_HANDOFFS",
  "Billing handoff runtime integration",
  "Connected billing handoffs",
  "Billing movement stays separated by access, recovery, and future entitlement.",
  "customer-owned safe projection",
  "current plan state",
  "entitlement state",
  "payment or invoice recovery",
  "plan comparison",
  "support routing",
  "handoff.currentState",
  "handoff.safeNextAction",
  "handoff.recoveryPath",
  "handoff.connectedDestination",
  "handoff.decision",
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

expect(pagePath, [
  "dashboard-to-billing",
  "billing-to-plans",
  "billing-to-support",
  "customerOwned: true",
  "verifiedAccess: true",
  "safeProjectionReady: true",
]);

expect(pagePath, [
  "must not collect card numbers",
  "bank details",
  "passwords",
  "private keys",
  "session tokens",
  "avoid refund, ROI, billing-change, or outcome guarantees",
  "Never ask customers to submit card numbers, bank details, passwords, private keys, or session tokens through support copy.",
  "Show billing and entitlement state as a safe projection, not raw provider payloads or internal IDs.",
  "Explain failed-payment or invoice actions with a calm recovery path and no fake urgency.",
  "Plan upgrade guidance must separate current access, pending actions, and future entitlements.",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(pagePath, [
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "support" + "Context" + "Key=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed billing change",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Billing handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Billing handoff runtime integration validation passed with owner posture coverage. validate:routes delegates through the orchestrator and the billing handoff integration validator remains wired into the route chain.");

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

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
