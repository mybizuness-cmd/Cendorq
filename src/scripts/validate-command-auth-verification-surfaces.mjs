import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const signupPath = "src/app/signup/page.tsx";
const loginPath = "src/app/login/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-command-auth-verification-surfaces.mjs";

expect(signupPath, [
  "Start with the Free Scan.",
  "Cendorq checks if AI and search can understand your business clearly enough to trust and recommend it.",
  "Already have an account?",
  "Use customer access",
  "Use the same email you used for your Free Scan, form, or plan.",
  "Your account starts with the scan.",
  "Signup points first-time visitors to Free Scan.",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(loginPath, [
  "Customer access | Cendorq",
  "Access your Cendorq account.",
  "Use the same email you used when you submitted your Free Scan or bought a plan.",
  "Already have an account? If you used a different email then, try that one.",
  "Return with your email.",
  "No password needed.",
  "We will send a secure link if this email is tied to your Free Scan or plan.",
  "Send secure access link",
  "First time here?",
  "Other access options are hidden until they are fully ready.",
  "Free Scan starts the account. Access brings customers back.",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(verifyPath, [
  "Confirm your email | Cendorq",
  "Check your email to continue.",
  "Use the secure Cendorq link to verify the inbox.",
  "Request a new link",
  "Start Free Scan",
  "Confirm once.",
  "Find the message from Cendorq Support.",
  "One inbox. One customer record. One correct next step.",
  "If Cendorq cannot find a customer record for the verified identity, the next step is the Free Scan.",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(signupPath, [
  "Verified workspace trust surface",
  "Create the verified workspace before private results appear.",
  "Provider signup, email magic link, and password fallback remain available.",
  "ACCESS_TO_FIRST_SIGNAL_JOURNEY",
  "FIRST_SIGNAL_HANDOFF_STANDARDS",
  "ONBOARDING_OPERATING_SNAPSHOT",
  "ACCOUNT_PROTECTION_RULES",
  "Create the workspace that protects your first signal and keeps every next step connected.",
  "Access to first signal journey",
]);

forbidden(loginPath, [
  "Customer re-entry",
  "Return to the exact customer moment that needs action.",
  "Passkey-ready access",
  "Password fallback",
  "REENTRY_REASONS",
  "REENTRY_DECISION_PATHS",
  "REENTRY_SAFETY_STANDARDS",
  "Pick up where the customer journey actually is.",
]);

forbidden(verifyPath, [
  "Email verification gate",
  "Confirm the inbox before private work opens.",
  "VERIFICATION_TO_RESULT_STANDARDS",
  "VERIFICATION_SAFETY_NOTES",
  "AFTER_CONFIRMATION_PATH",
  "Confirm once, then continue the exact customer path.",
  "Open dashboard after confirmation",
]);

boundedLength(signupPath, 12500);
boundedLength(loginPath, 11500);
boundedLength(verifyPath, 10500);

if (failures.length) {
  console.error("Auth and verification surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Auth and verification surface validation passed with Free Scan-first signup, existing-customer email access, same-email recovery copy, and safe verification path.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for the auth standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
