import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const dashboardPath = "src/app/dashboard/page.tsx";
const reportsPath = "src/app/dashboard/reports/page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const notificationsPath = "src/app/dashboard/notifications/page.tsx";
const supportPath = "src/app/dashboard/support/page.tsx";
const supportRequestPath = "src/app/dashboard/support/request/page.tsx";
const supportStatusPath = "src/app/dashboard/support/status/page.tsx";
const commandCenterPath = "src/app/dashboard/dashboard-business-command-center.tsx";
const reentryPath = "src/app/dashboard/dashboard-control-room-reentry.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-customer-dashboard-platform-elevation.mjs";

expect(dashboardPath, [
  "Private business command center",
  "Know what is ready, what is blocked, and what moves revenue next.",
  "This dashboard is not an account page.",
  "Open Free Scan result",
  "/dashboard/reports/free-scan",
  "Four levels. Four different jobs. One dashboard decision.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "No internal conversion role labels",
]);

expect(commandCenterPath, [
  "Business command center",
  "The dashboard should answer the customer’s next decision in seconds.",
  "I know what to do next.",
  "Every lane should lead somewhere useful.",
]);

expect(reentryPath, [
  "Leave and come back without losing the thread.",
  "The dashboard stays the customer control room.",
  "Support, billing, reports, and notifications should always link back to the dashboard.",
]);

expect(reportsPath, [
  "Report vault",
  "See every approved report in the dashboard, then recover paid reports from email.",
  "Every paid report needs both a vault copy and an email attachment after approval.",
  "Every paid plan report must be accessible from the dashboard report vault and also delivered by email with an approved PDF attachment.",
  "Free Scan result",
  "Deep Review report",
  "Build Fix summary",
  "Ongoing Control monthly summary",
  "Dashboard-only protected result",
  "Dashboard report plus",
  "email attachment",
]);

expect(billingPath, [
  "Know what is active, what unlocked, and what Cendorq needs next.",
  "Billing should not feel like a receipt drawer.",
  "Payment should unlock a workflow, not just a line item.",
  "Money moments should feel calm, exact, and recoverable.",
  "Does not unlock unlimited Build Fix work",
]);

expect(notificationsPath, [
  "Notification command feed",
  "Act only on alerts that protect progress.",
  "Four plan moments. One safe next action each.",
  "Alerts should create confidence, not noise.",
  "Not unlimited Build Fix",
]);

expect(supportPath, [
  "Support",
  "billing",
  "report",
  "Build Fix",
  "Ongoing Control",
]);
expect(supportRequestPath, ["support", "request"]);
expect(supportStatusPath, ["support", "status"]);
expect(routesChainPath, [validatorPath]);

reject(dashboardPath, ["Premium"]);
reject(reportsPath, ["Premium"]);
reject(billingPath, ["Premium"]);
reject(notificationsPath, ["Premium"]);
reject(commandCenterPath, ["Premium"]);
reject(reentryPath, ["Premium"]);
reject(supportPath, ["Premium"]);
reject(supportRequestPath, ["Premium"]);
reject(supportStatusPath, ["Premium"]);

rejectAcross([dashboardPath, reportsPath, billingPath, notificationsPath, supportPath], [
  "guaranteed ranking",
  "guaranteed AI placement",
  "guaranteed revenue",
  "guaranteed ROI",
  "unlimited Build Fix",
]);

boundedLength(dashboardPath, 19000);
boundedLength(reportsPath, 26000);
boundedLength(billingPath, 24000);
boundedLength(notificationsPath, 24000);

if (failures.length) {
  console.error("Customer dashboard platform elevation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer dashboard platform elevation validation passed with command-center dashboard language, separated report vault, paid report delivery rules, plan boundaries, and no generic Premium wording on target customer surfaces.");

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

function reject(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} should not include phrase: ${phrase}`);
  }
}

function rejectAcross(paths, phrases) {
  for (const path of paths) reject(path, phrases);
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for dashboard platform elevation standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
