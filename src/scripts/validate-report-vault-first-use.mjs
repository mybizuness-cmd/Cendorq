import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/reports/page.tsx";
const packagePath = "package.json";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(pagePath, [
  "REPORT_VAULT_FIRST_USE_SNAPSHOT",
  "Report vault first use snapshot",
  "Availability",
  "Clear report state",
  "Methodology",
  "Separated reasoning",
  "Access posture",
  "Protected vault",
  "Correction posture",
  "Visible review path",
  "REPORT_VAULT_ACTIONS",
  "Report vault first use guidance",
  "First vault visit",
  "Know what is ready before acting on it.",
  "Continue Free Scan",
  "Ask report support",
  "Compare report depth",
  "REPORT_VAULT_RULES",
  "Vault safety rules",
  "Do not present pending, draft, or incomplete reports as final customer truth.",
  "Do not expose raw payloads, private evidence, internal notes, operator identities, risk internals, prompts, secrets, or cross-customer data.",
  "Report copy must separate verified facts, assumptions, inferences, recommendations, limitations, and next actions.",
  "Correction paths must preserve audit proof while keeping customer-facing explanations calm and bounded.",
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

expect(packagePath, ["validate:routes", "validate-owner-maximum-protection-posture.mjs"]);

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
  "final customer truth without review",
]);

if (failures.length) {
  console.error("Report vault first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault first use validation passed with owner posture coverage.");

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
