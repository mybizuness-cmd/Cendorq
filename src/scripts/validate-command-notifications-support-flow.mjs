import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const notificationsPath = "src/app/dashboard/notifications/page.tsx";
const supportPath = "src/app/dashboard/support/page.tsx";
const supportRequestPath = "src/app/dashboard/support/request/page.tsx";
const supportStatusPath = "src/app/dashboard/support/status/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-notifications-support-flow.mjs";

expect(notificationsPath, [
  "Readiness signal feed",
  "Act only on signals that protect readiness progress.",
  "Priority readiness feed",
  "Scan. Review. Repair. Control. One safe next action each.",
  "Signal routing types",
  "Featured customer signals",
  "Quiet feed standard",
  "Signals should create confidence, not noise.",
  "No generic notification clutter",
  "No raw evidence, secrets, prompts, private internals, raw billing IDs, attacker details, risk-scoring internals, or duplicate-request anxiety.",
  "Readiness proof",
  "Readiness alerts must name the value, the boundary, and the next action before sending customers to checkout.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportPath, [
  "Readiness resolution routing",
  "Route the blocker without weakening the readiness path.",
  "Resolution selector",
  "Pick the narrowest path that matches the blocker.",
  "Help should restore momentum without expanding scope silently.",
  "Access issue",
  "Proof question",
  "Repair scope",
  "Control priority",
  "Account access",
  "Correction or dispute",
  "No support dumping ground",
  "No raw secrets",
  "No duplicate request anxiety",
  "Scan. Review. Repair. Control.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportRequestPath, [
  "Readiness resolution intake",
  "Send the safe summary that moves the blocker forward.",
  "Safe summary only.",
  "Update only when asked.",
  "No duplicate requests",
  "No private data dump",
  "No readiness-depth shortcut",
  "Track status first.",
  "New blocker",
  "Asked for context",
  "Already submitted",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(supportStatusPath, [
  "Readiness resolution status",
  "Know where the blocker stands and what to do next.",
  "Show progress without exposing internals.",
  "Return to the right layer.",
  "No generic ticket tracker",
  "No internal notes",
  "No raw evidence",
  "No duplicate support loop",
  "Status safety standard",
  "Return to readiness depth",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(notificationsPath, [
  "Premium notification command feed",
  "Market signal feed",
  "Plan notification decision routes",
  "Every alert needs a value, a boundary, and a safe next action.",
  "ALERT_ROUTING_STANDARDS",
  "FIRST_USE_SNAPSHOT",
  "NOTIFICATION_GROUPS",
  "SupportLifecycleNotificationList",
  "Scan. Diagnose. Fix. Control.",
]);

forbidden(supportPath, [
  "Premium support routing center",
  "Market resolution routing",
  "Route the blocker without blurring the plan.",
  "Support routing map",
  "Plan support boundaries",
  "SUPPORT_FIRST_USE_SNAPSHOT",
  "SUPPORT_FIRST_USE_ACTIONS",
  "SUPPORT_FIRST_USE_RULES",
  "SUPPORT_SAFETY_RULES",
  "Scan. Diagnose. Fix. Control.",
]);

forbidden(supportRequestPath, [
  "Premium protected support intake",
  "Market resolution intake",
  "REQUEST_PATHS = [\n  { title: \"Resolve report question\"",
  "Get the blocker out of the way.",
  "Resolve report question",
  "Fix billing blocker",
  "Choose plan depth",
  "SUPPORT_REQUEST_FIRST_USE_SNAPSHOT",
  "SUPPORT_REQUEST_FIRST_USE_ACTIONS",
  "SUPPORT_REQUEST_FIRST_USE_RULES",
]);

forbidden(supportStatusPath, [
  "Premium support status",
  "Market resolution status",
  "Resolve the issue and keep the account moving.",
  "MOMENTUM_ACTIONS",
  "SUPPORT_STATUS_FIRST_USE_SNAPSHOT",
  "SUPPORT_STATUS_FIRST_USE_ACTIONS",
  "SUPPORT_STATUS_FIRST_USE_RULES",
]);

boundedLength(notificationsPath, 13500);
boundedLength(supportPath, 13500);
boundedLength(supportRequestPath, 9500);
boundedLength(supportStatusPath, 8500);

if (failures.length) {
  console.error("Readiness notifications and support flow validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Readiness notifications and support flow validation passed with quiet signals, routed support, safe intake, and customer-safe status.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the readiness notification/support standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
