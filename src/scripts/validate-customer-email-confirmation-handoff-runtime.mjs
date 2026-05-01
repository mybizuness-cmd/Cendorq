import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/customer-email-confirmation-handoff-runtime.ts";
const contractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const gatePath = "src/app/free-check/free-scan-confirmation-gate.tsx";
const freeScanValidatorPath = "src/scripts/validate-free-scan-first-use-handoff.mjs";
const failures = [];

expect(runtimePath, [
  "projectCustomerEmailConfirmationHandoff",
  "getCustomerEmailConfirmationRuntimeContractKey",
  "CustomerEmailConfirmationJourneyKey",
  "CustomerEmailConfirmationHandoffInput",
  "CustomerEmailConfirmationHandoffProjection",
  "send-verification",
  "resend-verification",
  "route-verified",
  "hold",
]);

expect(runtimePath, [
  "Cendorq Support",
  "support@cendorq.com",
  "Cendorq Support <support@cendorq.com>",
  "check spam or promotions once",
  "move Cendorq to your main inbox",
  "save support@cendorq.com as a trusted sender",
  "Confirm email and open your results",
  "verifiedDestination",
  "reportVisibilityRule",
  "showProtectedResults",
  "allowlistedDestination",
]);

expect(runtimePath, [
  "free-scan-submitted",
  "deep-review-purchased-or-submitted",
  "build-fix-purchased-or-submitted",
  "ongoing-control-started",
  "support-or-billing-entry",
  "customerOwnershipMissing",
  "signupEmailMissing",
  "destinationNotAllowlisted",
  "tokenConsumedWithoutVerifiedEmail",
  "verificationTokenNotIssued",
  "showReportBeforeEmailVerification",
  "verificationWithoutCustomerOwnedDestination",
  "arbitraryRedirectAfterVerification",
  "safeReleaseStillRequiresVerification",
]);

expect(contractPath, [
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "Cendorq Support <support@cendorq.com>",
  "Confirm your email to open your Cendorq results",
  "Confirm email and open your Free Scan results",
  "Do not show Free Scan findings before email verification and safe release state.",
  "Verification tokens must be single-use, short-lived, server-validated, and never stored in localStorage or sessionStorage.",
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
]);

expect(freeScanValidatorPath, [
  "src/lib/customer-email-confirmation-handoff-runtime.ts",
  "src/app/free-check/free-scan-confirmation-gate.tsx",
  "projectCustomerEmailConfirmationHandoff",
  "FreeScanConfirmationGate",
]);

forbidden(runtimePath, unsafePhrases());
forbidden(gatePath, unsafePhrases());

if (failures.length) {
  console.error("Customer email confirmation handoff runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email confirmation handoff runtime validation passed.");

function unsafePhrases() {
  return [
    "guaranteed inbox placement",
    "guaranteed deliverability",
    "guaranteed primary inbox",
    "guaranteed ROI",
    "guaranteed revenue",
    "guaranteed accuracy",
    "100% accurate",
    "100 percent accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
    "password=",
    "privateKey=",
    "cardNumber=",
    "bankDetail=",
    "rawPayload=",
    "rawEvidence=",
    "operatorIdentity=",
    "internalNote=",
    "localStorage.setItem",
    "sessionStorage.setItem",
  ];
}

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
