import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/customer-platform-standard.ts";
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
  "Premium dashboard bells and whistles",
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
  "Free Scan must create or attach a customer account",
  "Customers must confirm the email address they provide before signing in to the customer dashboard or accessing scan results",
  "Customers should be able to sign up with major trusted email or identity providers where supported, or create an account by typing their email and password",
  "SPF",
  "DKIM",
  "DMARC",
  "single-use verification token",
  "token expiration",
  "rate-limited resend",
  "safe redirect allowlist",
  "OAuth state protection",
  "PKCE where applicable",
  "aligned From domain",
  "separate transactional and marketing streams",
  "After email confirmation, the customer should go straight into the Free Scan form",
  "next logical plan based on the customer plan stage, evidence, confidence, open questions, and value unlocked by the next step",
  "billing customer ID",
  "plan entitlement record",
  "welcome sent flag",
  "verified email requirement",
  "dashboard link",
  "Full Diagnosis CTA",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-customer-platform-standard.mjs",
]);

validateForbidden(standardPath, [
  "dashboard access before required verification allowed",
  "account enumeration allowed",
  "unlimited resend allowed",
  "unsafe redirect allowed",
  "unauthenticated mail allowed",
  "duplicate welcome spam allowed",
  "paid access without entitlement allowed",
  "fear-only selling allowed",
]);

if (failures.length) {
  console.error("Customer platform standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer platform standard validation passed. Signup-first Free Scan, mandatory email confirmation, provider and password signup, email deliverability, secure authentication, dashboard home base, billing entitlements, truthful conversion, customer email sequences, and returning-customer memory remain enforced.");

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

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden customer platform phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
