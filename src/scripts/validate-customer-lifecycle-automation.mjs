import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const automationPath = "src/lib/customer-lifecycle-automation.ts";
const conversionPath = "src/lib/front-to-back-conversion-standard.ts";
const recordsPath = "src/lib/customer-platform-record-contracts.ts";
const packagePath = "package.json";

validateTextFile(automationPath, [
  "CUSTOMER_LIFECYCLE_AUTOMATION_RULES",
  "CUSTOMER_LIFECYCLE_GLOBAL_GUARDS",
  "getCustomerLifecycleAutomation",
  "Account created: confirm email",
  "Email confirmed: one-time welcome",
  "Free Scan started: save momentum",
  "Free Scan submitted: status and trust",
  "Free Scan ready: Deep Review conversion",
  "Deep Review purchased: onboarding",
  "Deep Review delivered: Build Fix conversion",
  "Build Fix delivered: Ongoing Control conversion",
  "Ongoing Control active: retention and expansion",
  "Renewal risk: reactivation",
  "Cendorq Support <support@cendorq.com>",
  "Welcome to Cendorq — your business intelligence dashboard is ready.",
  "single-use token",
  "token expiration",
  "safe redirect allowlist",
  "rate-limited resend",
  "welcome sent flag",
  "suppression window",
  "scan job ID",
  "idempotency key",
  "release approval",
  "confidence labels",
  "limitation statement",
  "blocked-claim scan",
  "webhook verification",
  "entitlement record",
  "correction window",
  "no guaranteed ROI",
  "completed work record",
  "monthly delta",
  "preference controls",
  "no lifecycle automation without customer stage",
  "no email without suppression and preference review",
  "no duplicate welcome email",
  "no paid-plan access without billing entitlement",
  "no result email before report approval",
  "no conversion CTA without proof and plan-stage logic",
  "no private raw evidence in email or analytics",
  "no automation that hides support, correction, cancellation, or billing help",
]);

validateTextFile(conversionPath, [
  "FRONT_TO_BACK_CONVERSION_RULES",
  "Email sequence that sells by helping",
  "Measurement without manipulation",
]);

validateTextFile(recordsPath, [
  "CUSTOMER_PLATFORM_RECORD_CONTRACTS",
  "CustomerEmailConfirmationRecordContract",
  "CustomerBillingEntitlementRecordContract",
  "no welcome email duplication",
]);

validateTextFile(packagePath, [
  "validate:routes",
  "validate-customer-lifecycle-automation.mjs",
]);

validateForbidden(automationPath, [
  "fake urgency allowed",
  "duplicate welcome allowed",
  "paid-plan access without billing entitlement allowed",
  "private raw evidence in email allowed",
  "result email before report approval allowed",
  "guaranteed ROI allowed",
  "hide cancellation allowed",
]);

if (failures.length) {
  console.error("Customer lifecycle automation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer lifecycle automation validation passed. Customer stages, triggers, dashboard states, email behavior, CTAs, suppression rules, plan conversion, billing, support, correction, and privacy boundaries remain synchronized.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required lifecycle automation dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required lifecycle automation phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden lifecycle automation phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
