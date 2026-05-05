import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pagePath = "src/app/dashboard/support/request/page.tsx";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";
const failures = [];

expect(pagePath, [
  "SUPPORT_REQUEST_FIRST_USE_SNAPSHOT",
  "Support request first use snapshot",
  "Form choice",
  "New or update",
  "Summary posture",
  "Safe context",
  "Risk posture",
  "Guarded intake",
  "Follow-through",
  "Track after submit",
  "SUPPORT_REQUEST_FIRST_USE_ACTIONS",
  "Support request first use guidance",
  "Get the blocker out of the way.",
  "After submit",
  "Resolve report question",
  "Fix billing blocker",
  "Choose plan depth",
  "Start new request",
  "Update existing request",
  "Track instead",
  "SUPPORT_REQUEST_FIRST_USE_RULES",
  "First-use rules",
  "Write a safe summary: request type, business context, affected area, and the question or correction needed.",
  "Use status tracking after submission so duplicate requests do not create confusion or unnecessary support noise.",
  "SupportRequestForm",
  "SupportRequestUpdateForm",
  "new-support-request",
  "support-request-update",
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
  "validate-support-request-first-use.mjs",
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
  "localStorage",
  "sessionStorage",
  "refund guaranteed",
]);

if (failures.length) {
  console.error("Support request first use validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Support request first use validation passed with owner posture coverage and blocker-removal intake flow.");

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
