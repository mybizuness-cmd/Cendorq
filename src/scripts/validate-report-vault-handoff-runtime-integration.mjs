import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/reports/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "REPORT_VAULT_HANDOFFS",
  "Report vault handoff runtime integration",
  "Connected report handoffs",
  "Report movement stays tied to readiness, correction, and stage fit.",
  "customer-owned safe projection",
  "Pending reports stay pending",
  "correction routes stay bounded",
  "plan movement waits for readiness",
  "fake urgency",
  "guaranteed outcomes",
  "handoff.currentState",
  "handoff.safeNextAction",
  "handoff.recoveryPath",
  "handoff.connectedDestination",
  "handoff.decision",
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
  "Do not present pending, draft, or incomplete reports as final customer truth.",
  "Do not expose raw payloads, private evidence, internal notes, operator identities, risk internals, prompts, secrets, or cross-customer data.",
  "Report copy must separate verified facts, assumptions, inferences, recommendations, limitations, and next actions.",
  "Correction paths must preserve audit proof while keeping customer-facing explanations calm and bounded.",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-report-vault-handoff-runtime-integration.mjs",
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
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
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

console.log("Report vault handoff runtime integration validation passed.");

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
