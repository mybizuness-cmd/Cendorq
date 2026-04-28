import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const templatesPath = "src/lib/customer-email-template-contracts.ts";
const lifecyclePath = "src/lib/customer-lifecycle-automation.ts";
const packagePath = "package.json";

validateTextFile(templatesPath, [
  "CUSTOMER_EMAIL_TEMPLATE_CONTRACTS",
  "CUSTOMER_EMAIL_GLOBAL_GUARDS",
  "getCustomerEmailTemplateContracts",
  "confirm-email",
  "welcome-verified",
  "free-scan-resume",
  "free-scan-received",
  "free-scan-ready",
  "deep-review-purchased",
  "deep-review-delivered",
  "build-fix-delivered",
  "ongoing-control-monthly",
  "billing-recovery",
  "correction-support",
  "Cendorq Support",
  "support@cendorq.com",
  "Confirm your Cendorq account to start your Free Scan",
  "Welcome to Cendorq — your business intelligence dashboard is ready",
  "Your Cendorq Free Scan is ready",
  "Your Cendorq Deep Review has started",
  "Your Cendorq monthly control update is ready",
  "one clear primary CTA",
  "suppression and preference controls",
  "SPF",
  "DKIM",
  "DMARC",
  "TLS",
  "bounce handling",
  "complaint handling",
  "no email contains passwords, raw tokens, raw billing IDs, raw evidence, secrets, or private report internals",
  "no email claims guaranteed outcomes, guaranteed ROI, fake urgency, false scarcity, or unsupported revenue impact",
  "no paid-plan or report-delivery email sends before entitlement, approval, or release gates pass",
  "no refund/legal promise without approval",
]);

validateTextFile(lifecyclePath, [
  "CUSTOMER_LIFECYCLE_AUTOMATION_RULES",
  "Cendorq Support <support@cendorq.com>",
  "no duplicate welcome email",
  "no private raw evidence in email or analytics",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-customer-email-template-contracts.mjs",
]);

validateForbidden(templatesPath, [
  "password in email allowed",
  "raw token allowed",
  "raw billing IDs allowed",
  "raw evidence allowed",
  "guaranteed ROI allowed",
  "fake urgency allowed",
  "false scarcity allowed",
  "unapproved refund promise allowed",
  "legal ruling allowed",
]);

if (failures.length) {
  console.error("Customer email template contracts validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email template contracts validation passed. Customer emails preserve Cendorq sender identity, one clear CTA, suppression, deliverability, lifecycle alignment, and legal/trust boundaries.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required customer email template dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required customer email template phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden customer email template phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
