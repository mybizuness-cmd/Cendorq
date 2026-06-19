import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

check("src/app/page.tsx", ["HomepageClarityReset", "Cendorq | AI Search Presence Repair for Businesses"]);
check("src/components/homepage/homepage-clarity-reset.tsx", [
  "final-master-presence-product-film",
  "bg-[#040b18]",
  "text-white",
  "AI Search Presence Repair",
  "Know why customers choose someone else.",
  "Cendorq maps what buyers and answer engines can understand",
  "Run Free Scan",
  "See How It Works",
  "id=\"product\"",
  "One clear path from scan to repair.",
  "SignalEngine",
  "SystemCore",
  "HaloLabels",
  "CommandSpine",
  "CommandCard",
  "Map",
  "Expose",
  "Route",
  "Clarity",
  "Trust",
  "Surface",
  "Meaning",
  "Proof",
  "Choice",
  "Decision Gap",
  "Repair Queue",
  "Control",
  "presence-card",
  "presence-orbit",
  "motion-safe:animate-pulse",
  "No fake ranking promise. No generic checklist.",
]);
check("src/layout/site-header-conversion.tsx", [
  "Product",
  "Plans",
  "FAQ",
  "Contact",
  "Customer Access",
  "Start Free Scan",
  "Menu",
  "href=\"/plans\"",
  "href=\"/faq\"",
  "href=\"/connect\"",
  "href=\"/login\"",
]);
check("src/app/free-check/page.tsx", ["Free Scan | Cendorq", "Low friction", "Useful context", "Safe boundary", "Start Free Scan", "Decision Gap"]);
check("src/app/plans/page.tsx", [
  "Choose the next repair depth.",
  "Start with the Free Scan when the Decision Gap is unknown.",
  "Start Free Scan",
  "Read FAQ",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "No guaranteed rankings, leads, revenue, or AI placement.",
]);
check("src/app/faq/page.tsx", ["Cendorq FAQ", "Answers before the first repair.", "AI Search Presence Repair", "Decision Gap", "Repair Queue"]);
check("src/app/connect/page.tsx", [
  "Contact Cendorq | AI Search Presence Repair",
  "Contact Cendorq when the question is clear.",
  "Start the Free Scan first when the Decision Gap is still unknown.",
  "Email Support",
  "Start Free Scan",
  "Compare Plans",
  "Fit",
  "Scope",
  "Support",
  "sensitive credentials",
]);
check("package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
check("src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-public-homepage-command-surface.mjs"]);

forbid("src/components/homepage/homepage-clarity-reset.tsx", [
  "Presence Report in motion",
  "Live scan preview",
  "Five decision signals",
  "flow-line",
  "bg-[#eef8ff]",
  "Cendorq scans what buyers and answer engines can see",
  "make the business easier to trust and choose",
  "rounded-full",
  "sample",
  "preview",
]);

forbid("src/app/plans/page.tsx", [
  "Start Scan",
  "rounded-full",
  "Choose the right next step.",
  "See the first weak signal.",
  "No visible eyebrow label blocks",
  "sample",
  "preview",
]);

forbid("src/app/free-check/page.tsx", [
  "Start Scan",
  "View Plans",
  "rounded-full",
  "first weak signal",
  "sample",
  "preview",
]);

forbid("src/app/connect/page.tsx", [
  "Contact Us | Cendorq",
  "Contact Us page",
  "Start Scan",
  "rounded-full",
  "Ask when the question is clear.",
  "weak signal",
  "decision matrix",
  "checklist grid",
  "sample",
  "preview",
]);

maxLength("src/app/page.tsx", 2600);
maxLength("src/components/homepage/homepage-clarity-reset.tsx", 22000);
maxLength("src/layout/site-header-conversion.tsx", 18000);
maxLength("src/app/free-check/page.tsx", 20000);
maxLength("src/app/plans/page.tsx", 18000);
maxLength("src/app/connect/page.tsx", 20000);
maxLength("src/app/faq/page.tsx", 22000);

if (failures.length) {
  console.error("Public command surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public command surface validation passed with cinematic homepage, hardened command spine, polished public flow, clean mobile navigation, and Decision Gap language.");

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

function forbid(path, phrases) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return;
  const text = readFileSync(absolute, "utf8").toLowerCase();
  for (const phrase of phrases) {
    if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
  }
}

function maxLength(path, maxCharacters) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return;
  const text = readFileSync(absolute, "utf8");
  if (text.length > maxCharacters) failures.push(`${path} is too long: ${text.length} > ${maxCharacters}`);
}
