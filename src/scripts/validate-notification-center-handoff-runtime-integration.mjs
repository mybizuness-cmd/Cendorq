import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/notifications/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-notification-center-handoff-runtime-integration.mjs";
const failures = [];

expect(pagePath, [
  "projectCustomerPlatformHandoff",
  "NOTIFICATION_HANDOFFS",
  "Act only on signals that protect readiness progress.",
  "This feed should stay quiet until something matters: proof is ready, access changes, support needs context, or a safer action is required.",
  "No generic clutter. Every signal should point to proof, access, status, or safe recovery.",
  "Signals should create confidence, not noise.",
  "handoff.decision",
  "handoff.surfaceKey",
  "handoff.currentState",
  "handoff.safeNextAction",
  "handoff.recoveryPath",
  "handoff.connectedDestination",
]);

expect(pagePath, [
  "dashboard-to-notifications",
  "free-scan-to-notifications",
  "notifications-to-status",
  "customerOwned: true",
  "verifiedAccess: true",
  "safeProjectionReady: true",
]);

expect(pagePath, [
  "Proof signal",
  "Access signal",
  "Support signal",
  "Security signal",
  "Featured customer signals",
  "Quiet feed standard",
  "Notification paid actions route to plan detail pages before payment.",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(pagePath, [
  "rawPayload=",
  "rawEvidence=",
  "rawSecurityPayload=",
  "rawBillingData=",
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "localStorage.setItem",
  "sessionStorage.setItem",
  "guaranteed ROI",
  "guaranteed outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
]);

if (failures.length) {
  console.error("Notification center handoff runtime integration validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Notification center handoff runtime integration validation passed with current notification projection, signal routing, quiet-feed guardrails, and route-chain coverage.");

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
