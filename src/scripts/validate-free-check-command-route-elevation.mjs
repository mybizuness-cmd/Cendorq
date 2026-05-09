import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/free-check/page.tsx";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-free-check-command-route-elevation.mjs";
const failures = [];

expect(pagePath, [
  "Free Scan",
  "See the first signal before you buy the fix.",
  "Cendorq checks whether your business is clear enough for AI engines and customers to understand, trust, and choose before deeper work begins.",
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
  "AI-readiness signal",
  "Result opens in dashboard",
  "Free Scan form visible within the first quarter of the page",
  "Dedicated dashboard Free Scan result path after verification",
]);

expect(pagePath, [
  "Can AI engines understand you?",
  "Can buyers believe you?",
  "Can customers choose you?",
  "Review before repair",
  "Prove the cause before spending money on the wrong page, message, or proof point.",
  "The output is not a pile of generic tips.",
  "Free Scan gives a first AI-readiness signal before paid review, repair, or monthly control.",
]);

expect(pagePath, [
  "GuidedFreeCheckFormV3",
  "FreeCheckProgressGuard",
  "FreeCheckAnalytics",
  "/dashboard/reports/free-scan",
  "bg-white text-slate-950",
]);

expect(packagePath, [
  "validate:routes",
  "node ./src/scripts/validate-routes-chain.mjs",
]);

expect(routesChainPath, [
  validatorPath,
]);

forbidden(pagePath, [
  "Premium Free Scan room",
  "Command Free Scan room",
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

if (failures.length) {
  console.error("Free Scan route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan route validation passed with AI-readiness positioning, verified dashboard result path, and preserved intake wiring.");

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
