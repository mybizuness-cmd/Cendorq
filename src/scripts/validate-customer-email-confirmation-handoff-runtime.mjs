import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/customer-email-confirmation-handoff-runtime.ts";
const tokenRuntimePath = "src/lib/customer-email-verification-token-runtime.ts";
const tokenRoutePath = "src/app/api/customer/email/confirm/route.ts";
const tokenValidatorPath = "src/scripts/validate-customer-email-verification-token-runtime.mjs";
const contractPath = "src/lib/customer-email-confirmation-handoff-contracts.ts";
const reportVaultVerifyPath = "src/lib/report-vault-verify-to-view-integration.ts";
const reportVaultVerifyValidatorPath = "src/scripts/validate-report-vault-verify-to-view-integration.mjs";
const gatePath = "src/app/free-check/free-scan-confirmation-gate.tsx";
const freeScanValidatorPath = "src/scripts/validate-free-scan-first-use-handoff.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
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
  "Cendorq Support <support@cendorq.com>",
  "check spam or promotions once",
  "save support@cendorq.com as a trusted sender",
  "Confirm email and open your results",
  "verifiedDestination",
  "reportVisibilityRule",
  "showProtectedResults",
  "allowlistedDestination",
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

expect(tokenRuntimePath, [
  "issueCustomerEmailVerificationToken",
  "verifyCustomerEmailConfirmationToken",
  "getCustomerEmailVerificationNoStoreHeaders",
  "customer-email-verification-tokens.v3.json",
  "hashToken(token)",
  "timingSafeEqual",
  "consumedAt",
  "expiresAt",
  "rawTokenReturned: false",
  "tokenHashReturned: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
]);

expect(tokenRoutePath, [
  "verifyCustomerEmailConfirmationToken",
  "getCustomerEmailVerificationNoStoreHeaders",
  "NextResponse.redirect",
  "status: 303",
  "recoveryPath: \"/free-check\"",
  "dashboardPath: \"/dashboard\"",
]);

expect(tokenValidatorPath, ["Customer email verification token runtime validation passed.", "validate-customer-email-verification-token-runtime.mjs"]);
expect(contractPath, ["CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT", "Cendorq Support <support@cendorq.com>", "Confirm your email to open your Cendorq results"]);
expect(reportVaultVerifyPath, ["projectReportVaultVerifyToViewIntegration", "verifiedDestination: \"/dashboard/reports\"", "pendingReportPresentedAsFinal: false"]);
expect(reportVaultVerifyValidatorPath, ["Report vault verify-to-view integration validation passed.", "projectReportVaultVerifyToViewIntegration"]);
expect(gatePath, ["FreeScanConfirmationGate", "projectCustomerEmailConfirmationHandoff", "free-scan-submitted", "Verify to view", "Cendorq Support <support@cendorq.com>"]);
expect(freeScanValidatorPath, ["projectCustomerEmailConfirmationHandoff", "FreeScanConfirmationGate"]);
expect(ownerMaximumProtectionPath, ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path.", "Operator surfaces remain private, metadata-first, and review-gated."]);
expect(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
expect(packagePath, ["validate:routes", "validate-customer-email-confirmation-handoff-runtime.mjs", "validate-owner-maximum-protection-posture.mjs"]);

forbidden(runtimePath, unsafePhrases());
forbidden(tokenRuntimePath, unsafePhrases());
forbidden(tokenRoutePath, unsafePhrases());
forbidden(reportVaultVerifyPath, unsafePhrases());
forbidden(gatePath, unsafePhrases());

if (failures.length) {
  console.error("Customer email confirmation handoff runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email confirmation handoff runtime validation passed with owner posture coverage, verification token runtime, and report vault verify-to-view coverage.");

function unsafePhrases() {
  return [
    "guaranteed inbox placement",
    "guaranteed primary inbox",
    "guaranteed ROI",
    "guaranteed revenue",
    "100% accurate",
    "100 percent accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "rawTokenReturned: true",
    "tokenHashReturned: true",
    "localStorageAllowed: true",
    "sessionStorageAllowed: true",
    "pendingReportPresentedAsFinal: true",
    "arbitraryRedirectAllowed: true",
    "unsupportedOutcomePromise: true",
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
