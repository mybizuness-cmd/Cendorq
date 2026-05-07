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
  "Verified workspace trust surface",
  "Create the verified workspace before private results appear.",
  "Verify once. Continue safely.",
  "Signup trust path",
  "Signup safety standard",
  "Trust starts before the dashboard opens.",
  "No dashboard or result access before email confirmation.",
  "No account-existence leakage",
  "No private data dump",
  "No fake urgency",
  "No hidden checkout pressure",
  "Provider signup, email magic link, and password fallback remain available.",
  "shadow-[0_28px_110px_rgba(2,8,23,0.42)]",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(loginPath, [
  "Customer re-entry",
  "Return to the exact customer moment that needs action.",
  "Magic link first",
  "Customer re-entry paths",
  "Login safety standard",
  "Re-entry should restore context without leaking state.",
  "Magic-link-first return path",
  "Passkey-ready access",
  "Password fallback",
  "Protected results stay under dashboard routes",
  "No account-existence leakage",
  "No paid-plan pressure before evidence",
  "shadow-[0_28px_110px_rgba(2,8,23,0.42)]",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(verifyPath, [
  "Email verification gate",
  "Confirm the inbox before private work opens.",
  "Verified destinations",
  "Verification safety standard",
  "Protect access without creating friction or leakage.",
  "Cendorq Support at support@cendorq.com",
  "Verification proves inbox ownership",
  "No account-existence leakage",
  "Free Scan result access remains dashboard-only at /dashboard/reports/free-scan.",
  "verification click redirects to dashboard",
  "Your welcome email is sent one time after verified profile creation.",
  "shadow-[0_28px_110px_rgba(2,8,23,0.42)]",
  "hover:-translate-y-0.5",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(routesChainPath, [validatorPath]);

forbidden(signupPath, [
  "ACCESS_TO_FIRST_SIGNAL_JOURNEY",
  "FIRST_SIGNAL_HANDOFF_STANDARDS",
  "ONBOARDING_OPERATING_SNAPSHOT",
  "ACCOUNT_PROTECTION_RULES",
  "Create the workspace that protects your first signal and keeps every next step connected.",
  "Access to first signal journey",
]);

forbidden(loginPath, [
  "REENTRY_REASONS",
  "REENTRY_DECISION_PATHS",
  "REENTRY_SAFETY_STANDARDS",
  "Pick up where the customer journey actually is.",
]);

forbidden(verifyPath, [
  "VERIFICATION_TO_RESULT_STANDARDS",
  "VERIFICATION_SAFETY_NOTES",
  "AFTER_CONFIRMATION_PATH",
  "Confirm once, then continue the exact customer path.",
  "Open dashboard after confirmation",
]);

boundedLength(signupPath, 12500);
boundedLength(loginPath, 10500);
boundedLength(verifyPath, 10500);

if (failures.length) {
  console.error("Auth and verification surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Auth and verification surface validation passed with trust-gated signup, safe re-entry, and dashboard-only verified result access.");

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
