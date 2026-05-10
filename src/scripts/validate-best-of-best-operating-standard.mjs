import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standardPath = "src/lib/best-of-best-operating-standard.ts";
const failures = [];

expect(standardPath, [
  "BEST_OF_BEST_OPERATING_STANDARD",
  "Cendorq Best-of-Best Operating Standard",
  "getBestOfBestOperatingStandard",
  "Translate outside best-in-class operating patterns",
  "product quality",
  "customer trust",
  "revenue surfaces",
  "support",
  "document delivery",
  "dashboard continuity",
  "public experience discipline",
]);

expect(standardPath, [
  "Apple-level clarity and visual hierarchy",
  "Stripe-level billing trust and self-serve recovery",
  "Shopify-level merchant empowerment without overwhelm",
  "Salesforce-level system consistency across enterprise workflows",
  "Microsoft-level calm, familiar, focused, adaptive interaction",
  "Atlassian-level documented foundations and reusable decisions",
  "Nielsen Norman-level usability heuristics",
  "Intercom-level personal, proactive, honest support",
]);

expect(standardPath, [
  "Every public and customer surface must reveal the primary action, the customer value, the boundary, and the next safe step",
  "Billing, checkout, receipts, invoices, plan state, and document delivery must stay provider-authoritative, verified-access-first, recoverable from the dashboard",
  "Customer experiences must help business owners make better decisions without dumping internal complexity",
  "Plan state, reports, support, billing, dashboard messages, and fulfillment must behave like one connected operating system",
  "Interfaces must stay calm under high-stakes moments",
  "Quality decisions must be centralized, validator-backed, reusable, and discoverable",
  "Customer surfaces must show system status, match real customer language, prevent errors, support recognition over recall, and provide recovery paths",
  "Support and lifecycle messages must be human, specific, proactive, honest about limitations, and focused on resolution",
]);

expect(standardPath, [
  "Cendorq must not look or feel like a template, agency package, generic SaaS dashboard, checkout placeholder, support ticket graveyard, or AI-generated report library.",
  "Every customer-facing surface must feel intentional, calm, high-conviction, proof-aware, and unmistakably Cendorq.",
  "Every customer action must have one strongest next move, one secondary safe route when needed, and visible boundaries about what is included and not included.",
  "Every paid or protected output must be recoverable from the verified dashboard, not trapped in email or an unsafe PDF attachment.",
  "Every document path must be vault-first or provider-authoritative first, no-leak checked, release/provider gated, and never a separate source of truth.",
  "Every plan surface must preserve plan value separation: Free Scan, AI Readiness Review, Signal Repair, and Readiness Control cannot blur into each other.",
  "Every lifecycle, notification, support, billing, report, and checkout message must mirror the same truth structure across dashboard, email, vault, and support paths.",
]);

expect(standardPath, [
  "The strongest companies make high-value decisions feel simple without making the system shallow.",
  "Revenue grows when customers understand the right next step, trust the boundary, and can recover without anxiety.",
  "Self-serve trust reduces support burden and increases conversion because customers can see what happened and where to act.",
  "Category-defining companies do not over-explain every internal mechanism; they reveal just enough structure to create confidence and desire.",
  "Design systems protect money by preventing every team from recreating quality differently.",
  "Support quality protects retention when it is personal, honest, proactive, and resolution-oriented.",
  "Document delivery earns trust only when the dashboard or provider system remains the source of truth.",
  "The front website must create category authority before the customer ever reaches checkout, but the private dashboard must prove that authority after payment.",
]);

expect(standardPath, [
  "Does the surface instantly communicate what Cendorq is, what the customer should do, and why this is different from generic AI or agency tools?",
  "Does the page show hierarchy, harmony, calm focus, and one strongest action rather than equal-weight blocks?",
  "Does the copy explain value and boundary without unsupported revenue, ranking, AI placement, deliverability, legal, security, or certainty claims?",
  "Does billing show provider-authoritative document state and safe recovery without raw payment data?",
  "Does the report vault remain the canonical protected view before PDFs or attachments?",
  "Does every important email have a mirrored dashboard message when applicable?",
  "Would this feel credible beside Apple-level clarity, Stripe-level trust, Shopify-level owner empowerment, Salesforce-level consistency, Microsoft-level calm, Atlassian-level foundations, and Intercom-level support?",
]);

expect(standardPath, [
  "template-like hero section",
  "generic SaaS dashboard copy",
  "equal-weight CTA wall",
  "email-only report access",
  "PDF-only customer truth",
  "raw provider payload display",
  "raw evidence dump",
  "unbounded AI promise",
  "guaranteed ranking claim",
  "guaranteed revenue claim",
  "fake urgency",
  "support blame language",
  "plan boundary blur",
  "stale legacy plan name",
  "checkout placeholder",
  "unrecoverable document path",
]);

forbidden(standardPath, [
  "copy Apple",
  "copy Stripe",
  "copy Shopify",
  "copy Salesforce",
  "guaranteed ROI",
  "guaranteed revenue",
  "guaranteed ranking",
  "guaranteed AI placement",
  "guaranteed inbox",
  "100% accurate",
  "100 percent accurate",
  "impossible to hack",
  "never liable",
  "liability-free",
  "fake urgency is allowed",
  "rawProviderPayload=",
  "rawBillingData=",
  "sessionStorage",
  "localStorage",
]);

if (failures.length) {
  console.error("Best-of-best operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Best-of-best operating standard validation passed with research-inspired principles, Cendorq-specific operating rules, money-making lessons, review checklist, and blocked-pattern coverage.");

function expect(path, phrases) {
  if (!existsSync(join(root, path))) {
    failures.push(`Missing dependency: ${path}`);
    return;
  }
  const text = read(path);
  for (const phrase of phrases) if (!text.includes(phrase)) failures.push(`${path} missing phrase: ${phrase}`);
}

function forbidden(path, phrases) {
  if (!existsSync(join(root, path))) return;
  const text = read(path).toLowerCase();
  for (const phrase of phrases) if (text.includes(phrase.toLowerCase())) failures.push(`${path} contains forbidden phrase: ${phrase}`);
}

function read(path) {
  return readFileSync(join(root, path), "utf8");
}
