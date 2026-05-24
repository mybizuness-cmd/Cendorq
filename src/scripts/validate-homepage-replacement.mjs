import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const page = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const home = readFileSync(join(root, "src/components/homepage/homepage-clarity-reset.tsx"), "utf8");
const failures = [];

for (const phrase of ["HomepageClarityReset", "Cendorq | AI Search Presence Repair for Businesses"]) {
  if (!page.includes(phrase)) failures.push(`page missing: ${phrase}`);
}

for (const phrase of ["Be easier to find, understand, and choose.", "Start Free Scan", "See Sample Report", "PresenceReportPreview"]) {
  if (!home.includes(phrase)) failures.push(`home reset missing: ${phrase}`);
}

if (page.length > 5200) failures.push(`page is too long: ${page.length}`);
if (home.length > 4200) failures.push(`home reset is too long: ${home.length}`);

if (failures.length) {
  console.error("Homepage replacement validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage replacement validation passed.");
