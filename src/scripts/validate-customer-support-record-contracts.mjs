import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const recordsPath = "src/lib/customer-support-record-contracts.ts";
const supportCenterPath = "src/app/dashboard/support/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-support-record-contracts.mjs";

expect(recordsPath, [
  "CUSTOMER_SUPPORT_RECORD_CONTRACTS",
  "CUSTOMER_SUPPORT_RECORD_GUARDS",
  "getCustomerSupportRecordContracts",
  "CustomerSupportRequestRecordContract",
  "CustomerCorrectionReviewRecordContract",
  "CustomerBillingSupportRecordContract",
  "CustomerSecurityReviewRecordContract",
  "CustomerSupportEscalationRecordContract",
  "CustomerSupportAuditRecordContract",
  "customer-support-request",
  "customer-correction-review",
  "customer-billing-support",
  "customer-security-review",
  "customer-support-escalation",
  "customer-support-audit",
  "customerOwnershipRequired: true",
  "rawSecretsAccepted: false",
  "rawPaymentDataAccepted: false",
  "rawEvidenceStored: false",
  "supportPathVisible: true",
  "reviewRequiredBeforeCustomerChange: true",
  "releaseApprovalRequired: true",
  "originalReportPreserved: true",
  "correctionAuditRequired: true",
  "entitlementCheckRequired: true",
  "billingStateCheckRequired: true",
  "noRawPaymentData: true",
  "refundPromiseApprovalRequired: true",
  "cancellationHelpVisible: true",
  "noAttackerDetailsToCustomer: true",
  "noRiskScoringInternalsToCustomer: true",
  "operatorReviewRequired: true",
  "internalNotesPrivate: true",
  "safeMetadataOnly: true",
  "rawPayloadStored: false",
  "no support request without customer ownership",
  "no correction change without review, release approval, original report preservation, and audit record",
  "no billing support action without entitlement and billing-state checks",
  "no refund, legal, billing, report-change, or outcome promise without approval",
  "no security response reveals attacker details, risk-scoring internals, secrets, or raw security payloads",
  "no escalation without customer-safe status and private internal notes boundary",
  "no support audit event stores raw payloads",
]);

expect(supportCenterPath, [
  "Readiness support routing",
  "Route the blocker without weakening the readiness path.",
  "Help should restore momentum, protect the proof trail, and return the customer to the right report, account, readiness depth, or status path.",
  "Pick the narrowest path that matches the blocker.",
  "Use safe summaries only: no passwords, card data, private keys, session tokens, raw attack strings, or unrelated private evidence.",
  "Support can explain process, status, and next steps; approved outcomes require the right review gate.",
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
  "validate-customer-support-record-contracts.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

expect(routesChainPath, [validatorPath]);

forbidden(recordsPath, [
  "rawPayloadStored: true",
  "rawSecretsAccepted: true",
  "rawPaymentDataAccepted: true",
  "rawEvidenceStored: true",
  "customerOwnershipRequired: false",
  "releaseApprovalRequired: false",
  "refundPromiseApprovalRequired: false",
  "operatorReviewRequired: false",
  "internalNotesPrivate: false",
]);

if (failures.length) {
  console.error("Customer support record contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support record contracts validation passed with current record contracts, support center anchors, owner posture, and route-chain coverage.");

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
