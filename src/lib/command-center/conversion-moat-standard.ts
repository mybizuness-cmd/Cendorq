export type ConversionMoatArea =
  | "first-impression"
  | "plain-positioning"
  | "pricing-clarity"
  | "stage-fit"
  | "trust-proof"
  | "friction"
  | "lifecycle"
  | "retention"
  | "analytics"
  | "safety";

export type ConversionMoatRule = {
  key: string;
  label: string;
  area: ConversionMoatArea;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type ConversionMoatMoment = {
  key: string;
  label: string;
  purpose: string;
  requiredCustomerAnswer: string;
};

export const CONVERSION_MOAT_RULES = [
  {
    key: "five-second-command",
    label: "Five-second command",
    area: "first-impression",
    requirement: "A customer must understand what Cendorq is, why it matters now, what problem may be present, what it costs, and what to do next without reading a long page.",
    requiredControls: ["single clear headline", "plain subheadline", "two CTAs maximum", "visible pricing path", "category label", "no competing popup"],
    blockedBehavior: ["generic SaaS hero", "card wall", "hidden pricing", "more than two primary actions", "homepage form crowding", "cheap visual noise"],
  },
  {
    key: "truthful-plan-progression",
    label: "Truthful plan progression",
    area: "stage-fit",
    requirement: "Every plan path must match the customer's current uncertainty: Free Scan for unclear cause, Deep Review for evidence, Build Fix for known weak point, and Ongoing Control for continued market change.",
    requiredControls: ["stage-fit copy", "plan limits", "clear price", "next-depth logic", "support route", "no forced upgrade"],
    blockedBehavior: ["same CTA for every user", "fake urgency", "dark pattern", "unsupported upsell", "hidden plan limit", "bait and switch"],
  },
  {
    key: "proof-before-pressure",
    label: "Proof before pressure",
    area: "trust-proof",
    requirement: "Conversion must come from clarity, evidence, protected access, and plain next steps rather than fear, unsupported certainty, or guaranteed results.",
    requiredControls: ["evidence-backed reason", "protected dashboard language", "report vault boundary", "verification step", "confidence wording", "no guarantee copy"],
    blockedBehavior: ["guaranteed revenue", "guaranteed ROI", "fake scarcity", "perfect certainty", "protected data before verification", "raw evidence exposure"],
  },
  {
    key: "pricing-without-confusion",
    label: "Pricing without confusion",
    area: "pricing-clarity",
    requirement: "Pricing must be easy to find and understand across public surfaces, especially when customer hesitation showed pricing confusion as a trust blocker.",
    requiredControls: ["Pricing nav", "$0", "$300", "$750+", "$300/mo", "pricing page", "short plan explanations"],
    blockedBehavior: ["hidden pricing", "quote-only confusion", "unclear starting cost", "price maze", "plan hierarchy overload"],
  },
  {
    key: "frictionless-next-step",
    label: "Frictionless next step",
    area: "friction",
    requirement: "The public experience must remove doubt quickly: start free when unclear, see pricing when choosing depth, connect only when fit or scope is clear.",
    requiredControls: ["start free scan", "see pricing", "connect path", "short pages", "focused Free Scan page", "mobile readable hierarchy"],
    blockedBehavior: ["navigation maze", "repeated footer maze", "mobile dock competition", "long pre-form essay", "unclear contact gate"],
  },
  {
    key: "privacy-safe-learning-loop",
    label: "Privacy-safe learning loop",
    area: "analytics",
    requirement: "Conversion learning may measure blockers, actions, plan interest, and support triggers, but must not store raw private evidence, secrets, report internals, or sensitive customer text in analytics payloads.",
    requiredControls: ["privacy-safe events", "conversion blocker tags", "support trigger tags", "plan path metrics", "no raw evidence", "retention boundary"],
    blockedBehavior: ["raw report text in analytics", "secret in event", "unbounded transcript export", "private evidence analytics", "cross-customer leakage"],
  },
] as const satisfies readonly ConversionMoatRule[];

export const CONVERSION_MOAT_MOMENTS = [
  {
    key: "land",
    label: "Landing moment",
    purpose: "Stop the fast-scrolling customer with one serious, plain command entry.",
    requiredCustomerAnswer: "Cendorq shows where my business may be losing customers before I buy the wrong fix.",
  },
  {
    key: "learn",
    label: "Learning moment",
    purpose: "Explain that search, maps, reviews, and AI answers changed how customers choose.",
    requiredCustomerAnswer: "People may compare and leave before I know what failed.",
  },
  {
    key: "choose-depth",
    label: "Depth choice moment",
    purpose: "Make the four prices and stages obvious without forcing a plan too early.",
    requiredCustomerAnswer: "I can start free, then pay only when the next depth is clear.",
  },
  {
    key: "trust",
    label: "Trust moment",
    purpose: "Show the system is serious, protected, plain-English, and not built on fake urgency or guarantees.",
    requiredCustomerAnswer: "This feels safe, direct, and serious enough to start.",
  },
] as const satisfies readonly ConversionMoatMoment[];

export function getConversionMoatStandard() {
  return {
    rules: CONVERSION_MOAT_RULES,
    moments: CONVERSION_MOAT_MOMENTS,
  };
}
