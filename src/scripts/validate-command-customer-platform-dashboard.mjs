import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const dashboardPath = "src/app/dashboard/page.tsx";
const actionInboxPath = "src/app/dashboard/dashboard-action-inbox.tsx";
const commandCenterPath = "src/app/dashboard/dashboard-business-command-center.tsx";
const reentryPath = "src/app/dashboard/dashboard-control-room-reentry.tsx";
const protectedSuitePath = "src/lib/dashboard-protected-suite-contracts.ts";
const reportsPath = "src/app/dashboard/reports/page.tsx";
const billingPath = "src/app/dashboard/billing/page.tsx";
const notificationsPath = "src/app/dashboard/notifications/page.tsx";
const supportPath = "src/app/dashboard/support/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-customer-platform-dashboard.mjs";

expect(dashboardPath, [
  "Private AI Visibility command center",
  "Your Cendorq command center is ready.",
  "Cendorq keeps AI Visibility, Diagnosis, reports, plans, billing, support, and one clear next command in one protected dashboard.",
  "One next command.",
  "Next best move",
  "Capture the first signal.",
  "Protected Presence Command Center",
  "State, gap, action, control.",
  "Presence report",
  "Choice Gap",
  "Repair Queue",
  "Control Snapshot",
  "Dashboard decision summary",
  "Command path",
  "Scan. Review. Repair. Control.",
  "Dashboard command links",
  "Free Scan creates the account.",
  "Secure access brings customers back.",
  "No cheap dashboard blocks",
  "No clutter wall",
  "hover:-translate-y-0.5",
  "shadow-[0_30px_120px_rgba(2,8,23,0.10)]",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(actionInboxPath, [
  "Customer-led dashboard action inbox",
  "Customer action inbox",
  "Only the actions that protect progress stay here.",
  "No noise. No internal labels.",
  "Why it matters:",
  "Confirm the inbox that owns this account",
  "Review what Build Fix can change",
  "Keep monthly control evidence-led",
  "Open notifications",
  "No conversion role label",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(commandCenterPath, [
  "Dashboard business command center",
  "Customer decision center",
  "Connected customer lanes",
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
  "Dashboard reentry",
  "Protected account re-entry",
  "Dashboard account re-entry",
  "Leave and come back without losing the thread.",
  "No stranded side flows",
  "No restart journey",
  "No token exposure",
  "Best experience:",
  "Cendorq picks up where I left off",
  "The dashboard stays the customer account hub.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(protectedSuitePath, [
  "DASHBOARD_PROTECTED_SUITE_CONTRACTS",
  "DashboardProtectedSuiteContract",
  "reports",
  "billing",
  "notifications",
  "support",
  "/dashboard/reports",
  "/dashboard/billing",
  "/dashboard/notifications",
  "/dashboard/support",
  "primaryCustomerQuestion",
  "safestNextAction",
  "mustShow",
  "mustNotShow",
  "getDashboardProtectedSuiteContracts",
]);

expect(reportsPath, [
  "AI Visibility proof vault",
  "Nothing final until it is approved.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "AI/Search posture",
  "Report vault guardrails",
]);

expect(billingPath, [
  "AI Visibility plan depth",
  "Current access",
  "Next depth",
  "Safety",
  "Review",
  "Repair",
  "Control",
  "Account access AI Visibility standard",
]);

expect(notificationsPath, [
  "AI Visibility signal feed",
  "Priority AI Visibility feed",
  "Quiet feed standard",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Notification AI Visibility feed guardrails",
]);

expect(supportPath, [
  "AI Visibility support routing",
  "Track, then act.",
  "Access issue",
  "Proof question",
  "Repair scope",
  "Control priority",
  "Support routing guardrails",
]);

expect(routesChainPath, [validatorPath]);

forbidden(dashboardPath, [
  "Legacy customer platform dashboard",
  "Customer revenue command path",
  "SCORECARDS",
  "MONEY_SIGNALS",
  "FIRST_SESSION_ACTIONS",
  "Roadmap command timeline",
  "A workspace can exist before a scan.",
  "An account can exist before a scan.",
  "Your Cendorq workspace is ready.",
  "Scan. Diagnose. Fix. Control.",
  "safeProjectionReady",
  "fulfillmentState",
  "backendWorkState",
]);

forbidden(actionInboxPath, [
  "Confirm the inbox that owns this workspace",
  "full diagnosis",
  "pretending to be full diagnosis",
  "Conversion role:",
  "conversionRole",
  "raw payloads, raw evidence",
  "static account page",
]);

forbidden(commandCenterPath, [
  "This is where the customer controls the business journey",
  "Customer controls:",
  "Cendorq guides:",
  "The customer owns the decisions",
  "control room for the customer&apos;s business success",
]);

forbidden(reentryPath, [
  "Workspace",
  "business control room",
  "Use the dashboard link in any Cendorq email",
  "Resume after session expiry",
  "Recover from support or billing",
  "They can leave today and come back to the same business control room tomorrow.",
]);

forbidden(reportsPath, ["ranking guarantee", "AI placement guarantee", "pending report as final"]);
forbidden(billingPath, ["card data", "raw provider payload", "fake urgency", "guaranteed outcomes"]);
forbidden(notificationsPath, ["raw prompts", "private internals", "raw billing IDs", "duplicate anxiety"]);
forbidden(supportPath, ["passwords", "card data", "private keys", "session tokens", "silent scope expansion"]);

boundedLength(dashboardPath, 19000);
boundedLength(actionInboxPath, 12500);
boundedLength(commandCenterPath, 11000);
boundedLength(reentryPath, 9000);
boundedLength(protectedSuitePath, 6500);

if (failures.length) {
  console.error("Customer platform dashboard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform dashboard validation passed with protected dashboard suite contracts, elevated customer action inbox, decision center, protected account re-entry, protected dashboard command strip, protected reports, billing, notifications, support surfaces, account/dashboard command language, Free Scan account creation language, and no internal labels.");

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
