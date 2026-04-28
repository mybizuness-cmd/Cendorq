import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("src/lib/customer-platform-route-map.ts", [
  "dashboardNotifications",
  "/dashboard/notifications",
  "Notification center",
  "notification center access requires authenticated customer ownership and route authorization",
  "notification center must not render raw evidence, raw security payloads, raw billing IDs, secrets, prompts, or private report internals",
]);

expect("src/app/dashboard/page.tsx", [
  "Open notification center",
  "/dashboard/notifications",
  "account, report, billing, support, and security alerts without raw private data exposure",
]);

expect("src/app/dashboard/notifications/page.tsx", [
  "Notification center",
  "noIndex: true",
  "CUSTOMER_NOTIFICATION_CONTRACTS",
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

expect("src/lib/customer-notification-contracts.ts", [
  "CUSTOMER_NOTIFICATION_CONTRACTS",
  "CUSTOMER_NOTIFICATION_GLOBAL_GUARDS",
  "no customer notification without customer ownership and route authorization",
]);

expect("package.json", [
  "validate:routes",
  "validate-customer-notification-center.mjs",
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

if (failures.length) {
  console.error("Customer notification center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer notification center validation passed.");

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
