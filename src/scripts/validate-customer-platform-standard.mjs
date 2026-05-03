import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/customer-platform-standard.ts";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const packagePath = "package.json";

validateTextFile(standardPath, [
  "CUSTOMER_PLATFORM_RULES",
  "CUSTOMER_DASHBOARD_ZONES",
  "CUSTOMER_EMAIL_SEQUENCE_RULES",
  "getCustomerPlatformStandard",
  "Signup-first Free Scan",
  "Mandatory email confirmation before access",
  "Provider and password signup options",
  "Email deliverability and authenticity",
  "Secure authentication path",
  "Free Scan after verification flow",
  "Member dashboard home base",
  "Truthful dashboard conversion",
  "Billing and entitlement control",
  "Returning customer memory",
  "Customer platform analytics",
  "Executive home",
  "Report vault",
  "Growth roadmap",
  "Billing and plan center",
  "Trust and proof center",
  "One-time welcome email",
  "Free Scan result email",
  "Paid plan email sequences",
  "SPF",
  "DKIM",
  "DMARC",
  "single-use verification token",
  "token expiration",
  "rate-limited resend",
  "safe redirect allowlist",
  "OAuth state protection",
  "aligned From domain",
  "separate transactional and marketing streams",
  "billing customer ID",
  "plan entitlement record",
  "welcome sent flag",
  "verified email requirement",
  "dashboard link",
  "Full Diagnosis CTA",
]);

validateTextFile(ownerMaximumProtectionPath, [
  "# Owner Maximum Protection Posture",
  "Protected customer and report surfaces require the correct verified access path.",
  "Operator surfaces remain private, metadata-first, and review-gated.",
]);
validateTextFile(ownerMaximumProtectionValidatorPath, ["Owner maximum protection posture validation passed", "docs/owner-maximum-protection-posture.md", "validate:routes"]);
validateTextFile(packagePath, ["validate:routes", "validate-customer-platform-standard.mjs", "validate-owner-maximum-protection-posture.mjs"]);

if (failures.length) {
  console.error("Customer platform standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform standard validation passed with owner posture and package wiring coverage.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required customer platform dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required customer platform phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
