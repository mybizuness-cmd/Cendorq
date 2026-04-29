import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const dashboardPath = "src/app/dashboard/page.tsx";
const pristineValidatorPath = "src/scripts/validate-most-pristine-system-standard.mjs";
const packagePath = "package.json";

expect(dashboardPath, [
  "OPERATING_SNAPSHOT",
  "Dashboard operating snapshot",
  "Current stage",
  "Primary focus",
  "Decision quality",
  "Protection mode",
  "Proof before pressure",
  "Customer-safe",
  "EXPERIENCE_PILLARS",
  "Dashboard excellence pillars",
  "Business owner clarity",
  "Proof-led conversion",
  "Connected operations",
  "Protected trust",
  "CHANNEL_COVERAGE",
  "Revenue channel awareness",
  "Coverage beyond one business model.",
  "Social and creator channels",
  "Marketplace/platform revenue",
  "Digital product or recurring revenue",
  "focus:outline-none",
  "focus:ring-2",
  "Track Free Scan status, see evidence-backed findings",
  "move to the next plan only when the proof and stage make sense",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

forbidden(dashboardPath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency",
  "dark pattern",
  "rawPayload",
  "rawEvidence",
  "rawSecurityPayload",
  "rawBillingData",
  "internalNotes",
  "operatorIdentity",
  "riskScoringInternals",
  "attackerDetails",
  "sessionToken",
  "csrfToken",
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Customer dashboard excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer dashboard excellence validation passed.");

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
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
