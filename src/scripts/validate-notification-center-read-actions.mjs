import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const pagePath = "src/app/dashboard/notifications/page.tsx";
const listPath = "src/components/customer-notifications/support-lifecycle-notification-list.tsx";
const readRoutePath = "src/app/api/customer/notifications/read/route.ts";
const apiPath = "src/app/api/customer/notifications/route.ts";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-notification-center-read-actions.mjs";

expect(pagePath, [
  "SupportLifecycleNotificationList",
  "Live support lifecycle notification feed",
  "Mark all read",
  "Mark read",
]);

expect(listPath, [
  "use client",
  "SupportLifecycleNotificationList",
  "fetch(\"/api/customer/notifications?source=support-lifecycle&limit=25\"",
  "fetch(\"/api/customer/notifications/read\"",
  "CustomerNotificationReadSuccess",
  "CustomerNotificationReadResponse",
  "markNotificationRead",
  "notificationId: entry.notificationId",
  "markAllSupportLifecycle: true",
  "rawPayloadReturned: false",
  "rawEvidenceReturned: false",
  "internalNotesReturned: false",
  "Mark all read",
  "Mark read",
  "Notification marked read.",
  "Notification was already read.",
  "Customer-owned support alerts from the protected notification API.",
  "customer-safe notification projection only",
]);

expect(readRoutePath, [
  "requireCustomerSession(request, { requireVerifiedEmail: true })",
  "entry.customerIdHash !== customerIdHash",
  "state: \"read\" as const",
  "readAt: entry.readAt || now",
  "rawPayloadReturned: false",
  "rawEvidenceReturned: false",
  "internalNotesReturned: false",
]);

expect(apiPath, [
  "entry.customerIdHash === sessionAccess.customerIdHash",
  "projectCustomerSupportNotificationRecord(entry)",
  "source: \"support-lifecycle\"",
]);

expect(routesChainPath, [validatorPath]);

forbidden(pagePath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "customerIdHash",
  "auditEventId",
]);

forbidden(listPath, [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "customerIdHash",
  "auditEventId",
  "console.log",
]);

if (failures.length) {
  console.error("Notification center read action validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center read action validation passed with live support lifecycle rendering, safe read acknowledgement calls, customer-owned API projection, no raw/internal fields, and route-chain coverage.");

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
