import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const signupPath = "src/app/signup/page.tsx";
const loginPath = "src/app/login/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const freeCheckPath = "src/app/free-check/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-access-free-scan-handoff.mjs";

expect(signupPath, [
  "Access to first signal journey",
  "The account exists to get the customer to a verified first result.",
  "First signal handoff standards",
  "Create",
  "Verify",
  "Scan",
  "Decide",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "No dashboard access before verification",
  "No promise of guaranteed business outcomes",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(loginPath, [
  "Re-entry decision paths",
  "Pick up where the customer journey actually is.",
  "Reentry safety standards",
  "Free Scan pending",
  "Result ready",
  "Paid plan active",
  "/free-check",
  "/dashboard/reports/free-scan",
  "/dashboard",
  "Magic-link-first",
  "Evidence before spend",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(verifyPath, [
  "Verification to result standards",
  "Confirm once, then continue the exact customer path.",
  "Open dashboard after confirmation",
  "Continue Free Scan after confirmation",
  "Open Free Scan result path after confirmation",
  "Protect ownership",
  "Continue the right path",
  "Avoid duplicate accounts",
  "Preserve boundaries",
  "support@cendorq.com",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(freeCheckPath, [
  "Free Scan journey",
  "From safe context to a protected first result.",
  "Free Scan boundary standards",
  "Free Scan gives",
  "Free Scan does not give",
  "Free Scan does not do",
  "Free Scan does not monitor",
  "First signal",
  "Full diagnosis",
  "Implementation",
  "Monthly control",
  "View Free Scan result path",
  "/dashboard/reports/free-scan",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(signupPath, [
  "skip verification",
  "dashboard access before verification",
  "we guarantee revenue",
  "we guarantee ranking",
  "we guarantee ai placement",
]);

forbidden(loginPath, [
  "paste your password",
  "submit card number",
  "we guarantee revenue",
  "we guarantee ranking",
]);

forbidden(verifyPath, [
  "another customer's status",
  "paste your password",
  "submit card number",
  "we guarantee revenue",
]);

forbidden(freeCheckPath, [
  "free full diagnosis",
  "free implementation",
  "free monthly monitoring",
  "guaranteed ranking",
  "guaranteed ai placement",
  "guaranteed revenue",
]);

if (failures.length) {
  console.error("Access and Free Scan handoff validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Access and Free Scan handoff validation passed with verified first-signal journey coverage.");

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
