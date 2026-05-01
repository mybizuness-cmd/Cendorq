import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const integrationPath = "src/lib/report-vault-verify-to-view-integration.ts";
const confirmationValidatorPath = "src/scripts/validate-customer-email-confirmation-handoff-runtime.mjs";
const failures = [];

expect(integrationPath, [
  "ReportVaultVerifyToViewStatus",
  "ReportVaultVerifyToViewInput",
  "ReportVaultVerifyToViewProjection",
  "projectReportVaultVerifyToViewIntegration",
  "getReportVaultVerifyToViewIntegrationRules",
  "REPORT_VAULT_VERIFY_TO_VIEW_RULES",
  "verification-required",
  "verified-report-vault-ready",
  "pending-release",
  "safe-recovery",
]);

expect(integrationPath, [
  "verified email unlock routes for Free Scan and Deep Review must land in /dashboard/reports",
  "the report vault is the canonical protected place for report state, limitations, confidence labels, and next actions",
  "pending, draft, unavailable, or correction-requested reports must not be presented as final truth",
  "released report views must preserve verified facts, assumptions, inferences, recommendations, limitations, and next actions",
  "report vault verify-to-view output must use customer-owned safe projections only",
  "report vault copy must convert through clarity and plan-fit education, not fake urgency or unsupported promises",
]);

expect(integrationPath, [
  "verifiedDestination: \"/dashboard/reports\"",
  "dashboardModule: \"report vault\"",
  "pendingReportPresentedAsFinal: false",
  "emailVerificationRequiredBeforeProtectedResults",
  "customerOwnershipRequired: true",
  "safeReleaseRequired: true",
  "rawPayloadExposed: false",
  "rawEvidenceExposed: false",
  "rawBillingDataExposed: false",
  "internalNotesExposed: false",
  "operatorIdentityExposed: false",
  "riskInternalsExposed: false",
  "promptExposed: false",
  "secretExposed: false",
  "tokenExposed: false",
  "arbitraryRedirectAllowed: false",
  "unsupportedOutcomePromise: false",
]);

expect(confirmationValidatorPath, [
  "src/lib/report-vault-verify-to-view-integration.ts",
  "validate-report-vault-verify-to-view-integration.mjs",
  "projectReportVaultVerifyToViewIntegration",
]);

forbidden(integrationPath, [
  "pendingReportPresentedAsFinal: true",
  "rawPayloadExposed: true",
  "rawEvidenceExposed: true",
  "rawBillingDataExposed: true",
  "internalNotesExposed: true",
  "operatorIdentityExposed: true",
  "riskInternalsExposed: true",
  "promptExposed: true",
  "secretExposed: true",
  "tokenExposed: true",
  "arbitraryRedirectAllowed: true",
  "unsupportedOutcomePromise: true",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Report vault verify-to-view integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report vault verify-to-view integration validation passed.");

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
