import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const runtimePath = "src/lib/report-quality-release-gate-runtime.ts";
const failures = [];

expect(runtimePath, [
  "ReportQualityReleaseGateResult",
  "evaluateReportQualityReleaseGate",
  "getReportQualityReleaseGateDimensions",
  "REQUIRED_DIMENSIONS",
  "visual-hierarchy",
  "truth-separation",
  "evidence-confidence",
  "plan-specific-value",
  "operator-trace",
  "customer-next-command",
  "limitation-clarity",
  "conversion-integrity",
  "executive-readability",
  "nonNegotiablesChecked",
  "customerDeliveryApproved: false",
  "reportReleaseApproved: false",
  "billingMutationAllowed: false",
  "entitlementMutationAllowed: false",
  "rawPrivateEvidenceAllowed: false",
  "unsafe-phrase",
  "missing-",
  "guaranteed ranking",
  "guaranteed revenue",
  "guaranteed ai placement",
  "guaranteed accuracy",
  "guaranteed security",
]);

forbidden(runtimePath, [
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "rawPrivateEvidenceAllowed: true",
  "guaranteed ranking is allowed",
  "guaranteed revenue is allowed",
  "guaranteed ai placement is allowed",
  "skip evidence",
  "skip confidence",
  "hide limitations",
]);

if (failures.length) {
  console.error("Report quality release gate runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report quality release gate runtime validation passed.");

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
