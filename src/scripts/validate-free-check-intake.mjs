import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/app/free-check/page.tsx",
  "src/components/free-check/guided-free-check-form-v2.tsx",
  "src/lib/validation/free-check.ts",
  "src/lib/signals/free-check-signal.ts",
  "src/lib/intelligence/free-check-intelligence.ts",
  "src/lib/reports/free-check-report.ts",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing Free Scan intake file: ${file}`);
}

expect("src/app/free-check/page.tsx", [
  "title: \"Free Scan | Cendorq\"",
  "Cendorq Free Scan",
  "serviceType: \"Free Scan\"",
  "{ name: \"Free Scan\", path: \"/free-check\" }",
]);

expect("src/components/free-check/guided-free-check-form-v2.tsx", [
  "source: \"free-check\"",
  "Submit free scan",
  "Premium free scan",
  "Scan received",
  "Compare all plans",
  "Possible Ongoing Control fit",
  "Possible Build Fix fit",
  "Likely Deep Review fit",
  "See Ongoing Control",
  "See Build Fix",
  "See Deep Review",
]);

expect("src/lib/validation/free-check.ts", [
  "export type IntakeSource = \"free-check\" | \"search-presence-scan\";",
  "if (value === \"search-presence-scan\") return \"search-presence-scan\";",
  "return \"free-check\";",
  "// Legacy compatibility fields preserved so older callers do not break.",
]);

expect("src/lib/signals/free-check-signal.ts", [
  "return \"Free Scan only\";",
  "return \"Deep Review candidate\";",
  "return \"Build Fix review\";",
  "return \"Ongoing Control review\";",
]);

expect("src/lib/intelligence/free-check-intelligence.ts", [
  "return \"Free Scan only\";",
  "return \"Deep Review candidate\";",
  "return \"Build Fix review\";",
  "return \"Ongoing Control review\";",
]);

expect("src/lib/reports/free-check-report.ts", [
  "Free Scan should keep strengthening the first signal.",
  "Deep Review is the strongest next step.",
  "Build Fix pressure is visible",
  "Ongoing Control may become the right path",
]);

const publicIntakeText = [
  "src/app/free-check/page.tsx",
  "src/components/free-check/guided-free-check-form-v2.tsx",
  "src/lib/reports/free-check-report.ts",
  "src/lib/signals/free-check-signal.ts",
  "src/lib/intelligence/free-check-intelligence.ts",
]
  .filter((file) => existsSync(join(root, file)))
  .map((file) => read(file))
  .join("\n");

for (const phrase of [
  "Free Search Presence Scan",
  "free search presence scan",
  "Search Presence Scan only",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "Possible ongoing support fit",
  "Possible build fit",
  "Likely deep review fit",
]) {
  if (publicIntakeText.includes(phrase)) failures.push(`Free Scan intake public text contains retired phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Free Scan intake validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan intake validation passed. Form source, metadata, validation defaults, routing labels, intelligence labels, next-move wording, and report recommendations are synchronized.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
