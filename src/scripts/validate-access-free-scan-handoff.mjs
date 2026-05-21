import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const checks = [
  ["src/app/signup/page.tsx", ["Start with the Free Scan.", "Cendorq checks the first AI Visibility signal", "Use customer access", "Start Free Scan", "Signup points first-time visitors to Free Scan."]],
  ["src/app/login/page.tsx", ["Access your Cendorq account.", "Use the same email you used when you submitted your Free Scan or bought a plan.", "We will send a secure link if this email is tied to your Free Scan, Diagnosis, report, plan, billing, or support context.", "Send secure access link", "Free Scan starts the account. Access brings customers back."]],
  ["src/app/verify-email/page.tsx", ["Check your email to continue.", "Request a new link", "Start Free Scan", "Confirm once.", "Find the message from Cendorq Support."]],
  ["src/app/free-check/page.tsx", ["Free Scan | Cendorq", "Get the first signal before buying the deeper fix.", "What the first signal looks for", "Findability", "Understanding", "Trust", "Choice", "Action", "Open the result in your account.", "We could not find your Cendorq account yet."]],
  ["src/components/free-check/guided-free-check-form-v3.tsx", ["const [values, setValues] = useState<FormValues>(INITIAL_VALUES)", "hasStarted ? buildQualityScore(values) : 0", "First-use progress starts at zero until the customer types."]],
  ["src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-access-free-scan-handoff.mjs"]],
];

for (const [path, phrases] of checks) expect(path, phrases);

if (failures.length) {
  console.error("Access and Free Scan handoff validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Access and Free Scan handoff validation passed.");

function expect(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}
