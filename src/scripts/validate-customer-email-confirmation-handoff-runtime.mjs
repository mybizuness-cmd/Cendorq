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

expect(tokenRuntimePath, [
  "issueCustomerEmailVerificationToken",
  "verifyCustomerEmailConfirmationToken",
  "getCustomerEmailVerificationNoStoreHeaders",
  "CustomerEmailVerificationTokenEntry",
  "CustomerEmailVerificationResult",
  "customer-email-verification-tokens.v3.json",
  "hashToken(token)",
  "createHash(\"sha256\")",
  "timingSafeEqual",
  "consumedAt",
  "expiresAt",
  "verified-redirect",
  "resend-required",
  "already-used",
  "rawTokenReturned: false",
  "tokenHashReturned: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
]);

expect(tokenRoutePath, [
  "export const runtime = \"nodejs\"",
  "export const dynamic = \"force-dynamic\"",
  "export const revalidate = 0",
  "verifyCustomerEmailConfirmationToken",
  "getCustomerEmailVerificationNoStoreHeaders",
  "NextResponse.redirect",
  "status: 303",
  "recoveryPath: \"/free-check\"",
  "dashboardPath: \"/dashboard\"",
]);

expect(tokenValidatorPath, [
  "Customer email verification token runtime validation passed.",
  "src/lib/customer-email-verification-token-runtime.ts",
  "src/app/api/customer/email/confirm/route.ts",
]);

expect(contractPath, [
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "Cendorq Support <support@cendorq.com>",
  "Confirm your email to open your Cendorq results",
  "Confirm email and open your Free Scan results",
  "Do not show Free Scan findings before email verification and safe release state.",
  "Verification tokens must be single-use, short-lived, server-validated, and never stored in localStorage or sessionStorage.",
]);

expect(reportVaultVerifyPath, [
  "projectReportVaultVerifyToViewIntegration",
  "getReportVaultVerifyToViewIntegrationRules",
  "verifiedDestination: \"/dashboard/reports\"",
  "dashboardModule: \"report vault\"",
  "pendingReportPresentedAsFinal: false",
  "emailVerificationRequiredBeforeProtectedResults",
  "customerOwnershipRequired: true",
  "safeReleaseRequired: true",
  "arbitraryRedirectAllowed: false",
  "unsupportedOutcomePromise: false",
]);

expect(reportVaultVerifyValidatorPath, [
  "Report vault verify-to-view integration validation passed.",
  "src/lib/report-vault-verify-to-view-integration.ts",
  "projectReportVaultVerifyToViewIntegration",
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
forbidden(tokenRuntimePath, unsafePhrases());
forbidden(tokenRoutePath, unsafePhrases());
forbidden(reportVaultVerifyPath, unsafePhrases());
forbidden(gatePath, unsafePhrases());

if (failures.length) {
  console.error("Customer email confirmation handoff runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email confirmation handoff runtime validation passed with owner posture, verification token runtime, and report vault verify-to-view coverage.");

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
