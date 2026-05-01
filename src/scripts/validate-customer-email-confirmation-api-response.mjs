import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const responsePath = "src/lib/customer-email-confirmation-api-response.ts";
const runtimePath = "src/lib/customer-email-confirmation-handoff-runtime.ts";
const freeScanValidatorPath = "src/scripts/validate-free-scan-first-use-handoff.mjs";
const failures = [];

expect(responsePath, [
  "CustomerEmailConfirmationApiResponse",
  "buildCustomerEmailConfirmationApiResponse",
  "buildCustomerEmailConfirmationNoStoreHeaders",
  "projectCustomerEmailConfirmationHandoff",
  "verify-before-results",
  "verified-open-destination",
  "resend-confirmation",
  "hold",
  "noStore: true",
  "Cache-Control",
  "no-store, no-cache, must-revalidate, proxy-revalidate",
]);

expect(responsePath, [
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "senderDisplay",
  "senderEmail",
  "subject",
  "preheader",
  "checkInboxCopy",
  "primaryCta",
  "verifiedDestination",
  "dashboardModule",
  "reportVisibilityRule",
  "safeCustomerMessage",
  "showProtectedResults",
  "holdReasons",
  "blockedPatterns",
]);

expect(responsePath, [
  "rawPayloadStored: false",
  "rawEvidenceReturned: false",
  "rawBillingDataReturned: false",
  "internalNotesReturned: false",
  "operatorIdentityReturned: false",
  "riskInternalsReturned: false",
  "tokensReturned: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
]);

expect(runtimePath, [
  "projectCustomerEmailConfirmationHandoff",
  "showProtectedResults",
  "safeReleaseStillRequiresVerification",
]);

expect(freeScanValidatorPath, [
  "src/lib/customer-email-confirmation-api-response.ts",
  "buildCustomerEmailConfirmationApiResponse",
  "buildCustomerEmailConfirmationNoStoreHeaders",
]);

forbidden(responsePath, [
  "rawPayload: true",
  "rawEvidence: true",
  "rawBillingData: true",
  "internalNotes: true",
  "operatorIdentity: true",
  "riskInternals: true",
  "tokensReturned: true",
  "localStorageAllowed: true",
  "sessionStorageAllowed: true",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Customer email confirmation API response validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email confirmation API response validation passed.");

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
