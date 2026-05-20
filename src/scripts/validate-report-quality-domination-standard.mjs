import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standardPath = "src/lib/report-quality-domination-standard.ts";
const failures = [];

expect(standardPath, [
  "ReportQualityDimension",
  "ReportQualityDominationRule",
  "REPORT_QUALITY_DOMINATION_STANDARD",
  "REPORT_QUALITY_NON_NEGOTIABLES",
  "getReportQualityDominationStandard",
  "visual-hierarchy",
  "truth-separation",
  "evidence-confidence",
  "plan-specific-value",
  "operator-trace",
  "customer-next-command",
  "limitation-clarity",
  "conversion-integrity",
  "executive-readability",
  "Every report must be visually premium and structurally obvious before it is information dense.",
  "Every report must separate observed facts, inferences, unknowns, limitations, and recommendations.",
  "Every report must show evidence class and confidence for meaningful claims.",
  "Every report must show one next command, not a pile of equal CTAs.",
  "Owner test reports must reveal agent/chief/release-captain trace while remaining blocked from customer delivery.",
  "No report may claim guaranteed ranking, guaranteed revenue, guaranteed AI placement, guaranteed security, or guaranteed accuracy.",
]);

forbidden(standardPath, [
  "guaranteed ranking is allowed",
  "guaranteed revenue is allowed",
  "guaranteed AI placement is allowed",
  "guaranteed security is allowed",
  "guaranteed accuracy is allowed",
  "hide limitations",
  "skip evidence",
  "skip confidence",
  "customer delivery from owner test",
  "raw private data shown",
]);

if (failures.length) {
  console.error("Report quality domination standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Report quality domination standard validation passed.");

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
