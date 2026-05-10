export const BEST_OF_BEST_OPERATING_STANDARD = {
  id: "best-of-best-operating-standard",
  name: "Cendorq Best-of-Best Operating Standard",
  purpose:
    "Translate outside best-in-class operating patterns from trillion-dollar and category-defining companies into Cendorq's own practical standard for product quality, customer trust, revenue surfaces, support, document delivery, dashboard continuity, security posture, legal trust boundaries, page architecture, subpage architecture, and public experience discipline.",
  researchInspiredPrinciples: [
    {
      sourcePattern: "Apple-level clarity and visual hierarchy",
      cendorqRule:
        "Every public and customer surface must reveal the primary action, the customer value, the boundary, and the next safe step before asking the customer to interpret dense information.",
      proofRequirement:
        "A page is not category-defining unless its hierarchy is obvious on mobile, its CTA path is calm, and its copy makes the customer feel guided rather than processed.",
    },
    {
      sourcePattern: "Stripe-level billing trust and self-serve recovery",
      cendorqRule:
        "Billing, checkout, receipts, invoices, plan state, and document delivery must stay provider-authoritative, verified-access-first, recoverable from the dashboard, and safe without exposing raw payment data.",
      proofRequirement:
        "A payment surface is not finished unless the customer can understand what unlocked, where billing documents live, what is not included, and how to recover safely if email fails.",
    },
    {
      sourcePattern: "Shopify-level merchant empowerment without overwhelm",
      cendorqRule:
        "Customer experiences must help business owners make better decisions without dumping internal complexity, raw evidence, or unnecessary options on them.",
      proofRequirement:
        "A surface must show the best next decision, a secondary safe path, and the reason for suppression or limitation when Cendorq should stay quiet.",
    },
    {
      sourcePattern: "Salesforce-level system consistency across enterprise workflows",
      cendorqRule:
        "Plan state, reports, support, billing, dashboard messages, and fulfillment must behave like one connected operating system rather than separate pages with separate truth.",
      proofRequirement:
        "A workflow is not complete unless email, dashboard, vault, support, billing, and operator-state language match the same source of truth.",
    },
    {
      sourcePattern: "Microsoft-level calm, familiar, focused, adaptive interaction",
      cendorqRule:
        "Interfaces must stay calm under high-stakes moments, adapt to customer context, avoid clutter, and keep focus on the next safe action.",
      proofRequirement:
        "A customer should never need to know Cendorq internals to understand what happened, what is waiting, and where to act safely.",
    },
    {
      sourcePattern: "Atlassian-level documented foundations and reusable decisions",
      cendorqRule:
        "Quality decisions must be centralized, validator-backed, reusable, and discoverable so the company does not rely on memory or one-off hero work.",
      proofRequirement:
        "Every critical standard must have a source file, validator, route-chain or registry visibility, and drift-resistant wording.",
    },
    {
      sourcePattern: "Nielsen Norman-level usability heuristics",
      cendorqRule:
        "Customer surfaces must show system status, match real customer language, prevent errors, support recognition over recall, and provide recovery paths.",
      proofRequirement:
        "A flow is weak if customers can mistake pending for final, included for recommended, email-only for source-of-truth, or support status for a dead end.",
    },
    {
      sourcePattern: "Intercom-level personal, proactive, honest support",
      cendorqRule:
        "Support and lifecycle messages must be human, specific, proactive, honest about limitations, and focused on resolution rather than inbox cleanup.",
      proofRequirement:
        "A support interaction is not excellent unless it acknowledges the issue, explains the current state, gives one safe next action, and invites recovery without blaming the customer.",
    },
    {
      sourcePattern: "Best-in-class page-system discipline",
      cendorqRule:
        "Every page and subpage must have one job, one strongest action, one trust boundary, one recovery path, and one clear reason to exist inside the larger Cendorq operating system.",
      proofRequirement:
        "A page should be removed, merged, or redesigned if it cannot explain why it exists, what decision it advances, what it protects, and where the customer should go next.",
    },
  ],
  pageAndSubpageOperatingSystem: [
    "Homepage creates category authority, explains the AI Engine Readiness problem, and sends the customer to Free Scan or Plans without clutter.",
    "Free Scan captures only useful business context, blocks sensitive data, confirms the first signal, and routes protected results to verified dashboard/report-vault access.",
    "Plans explains Scan, Review, Repair, and Control as different decision depths with visible prices, boundaries, after-purchase access rules, and no unsupported outcome claims.",
    "Plan-detail pages sell one plan at a time with the same global design language, plan-specific proof, included/not-included boundaries, safe checkout path, and one secondary route back to comparison.",
    "Checkout confirms the selected depth, preserves Stripe/provider-authoritative billing trust, avoids collecting unsafe data, and routes post-payment state into dashboard, billing, messages, and report triggers.",
    "Dashboard is the private money surface: proof first, next best action second, support/billing/report recovery always available, and no generic account-page energy.",
    "Report vault is the protected source of truth for released findings, confidence, limitations, forecasts, documents, and correction routes before any PDF or attachment.",
    "Billing center is provider-authoritative, document-safe, recoverable, and separated from support so no customer is asked for card data or raw payment secrets.",
    "Notification center mirrors important customer messages, document states, next actions, and support routes so email is not the only recovery path.",
    "Support center, support status, and support request intake acknowledge the issue, choose the right source of truth first, prevent duplicate anxiety, and collect only safe summaries.",
    "Terms, privacy, and disclaimer pages protect the company and customer with plain-language boundaries, confident value framing, no impossible guarantees, and clean routes back to action.",
    "Command-center and admin pages stay private, metadata-first, review-gated, and never expose the private engine, scoring weights, prompts, raw evidence, raw billing payloads, secrets, or cross-customer data.",
  ],
  noClutterDesignDoctrine: [
    "Simple does not mean thin; simple means the hard thinking has already been done before the customer sees the page.",
    "Every surface should prefer fewer stronger modules over many equal-weight sections.",
    "A page may be visually rich only when the richness clarifies value, trust, hierarchy, or action; decoration without decision value must be removed.",
    "Repeated CTAs must reinforce one path, not create competing decisions.",
    "Subpages should feel uniform in system language and interaction quality while still being specific to their exact job.",
    "Dark private dashboard surfaces should feel powerful, calm, and controlled; public surfaces should feel authoritative, clear, and easy to start.",
  ],
  futureProofingDoctrine: [
    "Cendorq must assume AI/search behavior, customer expectations, competitors, security threats, platform policies, inbox delivery, and buyer psychology will keep changing.",
    "Future-proofing means controlled continuous evolution: research, compare, test, validate, review, release, monitor, and recover without uncontrolled production mutation.",
    "Customer-facing claims must evolve with evidence, not hype; when evidence changes, reports, lifecycle messages, dashboard guidance, and plan-fit logic should change through approved gates.",
    "Security, SEO, accessibility, performance, legal boundaries, customer support, billing trust, and report truth must be reviewed as living systems, not launch-day checkboxes.",
    "The system should always preserve a safe path for stronger future pages, new plan modules, new report sections, better forecasts, and cleaner dashboard actions without breaking the current customer journey.",
  ],
  nonNegotiableQualityBar: [
    "Cendorq must not look or feel like a template, agency package, generic SaaS dashboard, checkout placeholder, support ticket graveyard, or AI-generated report library.",
    "Every customer-facing surface must feel intentional, calm, high-conviction, proof-aware, and unmistakably Cendorq.",
    "Every customer action must have one strongest next move, one secondary safe route when needed, and visible boundaries about what is included and not included.",
    "Every page and subpage must have a clear job, a clear decision, a clear owner of truth, a clear safe recovery path, and a clear reason to exist.",
    "Every paid or protected output must be recoverable from the verified dashboard, not trapped in email or an unsafe PDF attachment.",
    "Every document path must be vault-first or provider-authoritative first, no-leak checked, release/provider gated, and never a separate source of truth.",
    "Every plan surface must preserve plan value separation: Free Scan, AI Readiness Review, Signal Repair, and Readiness Control cannot blur into each other.",
    "Every lifecycle, notification, support, billing, report, and checkout message must mirror the same truth structure across dashboard, email, vault, and support paths.",
    "Every validator must protect the business from stale plan names, old pricing, unsupported promises, fake urgency, unsafe document access, raw internals, and generic customer language.",
  ],
  moneyMakingOperatingLessons: [
    "The strongest companies make high-value decisions feel simple without making the system shallow.",
    "Revenue grows when customers understand the right next step, trust the boundary, and can recover without anxiety.",
    "Self-serve trust reduces support burden and increases conversion because customers can see what happened and where to act.",
    "Category-defining companies do not over-explain every internal mechanism; they reveal just enough structure to create confidence and desire.",
    "Design systems protect money by preventing every team from recreating quality differently.",
    "Support quality protects retention when it is personal, honest, proactive, and resolution-oriented.",
    "Document delivery earns trust only when the dashboard or provider system remains the source of truth.",
    "The front website must create category authority before the customer ever reaches checkout, but the private dashboard must prove that authority after payment.",
    "Subpages make money when they reduce uncertainty, answer the exact buying objection for that stage, and return the customer to the right next command without adding noise.",
  ],
  operatingReviewChecklist: [
    "Does the surface instantly communicate what Cendorq is, what the customer should do, and why this is different from generic AI or agency tools?",
    "Does the page show hierarchy, harmony, calm focus, and one strongest action rather than equal-weight blocks?",
    "Does the copy explain value and boundary without unsupported revenue, ranking, AI placement, deliverability, legal, security, or certainty claims?",
    "Does the flow show status and recovery so the customer never confuses pending, blocked, draft, released, included, recommended, or unavailable states?",
    "Does billing show provider-authoritative document state and safe recovery without raw payment data?",
    "Does the report vault remain the canonical protected view before PDFs or attachments?",
    "Does every important email have a mirrored dashboard message when applicable?",
    "Does support answer the human question, acknowledge the state, provide one next move, and keep the customer from duplicate anxiety?",
    "Does the page or subpage have one job, one strongest action, one trust boundary, one recovery path, and one reason to exist?",
    "Does the system protect plan separation and future revenue while still delivering more practical value than the price paid?",
    "Would this feel credible beside Apple-level clarity, Stripe-level trust, Shopify-level owner empowerment, Salesforce-level consistency, Microsoft-level calm, Atlassian-level foundations, Nielsen Norman usability discipline, and Intercom-level support?",
  ],
  blockedPatterns: [
    "template-like hero section",
    "generic SaaS dashboard copy",
    "equal-weight CTA wall",
    "page without one job",
    "subpage without source-of-truth role",
    "clutter disguised as value",
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
  ],
} as const;

export function getBestOfBestOperatingStandard() {
  return BEST_OF_BEST_OPERATING_STANDARD;
}
