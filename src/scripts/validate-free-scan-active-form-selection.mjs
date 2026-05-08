import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const freeCheckPagePath = "src/app/free-check/page.tsx";
const activeFormPath = "src/components/free-check/guided-free-check-form-v3.tsx";
const legacyFormPaths = [
  "src/components/free-check/free-check-form.tsx",
  "src/components/free-check/guided-free-check-form.tsx",
];

for (const path of [freeCheckPagePath, activeFormPath, ...legacyFormPaths]) {
  if (!existsSync(join(root, path))) failures.push(`Missing Free Scan form selection dependency: ${path}`);
}

expect(freeCheckPagePath, [
  "GuidedFreeCheckFormV3",
  "@/components/free-check/guided-free-check-form-v3",
  "<GuidedFreeCheckFormV3 className=\"relative z-10\" />",
]);

reject(freeCheckPagePath, [
  "GuidedFreeCheckForm } from",
  "guided-free-check-form\"",
  "FreeCheckForm } from",
  "free-check-form\"",
]);

expect(activeFormPath, [
  "GuidedFreeCheckFormV3",
  "href=\"/plans\"",
  "Compare all plans",
  "requestedDestination: \"/dashboard/reports/free-scan\"",
]);

reject(activeFormPath, [
  "href=\"/pricing\"",
  "href=\"/diagnosis\"",
  "Search Presence Scan",
]);

for (const legacyPath of legacyFormPaths) {
  const text = existsSync(join(root, legacyPath)) ? read(legacyPath) : "";
  if (text.includes("href=\"/pricing\"")) {
    console.warn(`[free-scan-active-form-selection] dormant legacy component still contains /pricing: ${legacyPath}`);
  }
}

if (failures.length) {
  console.error("Free Scan active form selection validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan active form selection validation passed. The public /free-check route uses GuidedFreeCheckFormV3, and the active form is guarded against legacy pricing, diagnosis, and Search Presence Scan drift.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required phrase: ${phrase}`);
  }
}

function reject(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden active-form phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
