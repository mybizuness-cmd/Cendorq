import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const standardPath = "src/lib/best-of-best-operating-standard.ts";
const doctrinePath = "docs/best-of-best-operating-standard.md";
const docsIndexPath = "docs/command-center-docs-index.md";
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

expect(standardPath, bestOfBestPrinciples());
expect(doctrinePath, bestOfBestPrinciples());

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

expect(doctrinePath, [
  "Cendorq should not operate like a generic SaaS dashboard, agency package, AI report template, checkout placeholder, or support ticket system.",
  "This standard translates outside best-in-class operating patterns into Cendorq-specific rules. It is inspiration, not imitation.",
  "Cendorq must not copy another company; it must learn the operating discipline behind the strongest companies and turn that discipline into its own category-defining system.",
  "The company standard is to make every customer-facing and operator-facing decision feel intentional, calm, high-conviction, proof-aware, and unmistakably Cendorq.",
]);

expect(standardPath, qualityBarPhrases());
expect(doctrinePath, qualityBarPhrases());

expect(standardPath, moneyMakingPhrases());
expect(doctrinePath, [
  "The strongest companies make high-value decisions feel simple without making the system shallow.",
  "Customers convert when they understand the right next step, trust the boundary, and can recover without anxiety.",
  "Customers return when Cendorq keeps track of things that change: search behavior, customer expectations, AI-readiness posture, competitor movement, proof freshness, and future-feature relevance.",
  "The public website must create category authority before checkout, but the private dashboard must prove that authority after payment.",
  "Support quality protects retention when it is personal, honest, proactive, resolution-oriented, and connected to dashboard status.",
  "Document delivery earns trust only when the dashboard, report vault, billing center, or provider system remains the source of truth.",
]);

expect(standardPath, checklistPhrases());
expect(doctrinePath, checklistPhrases());
expect(standardPath, blockedPatterns());
expect(doctrinePath, blockedPatterns());

expect(doctrinePath, [
  "## Research-inspired operating principles",
  "## Non-negotiable Cendorq quality bar",
  "## Money-making discipline",
  "## Blocked patterns",
  "## Operating review checklist",
  "## Validator coverage",
  "src/lib/best-of-best-operating-standard.ts",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "route-chain must run that validator before downstream customer-delivery validators",
]);

expect(docsIndexPath, [
  "docs/best-of-best-operating-standard.md",
  "src/lib/best-of-best-operating-standard.ts",
  "src/scripts/validate-best-of-best-operating-standard.mjs",
  "best-of-best operating standard",
]);

forbidden(standardPath, blockedUnsafePhrases());
forbidden(doctrinePath, blockedUnsafePhrases());

if (failures.length) {
  console.error("Best-of-best operating standard validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Best-of-best operating standard validation passed with research-inspired principles, Cendorq-specific operating rules, operator doctrine documentation, money-making lessons, review checklist, docs-index visibility, and blocked-pattern coverage.");

function bestOfBestPrinciples() {
  return [
    "Apple-level clarity and visual hierarchy",
    "Stripe-level billing trust and self-serve recovery",
    "Shopify-level merchant empowerment without overwhelm",
    "Salesforce-level system consistency",
    "Microsoft-level calm",
    "Atlassian-level documented foundations",
    "Nielsen Norman-level usability",
    "Intercom-level",
  ];
}

function qualityBarPhrases() {
  return [
    "Every customer-facing surface",
    "one strongest next move",
    "visible boundaries about what is included and not included",
    "recoverable from the verified dashboard",
    "Every document path must be vault-first or provider-authoritative first",
    "Every plan surface must preserve plan value separation",
    "Every lifecycle, notification, support, billing, report",
    "same truth structure across dashboard, email, vault, and support paths",
    "Every validator must protect the business from stale plan names",
  ];
}

function moneyMakingPhrases() {
  return [
    "The strongest companies make high-value decisions feel simple without making the system shallow.",
    "Revenue grows when customers understand the right next step, trust the boundary, and can recover without anxiety.",
    "Self-serve trust reduces support burden and increases conversion because customers can see what happened and where to act.",
    "Category-defining companies do not over-explain every internal mechanism; they reveal just enough structure to create confidence and desire.",
    "Design systems protect money by preventing every team from recreating quality differently.",
    "Support quality protects retention when it is personal, honest, proactive, and resolution-oriented.",
    "Document delivery earns trust only when the dashboard or provider system remains the source of truth.",
    "The front website must create category authority before the customer ever reaches checkout, but the private dashboard must prove that authority after payment.",
  ];
}

function checklistPhrases() {
  return [
    "Does the surface instantly communicate what Cendorq is",
    "Does the page show hierarchy, harmony, calm focus, and one strongest action rather than equal-weight blocks?",
    "Does the copy explain value and boundary without unsupported revenue, ranking, AI placement, deliverability, legal, security, or certainty claims?",
    "Does the flow show status and recovery",
    "Does billing show provider-authoritative document state and safe recovery without raw payment data?",
    "Does the report vault remain the canonical protected view before PDFs or attachments?",
    "Does every important email have a mirrored dashboard message when applicable?",
    "Does support answer the human question, acknowledge the state, provide one next move",
    "Does the system protect plan separation and future revenue",
  ];
}

function blockedPatterns() {
  return [
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
  ];
}

function blockedUnsafePhrases() {
  return [
    "copy Apple",
    "copy Stripe",
    "copy Shopify",
    "copy Salesforce",
    "guaranteed ROI is allowed",
    "guaranteed revenue is allowed",
    "guaranteed ranking is allowed",
    "guaranteed AI placement is allowed",
    "guaranteed inbox is allowed",
    "100% accurate claim allowed",
    "100 percent accurate claim allowed",
    "impossible to hack claim allowed",
    "never liable claim allowed",
    "liability-free claim allowed",
    "fake urgency is allowed",
    "rawProviderPayload=",
    "rawBillingData=",
    "sessionStorage",
    "localStorage",
  ];
}

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
