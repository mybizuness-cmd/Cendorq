import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/status/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "SUPPORT_STATUS_FIRST_USE_SNAPSHOT",
  "Support status first use snapshot",
  "Progress meaning",
  "Customer-safe status",
  "Communication posture",
  "Send, hold, or suppress",
  "Action posture",
  "One clear next step",
  "Privacy posture",
  "No raw content",
  "SUPPORT_STATUS_FIRST_USE_ACTIONS",
  "Support status first use guidance",
  "First status visit",
  "Understand the status before sending more details.",
  "Review current status",
  "Send safe update",
  "Return to support",
  "SUPPORT_STATUS_FIRST_USE_RULES",
  "Received means Cendorq has the request and can show a customer-safe tracking path.",
  "Waiting on customer should ask for safe clarification without echoing rejected unsafe content.",
  "Resolved and closed statuses should explain process completion without guaranteeing unsupported outcomes.",
  "Communication plans may show safe channels, next paths, and required guards, not internal risk details or raw records.",
  "support-status-list",
  "focus:outline-none",
  "focus:ring-2",
]);

expect(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

expect(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

expect(packagePath, [
  "validate:routes",
  "validate-support-status-first-use.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

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
  "localStorage",
  "sessionStorage",
]);

if (failures.length) {
  console.error("Support status first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support status first use validation passed with owner posture coverage.");

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
