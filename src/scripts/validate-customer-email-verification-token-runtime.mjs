import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/customer-email-verification-token-runtime.ts";
const routePath = "src/app/api/customer/email/confirm/route.ts";
const handoffValidatorPath = "src/scripts/validate-customer-email-confirmation-handoff-runtime.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const failures = [];

expect(runtimePath, [
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
  "rawTokenReturned: false",
  "tokenHashReturned: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "projectCustomerEmailConfirmationHandoff",
  "DEFAULT_DESTINATION = \"/dashboard\"",
  "cleanDestination",
]);

expect(runtimePath, [
  "cleaned.startsWith(\"/dashboard\") || cleaned === \"/free-check\"",
  "verificationTokenInvalid",
  "verificationTokenMissing",
  "GENERIC_FAILURE_MESSAGE",
  "Only show customer-owned safe projections after email verification and safe release state.",
]);

expect(routePath, [
  "export const runtime = \"nodejs\"",
  "export const dynamic = \"force-dynamic\"",
  "export const revalidate = 0",
  "verifyCustomerEmailConfirmationToken",
  "getCustomerEmailVerificationNoStoreHeaders",
  "NextResponse.redirect",
  "status: 303",
  "recoveryPath: \"/free-check\"",
  "dashboardPath: \"/dashboard\"",
  "readSafeJson",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);
expect(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
expect(packagePath, ["validate:routes", "validate-customer-email-verification-token-runtime.mjs", "validate-owner-maximum-protection-posture.mjs"]);
expect(handoffValidatorPath, ["src/lib/customer-email-verification-token-runtime.ts", "src/app/api/customer/email/confirm/route.ts", "validate-customer-email-verification-token-runtime.mjs", "owner posture"]);

forbidden(runtimePath, unsafePhrases());
forbidden(routePath, unsafePhrases());

if (failures.length) {
  console.error("Customer email verification token runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email verification token runtime validation passed with owner posture and package wiring coverage.");

function unsafePhrases() {
  return [
    "localStorage.setItem",
    "sessionStorage.setItem",
    "rawTokenReturned: true",
    "tokenHashReturned: true",
    "localStorageAllowed: true",
    "sessionStorageAllowed: true",
    "guaranteed inbox placement",
    "guaranteed deliverability",
    "guaranteed primary inbox",
    "guaranteed ROI",
    "guaranteed revenue",
    "100% accurate",
    "100 percent accurate",
    "impossible to hack",
    "never liable",
    "liability-free",
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
