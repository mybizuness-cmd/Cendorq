import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const routes = [
  "src/app/sample-report/dentist/page.tsx",
  "src/app/sample-report/med-spa/page.tsx",
  "src/app/sample-report/law-firm/page.tsx",
  "src/app/sample-report/contractor/page.tsx",
];
const componentPath = "src/components/presence-report/vertical-sample-presence-report.tsx";
const indexPath = "src/components/presence-report/index.ts";
const failures = [];

for (const route of routes) {
  expect(route, [
    "VerticalSamplePresenceReport",
    "VERTICAL_SAMPLE_PRESENCE_REPORTS",
    "buildMetadata",
    "Choice Gap",
    "Repair Queue",
    "Sample Presence Report",
  ]);
}

expect(componentPath, [
  "VerticalSamplePresenceReport",
  "Choice Gap",
  "Business Truth Profile",
  "Priority repairs",
  "Run Free Scan",
  "Back to Sample Report",
]);

expect(indexPath, ["VerticalSamplePresenceReport"]);

if (failures.length) {
  console.error("Vertical Sample Report routes validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Vertical Sample Report routes validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(join(root, path), "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}
