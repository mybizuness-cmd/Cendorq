import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

expect("src/lib/customer-platform-route-map.ts", [
  "dashboardNotifications",
  "/dashboard/notifications",
  "Notification center",
  "notification center access requires authenticated customer ownership and route authorization",
  "notification center must not render raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
]);

expect("src/app/dashboard/page.tsx", [
  "Check notifications",
  "/dashboard/notifications",
  "Review account, report, billing, support, and security updates.",
]);

expect("src/app/dashboard/notifications/page.tsx", [
  "Notification center",
  "noIndex: true",
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "SupportLifecycleNotificationList",
  "Important alerts, without noise or hidden risk.",
  "raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
  "email-confirmation-required",
  "free-scan-ready",
  "billing-action-required",
  "security-reauth-required",
  "Notifications require customer ownership and route authorization.",
  "Billing alerts require entitlement and billing-state checks.",
  "Conversion alerts require proof, confidence, limitation, and plan-stage logic.",
  "Security alerts never reveal attacker details, risk-scoring internals, or secrets.",
]);

expect("src/components/customer-notifications/support-lifecycle-notification-list.tsx", [
  "use client",
  "SupportLifecycleNotificationList",
  "/api/customer/notifications?source=support-lifecycle&limit=25",
  "Refresh notifications",
  "Customer-owned support alerts from the protected notification API.",
  "No live support lifecycle notifications are visible yet.",
  "Open notifications from the authenticated customer dashboard and try again.",
  "SupportLifecycleNotificationEntry",
  "customerVisibleTitle",
  "customerVisibleBody",
  "primaryPath",
  "supportRequestId",
  "formatStatus",
  "formatChannel",
  "formatState",
  "Open safe path",
  "customer-safe notification projection only",
  "Raw payloads, evidence, billing data, internal notes, audit internals, suppression reasons, operator identities, risk scoring, secrets, and support context keys are not rendered here.",
]);

expect("src/app/api/customer/notifications/route.ts", [
  "requireCustomerSession",
  "requireVerifiedEmail: true",
  "entry.customerIdHash === sessionAccess.customerIdHash",
  "projectCustomerSupportNotificationRecord",
]);

expect("src/lib/customer-notification-contracts.ts", [
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "CUSTOMER_NOTIFICATION_GLOBAL_GUARDS",
  "no customer notification without customer ownership and route authorization",
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

expect(packagePath, [
  "validate:routes",
  "validate-customer-notification-center.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

forbidden("src/app/dashboard/notifications/page.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "guaranteed ROI",
  "fake urgency",
  "false scarcity",
  "attacker payload",
  "risk-scoring internals are shown",
]);

forbidden("src/components/customer-notifications/support-lifecycle-notification-list.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "customerIdHash",
  "auditEventId",
  "suppressionReason",
  "failureReason",
  "rawPayloadStored",
  "rawEvidenceStored",
  "rawSecurityPayloadStored",
  "rawBillingDataStored",
  "internalNotesStored",
  "operatorId",
  "operatorIdHash",
  "riskScoringInternals",
  "attackerDetails",
  "adminReadKey",
  "supportContextKey",
  "sessionToken",
  "csrfToken",
  "console.log",
]);

if (failures.length) {
  console.error("Customer notification center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer notification center validation passed with owner posture coverage.");

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
