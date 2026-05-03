import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/customer-command-experience-standard.ts";
const customerPlatformPath = "src/lib/command-center/customer-platform-standard.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "CUSTOMER_COMMAND_EXPERIENCE_RULES",
  "CUSTOMER_COMMAND_EXPERIENCE_ZONES",
  "getCustomerCommandExperienceStandard",
  "Out-of-this-world first impression",
  "Complete account navigation",
  "Business command room layout",
  "Proof-centered trust experience",
  "Next-plan conversion engine",
  "Returning customer acceleration",
  "Progress momentum system",
  "Billing without friction",
  "Premium help and support",
  "Accessible authenticated dashboard",
  "Fast premium performance",
  "Brand moat experience",
  "Mission control hero",
  "Proof grid",
  "Roadmap command timeline",
  "Business memory vault",
  "Upgrade lab",
  "premium business command room",
  "all customer tasks from the dashboard and account menu",
  "evidence classes, confidence labels, methodology version, guarantee limits, correction window",
  "Free Scan to Full Diagnosis, Full Diagnosis to Optimization, Optimization to Monthly Control",
  "remembered businesses, open recommendations, prior reports, billing state, scan history",
  "focus visibility",
  "bounded queries",
  "Cendorq-owned dashboard relationship",
]);

validateTextFile(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);

validateTextFile(ownerMaximumProtectionValidatorPath, [
  "Owner maximum protection posture validation passed",
  "docs/owner-maximum-protection-posture.md",
  "validate:routes",
]);

validateTextFile(customerPlatformPath, [
  "CUSTOMER_PLATFORM_RULES",
  "Mandatory email confirmation before access",
  "Billing and entitlement control",
  "One-time welcome email",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-customer-command-experience-standard.mjs",
  "validate-owner-maximum-protection-posture.mjs",
]);

validateForbidden(standardPath, [
  "generic SaaS dashboard allowed",
  "dashboard dead end allowed",
  "black-box score allowed",
  "fake urgency allowed",
  "cross-customer leak allowed",
  "static report dump allowed",
  "keyboard trap allowed",
  "cross-customer cache allowed",
  "one-off report relationship allowed",
]);

if (failures.length) {
  console.error("Customer command experience standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer command experience standard validation passed with owner posture coverage. The customer dashboard requires mission-control UX, complete navigation, proof-centered trust, next-plan conversion, returning-customer acceleration, progress momentum, billing clarity, support, accessibility, performance, and brand moat controls.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required customer command experience dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required customer command experience phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden customer command experience phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
