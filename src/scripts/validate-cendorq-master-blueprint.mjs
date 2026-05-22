import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const blueprintPath = "docs/cendorq-master-blueprint.md";

expect(blueprintPath, [
  "Cendorq Master Blueprint",
  "AI Search Presence Repair",
  "Cendorq should not become a smaller Semrush or a smaller Yext.",
  "Make the business answer-ready.",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Presence Report",
  "Run Free Scan",
  "Semrush lessons",
  "Yext Scout lessons",
  "Presence Score",
  "Choice Gap",
  "Repair Queue",
  "Evidence Boundary",
  "Business Truth Profile",
  "Control Snapshot",
  "Presence Gap Index",
  "Customer dashboard blueprint",
  "Presence Command Center",
  "Operator terminal blueprint",
  "Command Queue",
  "Evidence Console",
  "Finding Builder",
  "Repair Composer",
  "Approval Gate",
  "Audit Log",
  "Homepage",
  "Free Scan",
  "Plans",
  "Sample Report",
  "FAQ",
  "proof before paid pressure",
  "one dominant command per screen band",
  "Do not promise rankings, leads, revenue, AI placement, or guaranteed selection.",
]);

order(blueprintPath, "Scan", "Review");
order(blueprintPath, "Review", "Repair");
order(blueprintPath, "Repair", "Control");
order(blueprintPath, "Presence Report", "Choice Gap");
order(blueprintPath, "Choice Gap", "Repair Queue");
order(blueprintPath, "Repair Queue", "Control Snapshot");

if (failures.length) {
  console.error("Cendorq master blueprint validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Cendorq master blueprint validation passed with AI Search Presence Repair category, Scan Review Repair Control path, Presence Report object, dashboard command center, operator terminal, homepage-first roadmap, and non-negotiable safety boundaries.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function order(path, before, after) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  const beforeIndex = text.indexOf(before);
  const afterIndex = text.indexOf(after);
  if (beforeIndex === -1) failures.push(`${path} missing order phrase: ${before}`);
  if (afterIndex === -1) failures.push(`${path} missing order phrase: ${after}`);
  if (beforeIndex !== -1 && afterIndex !== -1 && beforeIndex >= afterIndex) failures.push(`${path} order violation: ${before} must appear before ${after}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
