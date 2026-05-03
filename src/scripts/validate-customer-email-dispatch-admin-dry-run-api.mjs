import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routePath = "src/app/api/admin/customer/email/dispatch/dry-run/route.ts";
const queueValidatorPath = "src/scripts/validate-customer-email-dispatch-queue-runtime.mjs";
const ownerMaximumProtectionPath = "docs/owner-maximum-protection-posture.md";
const ownerMaximumProtectionValidatorPath = "src/scripts/validate-owner-maximum-protection-posture.mjs";
const failures = [];

expect(routePath, [
  "export const dynamic = \"force-dynamic\"",
  "export const revalidate = 0",
  "verifyAdminReadAccess",
  "CUSTOMER_EMAIL_DISPATCH_ADMIN_KEY",
  "SUPPORT_ADMIN_READ_KEY",
  "jsonNoStore",
  "optionsNoStore",
  "POST(request: NextRequest)",
  "runCustomerEmailDispatchCycle",
  "providerConfigured: false",
  "ownerApproved: true",
  "dryRun: true",
  "adminOnly: true",
  "dryRunOnly: true",
  "safeProjectionOnly: true",
  "dry-run-no-provider-call",
  "safe_dry_run_projection_required",
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

expect(routePath, [
  "Cendorq Support",
  "support@cendorq.com",
  "rawCustomerEmailExposed: false",
  "rawTokenExposed: false",
  "tokenHashExposed: false",
  "confirmationUrlExposed: false",
  "providerPayloadExposed: false",
  "providerResponseExposed: false",
  "providerSecretExposed: false",
  "browserSecretExposure: false",
  "providerCallMade: false",
  "providerSecretRead: false",
  "browserVisible: false",
  "customerEmailReturned: false",
  "providerPayloadReturned: false",
  "providerResponseReturned: false",
]);

expect(routePath, [
  "containsBlockedDryRunShape",
  "containsUnsafeFragment",
  "safe dry-run projection",
  "This dry-run does not send email",
  "Cendorq will never ask for your password, card number, private key, or session token in this email.",
]);

expect(queueValidatorPath, [
  "src/app/api/admin/customer/email/dispatch/dry-run/route.ts",
  "validate-customer-email-dispatch-admin-dry-run-api.mjs",
  "dry-run-no-provider-call",
]);

forbidden(routePath, [
  "rawCustomerEmailExposed: true",
  "rawTokenExposed: true",
  "tokenHashExposed: true",
  "confirmationUrlExposed: true",
  "providerPayloadExposed: true",
  "providerResponseExposed: true",
  "providerSecretExposed: true",
  "browserSecretExposure: true",
  "providerCallMade: true",
  "providerSecretRead: true",
  "browserVisible: true",
  "customerEmailReturned: true",
  "providerPayloadReturned: true",
  "providerResponseReturned: true",
]);

if (failures.length) {
  console.error("Customer email dispatch admin dry-run API validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer email dispatch admin dry-run API validation passed with owner posture coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
