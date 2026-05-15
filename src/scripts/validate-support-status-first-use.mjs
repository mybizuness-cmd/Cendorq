import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/status/page.tsx";
const statusListPath = "src/components/customer-support/support-status-list.tsx";
const statusContractsPath = "src/lib/customer-support-status-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-support-status-first-use.mjs";
const failures = [];

expect(pagePath, [
  "Market resolution status",
  "View customer-safe Cendorq support request status without internal notes, raw evidence, or private security and billing details.",
  "STATUS_ACTIONS",
  "STATUS_RULES",
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "Know where the blocker stands and what to do next.",
  "Status should reduce anxiety, protect private information, and return the customer to proof, account, help, or command depth as soon as the blocker is clear.",
  "Review status",
  "Send safe update",
  "Return to command depth",
  "Return to the right command.",
  "Help should restore confidence and move the customer back to the right operating lane.",
  "Show progress without exposing internals.",
  "Status should reduce anxiety without exposing internal notes, operator details, or risk mechanics.",
  "Waiting-on-customer states should ask for safe clarification without echoing rejected unsafe content.",
  "Resolved or closed states should explain completion without guaranteeing unsupported outcomes.",
  "Status tracking should never reveal raw evidence, security payloads, billing data, secrets, prompts, or tokens.",
  "SupportStatusList",
  "support-status-list",
  "No generic ticket tracker",
  "No internal notes",
  "No raw evidence",
  "No duplicate support loop",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(statusListPath, [
  "use client",
  "SupportStatusList",
  "fetch(\"/api/customer/support/status\"",
  "Support status could not be loaded safely.",
  "Your protected support requests.",
  "Status is shown through customer-safe projection only.",
  "Internal notes, operator identities, risk-scoring details, raw evidence, billing data, session tokens, and support secrets are never displayed here.",
  "Refresh status",
  "No active support requests are visible yet.",
  "Start protected request",
  "Loading protected support status...",
  "waiting-on-customer",
  "Use the safe update path for this request. Cendorq will not ask you to paste rejected raw content again.",
  "CommunicationPlanPanel",
  "WorkStartGatePanel",
  "buildSafeSupportUpdatePath",
  "encodeURIComponent(supportRequestId)",
]);

expect(statusContractsPath, [
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "CUSTOMER_SUPPORT_STATUS_PROJECTION",
  "CUSTOMER_SUPPORT_STATUS_GLOBAL_GUARDS",
  "customerVisibleFields",
  "internalOnlyFields",
  "requiredProjectionGuards",
  "received",
  "reviewing",
  "waiting-on-customer",
  "in-specialist-review",
  "resolved",
  "closed",
  "no internal-only fields in customer response",
  "no cross-customer support status access",
  "no account existence disclosure through status lookup",
  "no support status copy promises refunds, legal outcomes, report changes, billing changes, security outcomes, or guaranteed business results without approval",
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

expect(packagePath, [
  "validate:routes",
  "validate-support-status-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage",
  "sessionStorage",
  "refund guaranteed",
  "rawPayload",
  "rawSecurityPayload",
  "rawBillingData",
  "operatorIdentity",
  "riskScoringInternals",
  "sessionToken=",
  "csrfToken=",
]);

forbidden(statusListPath, [
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "innerHTML",
  "document.cookie",
  "window.location.href =",
  "refund guaranteed",
  "guaranteed legal outcome",
  "guaranteed security outcome",
]);

if (failures.length) {
  console.error("Support status first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support status first use validation passed with current customer-safe status page, status-list projection, contracts, and owner posture coverage.");

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
