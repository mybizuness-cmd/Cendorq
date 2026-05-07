import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const dashboardPath = "src/app/dashboard/page.tsx";
const actionInboxPath = "src/app/dashboard/dashboard-action-inbox.tsx";
const commandCenterPath = "src/app/dashboard/dashboard-business-command-center.tsx";
const reentryPath = "src/app/dashboard/dashboard-control-room-reentry.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-premium-customer-platform-dashboard.mjs";

expect(dashboardPath, [
  "Visibility command center",
  "Private visibility command center",
  "Know what the market can see, trust, and act on next.",
  "This is not an account page.",
  "Next best move",
  "Finish the first signal.",
  "Dashboard decision summary",
  "Command path",
  "Scan. Diagnose. Fix. Control.",
  "Dashboard command links",
  "No cheap dashboard blocks",
  "No clutter wall",
  "No internal conversion role labels",
  "hover:-translate-y-0.5",
  "shadow-[0_30px_120px_rgba(2,8,23,0.48)]",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(actionInboxPath, [
  "Customer-led dashboard action inbox",
  "Only the actions that protect progress stay here.",
  "No noise. No internal labels.",
  "Why it matters:",
  "Confirm the inbox that owns this workspace",
  "Review what Build Fix can change",
  "Keep monthly control evidence-led",
  "No conversion role label",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(commandCenterPath, [
  "Premium dashboard business command center",
  "The dashboard should answer the customer’s next decision in seconds.",
  "I know what to do next.",
  "Every lane should lead somewhere useful.",
  "Reports, plans, notifications, and support should feel connected",
  "No internal documentation wall",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(reentryPath, [
  "Premium dashboard reentry",
  "Leave and come back without losing the thread.",
  "No stranded side flows",
  "No restart journey",
  "No token exposure",
  "Best experience:",
  "Cendorq picks up where I left off",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(dashboardPath, [
  "Premium customer platform dashboard",
  "Private business command center",
  "Customer revenue command path",
  "Revenue signals",
  "SCORECARDS",
  "MONEY_SIGNALS",
  "FIRST_SESSION_ACTIONS",
  "Dashboard operating snapshot",
  "Dashboard excellence pillars",
  "Roadmap command timeline",
]);

forbidden(actionInboxPath, [
  "Conversion role:",
  "conversionRole",
  "linear-stop",
  "direct-purchase",
  "raw payloads, raw evidence",
  "static account page",
]);

forbidden(commandCenterPath, [
  "This is where the customer controls the business journey",
  "Customer controls:",
  "Cendorq guides:",
  "The customer owns the decisions",
  "premium control room for the customer&apos;s business success",
]);

forbidden(reentryPath, [
  "Use the dashboard link in any Cendorq email",
  "Resume after session expiry",
  "Recover from support or billing",
  "They can leave today and come back to the same business control room tomorrow.",
]);

boundedLength(dashboardPath, 16500);
boundedLength(actionInboxPath, 10500);
boundedLength(commandCenterPath, 10000);
boundedLength(reentryPath, 8000);

if (failures.length) {
  console.error("Customer platform dashboard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform dashboard validation passed with command center language, customer-led modules, and no internal labels.");

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
  if (text.length > maxCharacters) failures.push(`${path} is too long for the dashboard command standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
