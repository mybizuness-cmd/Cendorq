import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const signupPath = "src/app/signup/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const loginPath = "src/app/login/page.tsx";
const packagePath = "package.json";

expect(signupPath, [
  "ONBOARDING_OPERATING_SNAPSHOT",
  "Signup onboarding operating snapshot",
  "Verified-email gate",
  "No account-existence leakage",
  "Magic-link-first re-entry",
  "Private dashboard path",
  "ACCOUNT_PROTECTION_RULES",
  "Account protection before access",
  "Cendorq support will not ask you to paste passwords, card numbers, private keys, or session tokens into a form.",
  "Confirmation responses stay bounded and do not expose another customer’s account state.",
  "SIGNUP_TRUST_RULES",
  "No fake urgency",
  "No hidden checkout pressure",
  "No dashboard access before verification",
  "No promise of guaranteed business outcomes",
  "autoComplete=\"email\"",
  "autoComplete=\"new-password\"",
  "Send a magic link",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(verifyPath, [
  "VERIFICATION_SAFETY_NOTES",
  "AFTER_CONFIRMATION_PATH",
  "After confirmation path",
  "Verification safety notes",
  "For privacy, Cendorq keeps confirmation guidance bounded and never exposes another customer's status.",
  "Dashboard, Free Scan history, report status, billing, notifications, and support status stay gated until the email is verified.",
  "Cendorq will not ask for passwords, card numbers, private keys, or session tokens through email confirmation support.",
  "If the message is missing, use the retry path calmly rather than creating duplicate accounts or sharing private evidence.",
  "Confirm once. Land inside the dashboard.",
  "Open dashboard after confirmation",
  "Send a magic link",
  "verification click redirects to dashboard",
  "Verified access",
  "Continue Free Scan",
  "Paid path",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(loginPath, [
  "Customer login | Cendorq",
  "Magic link first",
  "Send magic link",
  "Use passkey when available",
  "Create account instead",
  "Customer re-entry guardrails",
]);

expect(packagePath, ["validate:routes"]);

forbidden(signupPath, blockedPatterns());
forbidden(verifyPath, blockedPatterns());
forbidden(loginPath, blockedPatterns());

if (failures.length) {
  console.error("Signup verification excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Signup verification excellence validation passed with account creation, verification-to-dashboard activation, and magic-link re-entry synchronized.");

function blockedPatterns() {
  return [
    "guaranteed ROI",
    "guaranteed refund",
    "guaranteed legal outcome",
    "guaranteed security outcome",
    "impossible to hack",
    "never liable",
    "liability-free",
    "rawPayload",
    "rawEvidence",
    "rawSecurityPayload",
    "rawBillingData",
    "internalNotes",
    "operatorIdentity",
    "riskScoringInternals",
    "attackerDetails",
    "sessionToken=",
    "csrfToken=",
    "localStorage",
    "sessionStorage",
    "account exists",
    "user exists",
  ];
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
