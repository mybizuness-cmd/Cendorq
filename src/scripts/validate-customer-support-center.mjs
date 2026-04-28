import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

expect("src/lib/customer-platform-route-map.ts", [
  "dashboardSupport",
  "/dashboard/support",
  "Support and corrections",
  "support center access requires authenticated customer ownership and route authorization",
  "support center must not promise refunds, legal outcomes, report changes, billing changes, or guaranteed results without approval",
  "support center must preserve correction path, billing help, security review, and escalation visibility",
]);

expect("src/app/dashboard/page.tsx", [
  "Open support center",
  "/dashboard/support",
  "Request report help, correction review, billing guidance, security review, or plan guidance safely.",
]);

expect("src/app/dashboard/support/page.tsx", [
  "Support and corrections",
  "noIndex: true",
  "Get help without losing the proof trail.",
  "Report question",
  "Correction request",
  "Billing help",
  "Security concern",
  "Plan guidance",
  "Support requires customer ownership and route authorization.",
  "Support messages should use safe summaries, not raw evidence, secrets, passwords, billing IDs, or private report internals.",
  "Correction requests must stay review-gated before any report change is shown to the customer.",
  "Billing, refund, legal, or report outcome promises require approval before being stated as commitments.",
]);

expect("package.json", [
  "validate:routes",
  "validate-customer-support-center.mjs",
]);

forbidden("src/app/dashboard/support/page.tsx", [
  "dangerouslySetInnerHTML",
  "localStorage",
  "sessionStorage",
  "guaranteed ROI",
  "guaranteed results",
  "refund approved",
  "legal outcome guaranteed",
  "raw evidence is shown",
  "passwords are accepted",
]);

if (failures.length) {
  console.error("Customer support center validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer support center validation passed.");

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
