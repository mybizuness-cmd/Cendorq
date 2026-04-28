import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const recordsPath = "src/lib/customer-support-record-contracts.ts";
const supportCenterPath = "src/app/dashboard/support/page.tsx";
const packagePath = "package.json";

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
  "Support and corrections",
  "Correction requests must stay review-gated before any report change is shown to the customer.",
  "Billing, refund, legal, or report outcome promises require approval before being stated as commitments.",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-record-contracts.mjs",
]);

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

console.log("Customer support record contracts validation passed.");

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
