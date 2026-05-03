import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/free-check/page.tsx";
const packagePath = "package.json";
const runtimePath = "src/lib/customer-email-confirmation-handoff-runtime.ts";
const apiResponsePath = "src/lib/customer-email-confirmation-api-response.ts";
const intakeCompleteApiPath = "src/app/api/free-scan/intake-complete/route.ts";
const contractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const gatePath = "src/app/free-check/free-scan-confirmation-gate.tsx";
const runtimeValidatorPath = "src/scripts/validate-customer-email-confirmation-handoff-runtime.mjs";
const apiResponseValidatorPath = "src/scripts/validate-customer-email-confirmation-api-response.mjs";
const intakeCompleteApiValidatorPath = "src/scripts/validate-free-scan-intake-completion-api.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(pagePath, [
  "FREE_SCAN_FIRST_USE_SNAPSHOT",
  "Free Scan first use snapshot",
  "First-use path",
  "Guided scan room",
  "Completion handoff",
  "Dashboard next action",
  "Recovery posture",
  "Resume safely",
  "Trust posture",
  "No pressure",
  "FREE_SCAN_HANDOFF_ACTIONS",
  "Free Scan completion handoff",
  "After submission",
  "The scan should hand off cleanly into the customer platform.",
  "Open dashboard",
  "Check notifications",
  "Open report vault",
  "FREE_SCAN_FIRST_USE_RULES",
  "Submit only business context needed for the first read, not passwords, private keys, card data, tokens, or unrelated raw evidence.",
  "Treat incomplete, interrupted, or pending scan state as pending instead of final analysis.",
  "After submission, use dashboard, notifications, and report vault before creating duplicate support requests.",
  "Plan guidance should come from scan evidence, stage fit, and customer readiness, not fake urgency or guaranteed outcomes.",
  "focus:outline-none",
  "focus:ring-2",
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

expect(runtimePath, [
  "projectCustomerEmailConfirmationHandoff",
  "getCustomerEmailConfirmationRuntimeContractKey",
  "CustomerEmailConfirmationHandoffProjection",
  "send-verification",
  "resend-verification",
  "route-verified",
  "hold",
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "check spam or promotions once",
  "save support@cendorq.com as a trusted sender",
  "showProtectedResults",
  "safeReleaseStillRequiresVerification",
  "arbitraryRedirectAfterVerification",
]);

expect(apiResponsePath, [
  "CustomerEmailConfirmationApiResponse",
  "buildCustomerEmailConfirmationApiResponse",
  "buildCustomerEmailConfirmationNoStoreHeaders",
  "verify-before-results",
  "verified-open-destination",
  "resend-confirmation",
  "hold",
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

expect(intakeCompleteApiPath, [
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

expect(contractPath, [
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "Confirm email and open your results",
  "Confirm your email to open your Cendorq results",
  "Do not show Free Scan findings before email verification and safe release state.",
  "dashboard/report vault",
  "Lifecycle and follow-up emails to the signup address remain active",
]);

expect(gatePath, [
  "FreeScanConfirmationGate",
  "projectCustomerEmailConfirmationHandoff",
  "free-scan-submitted",
  "Verify to view",
  "Check your inbox, confirm once, then open your Free Scan results in your Cendorq command center.",
  "Cendorq Support <support@cendorq.com>",
  "Save this sender or move it to your main inbox if your email app filters it.",
  "The dashboard/report vault remains the protected place to view current report state and next steps.",
  "Email stays active for delivery and follow-up.",
]);

expect(runtimeValidatorPath, [
  "Customer email confirmation handoff runtime validation passed",
  "src/lib/customer-email-confirmation-handoff-runtime.ts",
  "src/app/free-check/free-scan-confirmation-gate.tsx",
  "owner posture coverage",
]);

expect(apiResponseValidatorPath, [
  "Customer email confirmation API response validation passed",
  "src/lib/customer-email-confirmation-api-response.ts",
  "buildCustomerEmailConfirmationApiResponse",
  "owner posture coverage",
]);

expect(intakeCompleteApiValidatorPath, [
  "Free Scan intake completion API validation passed.",
  "src/app/api/free-scan/intake-complete/route.ts",
  "buildCustomerEmailConfirmationApiResponse",
]);

expect(packagePath, ["validate:routes", "validate-owner-maximum-protection-posture.mjs"]);

forbidden(pagePath, unsafePhrases());
forbidden(runtimePath, unsafePhrases());
forbidden(apiResponsePath, unsafePhrases());
forbidden(intakeCompleteApiPath, unsafePhrases());
forbidden(gatePath, unsafePhrases());

if (failures.length) {
  console.error("Free Scan first use handoff validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan first use handoff validation passed with owner posture, verify-to-view runtime, API response, and intake completion API coverage.");

function unsafePhrases() {
  return [
    "guaranteed ROI",
    "guaranteed refund",
    "guaranteed legal outcome",
    "guaranteed security outcome",
    "guaranteed inbox placement",
    "guaranteed deliverability",
    "impossible to hack",
    "never liable",
    "liability-free",
    "rawPayload=",
    "rawEvidence=",
    "rawSecurityPayload=",
    "rawBillingData=",
    "internalNotes=",
    "operatorIdentity=",
    "riskScoringInternals=",
    "attackerDetails=",
    "sessionToken=",
    "csrfToken=",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "final analysis without review",
  ];
}

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
