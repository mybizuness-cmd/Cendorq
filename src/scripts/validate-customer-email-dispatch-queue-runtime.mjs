import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const queuePath = "src/lib/customer-email-dispatch-queue-runtime.ts";
const adapterPath = "src/lib/customer-email-provider-dispatch-adapter.ts";
const auditPath = "src/lib/customer-email-dispatch-audit-runtime.ts";
const runnerPath = "src/lib/customer-email-dispatch-runner-runtime.ts";
const adapterValidatorPath = "src/scripts/validate-customer-email-provider-dispatch-adapter.mjs";
const auditValidatorPath = "src/scripts/validate-customer-email-dispatch-audit-runtime.mjs";
const runnerValidatorPath = "src/scripts/validate-customer-email-dispatch-runner-runtime.mjs";
const issuancePath = "src/lib/customer-confirmation-email-issuance-runtime.ts";
const issuanceValidatorPath = "src/scripts/validate-customer-confirmation-email-issuance-runtime.mjs";
const failures = [];

expect(queuePath, [
  "CustomerEmailDispatchQueueRecord",
  "CustomerEmailDispatchQueueSafeProjection",
  "UpdateCustomerEmailDispatchQueueStateInput",
  "enqueueCustomerEmailDispatch",
  "updateCustomerEmailDispatchQueueState",
  "applyQueueStateMutation",
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
  "customer email dispatch queue state mutations update state timestamps and retry metadata without storing raw emails, tokens, confirmation URLs, provider payloads, provider responses, or secrets",
]);

expect(queuePath, [
  "sendingAt",
  "sentAt",
  "failedAt",
  "cancelledAt",
  "retryCount",
  "nextRetryAt",
  "failureReason",
  "suppressionKey",
  "suppressionReason",
  "if (input.expectedState && existing.state !== input.expectedState) return projectCustomerEmailDispatchQueueRecord(existing);",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawBillingDataStored: false",
  "internalNotesStored: false",
]);

expect(queuePath, [
  "customer email dispatch queue records store recipientEmailRef rather than raw customer email addresses",
  "customer email dispatch queue records store confirmationUrlHash rather than confirmationUrl or raw token",
  "customer email dispatch queue records are idempotent per customerIdHash, recipientEmailRef, templateKey, and confirmationUrlHash",
  "entry.confirmationUrlHash === record.confirmationUrlHash",
]);

expect(adapterPath, [
  "prepareCustomerEmailProviderDispatchAttempt",
  "getCustomerEmailProviderDispatchAdapterRules",
  "ready-for-provider",
  "dry-run-ready",
  "providerConfigured",
  "ownerApproved",
  "provider payload remains server-only and is never returned to browser-safe projections",
  "providerCallMade: false",
  "providerSecretRead: false",
  "browserVisible: false",
  "customerEmailReturned: false",
  "rawTokenReturned: false",
  "tokenHashReturned: false",
  "providerPayloadReturned: false",
]);

expect(auditPath, [
  "recordCustomerEmailDispatchTransition",
  "projectCustomerEmailDispatchAuditTransition",
  "getCustomerEmailDispatchAuditRules",
  "customer-email-dispatch-audit.v3.json",
  "providerPayloadHash",
  "providerEventRefHash",
  "dispatch audit transitions never store raw customer emails, raw tokens, token hashes, confirmation URLs, secrets, raw evidence, raw billing data, or internal notes",
  "rawCustomerEmailStored: false",
  "confirmationUrlStored: false",
  "providerPayloadStored: false",
  "providerResponseStored: false",
]);

expect(runnerPath, [
  "runCustomerEmailDispatchCycle",
  "getCustomerEmailDispatchRunnerRules",
  "prepareCustomerEmailProviderDispatchAttempt",
  "updateCustomerEmailDispatchQueueState",
  "recordCustomerEmailDispatchTransition",
  "dispatch runner must use provider dispatch adapter before queue mutation",
  "dispatch runner must record an audit transition for every queue mutation decision",
  "providerCallMade: false",
  "providerSecretRead: false",
  "browserVisible: false",
  "confirmationUrlReturned: false",
  "providerResponseReturned: false",
]);

expect(adapterValidatorPath, [
  "Customer email provider dispatch adapter validation passed.",
  "src/lib/customer-email-provider-dispatch-adapter.ts",
  "prepareCustomerEmailProviderDispatchAttempt",
]);

expect(auditValidatorPath, [
  "Customer email dispatch audit runtime validation passed.",
  "src/lib/customer-email-dispatch-audit-runtime.ts",
  "recordCustomerEmailDispatchTransition",
]);

expect(runnerValidatorPath, [
  "Customer email dispatch runner runtime validation passed.",
  "src/lib/customer-email-dispatch-runner-runtime.ts",
  "runCustomerEmailDispatchCycle",
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
forbidden(adapterPath, unsafePhrases());
forbidden(auditPath, unsafePhrases());
forbidden(runnerPath, unsafePhrases());
forbidden(issuancePath, unsafePhrases());

if (failures.length) {
  console.error("Customer email dispatch queue runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email dispatch queue runtime validation passed with state mutation, provider dispatch adapter, audit, and runner coverage.");

function unsafePhrases() {
  return [
    "sendGrid",
    "resend.emails.send",
    "fetch(\"https://api",
    "process.env.RESEND_API_KEY",
    "process.env.SENDGRID_API_KEY",
    "providerPayloadStored: true",
    "providerResponseStored: true",
    "rawCustomerEmailStored: true",
    "confirmationUrlStored: true",
    "rawTokenStored: true",
    "tokenHashStored: true",
    "rawEmailStored: true",
    "rawPayloadStored: true",
    "rawEvidenceStored: true",
    "rawBillingDataStored: true",
    "internalNotesStored: true",
    "secretsStored: true",
    "providerCallMade: true",
    "providerSecretRead: true",
    "browserVisible: true",
    "customerEmailReturned: true",
    "confirmationUrlReturned: true",
    "providerResponseReturned: true",
    "providerPayloadReturnedToBrowser: true",
    "providerPayloadReturned: true",
    "rawTokenReturnedToBrowser: true",
    "tokenHashReturnedToBrowser: true",
    "rawEmailReturnedToBrowser: true",
    "rawTokenReturned: true",
    "tokenHashReturned: true",
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
