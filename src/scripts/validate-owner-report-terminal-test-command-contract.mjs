import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const contractPath = "src/lib/owner-report-terminal-test-command-contract.ts";
const failures = [];

expect(contractPath, [
  "OwnerReportTerminalTestCommand",
  "OwnerReportTerminalTestCommandProjection",
  "OWNER_REPORT_TERMINAL_TEST_COMMAND_STANDARD",
  "buildOwnerReportTerminalTestCommand",
  "DEFAULT_PLANS",
  "/api/command-center/owner-report-test-mode",
  "/command-center/owner-report-test",
  "public-company-url-only",
  "requiresCommandCenterAccess: true",
  "bypassesCheckoutForOwnerTestOnly: true",
  "customerDeliveryApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "noCheckout: true",
  "noCustomerDelivery: true",
  "noBillingMutation: true",
  "noEntitlementMutation: true",
  "curl -X POST",
  "Terminal output should expose safety, acquisition, findings, preview packages, sample outputs, and release-gate posture.",
]);

forbidden(contractPath, [
  "customerDeliveryApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "requiresCommandCenterAccess: false",
  "bypassesCheckoutForOwnerTestOnly: false",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Owner report terminal test command contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report terminal test command contract validation passed.");

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
