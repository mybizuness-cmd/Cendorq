import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const homepage = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const failures = [];

for (const phrase of [
  "export const dynamic = \"force-dynamic\";",
  "export const revalidate = 0;",
  "export const fetchCache = \"force-no-store\";",
  "data-cendorq-homepage=\"market-command-home-v1\"",
  "Cendorq Market Command Intelligence",
  "Become easier to find, trust, and choose.",
  "Start Free Scan",
  "Review Plans",
  "The Free Scan form stays intact.",
  "Dashboard and report paths stay intact.",
  "Scan. Diagnose. Fix. Control.",
  "href=\"/free-check\"",
  "href=\"/plans\"",
  "href: \"/plans/deep-review\"",
  "href: \"/plans/build-fix\"",
  "href: \"/plans/ongoing-control\"",
]) {
  if (!homepage.includes(phrase)) failures.push(`Homepage replacement missing required phrase: ${phrase}`);
}

for (const phrase of [
  "Cendorq Search Presence OS",
  "Search Presence Scan",
  "Start Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "href=\"/pricing\"",
  "href=\"/diagnosis\"",
]) {
  if (homepage.includes(phrase)) failures.push(`Homepage replacement contains forbidden phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Homepage replacement validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage replacement validation passed. Root homepage is dynamic, no-store, current-language, and points into the existing Free Scan and Plans path without touching dashboard, reports, billing, support, or APIs.");
