import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const formPath = "src/components/free-check/guided-free-check-form-v2.tsx";
const pagePath = "src/app/free-check/page.tsx";
const packagePath = "package.json";
const failures = [];

expect(formPath, [
  "country: \"\"",
  "Select country",
  "hasMeaningfulInput",
  "const progress = hasStartedScan ? Math.round(((step + 1) / STEPS.length) * 100) : 0;",
  "const qualityScore = useMemo(() => buildQualityScore(values), [values]);",
  "Object.values(values).some((value) => value.trim().length > 0)",
]);

expect(formPath, [
  "<option value=\"\">Select country</option>",
  "values.country.length >= 2",
  "Choose a country.",
  "Scan strength",
  "{qualityScore}%",
  "{progress}% complete",
]);

expect(pagePath, [
  "GuidedFreeCheckForm",
  "guided-free-check-form-v2",
  "FreeCheckProgressGuard",
  "Pending means pending, not final truth",
]);

expect(packagePath, [
  "validate:routes",
  "validate-free-scan-zero-start-progress.mjs",
]);

forbidden(formPath, [
  "country: \"United States\"",
  "const progress = Math.round(((step + 1) / STEPS.length) * 100);",
  "const progress = Math.round((step / STEPS.length) * 100);",
  "8% complete",
  "8%",
  "default scan strength 8",
  "prefilled country",
]);

if (failures.length) {
  console.error("Free Scan zero-start progress validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Free Scan zero-start progress validation passed.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }

  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;

  const text = read(path).toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
