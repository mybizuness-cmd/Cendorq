import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];
const standardPath = "src/lib/command-center/customer-command-experience-standard.ts";
const docsIndexPath = "docs/command-center-docs-index.md";
const routeChainPath = "src/scripts/validate-routes-chain.mjs";
const registryPath = "src/lib/command-center/validation-registry.ts";

validateTextFile(standardPath, [
  "CUSTOMER_COMMAND_EXPERIENCE_RULES",
  "CUSTOMER_COMMAND_EXPERIENCE_ZONES",
  "getCustomerCommandExperienceStandard",
  "Out-of-this-world first impression",
  "Complete account navigation",
  "Business command room layout",
  "Proof-centered trust experience",
  "Next-plan conversion engine",
  "Returning customer acceleration",
  "Progress momentum system",
  "Billing without friction",
  "Premium help and support",
  "Accessible authenticated dashboard",
  "Fast premium performance",
  "Brand moat experience",
  "Mission control hero",
  "Proof grid",
  "Roadmap command timeline",
  "Business memory vault",
  "Upgrade lab",
  "premium business command room",
  "evidence classes, confidence labels, methodology version, guarantee limits, correction window",
  "focus visibility",
  "bounded queries",
  "Cendorq-owned dashboard relationship",
]);

validateTextFile(docsIndexPath, [
  "src/lib/command-center/customer-command-experience-standard.ts",
  "src/scripts/validate-customer-experience-standard.mjs",
]);

validateTextFile(routeChainPath, ["src/scripts/validate-customer-experience-standard.mjs"]);
validateTextFile(registryPath, ["customer-experience-standard", "src/scripts/validate-customer-experience-standard.mjs"]);

validateForbidden(standardPath, [
  "generic SaaS dashboard allowed",
  "empty welcome screen allowed",
  "dashboard dead end allowed",
  "black-box score allowed",
  "fake urgency allowed",
  "cross-customer leak allowed",
  "keyboard trap allowed",
  "raw error allowed",
]);

if (failures.length) {
  console.error("Customer experience standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Customer experience standard validation passed with command-room UX, proof, conversion, support, accessibility, performance, and brand moat safeguards.");

function validateTextFile(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing required customer experience dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing required customer experience phrase: ${phrase}`);
  }
}

function validateForbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path);
  for (const phrase of phrases) {
    if (text.includes(phrase)) failures.push(`${path} contains forbidden customer experience phrase: ${phrase}`);
  }
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
