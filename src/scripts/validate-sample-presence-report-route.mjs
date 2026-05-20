import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

const routePath = "src/app/sample-report/page.tsx";
const componentPath = "src/components/presence-report/sample-presence-report.tsx";
const routesChainPath = "src/scripts/validate-routes-chain.mjs";
const validatorPath = "src/scripts/validate-sample-presence-report-route.mjs";

expect(routePath, [
  "Sample Presence Report | Cendorq",
  "SamplePresenceReport",
  "@/components/presence-report/sample-presence-report",
  "See how Cendorq turns uncertainty into a repair queue.",
  "The Presence Report is the core Cendorq object",
  "Run Free Scan",
  "View Plans",
  "This is an example, not a promise.",
  "buildWebPageJsonLd",
  "buildBreadcrumbJsonLd",
  "toJsonLd",
]);

expect(componentPath, [
  "SamplePresenceReport",
  "Sample Presence Report",
  "Presence Score",
  "Visible, but not easy to choose.",
  "Findability",
  "Understanding",
  "Trust",
  "Choice",
  "Action",
  "Repair queue",
  "Recommended next move",
  "Deep Review or Build Fix",
  "First signal summary",
  "Business truth profile",
  "Choice-gap notes",
  "not a ranking, lead, revenue, or placement promise",
]);

expect(routesChainPath, [validatorPath]);

boundedLength(routePath, 8500);
boundedLength(componentPath, 15500);

forbidden(routePath, ["guaranteed ranking", "guaranteed leads", "guaranteed revenue", "guaranteed placement", "guaranteed ROI", "full diagnosis for free", "free implementation", "free monthly monitoring"]);
forbidden(componentPath, ["guaranteed ranking", "guaranteed leads", "guaranteed revenue", "guaranteed placement", "guaranteed ROI", "full diagnosis for free", "free implementation", "free monthly monitoring"]);

if (failures.length) {
  console.error("Sample Presence Report route validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Sample Presence Report route validation passed with reusable report component, public sample route, report pillars, repair queue, and safe example-only positioning.");

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

function boundedLength(path, maxCharacters) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  if (text.length > maxCharacters) failures.push(`${path} is too long for sample report standard: ${text.length} > ${maxCharacters}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
