import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const notificationPath = "src/app/dashboard/notifications/page.tsx";
const supportPath = "src/app/dashboard/support/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-notification-support-routing.mjs";

expect(notificationPath, [
  "Plan notification decision routes",
  "Every alert needs a value, a boundary, and a safe next action.",
  "NOTIFICATION_DECISION_ROUTES",
  "ALERT_ROUTING_STANDARDS",
  "Report alert",
  "Billing alert",
  "Support alert",
  "Security alert",
  "customerValue",
  "boundary",
  "nextAction",
  "Free Scan result ready",
  "Diagnosis is the right next depth",
  "Fix target is clear",
  "Monthly watch is needed",
  "PLAN_VALUE_SEPARATION_RULES",
  "getPlanValueDelivery",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportPath, [
  "Support routing map",
  "Pick the narrowest path that matches the blocker.",
  "Plan support boundaries",
  "Support explains the plan. It does not quietly expand it.",
  "SUPPORT_ROUTING_MAP",
  "PLAN_SUPPORT_BOUNDARIES",
  "Billing issue",
  "Report question",
  "Build Fix scope question",
  "Ongoing Control monthly priority",
  "Account access",
  "Correction or dispute",
  "customerValue",
  "safeBoundary",
  "nextAction",
  "supportRole",
  "supportMustNot",
  "PLAN_VALUE_SEPARATION_RULES",
  "getPlanValueDelivery",
  "getCendorqPlanPrice",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(notificationPath, [
  "fake urgency",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
  "raw security payload",
  "raw billing ids",
]);

forbidden(supportPath, [
  "support will refund",
  "support will change the report",
  "unlimited build fix",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
  "submit card number",
]);

if (failures.length) {
  console.error("Notification and support routing validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification and support routing validation passed with value, boundary, and safe next-action coverage.");

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
  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
