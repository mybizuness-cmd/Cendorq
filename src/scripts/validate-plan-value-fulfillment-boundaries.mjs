import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/lib/plan-value-fulfillment-boundaries.ts",
  "src/lib/plan-delivery-orchestration-contracts.ts",
  "src/lib/plan-value-delivery-architecture.ts",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing plan value fulfillment dependency: ${file}`);
}

expect("src/lib/plan-value-fulfillment-boundaries.ts", [
  "PLAN_VALUE_FULFILLMENT_BOUNDARIES",
  "PLAN_VALUE_FULFILLMENT_RULES",
  "projectPlanValueFulfillment",
  "allowedDeliverables",
  "blockedOverlap",
  "requiredBeforeDelivery",
  "approvalGate",
  "customerFacingSummary",
  "escalationRule",
  "Free Scan fulfillment must not produce full diagnosis, implementation, or monthly monitoring deliverables",
  "Deep Review fulfillment must not produce implementation work unless Build Fix is purchased or separately scoped",
  "Build Fix fulfillment must not behave like unlimited implementation or recurring monitoring",
  "Ongoing Control fulfillment must not behave like unlimited Build Fix work or guaranteed ranking/AI placement",
]);

expect("src/lib/plan-delivery-orchestration-contracts.ts", [
  "PLAN_VALUE_FULFILLMENT_BOUNDARIES",
  "PLAN_VALUE_FULFILLMENT_RULES",
  "projectPlanValueFulfillment",
  "fulfillmentBoundaryStandard",
  "fulfillmentBoundaries",
  "fulfillmentProjections",
  "blockedOverlap",
  "planWithoutFulfillmentBoundary",
  "freeScanDeliveringImplementation",
  "deepReviewDeliveringImplementationWithoutBuildFix",
  "buildFixDeliveringUnlimitedImplementation",
  "ongoingControlDeliveringUnlimitedBuildFix",
  "fulfillment boundary checks",
]);

expect("src/lib/plan-value-delivery-architecture.ts", [
  "PLAN_VALUE_DELIVERY_ARCHITECTURE",
  "PLAN_VALUE_SEPARATION_RULES",
  "doesNotInclude",
  "reportBoundary",
  "upgradeLogic",
]);

forbidden(files, [
  "100% accurate",
  "guaranteed result",
  "guaranteed revenue",
  "guaranteed ROI",
  "Free Scan delivers full diagnostic report",
  "Deep Review includes implementation",
  "Build Fix includes unlimited implementation",
  "Ongoing Control includes unlimited fixes",
  "guaranteed ranking",
  "guaranteed AI answer placement",
]);

if (failures.length) {
  console.error("Plan value fulfillment boundary validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan value fulfillment boundary validation passed. Fulfillment preserves allowed deliverables, blocked overlaps, approval gates, and plan-specific escalation rules.");

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
