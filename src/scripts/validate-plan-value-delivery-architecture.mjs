import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/lib/plan-value-delivery-architecture.ts",
  "src/app/plans/page.tsx",
  "src/lib/free-scan-report-methodology.ts",
  "src/lib/reports/free-check-report.ts",
  "src/lib/pricing-checkout-orchestration.ts",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing plan value delivery dependency: ${file}`);
}

expect("src/lib/plan-value-delivery-architecture.ts", [
  "PLAN_VALUE_DELIVERY_ARCHITECTURE",
  "PLAN_VALUE_SEPARATION_RULES",
  "PLAN_VALUE_NO_OVERLAP_MATRIX",
  "Free Scan identifies a first visible signal",
  "Deep Review diagnoses the full reason",
  "Build Fix implements a scoped improvement",
  "Ongoing Control monitors and guides monthly decisions",
  "Never sell Free Scan as a full diagnosis",
  "Never sell Deep Review as done-for-you implementation",
  "Never sell Build Fix as unlimited implementation",
  "Never sell Ongoing Control as unlimited Build Fix work",
  "doesNotInclude",
  "upgradeLogic",
  "reportBoundary",
]);

expect("src/app/plans/page.tsx", [
  "getPlanValueDelivery",
  "PLAN_VALUE_NO_OVERLAP_MATRIX",
  "PLAN_VALUE_SEPARATION_RULES",
  "Includes",
  "Not this plan",
  "Every plan has a different job",
  "you do not pay twice for the same thing",
]);

expect("src/lib/free-scan-report-methodology.ts", [
  "Never claim 100 percent certainty from a limited first scan",
  "Use Deep Review when the cause matters more than a quick fix",
  "Use Build Fix only when the weak part is clear enough to improve",
  "Use Ongoing Control when the business needs repeated monitoring and monthly decisions",
]);

expect("src/lib/reports/free-check-report.ts", [
  "scope: \"Free Scan\"",
  "first-read signal, not a final diagnosis",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "limitations",
]);

expect("src/lib/pricing-checkout-orchestration.ts", [
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Get the full reason customers hesitate",
  "Fix the weak page, message, proof, or action path",
  "Keep visibility, trust, search, AI answers, and customer friction under monthly control",
]);

forbidden(files, [
  "100% accurate",
  "guaranteed result",
  "guaranteed revenue",
  "guaranteed ROI",
  "unlimited implementation",
  "unlimited Build Fix",
  "full diagnosis" + " included in Free Scan",
  "Deep Review implementation included",
  "Ongoing Control includes unlimited fixes",
]);

if (failures.length) {
  console.error("Plan value delivery validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan value delivery validation passed. Free Scan, Deep Review, Build Fix, and Ongoing Control remain distinct, high-value, non-overlapping offers.");

function expect(file, phrases) {
  if (!existsSync(join(root, file))) return;
  const text = read(file);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${file} missing phrase: ${phrase}`);
  }
}

function forbidden(paths, phrases) {
  for (const file of paths) {
    if (!existsSync(join(root, file))) continue;
    const text = read(file).toLowerCase();
    for (const phrase of phrases) {
      if (text.includes(phrase.toLowerCase())) failures.push(`${file} contains forbidden phrase: ${phrase}`);
    }
  }
}

function read(file) {
  return readFileSync(join(root, file), "utf8");
}
