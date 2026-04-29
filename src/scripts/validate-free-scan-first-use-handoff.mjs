import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/free-check/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "FREE_SCAN_FIRST_USE_SNAPSHOT",
  "Free Scan first use snapshot",
  "First-use path",
  "Guided scan room",
  "Completion handoff",
  "Dashboard next action",
  "Recovery posture",
  "Resume safely",
  "Trust posture",
  "No pressure",
  "FREE_SCAN_HANDOFF_ACTIONS",
  "Free Scan completion handoff",
  "After submission",
  "The scan should hand off cleanly into the customer platform.",
  "Open dashboard",
  "Check notifications",
  "Open report vault",
  "FREE_SCAN_FIRST_USE_RULES",
  "Submit only business context needed for the first read, not passwords, private keys, card data, tokens, or unrelated raw evidence.",
  "Treat incomplete, interrupted, or pending scan state as pending instead of final analysis.",
  "After submission, use dashboard, notifications, and report vault before creating duplicate support requests.",
  "Plan guidance should come from scan evidence, stage fit, and customer readiness, not fake urgency or guaranteed outcomes.",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(packagePath, ["validate:routes"]);

forbidden(pagePath, [
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
  "internalNotes=",
  "operatorIdentity=",
  "riskScoringInternals=",
  "attackerDetails=",
  "sessionToken=",
  "csrfToken=",
  "localStorage",
  "sessionStorage",
  "final analysis without review",
]);

if (failures.length) {
  console.error("Free Scan first use handoff validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan first use handoff validation passed.");

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
