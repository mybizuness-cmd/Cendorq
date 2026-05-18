export type CategoryDominationOperatingArea =
  | "market-position"
  | "customer-experience"
  | "conversion-system"
  | "product-delivery"
  | "operator-execution"
  | "data-foundation"
  | "trust-safety"
  | "financial-control"
  | "learning-loop";

export type CategoryDominationOperatingStandard = {
  area: CategoryDominationOperatingArea;
  tenOutOfTenDefinition: string;
  mustBeTrue: readonly string[];
  failureSignals: readonly string[];
  ownerMetric: string;
};

export const CATEGORY_DOMINATION_OPERATING_STANDARDS = [
  {
    area: "market-position",
    tenOutOfTenDefinition: "Cendorq is understood as the command layer for AI/search visibility, trust, proof, and business readiness—not a generic audit or agency.",
    mustBeTrue: ["Clear category language", "Plan ladder is easy to understand", "Competitor alternatives feel incomplete", "No generic agency positioning"],
    failureSignals: ["Customer calls it an audit", "Plan names confuse buyers", "Homepage could belong to another company"],
    ownerMetric: "Qualified buyer can explain Cendorq in one sentence after one page view.",
  },
  {
    area: "customer-experience",
    tenOutOfTenDefinition: "Every customer sees one clear next action, protected account access, useful status, and calm premium guidance.",
    mustBeTrue: ["Dashboard command state exists", "Email verification is clear", "Reports, billing, support, and notifications connect", "No dead ends"],
    failureSignals: ["Customer asks where to go next", "Customer repeats intake", "Support receives avoidable navigation questions"],
    ownerMetric: "Customer can reach the next correct action in under 20 seconds.",
  },
  {
    area: "conversion-system",
    tenOutOfTenDefinition: "Conversion is evidence-led, plan-fit aware, high-trust, and never based on fake urgency or unsupported promises.",
    mustBeTrue: ["Free Scan creates useful first value", "Deep Review is the natural next step", "Build Fix and Ongoing Control are scoped cleanly", "Checkout and post-payment are consistent"],
    failureSignals: ["Plan pressure feels manipulative", "Pricing feels disconnected from value", "Customer buys the wrong plan"],
    ownerMetric: "Most paid conversions map to an evidence-backed plan-fit reason.",
  },
  {
    area: "product-delivery",
    tenOutOfTenDefinition: "Every paid deliverable has a versioned customer-safe output, dashboard copy, email delivery path, approval gate, and support/correction route.",
    mustBeTrue: ["Report vault is gated", "PDF/dashboard parity is checked", "Release-captain approval is required", "Customer-safe projection is separated from raw evidence"],
    failureSignals: ["Report exists without approval", "Email and dashboard versions diverge", "Customer sees raw/internal data"],
    ownerMetric: "Every delivered output has entitlement, ownership, version, approval, and audit trail.",
  },
  {
    area: "operator-execution",
    tenOutOfTenDefinition: "Internal operators use explicit command contracts with preconditions, allowed transitions, blocked inputs, audit events, and projection rules.",
    mustBeTrue: ["Operator execution contracts exist", "Release-critical commands require approval", "Unsafe inputs are blocked", "Customer-visible changes are audited"],
    failureSignals: ["Operator action lacks state transition", "Manual action bypasses audit", "Customer output ships from an internal draft"],
    ownerMetric: "No customer-visible state changes without a command, gate, and audit event.",
  },
  {
    area: "data-foundation",
    tenOutOfTenDefinition: "Durable data models preserve customers, businesses, entitlements, reports, support, billing, evidence, learning, governance, and auditability.",
    mustBeTrue: ["Migrations are controlled", "Runtime files are not the final source of truth", "Private data is classified", "Retention and privacy paths exist"],
    failureSignals: ["Live state depends on local files", "No audit trail", "Provider payload becomes source of truth"],
    ownerMetric: "Every core customer action maps to durable records and safe projections.",
  },
  {
    area: "trust-safety",
    tenOutOfTenDefinition: "Security, privacy, claim discipline, legal posture, and AI/report truth are enforced by code and validation, not vibes.",
    mustBeTrue: ["No-store/noindex protected surfaces", "Raw/private payloads rejected", "Guarantees blocked", "Evidence/confidence labels required"],
    failureSignals: ["Unsupported claim appears", "Protected route is crawlable", "Raw token/email/provider data leaks"],
    ownerMetric: "Validation blocks unsafe language, unsafe data exposure, and approval drift before deploy.",
  },
  {
    area: "financial-control",
    tenOutOfTenDefinition: "Checkout, Stripe webhook, entitlements, billing states, report delivery, refunds/holds, and support recovery are linked without leaking provider internals.",
    mustBeTrue: ["Webhook signature verified", "Entitlement idempotency exists", "Billing attention is customer-safe", "Paid delivery depends on entitlement"],
    failureSignals: ["Payment does not map to plan", "Duplicate webhook creates duplicate entitlement", "Customer sees raw provider state"],
    ownerMetric: "Every paid plan has one safe entitlement path and one support recovery path.",
  },
  {
    area: "learning-loop",
    tenOutOfTenDefinition: "Cendorq improves from outcomes, evidence, support, objections, conversions, and delivery quality without exposing private data or auto-approving unsafe changes.",
    mustBeTrue: ["Learning memory is private", "Outcome measurements exist", "Changes are review-gated", "Market lessons improve positioning and reports"],
    failureSignals: ["Learning is anecdotal only", "AI changes customer output without review", "Support insights never improve product"],
    ownerMetric: "Every recurring failure becomes a validated product, copy, delivery, or operator-system improvement.",
  },
] as const satisfies readonly CategoryDominationOperatingStandard[];

export const CATEGORY_DOMINATION_NON_NEGOTIABLES = [
  "Own the category language before scaling spend.",
  "Make the customer dashboard the single command surface for next action, reports, billing, notifications, and support.",
  "Make operator execution explicit, gated, audited, and impossible to confuse with customer output approval.",
  "Make paid deliverables versioned, customer-safe, approved, and recoverable from the dashboard.",
  "Make durable data and safe projections the source of truth before depending on automation volume.",
  "Never trade trust for conversion: no fake urgency, no unsupported guarantees, no raw/private data exposure.",
] as const;

export function getCategoryDominationOperatingStandards() {
  return CATEGORY_DOMINATION_OPERATING_STANDARDS;
}
