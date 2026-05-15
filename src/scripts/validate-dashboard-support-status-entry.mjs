import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const dashboardPath = "src/app/dashboard/page.tsx";
const statusPagePath = "src/app/dashboard/support/status/page.tsx";
const statusListPath = "src/components/customer-support/support-status-list.tsx";
const routeMapPath = "src/lib/customer-platform-route-map.ts";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-dashboard-support-status-entry.mjs";

expect(dashboardPath, [
  "Support",
  "/dashboard/support",
  "Resolve blockers without sending private details.",
  "dashboard-to-support",
]);

expect(statusPagePath, [
  "Market resolution status",
  "View customer-safe Cendorq support request status without internal notes, raw evidence, or private security and billing details.",
  "SupportStatusList",
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "Know where the blocker stands and what to do next.",
  "Status should reduce anxiety, protect private information, and return the customer to proof, account, help, or command depth as soon as the blocker is clear.",
  "Review status",
  "Send safe update",
  "Return to command depth",
  "support-status-list",
  "Show progress without exposing internals.",
  "Status tracking should never reveal raw evidence, security payloads, billing data, secrets, prompts, or tokens.",
  "No generic ticket tracker",
  "No internal notes",
  "No raw evidence",
  "No duplicate support loop",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(statusListPath, [
  "SupportStatusList",
  "fetch(\"/api/customer/support/status\"",
  "Status is shown through customer-safe projection only.",
  "Internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, and support secrets are never displayed here.",
  "Refresh status",
  "No active support requests are visible yet.",
  "Use the safe update path for this request. Cendorq will not ask you to paste rejected raw content again.",
  "WorkStartGatePanel",
  "CommunicationPlanPanel",
  "buildSafeSupportUpdatePath",
  "encodeURIComponent(supportRequestId)",
]);

expect(routeMapPath, [
  "dashboardSupportStatus",
  "/dashboard/support/status",
  "Support status",
  "Support protected",
  "support-status-visible",
  "Track request status through customer-safe fields without exposing internal notes, raw evidence, billing data, or security details.",
  "support status access requires authenticated customer ownership, session authorization, and customer-safe projection",
  "support status must not render raw payloads, raw evidence, raw security payloads, raw billing data, internal notes, operator identities, risk-scoring internals, attacker details, prompts, secrets, session tokens, CSRF tokens, admin keys, or support context keys",
]);

expect(packagePath, [
  "validate:routes",
  "validate-dashboard-support-status-entry.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(dashboardPath, [
  "operator identities",
  "risk-scoring internals",
  "attacker details",
  "raw evidence",
  "raw billing data",
  "admin keys",
  "support context keys",
  "session tokens",
  "CSRF tokens",
  "guaranteed support outcome",
  "refund approved",
]);

forbidden(statusPagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "guaranteed support outcome",
  "refund approved",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "operatorIdentity",
  "riskScoringInternals",
]);

forbidden(statusListPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "document.cookie",
  "window.location.href =",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "adminReadKey",
  "supportContextKey",
]);

if (failures.length) {
  console.error("Dashboard support status entry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard support status entry validation passed with current dashboard entry, support status page, status list projection, and route-map guard coverage.");

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
