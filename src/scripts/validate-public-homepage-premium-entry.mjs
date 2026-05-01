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
  "COMMAND_CENTER_FLOW",
  "Verify to view",
  "Protected results stay behind email confirmation and safe release instead of being exposed on the public page.",
  "Report vault",
  "Approved reports, limitations, confidence labels, and next actions live inside the protected report vault.",
  "Dashboard inbox",
  "Command-center messages, support status, billing reminders, and plan nudges use one safe next action.",
  "Plan ladder",
  "Free Scan, Deep Review, Build Fix, and Ongoing Control stay distinct so paid deliverables do not blur together.",
]);

expect(pagePath, [
  "PLAN_LADDER",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "A protected first-read report that identifies the first visible decision friction.",
  "A paid full diagnostic with stronger intake, evidence separation, confidence labels, and limitations.",
  "Scoped implementation work with approval checkpoints, before-after evidence, and safe progress summaries.",
  "Monthly command-center review, controlled monitoring, inbox messages, and plan-fit guidance.",
]);

expect(pagePath, [
  "The homepage introduces the Free Scan; the full scan stays on /free-check.",
  "The soft prompt appears after time or intent, not instantly as an aggressive interruption.",
  "Public copy must not expose raw payloads, secrets, private report internals, or customer data.",
  "Conversion must come from clarity, proof, stage fit, and trust — not dark patterns or guaranteed outcomes.",
  "Verify-to-view keeps protected results in the dashboard/report vault, not on the public homepage.",
  "Dashboard inbox messages support the command center; external email remains required for confirmation and lifecycle delivery.",
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

console.log("Public homepage premium entry validation passed with command-center flow and plan ladder positioning.");

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
