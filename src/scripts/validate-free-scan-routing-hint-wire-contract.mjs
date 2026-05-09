import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/lib/validation/free-check.ts",
  "src/lib/signals/free-check-signal.ts",
  "src/lib/intelligence/free-check-intelligence.ts",
  "src/lib/reports/free-check-report.ts",
  "src/components/free-check/guided-free-check-form-v3.tsx",
  "src/app/api/free-check/route.ts",
  "db/migrations/0001_command_center_foundation.sql",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing Free Scan routing hint contract file: ${file}`);
}

// These are stable internal wire/storage keys. They are intentionally not buyer-facing labels.
expect("src/lib/validation/free-check.ts", [
  "export type RoutingHint =",
  "| \"scan-only\"",
  "| \"blueprint-candidate\"",
  "| \"infrastructure-review\"",
  "| \"command-review\"",
  "return \"command-review\";",
  "return \"infrastructure-review\";",
  "return \"blueprint-candidate\";",
]);

expect("src/app/api/free-check/route.ts", [
  "const ROUTING_HINT_VALUES = [\"scan-only\", \"blueprint-candidate\", \"infrastructure-review\", \"command-review\"] as const satisfies readonly RoutingHint[];",
  "byRoutingHint: Record<RoutingHint, number>",
  "\"blueprint-candidate\": 0",
  "\"infrastructure-review\": 0",
  "\"command-review\": 0",
]);

expect("db/migrations/0001_command_center_foundation.sql", [
  "routing_hint text not null default 'scan-only'",
  "'blueprint-candidate'",
  "'infrastructure-review'",
  "'command-review'",
]);

// Every customer-facing interpretation must use current plan language.
expect("src/lib/signals/free-check-signal.ts", [
  "if (value === \"scan-only\") return \"Free Scan only\";",
  "if (value === \"blueprint-candidate\") return \"AI Readiness Review candidate\";",
  "if (value === \"infrastructure-review\") return \"Signal Repair review\";",
  "return \"Readiness Control review\";",
]);

expect("src/lib/intelligence/free-check-intelligence.ts", [
  "if (signals.routingHint === \"blueprint-candidate\")",
  "move into AI Readiness Review",
  "if (signals.routingHint === \"infrastructure-review\")",
  "showing Signal Repair pressure",
  "if (signals.routingHint === \"command-review\")",
  "showing possible Readiness Control pressure",
  "if (value === \"blueprint-candidate\") return \"AI Readiness Review candidate\";",
  "if (value === \"infrastructure-review\") return \"Signal Repair review\";",
  "return \"Readiness Control review\";",
]);

expect("src/lib/reports/free-check-report.ts", [
  "if (routingHint === \"command-review\")",
  "Readiness Control may become the right path",
  "href: \"/plans/ongoing-control\"",
  "if (routingHint === \"infrastructure-review\")",
  "Signal Repair pressure is visible",
  "href: \"/plans/build-fix\"",
  "if (routingHint === \"blueprint-candidate\")",
  "AI Readiness Review is the strongest next step",
  "href: \"/plans/deep-review\"",
]);

expect("src/components/free-check/guided-free-check-form-v3.tsx", [
  "if (routingHint === \"command-review\") return { title: \"Readiness Control may fit later.\"",
  "href: \"/plans/ongoing-control\"",
  "if (routingHint === \"infrastructure-review\") return { title: \"Signal Repair may fit later.\"",
  "href: \"/plans/build-fix\"",
  "if (routingHint === \"blueprint-candidate\") return { title: \"AI Readiness Review may be the right next depth.\"",
  "href: \"/plans/deep-review\"",
]);

const customerFacingFiles = [
  "src/lib/signals/free-check-signal.ts",
  "src/lib/intelligence/free-check-intelligence.ts",
  "src/lib/reports/free-check-report.ts",
  "src/components/free-check/guided-free-check-form-v3.tsx",
];

for (const file of customerFacingFiles) {
  const text = read(file);
  for (const phrase of [
    "Visibility Blueprint",
    "Presence Infrastructure",
    "Presence Command",
    "View Visibility Blueprint",
    "View Presence Infrastructure",
    "View Presence Command",
    "Search Presence Scan only",
    "Deep Review candidate",
    "Build Fix review",
    "Ongoing Control review",
    "Deep Review may be",
    "Build Fix may be",
    "Ongoing Control may",
  ]) {
    if (text.includes(phrase)) failures.push(`${file} leaks retired buyer-facing routing label: ${phrase}`);
  }
}

if (failures.length) {
  console.error("Free Scan routing hint wire contract validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan routing hint wire contract validation passed. Stable internal routing hint keys remain backward compatible, while every customer-facing interpretation maps to current Free Scan, AI Readiness Review, Signal Repair, and Readiness Control language.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing routing hint contract phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
