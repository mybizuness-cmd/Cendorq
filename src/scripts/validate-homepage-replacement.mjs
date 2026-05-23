import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const homepage = readFileSync(join(root, "src/app/page.tsx"), "utf8");
const reset = readFileSync(join(root, "src/components/homepage/homepage-clarity-reset.tsx"), "utf8");
const footer = readFileSync(join(root, "src/layout/site-footer.tsx"), "utf8");
const header = readFileSync(join(root, "src/layout/site-header-conversion.tsx"), "utf8");
const loading = readFileSync(join(root, "src/app/loading.tsx"), "utf8");
const layout = readFileSync(join(root, "src/app/layout.tsx"), "utf8");
const robots = readFileSync(join(root, "src/app/robots.ts"), "utf8");
const sitemap = readFileSync(join(root, "src/app/sitemap.ts"), "utf8");
const seo = readFileSync(join(root, "src/lib/seo.ts"), "utf8");
const combined = `${homepage}\n${reset}\n${footer}\n${header}\n${loading}\n${layout}\n${robots}\n${sitemap}\n${seo}`;
const visiblePublicShell = `${homepage}\n${reset}\n${footer}\n${header}\n${loading}`;
const failures = [];

for (const phrase of [
  "export const dynamic = \"force-dynamic\";",
  "export const revalidate = 0;",
  "export const fetchCache = \"force-no-store\";",
  "HomepageClarityReset",
  "data-cendorq-homepage=\"presence-report-ai-search-presence-repair-experience\"",
  "Cendorq | AI Search Presence Repair for Businesses",
  "AI Search Presence Repair",
  "Be easier to find, understand, and choose.",
  "Cendorq checks your business presence, shows the first weak signal, and points to the next repair path.",
  "PresenceReportPreview",
  "Presence Report",
  "Sample Report",
  "Sample Presence Report",
  "Start Free Scan",
  "See Sample Report",
  "Customer Access",
  "Plans",
  "FAQ",
  "Contact",
  "Dashboard",
  "Privacy",
  "Terms",
  "href=\"/free-check\"",
  "href=\"/sample-report\"",
  "href=\"/plans\"",
  "href=\"/connect\"",
  "path: \"/sample-report\"",
  "path: \"/sample-report/dentist\"",
  "path: \"/sample-report/med-spa\"",
  "path: \"/sample-report/law-firm\"",
  "path: \"/sample-report/contractor\"",
  "\"/api/\"",
  "\"/admin/\"",
  "\"/dashboard/\"",
  "\"/checkout/\"",
  "\"/sitemap.xml\"",
  "termsOfService",
]) {
  if (!combined.includes(phrase)) failures.push(`Simplified homepage shell missing required phrase: ${phrase}`);
}

for (const phrase of [
  "AuthorityProof",
  "FlowProof",
  "ProductProof",
  "Product Proof Center",
  "Can customers and AI systems understand why to choose your business?",
  "Cendorq turns AI visibility and readiness into a clear repair path",
  "Most businesses are online. Fewer are answer-ready.",
  "id=\"ai-readiness\"",
  "Cendorq Search Presence OS",
  "Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "Connect with Cendorq",
  "Connect utility",
  "Cendorq | AI Engine Readiness for Businesses",
  "data-cendorq-homepage=\"cinematic-ai-visibility-readiness-experience\"",
  "href=\"/pricing\"",
  "href=\"/diagnosis\"",
  "rough temporary",
  "emergency replacement",
  "bg-[#020713]",
  "bg-[#fbfbf8]",
  "bg-[#fffefa]",
  "system-panel-authority",
  "system-button-primary",
]) {
  if (visiblePublicShell.includes(phrase)) failures.push(`Simplified homepage shell contains forbidden phrase: ${phrase}`);
}

if (failures.length) {
  console.error("Homepage replacement validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Homepage replacement validation passed. Public shell is simplified, CTA-led, Presence Report-previewed, and aligned with Customer Access, Sample Report, Plans, FAQ, and Contact navigation.");
