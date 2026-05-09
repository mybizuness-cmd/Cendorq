import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const homepage = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const footer = readFileSync(join(root, "src/layout/site-footer.tsx"), "utf8");
const header = readFileSync(join(root, "src/layout/site-header-conversion.tsx"), "utf8");
const loading = readFileSync(join(root, "src/app/loading.tsx"), "utf8");
const combined = `${homepage}\n${footer}\n${header}\n${loading}`;
const failures = [];

for (const phrase of [
  "export const dynamic = \"force-dynamic\";",
  "export const revalidate = 0;",
  "export const fetchCache = \"force-no-store\";",
  "data-cendorq-homepage=\"market-command-home-v3\"",
  "data-cendorq-loading=\"market-command-loading-v2\"",
  "Apple-level trust and authority",
  "Google-level simplicity",
  "ChatGPT-level immediate action",
  "AI Search Visibility and Market Command Intelligence",
  "customers, search, maps, reviews, and AI answers",
  "Become easier to find, trust, and choose.",
  "Cendorq checks how your business reads across customers, search, maps, reviews, and AI answers.",
  "Run the Free Scan before buying the bigger fix.",
  "Start Free Scan →",
  "Get found",
  "Be answer-ready",
  "Build trust",
  "Win choice",
  "Drive action",
  "Free Scan can surface the first AI/search visibility, trust, proof, or action signal.",
  "It does not promise rankings, AI placement, leads, or a complete diagnosis.",
  "No AI placement promises",
  "Start Free Scan",
  "Review Plans",
  "Plans",
  "Dashboard",
  "Support",
  "Menu",
  "Privacy",
  "Terms",
  "Market Command Intelligence for becoming easier to find, understand, trust, and choose.",
  "Free Scan is an entry signal, not a guarantee of rankings, leads, revenue, or outcomes.",
  "bg-[#fffefa]",
  "max-w-7xl",
  "Scan",
  "Diagnose",
  "Fix",
  "Control",
  "href=\"/free-check\"",
  "href=\"/plans\"",
  "href: \"/plans/deep-review\"",
  "href: \"/plans/build-fix\"",
  "href: \"/plans/ongoing-control\"",
]) {
  if (!combined.includes(phrase)) failures.push(`AI visibility homepage shell missing required phrase: ${phrase}`);
}

for (const phrase of [
  "Cendorq Search Presence OS",
  "Search Presence Scan",
  "Start Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "Cendorq Market Command Intelligence</p>",
  "First command",
  "Findability",
  "Clarity",
  "Trust\", \"Choice",
  "Be clear",
  "Connect with Cendorq",
  "Connect",
  "Simple path",
  "href=\"/pricing\"",
  "href=\"/diagnosis\"",
  "rough temporary",
  "emergency replacement",
  "guaranteed AI placement",
  "guaranteed ranking",
  "guaranteed leads",
  "guaranteed revenue",
  "The market either understands you or it moves on.",
  "The Free Scan starts the system. The protected dashboard carries the result.",
  "bg-[#020713]",
  "bg-[#fbfbf8]",
  "bg-slate-950/88",
  "supports-[backdrop-filter]:bg-slate-950/76",
  "text-white sm:text-base",
  "system-grid-wide",
  "MarketCard",
  "system-panel-authority",
  "system-button-primary",
  "Cendorq / Loading",
]) {
  if (combined.includes(phrase)) failures.push(`AI visibility homepage shell contains forbidden phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Homepage replacement validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage replacement validation passed. Public shell is whiter, wider, action-first, and accurately references bounded AI/search visibility without overpromising.");
