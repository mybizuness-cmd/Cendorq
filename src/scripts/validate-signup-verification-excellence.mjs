import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const signupPath = "src/app/signup/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const loginPath = "src/app/login/page.tsx";
const packagePath = "package.json";

expect(signupPath, [
  "Create your Cendorq workspace.",
  "Create or access your workspace.",
  "Use email or a connected provider.",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "Email",
  "autoComplete=\"email\"",
  "Send secure access link",
  "After you send the link",
  "Open the email from Cendorq Support",
  "No password to remember.",
  "Account access should not force a business scan before the customer can reach the workspace.",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(verifyPath, [
  "Confirm your email | Cendorq",
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

expect(loginPath, [
  "Sign in | Cendorq",
  "Return to your Cendorq workspace.",
  "Sign in or create access.",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
  "Email",
  "autoComplete=\"email\"",
  "Send secure access link",
  "Cendorq never emails a password",
  "Open dashboard",
  "Create workspace",
  "Account access and business intake are separate.",
  "Email access is passwordless.",
  "Free Scan business context stays separate from account access",
  "focus:outline-none",
  "focus-visible:ring-2",
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

console.log("Signup verification excellence validation passed with passwordless account creation, verification-to-dashboard activation, and secure re-entry synchronized.");

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
    "password in email",
    "autoComplete=\"new-password\"",
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
