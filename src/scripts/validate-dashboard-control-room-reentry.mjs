import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const componentPath = "src/app/dashboard/dashboard-control-room-reentry.tsx";
const dashboardPath = "src/app/dashboard/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const failures = [];

expect(componentPath, [
  "DashboardControlRoomReentry",
  "Return path",
  "They can leave today and come back to the same business control room tomorrow.",
  "The dashboard should feel permanent.",
  "email links",
  "public sign-in",
  "safe session resume",
  "back-to-dashboard links",
  "I can come back whenever I’m ready, and Cendorq will pick up exactly where I left off.",
]);

expect(componentPath, [
  "Use the dashboard link in any Cendorq email",
  "Return from the public site",
  "Resume after session expiry",
  "Recover from support or billing",
  "Report-ready emails, billing updates, support messages, and plan-status follow-ups should always bring the customer back to the same private control room.",
  "A returning customer should be able to use Sign in or Dashboard from public navigation",
  "safe sign-in or magic-link re-auth",
  "return them to the dashboard without restarting the scan or purchase journey",
  "Support, billing, and report vault surfaces should always link back to the dashboard",
]);

expect(componentPath, [
  "The dashboard is the customer control room; every external email and protected surface should route back to it.",
  "Returning later must not require repeating one-time inbox confirmation, onboarding, or Free Scan intake unless the customer chooses to update information.",
  "Expired sessions should use safe re-auth and then return to the originally requested dashboard destination.",
  "Re-entry copy must avoid account-existence leakage, raw session tokens, magic-link token exposure, provider payloads, and pressure-based upgrade language.",
]);

expect(dashboardPath, [
  "DashboardControlRoomReentry",
  "./dashboard-control-room-reentry",
  "<DashboardControlRoomReentry />",
  "DashboardBusinessCommandCenter",
  "DashboardActionInbox",
]);

expect(routesChainPath, [
  "src/scripts/validate-dashboard-control-room-reentry.mjs",
]);

forbidden(componentPath, [
  "restart the scan",
  "repeat inbox confirmation",
  "repeat onboarding",
  "guaranteed inbox",
  "guaranteed primary inbox",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed accuracy",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency",
  "urgent upgrade required",
  "raw session token",
  "magic-link token exposure is allowed",
  "password=",
  "token=",
  "privateKey=",
  "cardNumber=",
  "bankDetail=",
  "rawPayload=",
  "rawEvidence=",
  "operatorIdentity=",
  "internalNote=",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Dashboard control room re-entry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard control room re-entry validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
