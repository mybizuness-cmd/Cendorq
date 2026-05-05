import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const queueContractsPath = "src/lib/customer-support-email-queue-contracts.ts";
const emailContractsPath = "src/lib/customer-support-lifecycle-email-contracts.ts";
const statusContractsPath = "src/lib/customer-support-status-contracts.ts";
const packagePath = "package.json";

expect(queueContractsPath, [
  "CustomerSupportEmailQueueContract",
  "CustomerSupportEmailQueueState",
  "CustomerSupportEmailQueuePriority",
  "CUSTOMER_SUPPORT_EMAIL_QUEUE_REQUIRED_FIELDS",
  "CUSTOMER_SUPPORT_EMAIL_QUEUE_STATE_RULES",
  "CUSTOMER_SUPPORT_EMAIL_QUEUE_STORAGE_RULES",
  "CUSTOMER_SUPPORT_EMAIL_QUEUE_BLOCKED_CONTENT",
  "CUSTOMER_SUPPORT_EMAIL_QUEUE_GUARDS",
  "getCustomerSupportEmailQueueContracts",
  "queueId",
  "customerIdHash",
  "recipientEmailRef",
  "supportRequestId",
  "templateKey",
  "CustomerSupportLifecycleEmailKey",
  "CustomerSupportCustomerVisibleStatus",
  "senderName: \"Cendorq Support\"",
  "fromAddress: \"support@cendorq.com\"",
  "retryCount",
  "nextRetryAt",
  "suppressionKey",
  "suppressionReason",
  "bounceReason",
  "complaintReason",
  "failureReason",
  "dashboardPath",
  "auditEventId",
  "rawPayloadStored: false",
  "rawEvidenceStored: false",
  "rawSecurityPayloadStored: false",
  "rawBillingDataStored: false",
  "internalNotesStored: false",
  "recipientEmailStored: false",
  "providerPayloadStored: false",
  "secretsStored: false",
  "queued means customer ownership, customer-safe status projection, lifecycle email template, and recipientEmailRef are present but no provider send has started",
  "support lifecycle email queue records store recipientEmailRef rather than raw customer email addresses",
  "support lifecycle email queue records are idempotent per customerIdHash, supportRequestId, templateKey, status, and recipientEmailRef",
  "support lifecycle email queue records do not send email by themselves; provider sending requires a future guarded runtime with explicit validation",
  "no support lifecycle email queue record sends email directly or calls an external email provider",
  "unsupported ROI promise",
  "Cendorq Support <support@cendorq.com>",
]);

expect(emailContractsPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_EMAIL_CONTRACTS",
  "CustomerSupportLifecycleEmailKey",
  "support-email-received-status-ready",
  "support-email-reviewing",
  "support-email-waiting-on-customer",
  "support-email-specialist-review",
  "support-email-resolved",
  "support-email-closed",
  "all support lifecycle emails use Cendorq Support <support@cendorq.com>",
]);

expect(statusContractsPath, [
  "CUSTOMER_SUPPORT_STATUS_CONTRACTS",
  "CustomerSupportCustomerVisibleStatus",
  "waiting-on-customer",
  "closed",
]);

expect(packagePath, [
  "validate:routes",
  "validate-customer-support-email-queue-contracts.mjs",
]);

forbidden(queueContractsPath, [
  "rawPayloadStored: true",
  "rawEvidenceStored: true",
  "rawSecurityPayloadStored: true",
  "rawBillingDataStored: true",
  "internalNotesStored: true",
  "recipientEmailStored: true",
  "providerPayloadStored: true",
  "secretsStored: true",
  "rawEmailStored: true",
  "passwordStored: true",
  "adminKeyStored: true",
  "sessionTokenStored: true",
  "csrfTokenStored: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
  "sendGrid",
  "resend.emails.send",
  "fetch(\"https://api",
  "provider API key stored",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed ROI",
  "fake urgency allowed",
  "audit deletion claim allowed",
]);

if (failures.length) {
  console.error("Customer support email queue contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support email queue contracts validation passed.");

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
