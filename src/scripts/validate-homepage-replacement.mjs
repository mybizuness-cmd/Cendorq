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
  "data-cendorq-homepage=\"market-command-home-v4\"",
  "AI Search Visibility and Market Command Intelligence",
  "If AI engines cannot understand your business, customers may never get the chance to.",
  "AI-readiness starts with business clarity.",
  "clear, trusted, and ready to be chosen",
  "Start with the Free Scan. See what AI engines and customers may be reading wrong.",
  "AI is becoming the new first impression.",
  "id=\"ai-readiness\"",
  "AI Readiness",
  "Sign in",
  "To be recommended, a business needs clear facts, trusted proof, consistent signals, and a reason to choose.",
  "without promising rankings, leads, or AI placement.",
  "Get found",
  "Be understood",
  "Prove trust",
  "Win choice",
  "Make action clear",
  "First read",
  "Cause proof",
  "Focused change",
  "Monthly watch",
  "Start Free Scan",
  "Review Plans",
  "Plans",
  "Privacy",
  "Terms",
  "No AI placement promises",
  "bg-white text-slate-950",
  "max-w-7xl",
  "Scan",
  "Diagnose",
  "Fix",
  "Control",
  "href=\"/free-check\"",
  "href=\"/plans\"",
  "href=\"/login\"",
  "href=\"/#ai-readiness\"",
  "href: \"/plans/deep-review\"",
  "href: \"/plans/build-fix\"",
  "href: \"/plans/ongoing-control\"",
]) {
  if (!combined.includes(phrase)) failures.push(`Polished AI readiness shell missing required phrase: ${phrase}`);
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
  "Clarity\", \"Trust",
  "Be clear",
  "Connect with Cendorq",
  "Connect",
  "Simple path",
  "Run the Free Scan before buying the bigger fix.",
  "Become easier to find, trust, and choose.",
  "If AI cannot understand your business, customers may never get the chance to.",
  "Dashboard\", href: \"/dashboard\"",
  "Support\", href: \"/dashboard/support\"",
  "aria-controls=\"site-menu\"",
  "Open site menu",
  "Close site menu",
  "href=\"/pricing\"",
  "href=\"/diagnosis\"",
  "rough temporary",
  "emergency replacement",
  "guaranteed AI placement",
  "guaranteed ranking",
  "guaranteed leads",
  "guaranteed revenue",
  "bg-[#020713]",
  "bg-[#fbfbf8]",
  "bg-[#fffefa]",
  "bg-slate-950/88",
  "supports-[backdrop-filter]:bg-slate-950/76",
  "text-white sm:text-base",
  "system-grid-wide",
  "MarketCard",
  "system-panel-authority",
  "system-button-primary",
  "Cendorq / Loading",
]) {
  if (combined.includes(phrase)) failures.push(`Polished AI readiness shell contains forbidden phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Homepage replacement validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage replacement validation passed. Public shell is white, compact, calm, urgent, and positioned around AI engines and AI readiness without a dropdown menu.");
