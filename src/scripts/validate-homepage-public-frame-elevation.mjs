import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const homepagePath = "src/app/page.tsx";
const footerPath = "src/layout/site-footer.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-homepage-public-frame-elevation.mjs";

expect(homepagePath, [
  "See what makes customers hesitate before they choose someone else.",
  "helps you find the break in clarity, trust, visibility, or action",
  "No guaranteed rankings, revenue, or unlimited implementation.",
  "Your customer is already comparing you before they contact you.",
  "Search and AI may read you weakly",
  "One signal. One diagnosis. One scoped fix. One monthly control layer.",
  "Homepage public frame elevation",
  "Cheap-looking blocks removed",
  "Bulky homepage pricing path reduced",
  "Customer-facing copy speaks directly to the owner",
  "PLAN_VALUE_SEPARATION_RULES",
]);

expect(footerPath, [
  "Start with the right read before buying the wrong fix.",
  "Free Scan gives a first signal. Paid plans only add depth when the stage fits.",
  "Slim footer block",
  "Footer no longer uses bulky plan cards",
  "Free Scan is not full diagnosis, implementation, or monthly control.",
]);

expect(routesChainPath, [validatorPath]);

reject(homepagePath, [
  "No cheap bundle confusion",
  "Premium plan blocks",
  "Customers decide before they talk to you.",
]);

boundedLength(homepagePath, 20000);
boundedLength(footerPath, 12000);

if (failures.length) {
  console.error("Homepage public frame elevation validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage public frame elevation validation passed with sharper customer copy, slimmer plan path, reduced footer bulk, and plan-boundary guardrails.");

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

function reject(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} should not include phrase: ${phrase}`);
  }
}

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for public frame elevation standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
