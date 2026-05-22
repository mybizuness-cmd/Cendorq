import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/lib/customer-platform-route-map.ts", ["dashboardNotifications", "/dashboard/notifications", "Notification center"]],
  ["src/app/dashboard/page.tsx", ["Notifications", "/dashboard/notifications"]],
  ["src/app/dashboard/notifications/page.tsx", ["AI Visibility signal feed", "CUSTOMER_NOTIFICATION_CONTRACTS", "CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS", "SupportLifecycleNotificationList", "NOTIFICATION_HANDOFFS", "PRIORITY_FEED", "QUIET_FEED_RULES", "Live support lifecycle notification feed", "Track status", "Open the proof record.", "Scan. Review. Repair. Control. One safe next action each."]],
  ["src/components/customer-notifications/support-lifecycle-notification-list.tsx", ["use client", "SupportLifecycleNotificationList", "NotificationFeedScope = \"unread\" | \"all\"", "Show history", "Show unread", "Refresh notifications", "customer-safe notification projection only"]],
  ["src/app/api/customer/notifications/route.ts", ["runtime = \"nodejs\"", "dynamic = \"force-dynamic\"", "requireCustomerSession", "requireVerifiedEmail: true", "jsonNoStore", "MAX_NOTIFICATION_LIMIT", "support-lifecycle"]],
  ["src/lib/customer-notification-contracts.ts", ["CUSTOMER_NOTIFICATION_CONTRACTS", "CUSTOMER_NOTIFICATION_GLOBAL_GUARDS", "email-confirmation-required", "free-scan-ready", "billing-action-required", "support-request-received", "security-reauth-required"]],
  ["src/lib/customer-support-lifecycle-notification-contracts.ts", ["CUSTOMER_SUPPORT_LIFECYCLE_NOTIFICATION_CONTRACTS", "support-request-received-status-ready", "support-request-reviewing", "support-request-waiting-on-customer", "support-request-resolved"]],
  ["docs/owner-maximum-protection-posture.md", ["# Owner Maximum Protection Posture", "Protected customer and report surfaces require the correct verified access path."]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-customer-notification-center.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Customer notification center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer notification center validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}
