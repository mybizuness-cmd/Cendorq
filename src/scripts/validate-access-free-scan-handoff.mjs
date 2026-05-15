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
  "Create your Cendorq workspace.",
  "Create or access your workspace.",
  "Use email or a connected provider.",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "Send secure access link",
  "After you send the link",
  "Open the email from Cendorq Support",
  "Account access should not force a business scan before the customer can reach the workspace.",
  "Free Scan",
  "No password to remember.",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(loginPath, [
  "Return to your Cendorq workspace.",
  "Sign in or create access.",
  "Use the same email or connected provider.",
  "Open dashboard",
  "Create workspace",
  "/free-check",
  "/dashboard",
  "Start Free Scan",
  "Account access and business intake are separate.",
  "Run the Free Scan",
  "Email access is passwordless.",
  "Free Scan business context stays separate from account access",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(verifyPath, [
  "Check your email to continue.",
  "Use the secure Cendorq link to create or return to your workspace.",
  "After confirmation, the dashboard opens first",
  "Request a new link",
  "Open dashboard",
  "Confirm once.",
  "Find the message from Cendorq Support.",
  "Confirm once and continue to your dashboard.",
  "The same email can create or return to a workspace.",
  "New customers can open the dashboard before running a Free Scan.",
  "Free Scan, billing, support, and reports stay connected to the same workspace.",
]);

expect(freeCheckPath, [
  "Free Scan | Cendorq",
  "Find the first place your business may be unclear.",
  "Cendorq looks at the signals around your business",
  "Share what customers already see.",
  "Cendorq finds the first weak signal.",
  "Open the result in your workspace.",
  "Confirm your email once, then continue into the dashboard where the result and next step stay connected.",
  "Is the Free Scan a full diagnosis?",
  "No. It is a first signal that helps you decide whether deeper review or repair work makes sense.",
  "After verification, the result opens inside the protected customer workspace",
]);

expect(routesChainPath, [validatorPath]);

forbidden(signupPath, [
  "skip verification",
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
  "exposes another customer's status",
  "paste your password",
  "submit card number",
  "we guarantee revenue",
]);

forbidden(freeCheckPath, [
  "free full diagnosis",
  "free implementation",
  "free monthly monitoring",
  "we guarantee ranking",
  "we guarantee ai placement",
  "we guarantee revenue",
]);

if (failures.length) {
  console.error("Access and Free Scan handoff validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Access and Free Scan handoff validation passed with passwordless access, Free Scan journey, protected first-result path, and plan boundary handoff coverage.");

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
