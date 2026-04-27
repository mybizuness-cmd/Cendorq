import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const files = [
  "src/app/api/free-check/route.ts",
  "src/app/free-check/page.tsx",
  "src/components/free-check/guided-free-check-form-v2.tsx",
  "src/lib/validation/free-check.ts",
  "src/lib/signals/free-check-signal.ts",
  "src/lib/intelligence/free-check-intelligence.ts",
  "src/lib/reports/free-check-report.ts",
  "docs/durable-intake-storage-standard.md",
];

for (const file of files) {
  if (!existsSync(join(root, file))) failures.push(`Missing Free Scan intake file: ${file}`);
}

expect("docs/durable-intake-storage-standard.md", [
  "not the final durable customer-data system",
  "real persistence layer outside local runtime files",
  "protected admin reads",
  "Production smoke must not create fake Free Scan submissions.",
  "Do not remove the protected read boundary to make migration easier.",
  "Durable intake storage is complete only when:",
]);

expect("src/app/api/free-check/route.ts", [
  "CURRENT_STORAGE_FILE = \"free-check-intakes.v3.json\"",
  "The requested Free Scan entry was not found.",
  "Unable to load Free Scan entries.",
  "submit the Free Scan again",
  "Submit the Free Scan with real business information.",
  "The Free Scan needs stronger signal before it can be accepted.",
  "The Free Scan has been captured successfully.",
  "This business already had a recent Free Scan in the system.",
  "The intake storage layer was not able to save the Free Scan right now.",
  "function shouldAllowLocalConsoleReads()",
  "return cleanQueryValue(process.env.NODE_ENV ?? \"\", 20).toLowerCase() !== \"production\";",
  "const READ_KEY_ENV_CANDIDATES = [\"INTAKE_CONSOLE_READ_KEY\", \"INTAKE_ADMIN_KEY\"] as const;",
  "safeEqual(providedKey, configuredKey)",
]);

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

const apiRouteText = read("src/app/api/free-check/route.ts");
for (const phrase of [
  "ALLOW_OPEN_INTAKE_READS",
  "OPEN_READS_ENV",
  "shouldAllowOpenConsoleReads",
  "explicitOpenReadFlag",
]) {
  if (apiRouteText.includes(phrase)) failures.push(`Free Scan API route contains forbidden open-read escape hatch: ${phrase}`);
}

const publicIntakeText = [
  "src/app/api/free-check/route.ts",
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
  "Search Presence Scan entries",
  "Search Presence Scan entry",
  "Search Presence Scan route",
  "Search Presence Scan needs",
  "Search Presence Scan has",
  "submit the Search Presence Scan",
  "save the Search Presence Scan",
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

console.log("Free Scan intake validation passed. API route language, protected read boundary, durable storage standard, form source, metadata, validation defaults, routing labels, intelligence labels, next-move wording, and report recommendations are synchronized.");

function expect(path, phrases) {
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
