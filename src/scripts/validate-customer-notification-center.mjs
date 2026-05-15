import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const routeMapPath = "src/lib/customer-platform-route-map.ts";
const dashboardPath = "src/app/dashboard/page.tsx";
const pagePath = "src/app/dashboard/notifications/page.tsx";
const lifecycleListPath = "src/components/customer-notifications/support-lifecycle-notification-list.tsx";
const apiPath = "src/app/api/customer/notifications/route.ts";
const notificationContractsPath = "src/lib/customer-notification-contracts.ts";
const lifecycleContractsPath = "src/lib/customer-support-lifecycle-notification-contracts.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-notification-center.mjs";

expect(routeMapPath, [
  "dashboardNotifications",
  "/dashboard/notifications",
  "Notification center",
  "notification center access requires authenticated customer ownership and route authorization",
  "notification center must not render raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
]);

expect(dashboardPath, [
  "Check notifications",
  "/dashboard/notifications",
  "Review account, report, billing, support, and security updates.",
]);

expect(pagePath, [
  "Readiness signal feed",
  "Your private Cendorq signal feed for readiness proof, billing, support, account, and security actions that protect progress.",
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "NOTIFICATION_HANDOFFS",
  "PRIORITY_FEED",
  "QUIET_FEED_RULES",
  "Act only on signals that protect readiness progress.",
  "This feed should stay quiet until something matters: proof is ready, access changes, support needs context, or a safer action is required.",
  "Open readiness proof",
  "Track status",
  "Open the proof record.",
  "Ready alerts should lead to proof before checkout.",
  "Scan. Review. Repair. Control. One safe next action each.",
  "No generic clutter. Every signal should point to proof, access, status, or safe recovery.",
  "Proof signal",
  "Access signal",
  "Support signal",
  "Security signal",
  "Featured customer signals",
  "Signals should create confidence, not noise.",
  "Notifications show safe customer summaries, not raw evidence, secrets, prompts, private internals, or raw billing IDs.",
  "Notification paid actions route to plan detail pages before payment.",
  "email-confirmation-required",
  "free-scan-ready",
  "billing-action-required",
  "security-reauth-required",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(lifecycleListPath, [
  "use client",
  "SupportLifecycleNotificationList",
  "fetch(\"/api/customer/notifications?source=support-lifecycle&limit=25\"",
  "Customer-owned support alerts from the protected notification API.",
  "These records come from the protected notification center API and are projected for the signed-in customer only.",
  "Raw payloads, evidence, billing data, internal notes, audit internals, suppression reasons, operator identities, risk scoring, secrets, and support context keys are not rendered here.",
  "Refresh notifications",
  "Loading protected support lifecycle notifications...",
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
]);

expect(apiPath, [
  "runtime = \"nodejs\"",
  "dynamic = \"force-dynamic\"",
  "requireCustomerSession",
  "requireVerifiedEmail: true",
  "entry.customerIdHash === sessionAccess.customerIdHash",
  "projectCustomerSupportNotificationRecord",
  "jsonNoStore",
  "optionsNoStore(\"GET,OPTIONS\")",
  "MAX_NOTIFICATION_LIMIT",
  "cleanSource",
  "support-lifecycle",
]);

expect(notificationContractsPath, [
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "CUSTOMER_NOTIFICATION_GLOBAL_GUARDS",
  "email-confirmation-required",
  "free-scan-ready",
  "billing-action-required",
  "support-request-received",
  "security-reauth-required",
  "no customer notification without customer ownership and route authorization",
  "no notification renders raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
  "no conversion notification without proof, confidence, limitation, and plan-stage logic",
  "no billing notification without entitlement and billing-state checks",
  "no security notification reveals attacker details, risk-scoring internals, or secrets",
]);

expect(lifecycleContractsPath, [
  "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS",
  "support-request-received",
  "support-waiting-on-customer",
  "support-specialist-review",
  "support-resolved",
  "support-closed",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
  "Sensitive operational details are summarized safely instead of copied into public, customer, or operator-visible text.",
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

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "guaranteed ROI",
  "fake urgency",
  "false scarcity",
  "attacker payload",
  "risk-scoring internals are shown",
]);

forbidden(lifecycleListPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "x-support-admin-key",
  "x-cendorq-customer-context",
  "CUSTOMER_SUPPORT_CONTEXT_KEY",
  "SUPPORT_CONSOLE_READ_KEY",
  "customerIdHash",
  "auditEventId",
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

console.log("Customer notification center validation passed with current readiness signal feed, customer-safe notification API, lifecycle projection, and owner posture coverage.");

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
