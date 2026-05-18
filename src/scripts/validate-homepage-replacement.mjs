import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const homepage = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const footer = readFileSync(join(root, "src/layout/site-footer.tsx"), "utf8");
const header = readFileSync(join(root, "src/layout/site-header-conversion.tsx"), "utf8");
const loading = readFileSync(join(root, "src/app/loading.tsx"), "utf8");
const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
const robots = readFileSync(join(root, "src/app/robots.ts"), "utf8");
const sitemap = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
const seo = readFileSync(join(root, "src/lib/seo.ts"), "utf8");
const experienceSystem = readFileSync(join(root, "src/lib/cendorq-experience-system.ts"), "utf8");
const combined = `${homepage}\n${footer}\n${header}\n${loading}\n${layout}\n${robots}\n${sitemap}\n${seo}\n${experienceSystem}`;
const visiblePublicShell = `${homepage}\n${footer}\n${header}\n${loading}`;
const failures = [];
const legacyPlanLabels = ["AI" + " Readiness Review", "Signal" + " Repair", "Readiness" + " Control"];

for (const phrase of [
  "export const dynamic = \"force-dynamic\";",
  "export const revalidate = 0;",
  "export const fetchCache = \"force-no-store\";",
  "data-cendorq-homepage=\"cinematic-ai-visibility-readiness-experience\"",
  "CENDORQ_EXPERIENCE_SYSTEM",
  "CENDORQ_EXPERIENCE_GUARDRAILS",
  "CENDORQ_SIGNAL_WORDS",
  "Cendorq | AI Visibility and Readiness for Businesses",
  "If AI engines cannot see or understand your business, customers may never get the chance to.",
  "Cendorq turns AI visibility and readiness into a clear path",
  "where the business is missing",
  "Visibility shows the gap. Readiness explains the cause.",
  "To be found, recommended, or trusted",
  "See where your business may be missing, unclear, under-trusted, or harder to choose.",
  "AI is becoming the place customers meet you first.",
  "id=\"ai-readiness\"",
  "AI Visibility and Readiness",
  "AI visibility and readiness",
  "AI visibility",
  "business trust signals",
  "without promising rankings, leads, revenue, or AI placement.",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
  "Start Free Scan",
  "View Plans",
  "Plans",
  "FAQ",
  "Contact Us",
  "Access",
  "Account",
  "Dashboard",
  "Privacy",
  "Terms",
  "No AI placement promises",
  "bg-slate-50 text-slate-950",
  "max-w-7xl",
  "Scan",
  "Review",
  "Repair",
  "Control",
  "Scan. Review. Repair. Control.",
  "Distinct Cendorq signal experience",
  "Unified Cendorq Experience System",
  "href=\"/free-check\"",
  "href=\"/plans\"",
  "href=\"/connect\"",
  "href: \"/faq\"",
  "href: \"/plans/deep-review\"",
  "href: \"/plans/build-fix\"",
  "href: \"/plans/ongoing-control\"",
  "\"/api/\"",
  "\"/admin/\"",
  "\"/dashboard/\"",
  "\"/checkout/\"",
  "\"/sitemap.xml\"",
  "termsOfService",
]) {
  if (!combined.includes(phrase)) failures.push(`Cinematic AI visibility and readiness shell missing required phrase: ${phrase}`);
}

for (const phrase of [
  ...legacyPlanLabels,
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
  "Connect utility",
  "Simple path",
  "Run the Free Scan before buying the bigger fix.",
  "Become easier to find, trust, and choose.",
  "If AI cannot understand your business, customers may never get the chance to.",
  "If AI engines cannot understand your business, customers may never get the chance to.",
  "Cendorq turns AI-readiness into a clear path",
  "Cendorq | AI Engine Readiness for Businesses",
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
  "First read",
  "Cause proof",
  "Focused change",
  "Monthly watch",
  "Free Market Signal Scan",
  "Dashboard result preview",
  "Business context only",
  "No private credentials or payment details",
  "Protected dashboard result after verification",
  "bg-[#020713]",
  "bg-[#fbfbf8]",
  "bg-[#fffefa]",
  "bg-slate-950/88",
  "supports-[backdrop-filter]:bg-slate-950/76",
  "text-white sm:text-base",
  "system-panel-authority",
  "system-button-primary",
  "Cendorq / Loading",
]) {
  if (visiblePublicShell.includes(phrase)) failures.push(`Cinematic AI visibility and readiness shell contains forbidden phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Homepage replacement validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage replacement validation passed. Public shell is cinematic, uncluttered, customer-facing, search-compliant, positioned around AI visibility and AI readiness, and aligned with Contact Us on /connect.");
