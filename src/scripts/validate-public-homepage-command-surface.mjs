import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const failures = [];

check("src/app/page.tsx", ["HomepageClarityReset", "Cendorq | AI Search Presence Repair for Businesses"]);
check("src/components/homepage/homepage-clarity-reset.tsx", ["final-master-presence-product-film", "Know why customers choose someone else.", "Run Free Scan", "See Sample Report", "Search Presence", "Choice Gap", "Repair Queue"]);
check("src/components/homepage/cendorq-3d-presence-command.tsx", ["final-master-presence-command-center", "Presence Command Center", "One command surface for the score", "Search Readiness", "Choice Gap", "Repair Queue", "Control snapshot"]);
check("src/layout/site-header-conversion.tsx", ["Product", "Plans", "FAQ", "Contact", "Customer Access", "Start Free Scan", "href=\"/sample-report\"", "href=\"/plans\"", "href=\"/faq\"", "href=\"/connect\"", "href=\"/login\""]);
check("src/app/login/page.tsx", ["Customer access | Cendorq", "Access your Cendorq account.", "Return with your email."]);
check("src/app/free-check/page.tsx", ["Free Scan | Cendorq", "Low friction", "Useful context", "Safe boundary", "Open the result in your account."]);
check("src/app/sample-report/page.tsx", ["Sample Presence Report | Cendorq", "SamplePresenceReport", "The Presence Report is the core Cendorq object"]);
check("src/app/faq/page.tsx", ["Cendorq FAQ", "Get clear answers before the next move.", "Already have an account?"]);
check("src/app/connect/page.tsx", ["Contact Cendorq when the question is already clear.", "Start Free Scan if the problem is unclear.", "Compare plans"]);
check("package.json", ["validate:routes", "node ./src/scripts/validate-routes-chain.mjs"]);
check("src/scripts/validate-routes-chain.mjs", ["src/scripts/validate-public-homepage-command-surface.mjs"]);

maxLength("src/app/page.tsx", 5200);
maxLength("src/components/homepage/homepage-clarity-reset.tsx", 20000);
maxLength("src/components/homepage/cendorq-3d-presence-command.tsx", 18000);
maxLength("src/layout/site-header-conversion.tsx", 16000);

if (failures.length) {
  console.error("Public command surface validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public command surface validation passed with explainer-film homepage, Presence Command Center reel, active buyer routes, and current Cendorq terminology.");

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
