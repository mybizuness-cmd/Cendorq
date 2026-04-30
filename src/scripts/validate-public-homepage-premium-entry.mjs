import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/page.tsx";
const nudgePath = "src/components/public/free-scan-concierge-nudge.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-public-homepage-premium-entry.mjs";
const failures = [];

expect(pagePath, [
  "The business command system for why customers hesitate, compare, and choose someone else.",
  "focused Free Scan",
  "diagnosis, reports, dashboard guidance, notifications, billing, support, and plan decisions",
  "protected customer platform",
  "The homepage is a premium entry point.",
  "The full scan happens on /free-check",
  "PREMIUM_TRUST_BAR",
  "Diagnosis before spend",
  "Safe public entry",
  "Dedicated Free Scan room",
  "Dashboard handoff after completion",
  "PUBLIC_ENTRY_RULES",
]);

expect(pagePath, [
  "The homepage introduces the Free Scan; the full scan stays on /free-check.",
  "The soft prompt appears after time or intent, not instantly as an aggressive interruption.",
  "Public copy must not expose raw payloads, secrets, private report internals, or customer data.",
  "Conversion must come from clarity, proof, stage fit, and trust — not dark patterns or guaranteed outcomes.",
  "No fake urgency",
  "No unsupported ROI claims",
  "No promise of guaranteed business results",
  "No pressure to buy before the first direction is clear",
]);

expect(nudgePath, [
  "STANDARD_DELAY_MS = 12_000",
  "SCROLL_TRIGGER_RATIO = 0.38",
  "Soft Free Scan entry",
  "dedicated scan room",
  "no cramped popup form",
  "no fake urgency",
  "no guaranteed outcome promise",
  "not a full-form popup or pressure tactic",
  "dashboard, notifications, and report vault",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(pagePath, [
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "guaranteed safe",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency",
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "session" + "Token=",
  "csrf" + "Token=",
  "admin" + "Key=",
  "support" + "Context" + "Key=",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

forbidden(nudgePath, [
  "STANDARD_DELAY_MS = 0",
  "full-form popup",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed business results",
  "impossible to hack",
  "never liable",
  "liability-free",
  "localStorage.setItem",
  "sessionStorage.setItem",
]);

if (failures.length) {
  console.error("Public homepage premium entry validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public homepage premium entry validation passed. validate:routes delegates through the orchestrator and the public homepage premium-entry validator remains wired into the route chain.");

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
