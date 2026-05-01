import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const queuePath = "src/lib/customer-email-dispatch-queue-runtime.ts";
const issuancePath = "src/lib/customer-confirmation-email-issuance-runtime.ts";
const issuanceValidatorPath = "src/scripts/validate-customer-confirmation-email-issuance-runtime.mjs";
const failures = [];

expect(queuePath, [
  "CustomerEmailDispatchQueueRecord",
  "CustomerEmailDispatchQueueSafeProjection",
  "enqueueCustomerEmailDispatch",
  "projectCustomerEmailDispatchQueueRecord",
  "getCustomerEmailDispatchQueueStorageRules",
  "customer-email-dispatch-queue.v3.json",
  "recipientEmailRef",
  "confirmationUrlHash",
  "Cendorq Support",
  "support@cendorq.com",
  "providerPayloadStored: false",
  "rawTokenStored: false",
  "tokenHashStored: false",
  "rawEmailStored: false",
  "secretsStored: false",
  "customer email dispatch queue records do not store providerReadyPayload or call an external email provider",
]);

expect(queuePath, [
  "customer email dispatch queue records store recipientEmailRef rather than raw customer email addresses",
  "customer email dispatch queue records store confirmationUrlHash rather than confirmationUrl or raw token",
  "customer email dispatch queue records are idempotent per customerIdHash, recipientEmailRef, templateKey, and confirmationUrlHash",
  "entry.confirmationUrlHash === record.confirmationUrlHash",
]);

expect(issuancePath, [
  "enqueueCustomerEmailDispatch",
  "CustomerEmailDispatchQueueSafeProjection",
  "dispatchQueue",
  "queued: dispatchQueue.state === \"queued\"",
  "providerPayloadReturnedToBrowser: false",
  "dispatchQueue: payload.dispatchQueue",
  "normalizeDashboardPath",
]);

expect(issuanceValidatorPath, [
  "src/lib/customer-email-dispatch-queue-runtime.ts",
  "validate-customer-email-dispatch-queue-runtime.mjs",
  "dispatchQueue",
  "providerPayloadReturnedToBrowser: false",
]);

forbidden(queuePath, unsafePhrases());
forbidden(issuancePath, unsafePhrases());

if (failures.length) {
  console.error("Customer email dispatch queue runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email dispatch queue runtime validation passed.");

function unsafePhrases() {
  return [
    "sendGrid",
    "resend.emails.send",
    "fetch(\"https://api",
    "providerPayloadStored: true",
    "rawTokenStored: true",
    "tokenHashStored: true",
    "rawEmailStored: true",
    "secretsStored: true",
    "providerPayloadReturnedToBrowser: true",
    "rawTokenReturnedToBrowser: true",
    "tokenHashReturnedToBrowser: true",
    "rawEmailReturnedToBrowser: true",
    "localStorage.setItem",
    "sessionStorage.setItem",
    "guaranteed inbox placement",
    "guaranteed deliverability",
    "guaranteed ROI",
    "guaranteed revenue",
    "100% accurate",
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
