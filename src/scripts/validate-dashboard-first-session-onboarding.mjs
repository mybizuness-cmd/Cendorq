import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const dashboardPath = "src/app/dashboard/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-dashboard-first-session-onboarding.mjs";

expect(dashboardPath, [
  "FIRST_SESSION_SNAPSHOT",
  "First session dashboard snapshot",
  "Verified entry",
  "Private workspace",
  "State posture",
  "Safe pending states",
  "Recovery path",
  "Clear fallback",
  "Trust posture",
  "Proof before pressure",
  "FIRST_SESSION_ACTIONS",
  "First session recovery guidance",
  "Continue Free Scan",
  "Check notifications",
  "Open support",
  "SAFE_STATE_RULES",
  "Safe state rules",
  "Show pending states as pending, not as live truth.",
  "Do not expose raw payloads, private evidence, internal notes, operator identities, or risk internals.",
  "Give the customer one obvious next action before offering deeper plan decisions.",
  "Keep support, report, billing, and notification links visible when a customer needs recovery.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, ["validate:routes", "validate-owner-maximum-protection-posture.mjs"]);
expect(routesChainPath, [validatorPath]);

forbidden(dashboardPath, [
  "unsupported promises",
  "fake urgency",
  "browser storage",
  "private internals shown to customers",
]);

if (failures.length) {
  console.error("Dashboard first session onboarding validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Dashboard first session onboarding validation passed with route-chain and owner posture coverage.");

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
