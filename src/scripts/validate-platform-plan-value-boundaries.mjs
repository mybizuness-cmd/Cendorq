import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/lib/plan-value-delivery-architecture.ts",
  "src/app/plans/page.tsx",
  "src/app/dashboard/billing/page.tsx",
  "src/app/checkout/success/page.tsx",
  "src/app/dashboard/reports/free-scan/page.tsx",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing platform plan value boundary dependency: ${file}`);
}

expect("src/app/dashboard/billing/page.tsx", [
  "getPlanValueDelivery",
  "PLAN_VALUE_SEPARATION_RULES",
  "Choose the next paid step without paying twice for the same thing",
  "Includes",
  "Not included",
  "Deep Review diagnoses the full reason",
  "Build Fix implements a scoped improvement",
  "Ongoing Control monitors and guides monthly decisions",
]);

expect("src/app/checkout/success/page.tsx", [
  "getPlanValueDelivery",
  "PLAN_VALUE_SEPARATION_RULES",
  "What this unlocks",
  "What this does not include",
  "what this plan unlocks, what it does not unlock",
  "No overlap after checkout",
]);

expect("src/app/dashboard/reports/free-scan/page.tsx", [
  "getPlanValueDelivery",
  "PLAN_VALUE_SEPARATION_RULES",
  "What Free Scan gives you",
  "What Free Scan does not include",
  "Free Scan identifies a first visible signal",
  "Free Scan does not include full root-cause diagnosis, implementation work, or monthly monitoring",
]);

expect("src/app/plans/page.tsx", [
  "getPlanValueDelivery",
  "PLAN_VALUE_NO_OVERLAP_MATRIX",
  "Every plan has a different job",
]);

expect("src/lib/plan-value-delivery-architecture.ts", [
  "PLAN_VALUE_DELIVERY_ARCHITECTURE",
  "PLAN_VALUE_SEPARATION_RULES",
  "PLAN_VALUE_NO_OVERLAP_MATRIX",
  "Free Scan identifies a first visible signal; Deep Review diagnoses the full reason; Build Fix implements a scoped improvement; Ongoing Control monitors and guides monthly decisions.",
]);

forbidden(files, [
  "100% accurate",
  "guaranteed result",
  "guaranteed revenue",
  "guaranteed ROI",
  "Free Scan includes full diagnosis",
  "Deep Review includes implementation",
  "Build Fix includes unlimited implementation",
  "Ongoing Control includes unlimited fixes",
  "monthly monitoring included in Build Fix",
]);

if (failures.length) {
  console.error("Platform plan value boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Platform plan value boundary validation passed. Pricing, billing, checkout success, and Free Scan results stay aligned with distinct plan value boundaries.");

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
