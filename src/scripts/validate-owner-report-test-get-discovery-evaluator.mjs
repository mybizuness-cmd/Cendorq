import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const evaluatorPath = "src/lib/owner-report-test-get-discovery-evaluator.ts";
const apiPath = "src/app/api/command-center/owner-report-test-mode/route.ts";
const failures = [];

expect(evaluatorPath, [
  "OwnerReportTestGetDiscoveryEvaluation",
  "OWNER_REPORT_TEST_GET_DISCOVERY_STANDARD",
  "evaluateOwnerReportTestGetDiscovery",
  "terminalRunbook",
  "apiResponseContract",
  "resultReviewContract",
  "reportExperienceScorecards",
  "fixtureBatch",
  "batchManifest",
  "fixtureCommands",
  "blueprints",
  "sampleOutputs",
  "ownerOnly: true",
  "checkoutRequired: false",
  "customerDeliveryAllowed: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
]);

expect(apiPath, [
  "evaluateOwnerReportTestGetDiscovery",
  "discoveryPayload",
  "getDiscoveryEvaluation",
  "reportExperienceScorecards",
]);

forbidden(evaluatorPath, [
  "ownerOnly: false",
  "checkoutRequired: true",
  "customerDeliveryAllowed: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
]);

if (failures.length) {
  console.error("Owner report test GET discovery evaluator validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Owner report test GET discovery evaluator validation passed with report experience scorecards required.");

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
