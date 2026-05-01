import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const interfacePath = "src/lib/customer-email-provider-send-interface.ts";
const adapterValidatorPath = "src/scripts/validate-customer-email-provider-dispatch-adapter.mjs";
const failures = [];

expect(interfacePath, [
  "CustomerEmailProviderSendInterfaceInput",
  "CustomerEmailProviderSendInterfaceResult",
  "sendCustomerEmailProviderMessage",
  "getCustomerEmailProviderSendInterfaceRules",
  "projectCustomerEmailProviderSendReadiness",
  "ready-for-approved-provider-adapter",
  "deriveHoldReasons",
  "dispatchAttemptNotReadyForProvider",
  "providerPayloadNotAccepted",
  "providerNotConfigured",
  "ownerApprovalMissing",
  "providerAdapterNotApproved",
  "auditTransitionMissing",
  "liveSendNotRequested",
]);

expect(interfacePath, [
  "projectCustomerEmailProviderConfigurationSummary",
  "providerConfigured",
  "ownerApproved",
  "providerAdapterApproved",
  "auditTransitionPresent",
  "liveSendRequested",
  "providerEventRefHash",
  "providerEventRefHashOnly: true",
  "liveProviderCallImplemented: false",
]);

expect(interfacePath, [
  "Cendorq Support <support@cendorq.com>",
  "send interface is a boundary contract and must not call live providers directly until an approved provider adapter exists",
  "live provider sending requires provider configuration, explicit owner approval, approved provider adapter, and audit transition coverage",
  "provider-ready payload must remain server-side and must never be returned to browser-safe projections",
  "provider response bodies must never be stored; future live sends may store only providerEventRefHash",
  "raw customer emails, raw tokens, token hashes, confirmation URLs, provider secrets, provider payloads, and provider responses must not be returned",
  "browser code must never read provider secrets or carry provider payload authority",
]);

expect(interfacePath, [
  "providerCallMade: false",
  "providerSecretRead: false",
  "rawCustomerEmailReturned: false",
  "rawTokenReturned: false",
  "tokenHashReturned: false",
  "confirmationUrlReturned: false",
  "providerPayloadReturned: false",
  "providerResponseReturned: false",
  "providerResponseStored: false",
  "providerSecretExposed: false",
  "browserVisible: false",
  "localStorageAllowed: false",
  "sessionStorageAllowed: false",
]);

expect(adapterValidatorPath, [
  "src/lib/customer-email-provider-send-interface.ts",
  "validate-customer-email-provider-send-interface.mjs",
  "sendCustomerEmailProviderMessage",
]);

forbidden(interfacePath, [
  "providerCallMade: true",
  "providerSecretRead: true",
  "rawCustomerEmailReturned: true",
  "rawTokenReturned: true",
  "tokenHashReturned: true",
  "confirmationUrlReturned: true",
  "providerPayloadReturned: true",
  "providerResponseReturned: true",
  "providerResponseStored: true",
  "providerSecretExposed: true",
  "browserVisible: true",
  "localStorageAllowed: true",
  "sessionStorageAllowed: true",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "resend.emails.send",
  "fetch(\"https://api",
  "guaranteed inbox placement",
  "guaranteed deliverability",
  "guaranteed ROI",
  "guaranteed revenue",
  "100% accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Customer email provider send interface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email provider send interface validation passed.");

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
