import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const signupPath = "src/app/signup/page.tsx";
const loginPath = "src/app/login/page.tsx";
const verifyPath = "src/app/verify-email/page.tsx";
const freeCheckPath = "src/app/free-check/page.tsx";
const freeCheckFormPath = "src/components/free-check/guided-free-check-form-v3.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-access-free-scan-handoff.mjs";

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

expect(loginPath, [
  "Access your Cendorq account.",
  "Use the same email you used for your Free Scan, form, or plan.",
  "Send secure access link",
  "First time here?",
  "Start Free Scan",
  "Provider sign-in is hidden until it is fully ready.",
  "Free Scan starts the account. Access brings customers back.",
  "No password needed.",
  "focus:outline-none",
  "focus-visible:ring-2",
]);

expect(verifyPath, [
  "Check your email to continue.",
  "Request a new link",
  "Start Free Scan",
  "Confirm once.",
  "Find the message from Cendorq Support.",
  "New customers start with the Free Scan before a dashboard workspace exists.",
]);

expect(freeCheckPath, [
  "Free Scan | Cendorq",
  "Find the first place your business may be unclear.",
  "Cendorq looks at the signals around your business",
  "Share what customers already see.",
  "Cendorq finds the first weak signal.",
  "Open the result in your workspace.",
  "Is the Free Scan a full diagnosis?",
  "No. It is a first signal that helps you decide whether deeper review or repair work makes sense.",
]);

expect(freeCheckFormPath, [
  "const [values, setValues] = useState<FormValues>(INITIAL_VALUES)",
  "hasStarted ? buildQualityScore(values) : 0",
  "First-use progress starts at zero until the customer types.",
]);

expect(routesChainPath, [validatorPath]);

forbidden(signupPath, [
  "Create your Cendorq workspace.",
  "Create or access your workspace.",
  "skip verification",
  "we guarantee revenue",
  "we guarantee ranking",
  "we guarantee ai placement",
]);

forbidden(loginPath, [
  "Create workspace",
  "Continue to dashboard",
  "Continue with Google",
  "Continue with Microsoft",
  "Continue with Apple",
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

console.log("Access and Free Scan handoff validation passed with Free Scan-first conversion, simple customer copy, no blank dashboard promise, and zero first-use progress.");

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
