import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const printerPath = "src/scripts/print-owner-report-test-fixtures.mjs";
const failures = [];

expect(printerPath, [
  "Owner report test fixtures",
  "owner-only backend terminal/API smoke commands",
  "public URLs only, no checkout, no customer delivery, no billing mutation, no entitlement mutation",
  "fixture-apple-full-stack-preview",
  "fixture-nike-free-scan-smoke",
  "fixture-shopify-paid-plan-depth",
  "fixture-airbnb-ongoing-control-cycle",
  "/api/command-center/owner-report-test-mode",
  "curl -X POST",
  "Discovery endpoint:",
]);

forbidden(printerPath, [
  "checkoutRequired: true",
  "customerDeliveryApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "password=",
  "secret=",
  "token=",
]);

if (failures.length) {
  console.error("Owner report fixture printer validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report fixture printer validation passed.");

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
