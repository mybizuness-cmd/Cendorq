import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const contractsPath = "src/lib/command-center/audit-report-record-contracts.ts";
const packagePath = "package.json";

validateTextFile(contractsPath, [
  "AUDIT_REPORT_RECORD_CONTRACTS",
  "AUDIT_REPORT_RECORD_REQUIRED_GUARDS",
  "getAuditReportRecordContracts",
  "BusinessIdentityRecordContract",
  "EvidenceRecordContract",
  "ReportCalculationRecordContract",
  "ReportClaimRecordContract",
  "CustomerConsentScopeRecordContract",
  "ReportReleaseApprovalRecordContract",
  "MaterialErrorCorrectionRecordContract",
  "DisputeReadinessPackageContract",
  "business-identity",
  "evidence",
  "report-calculation",
  "report-claim",
  "customer-consent-scope",
  "report-release-approval",
  "material-error-correction",
  "dispute-readiness-package",
  "identityConfidence",
  "sourceClass",
  "capturedAt",
  "retentionClass",
  "rawSecretStored: false",
  "publicOutputAllowed: false",
  "formulaVersion",
  "evidenceIds",
  "methodologyVersion",
  "legalReviewRequired",
  "blockedOutcomeGuaranteeScan",
  "termsVersion",
  "privacyVersion",
  "guaranteeWordingVersion",
  "permittedDataUseScope",
  "evidenceSufficiency",
  "calculationTraceStatus",
  "footerSafeguardsPresent",
  "businessLogoStatus",
  "blockedClaimScan",
  "reviewWindowStatus",
  "correctionDecision",
  "privacySafeExportOnly: true",
  "no customer-facing claim without substantiation",
  "no paid report delivery without approval record",
  "no score without calculation trace",
  "no correction without preserved correction history",
  "no dispute package without consent, terms, evidence, approvals, delivery, and correction metadata",
  "no social or platform revenue claim without evidence record",
  "no business logo use without identity-safe match status",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-audit-report-record-contracts.mjs",
]);

validateForbidden(contractsPath, [
  "rawSecretStored: true",
  "publicOutputAllowed: true",
  "privacySafeExportOnly: false",
  "delivery without approval allowed",
  "claim without evidence allowed",
  "correction history optional",
]);

if (failures.length) {
  console.error("Audit report record contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Audit report record contracts validation passed. Business identity, evidence, calculations, claims, consent/scope, release approvals, corrections, and dispute-readiness packages preserve required proof, privacy, and audit-defense metadata.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required audit report record dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required audit report record phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden audit report record phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
