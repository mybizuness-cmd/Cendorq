import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/customer-confirmation-email-issuance-runtime.ts";
const tokenRuntimePath = "src/lib/customer-email-verification-token-runtime.ts";
const templatesPath = "src/lib/customer-email-template-contracts.ts";
const templateValidatorPath = "src/scripts/validate-customer-email-template-contracts.mjs";
const failures = [];

expect(runtimePath, [
  "issueCustomerConfirmationEmail",
  "projectCustomerConfirmationEmailSafeResponse",
  "getConfirmationEmailTemplateContract",
  "issueCustomerEmailVerificationToken",
  "CUSTOMER_EMAIL_CONFIRMATION_HANDOFF_CONTRACT",
  "getCustomerEmailTemplateContracts",
  "CustomerConfirmationEmailPayload",
  "providerReadyPayload",
  "confirmationUrl",
  "confirmationUrlHash",
  "confirmationPath: \"/api/customer/email/confirm\"",
]);

expect(runtimePath, [
  "Cendorq Support <support@cendorq.com>",
  "support@cendorq.com",
  "Confirm your email to open your Cendorq results",
  "Confirm your email and enter your Cendorq command center",
  "Confirm your email to continue your Cendorq plan",
  "If the email was filtered, move Cendorq to your main inbox or save support@cendorq.com as a trusted sender.",
  "This confirmation link is single-use and expires.",
  "Cendorq will never ask for your password, card number, private key, or session token in this email.",
]);

expect(runtimePath, [
  "rawTokenReturnedToBrowser: false",
  "tokenHashReturnedToBrowser: false",
  "rawEmailReturnedToBrowser: false",
  "rawPayloadStored: false",
  "rawEvidenceReturned: false",
  "rawBillingDataReturned: false",
  "internalNotesReturned: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
]);

expect(tokenRuntimePath, [
  "issueCustomerEmailVerificationToken",
  "verifyCustomerEmailConfirmationToken",
  "tokenHash",
  "consumedAt",
  "rawTokenReturned: false",
  "tokenHashReturned: false",
]);

expect(templatesPath, [
  "confirm-email",
  "Cendorq Support",
  "support@cendorq.com",
  "no email contains passwords, raw tokens, raw billing IDs, raw evidence, secrets, or private report internals",
]);

expect(templateValidatorPath, [
  "src/lib/customer-confirmation-email-issuance-runtime.ts",
  "validate-customer-confirmation-email-issuance-runtime.mjs",
  "issueCustomerConfirmationEmail",
]);

forbidden(runtimePath, [
  "rawTokenReturnedToBrowser: true",
  "tokenHashReturnedToBrowser: true",
  "rawEmailReturnedToBrowser: true",
  "rawPayloadStored: true",
  "rawEvidenceReturned: true",
  "rawBillingDataReturned: true",
  "internalNotesReturned: true",
  "localStorageAllowed: true",
  "sessionStorageAllowed: true",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer confirmation email issuance runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer confirmation email issuance runtime validation passed.");

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
