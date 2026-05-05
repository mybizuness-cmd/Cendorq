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
  "Social and creator channels",
  "Marketplace/platform revenue",
  "Digital product or recurring revenue",
  "focus:outline-none",
  "focus:ring-2",
  "Private workspace",
  "See what is pending, what is ready, and what to do next.",
  "Start with the clearest available signal. Do not treat pending work as final.",
  "Dashboard validation guardrails",
]);

expect(pristineValidatorPath, [
  "validate-most-pristine-system-standard.mjs",
]);

expect(packagePath, [
  "validate:routes",
]);

boundedLength(dashboardPath, 22000);

forbidden(dashboardPath, [
  "guaranteed ROI",
  "guaranteed refund",
  "guaranteed legal outcome",
  "guaranteed security outcome",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency allowed",
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

console.log("Customer dashboard excellence validation passed with simplified visible dashboard structure, customer-safe recovery links, protected hidden runtime guardrails, and no unsupported outcome promises.");

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for streamlined dashboard standard: ${text.length} > ${maxCharacters}`);
}

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
