import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const panelPath = "src/app/command-center/report-quality-domination-panel.tsx";
const routePath = "src/app/command-center/page.tsx";
const failures = [];

expect(panelPath, [
  "ReportQualityDominationPanel",
  "REPORT_QUALITY_DOMINATION_STANDARD",
  "REPORT_QUALITY_NON_NEGOTIABLES",
  "Report quality domination",
  "Reports must look elite and stay true.",
  "Metadata-only quality standard",
  "visual hierarchy",
  "truth separation",
  "evidence",
  "confidence",
  "plan-specific value",
  "operator trace",
  "limitations",
  "customer next command",
  "Non-negotiables",
]);

expect(routePath, [
  "ReportQualityDominationPanel",
  "./report-quality-domination-panel",
  "<ReportQualityDominationPanel />",
]);

forbidden(panelPath, [
  "guaranteed ranking is allowed",
  "guaranteed revenue is allowed",
  "guaranteed AI placement is allowed",
  "guaranteed accuracy is allowed",
  "customerDeliveryApproved: true",
  "reportReleaseApproved: true",
  "billingMutationAllowed: true",
  "entitlementMutationAllowed: true",
  "localStorage",
  "sessionStorage",
  "dangerouslySetInnerHTML",
]);

if (failures.length) {
  console.error("Report quality domination panel validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report quality domination panel validation passed.");

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
