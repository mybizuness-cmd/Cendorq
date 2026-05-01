import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = "src/app/api/free-scan/intake-complete/route.ts";
const responsePath = "src/lib/customer-email-confirmation-api-response.ts";
const freeScanValidatorPath = "src/scripts/validate-free-scan-first-use-handoff.mjs";
const failures = [];

expect(routePath, [
  "export const dynamic = \"force-dynamic\"",
  "export const revalidate = 0",
  "export async function OPTIONS",
  "export async function POST",
  "buildCustomerEmailConfirmationApiResponse",
  "buildCustomerEmailConfirmationNoStoreHeaders",
  "journeyKey: \"free-scan-submitted\"",
  "requestedDestination: \"/dashboard/reports\"",
  "MAX_BODY_BYTES",
  "readSafeJson",
  "hasSafeEmail",
  "hasSafeIdentifier",
]);

expect(routePath, [
  "content-length",
  "status: 409",
  "customerIdHashPresent: false",
  "signupEmailPresent: false",
  "verificationTokenIssued: false",
  "customerOwnedDestination: false",
  "emailAlreadyVerified",
  "verificationTokenExpired",
  "resendRequested",
  "safeReleaseReady",
]);

expect(responsePath, [
  "verify-before-results",
  "verified-open-destination",
  "resend-confirmation",
  "noStore: true",
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

expect(freeScanValidatorPath, [
  "src/app/api/free-scan/intake-complete/route.ts",
  "validate-free-scan-intake-completion-api.mjs",
  "buildCustomerEmailConfirmationApiResponse",
]);

forbidden(routePath, [
  "rawPayload",
  "rawEvidence",
  "rawBillingData",
  "internalNotes",
  "operatorIdentity",
  "riskInternals",
  "sessionToken",
  "csrfToken",
  "adminKey",
  "localStorage",
  "sessionStorage",
  "guaranteed inbox",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Free Scan intake completion API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan intake completion API validation passed.");

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
