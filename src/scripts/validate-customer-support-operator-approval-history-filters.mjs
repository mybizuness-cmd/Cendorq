import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const componentPath = "src/components/customer-support/operator-approval-list.tsx";
const apiPath = "src/app/api/admin/support/approvals/list/route.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect(componentPath, [
  "OperatorApprovalList",
  "ApprovalFilters",
  "INITIAL_FILTERS",
  "APPROVAL_TYPE_OPTIONS",
  "DECISION_OPTIONS",
  "STATE_OPTIONS",
  "ApprovalFilterSelect",
  "new URLSearchParams({ limit: \"50\" })",
  "params.set(\"approvalType\", filters.approvalType)",
  "params.set(\"decision\", filters.decision)",
  "params.set(\"state\", filters.state)",
  "Filters use safe approval type, decision, and state query parameters without adding customer hashes, requester roles, raw storage flags, internal notes, secrets, or authorization internals.",
  "Clear filters",
  "Showing {state.returned} safe approval record",
  "No approval records match the current filters.",
  "safe-correction",
  "billing-action",
  "security-outcome",
  "support-closure",
]);

expect(apiPath, [
  "normalizeApprovalType",
  "normalizeApprovalDecision",
  "normalizeApprovalState",
  "operator-approval-safe-list",
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
  "validate-customer-support-operator-approval-history-filters.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden(componentPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "customerIdHash",
  "requestedByRole",
  "rawPayloadStored",
  "rawEvidenceStored",
  "rawSecurityPayloadStored",
  "rawBillingDataStored",
  "rawPaymentDataStored",
  "internalNotesCustomerVisible",
  "unsupportedPromiseAllowed",
  "secretsStored",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "console.log",
  "guaranteed refund",
  "guaranteed ROI",
  "impossible to hack",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer support operator approval history filter validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support operator approval history filter validation passed with owner posture coverage.");

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
