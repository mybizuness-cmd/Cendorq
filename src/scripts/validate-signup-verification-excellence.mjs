import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const signupPath = "src/app/signup/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const loginPath = "src/app/login/page.tsx";
const freeCheckFormPath = "src/components/free-check/guided-free-check-form-v3.tsx";
const packagePath = "package.json";

expect(signupPath, [
  "Start with the Free Scan.",
  "Cendorq checks if AI and search can understand your business clearly enough to trust and recommend it.",
  "Already have an account?",
  "Use customer access",
  "Use the same email you used for your Free Scan, form, or plan.",
  "Start Free Scan",
  "Signup points first-time visitors to Free Scan.",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(verifyPath, [
  "Confirm your email | Cendorq",
  "Check your email to continue.",
  "Request a new link",
  "Start Free Scan",
  "Confirm once.",
  "Find the message from Cendorq Support.",
  "New customers start with the Free Scan before a dashboard workspace exists.",
]);

expect(loginPath, [
  "Customer access | Cendorq",
  "Access your Cendorq account.",
  "Use the same email you used when you submitted your Free Scan or bought a plan.",
  "Already have an account? If you used a different email then, try that one.",
  "Email used for your Free Scan or plan",
  "autoComplete=\"email\"",
  "Send secure access link",
  "No password needed.",
  "We will send a secure link if this email is tied to your Free Scan or plan.",
  "First time here?",
  "Start Free Scan",
  "Other access options are hidden until they are fully ready.",
  "Free Scan starts the account. Access brings customers back.",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(freeCheckFormPath, [
  "const [values, setValues] = useState<FormValues>(INITIAL_VALUES)",
  "hasStarted ? buildQualityScore(values) : 0",
  "First-use progress starts at zero until the customer types.",
]);

expect(packagePath, ["validate:routes"]);

forbidden(signupPath, blockedPatterns());
forbidden(verifyPath, blockedPatterns());
forbidden(loginPath, blockedPatterns());
forbidden(freeCheckFormPath, blockedPatterns());

if (failures.length) {
  console.error("Signup verification excellence validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Signup verification excellence validation passed with Free Scan-first access, existing-customer eligibility copy, email verification, and zero first-use scan progress.");

function blockedPatterns() {
  return [
    "Create your Cendorq workspace.",
    "Create or access your workspace.",
    "Create workspace",
    "Continue with Google",
    "Continue with Microsoft",
    "Continue with Apple",
    "Continue to dashboard",
    "Account access should not force a business scan before the customer can reach the workspace.",
    "New customers can open the dashboard before running a Free Scan.",
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
