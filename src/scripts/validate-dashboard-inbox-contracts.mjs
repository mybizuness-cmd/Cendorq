import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/dashboard-inbox-contracts.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(contractPath, [
  "DashboardInboxMessageCategory",
  "DashboardInboxMessageContract",
  "DASHBOARD_INBOX_FOUNDATION_CONTRACTS",
  "DASHBOARD_INBOX_GLOBAL_GUARDS",
  "getDashboardInboxContracts",
  "projectDashboardInboxFoundationSummary",
  "scan",
  "report",
  "plan",
  "support",
  "billing",
  "security",
  "command-center",
]);

expect(contractPath, [
  "dashboard inbox messages are command-center notifications and must not replace external email confirmation or lifecycle email orchestration",
  "each inbox message must have one safe primary CTA and a customer-owned projection",
  "inbox conversion must use proof, clarity, limitations, plan fit, and next safe action rather than fake urgency or dark patterns",
  "billing inbox messages must route to the billing center and must not request sensitive payment details",
  "support inbox messages must route to support status or support center and must not expose internal review details",
  "security inbox messages must avoid threat details, risk scoring internals, sensitive security material, and secret collection",
]);

expect(contractPath, [
  "externalEmailStillRequired: true",
  "oneSafePrimaryCtaRequired: true",
  "rawCustomerEmailExposed: false",
  "rawPayloadExposed: false",
  "rawEvidenceExposed: false",
  "rawSecurityPayloadExposed: false",
  "rawBillingDataExposed: false",
  "internalNotesExposed: false",
  "operatorIdentityExposed: false",
  "riskInternalsExposed: false",
  "attackerDetailsExposed: false",
  "promptExposed: false",
  "secretExposed: false",
  "tokenExposed: false",
  "crossCustomerDataExposed: false",
]);

expect(contractPath, [
  "scan-results-protected",
  "report-vault-next-action",
  "plan-fit-guidance",
  "support-status-command-center",
  "billing-center-safe-recovery",
  "security-sensitive-action",
  "command-center-next-step",
]);

expect(routesChainPath, [
  "src/scripts/validate-dashboard-inbox-contracts.mjs",
]);

forbidden(contractPath, [
  "rawCustomerEmailExposed: true",
  "rawPayloadExposed: true",
  "rawEvidenceExposed: true",
  "rawSecurityPayloadExposed: true",
  "rawBillingDataExposed: true",
  "internalNotesExposed: true",
  "operatorIdentityExposed: true",
  "riskInternalsExposed: true",
  "attackerDetailsExposed: true",
  "promptExposed: true",
  "secretExposed: true",
  "tokenExposed: true",
  "crossCustomerDataExposed: true",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency only",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Dashboard inbox contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard inbox contracts validation passed.");

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
