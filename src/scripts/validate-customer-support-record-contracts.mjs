import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/customer-support-record-contracts.ts", [
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
  ]],
  ["src/app/dashboard/support/page.tsx", [
    "SUPPORT_ROUTES",
    "PLAN_SUPPORT",
    "SUPPORT_RULES",
    "Track status",
    "Start protected request",
    "Scan",
    "Review",
    "Repair",
    "Control",
    "Use safe summaries only",
    "Support can explain process, status, and next steps",
  ]],
  ["docs/owner-maximum-protection-posture.md", ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path."]],
  ["src/scripts/validate-owner-maximum-protection-posture.mjs", ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]],
  ["package.json", ["validate:routes", "validate-owner-maximum-protection-posture.mjs"]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-customer-support-record-contracts.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Customer support record contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support record contracts validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
