import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/reports/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-report-vault-handoff-runtime-integration.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "REPORT_VAULT_HANDOFFS",
  "Keep the record of what customers and AI search can understand.",
  "This vault stores the business readiness record: first signals, approved proof, AI/search posture, confidence limits, paid delivery, and the next readiness decision.",
  "Nothing final until it is approved.",
  "Different proof for every readiness depth.",
  "Pending, draft, or unavailable reports must never look final.",
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
  "Sensitive operational details are summarized safely instead of copied into public, customer, or operator-visible text.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(pagePath, [
  "free-scan-to-report-vault",
  "dashboard-to-report-vault",
  "report-vault-to-support",
  "report-vault-to-plans",
  "customerOwned: true",
  "verifiedAccess: true",
  "safeProjectionReady: true",
  "pendingAsFinalRisk: true",
]);

expect(pagePath, [
  "Scan, Review, Repair, and Control report types must remain visibly separate.",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF.",
  "AI/search posture must be useful and bounded: no guaranteed ranking, guaranteed AI placement, guaranteed leads, or algorithm control.",
  "Paid report actions route to plan detail pages before payment.",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Report vault handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault handoff runtime integration validation passed with current vault projection, report depth separation, paid-delivery posture, owner posture, and route-chain coverage.");

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
