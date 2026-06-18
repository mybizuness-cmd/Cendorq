import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

check("src/app/page.tsx", ["HomepageClarityReset", "Cendorq | AI Search Presence Repair for Businesses"]);
check("src/components/homepage/homepage-clarity-reset.tsx", [
  "final-master-presence-product-film",
  "Know why customers choose someone else.",
  "Run Free Scan",
  "See How It Works",
  "id=\"product\"",
  "Search Presence",
  "Decision Gap",
  "Repair Queue",
  "Presence Report in motion",
]);
check("src/layout/site-header-conversion.tsx", [
  "Product",
  "Plans",
  "FAQ",
  "Contact",
  "Customer Access",
  "Start Free Scan",
  "href=\"/plans\"",
  "href=\"/faq\"",
  "href=\"/connect\"",
  "href=\"/login\"",
]);
check("src/app/free-check/page.tsx", ["Free Scan | Cendorq", "Low friction", "Useful context", "Safe boundary"]);
check("src/app/faq/page.tsx", ["Cendorq FAQ", "Answers before the first repair.", "AI Search Presence Repair", "Decision Gap", "Repair Queue"]);
check("src/app/connect/page.tsx", ["Contact Cendorq", "Start Free Scan", "Compare plans"]);
check("package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
check("src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-public-homepage-command-surface.mjs"]);

maxLength("src/app/page.tsx", 2600);
maxLength("src/components/homepage/homepage-clarity-reset.tsx", 22000);
maxLength("src/layout/site-header-conversion.tsx", 16000);
maxLength("src/app/faq/page.tsx", 22000);

if (failures.length) {
  console.error("Public command surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public command surface validation passed with current navigation, current FAQ content, active product anchor, and Decision Gap public language.");

function check(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = readFileSync(absolute, "utf8");
  for (const phrase of phrases) {
    if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
  }
}

function maxLength(path, maxCharacters) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return;
  const text = readFileSync(absolute, "utf8");
  if (text.length > maxCharacters) failures.push(`${path} is too long: ${text.length} > ${maxCharacters}`);
}
