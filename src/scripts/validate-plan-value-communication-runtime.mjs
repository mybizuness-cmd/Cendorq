import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/lib/plan-value-communication-runtime.ts",
  "src/lib/pricing-checkout-orchestration.ts",
  "src/lib/plan-value-delivery-architecture.ts",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing plan value communication dependency: ${file}`);
}

expect("src/lib/plan-value-communication-runtime.ts", [
  "PLAN_VALUE_COMMUNICATION_RULES",
  "PLAN_VALUE_COMMUNICATION_PROHIBITED_CLAIMS",
  "projectPlanValueCommunication",
  "Free Scan communications must educate from a first visible signal without presenting a full diagnosis",
  "Deep Review communications must focus on diagnosis and cause-level clarity without promising implementation",
  "Build Fix communications must focus on scoped implementation without implying unlimited fixes or monthly monitoring",
  "Ongoing Control communications must focus on recurring monitoring and monthly decisions without implying unlimited Build Fix work",
  "Upgrade language must explain a different job",
]);

expect("src/lib/pricing-checkout-orchestration.ts", [
  "projectPlanValueCommunication",
  "DEEP_REVIEW_COMMUNICATION",
  "BUILD_FIX_COMMUNICATION",
  "ONGOING_CONTROL_COMMUNICATION",
  "customerPromise",
  "includedValue",
  "notIncluded",
  "boundary",
  "safeUpgradeExplanation",
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
  "guaranteed ranking",
  "guaranteed AI answer placement",
  "Free Scan is a full diagnosis",
  "Deep Review includes implementation",
  "Build Fix includes unlimited implementation",
  "Ongoing Control includes unlimited fixes",
]);

if (failures.length) {
  console.error("Plan value communication runtime validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Plan value communication runtime validation passed. Emails and notifications preserve plan boundaries, included value, exclusions, and safe upgrade logic.");

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
