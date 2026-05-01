import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/customer-email-verification-token-runtime.ts";
const routePath = "src/app/api/customer/email/confirm/route.ts";
const handoffValidatorPath = "src/scripts/validate-customer-email-confirmation-handoff-runtime.mjs";
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
  "if (entry.consumedAt) return buildStoredResult(entry, \"already-used\"",
  "expiresAt",
]);

expect(runtimePath, [
  "verified-redirect",
  "resend-required",
  "already-used",
  "hold",
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

expect(handoffValidatorPath, [
  "src/lib/customer-email-verification-token-runtime.ts",
  "src/app/api/customer/email/confirm/route.ts",
  "validate-customer-email-verification-token-runtime.mjs",
]);

forbidden(runtimePath, unsafePhrases());
forbidden(routePath, unsafePhrases());

if (failures.length) {
  console.error("Customer email verification token runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email verification token runtime validation passed.");

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
    "password=",
    "privateKey=",
    "cardNumber=",
    "bankDetail=",
    "rawPayload=",
    "rawEvidence=",
    "operatorIdentity=",
    "internalNote=",
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
