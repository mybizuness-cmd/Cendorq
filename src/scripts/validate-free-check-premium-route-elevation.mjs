import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/free-check/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "Premium Free Scan room",
  "Find the decision break before you buy the wrong fix.",
  "enter safe context",
  "hand off into dashboard, notifications, and report vault",
  "SCAN_ROOM_TRUST_RAIL",
  "Dedicated page, not a cramped popup",
  "Safe business context only",
  "Pending means pending, not final truth",
  "Dashboard, notifications, and report vault handoff",
  "It turns customer hesitation into a safer first direction.",
  "without treating pending or incomplete input as final analysis",
]);

expect(pagePath, [
  "Submit only business context needed for the first read, not passwords, private keys, card data, tokens, or unrelated raw evidence.",
  "Treat incomplete, interrupted, or pending scan state as pending instead of final analysis.",
  "After submission, use dashboard, notifications, and report vault before creating duplicate support requests.",
  "Plan guidance should come from scan evidence, stage fit, and customer readiness, not fake urgency or guaranteed outcomes.",
]);

expect(pagePath, [
  "GuidedFreeCheckForm",
  "FreeCheckProgressGuard",
  "FreeCheckAnalytics",
  "/dashboard",
  "/dashboard/notifications",
  "/dashboard/reports",
  "No browser-exposed protected secrets",
  "Routeable page that can be resumed or linked from dashboard",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-free-check-premium-route-elevation.mjs",
]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "guaranteed safe",
  "impossible to hack",
  "never liable",
  "liability-free",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "sessionToken=",
  "csrfToken=",
  "adminKey=",
  "supportContextKey=",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Free Check premium route elevation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Check premium route elevation validation passed.");

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
