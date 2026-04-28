export type FrontToBackConversionArea =
  | "homepage"
  | "signup"
  | "free-scan"
  | "dashboard"
  | "reports"
  | "billing"
  | "email"
  | "conversation"
  | "support"
  | "legal-trust"
  | "measurement"
  | "performance";

export type FrontToBackConversionRule = {
  key: string;
  label: string;
  area: FrontToBackConversionArea;
  requirement: string;
  conversionPurpose: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type ConversionSurfacePass = {
  key: string;
  label: string;
  surfaces: readonly string[];
  requiredEvidence: readonly string[];
  blockedBehavior: readonly string[];
};

export const FRONT_TO_BACK_CONVERSION_RULES = [
  {
    key: "one-obvious-next-step",
    label: "One obvious next step",
    area: "homepage",
    requirement: "Every major surface must make the next customer action obvious, specific, and low-friction while preserving secondary education paths for customers who need more proof.",
    conversionPurpose: "Reduces indecision and prevents visitors from getting lost before signup, Free Scan, checkout, or dashboard activation.",
    requiredControls: ["primary CTA", "secondary proof path", "clear next step", "visible outcome", "low-friction copy", "mobile CTA", "no competing primary actions"],
    blockedBehavior: ["CTA clutter", "unclear next step", "multiple primary CTAs", "buried action", "generic button copy", "dead-end page"],
  },
  {
    key: "value-before-friction",
    label: "Value before friction",
    area: "signup",
    requirement: "Signup and forms must explain why the step exists, what the customer gets, what happens next, and how Cendorq protects the account before asking for effort.",
    conversionPurpose: "Increases signup completion and reduces abandonment by making account creation feel useful instead of forced.",
    requiredControls: ["why this step", "what happens next", "trust copy", "provider signups", "email/password option", "short first step", "resume path"],
    blockedBehavior: ["forced signup with no explanation", "long first form", "missing provider options", "lost form state", "unclear verification purpose"],
  },
  {
    key: "free-scan-momentum",
    label: "Free Scan momentum",
    area: "free-scan",
    requirement: "The Free Scan must feel guided, fast, progress-aware, and valuable at every step, with safe prefill for returning customers and a clear dashboard landing after completion.",
    conversionPurpose: "Turns anonymous interest into owned customer relationship and positions the dashboard as the place where value appears.",
    requiredControls: ["guided steps", "progress indicator", "safe prefill", "minimum required fields", "save/resume readiness", "dashboard landing", "result-ready state"],
    blockedBehavior: ["giant undifferentiated form", "repeated unnecessary entry", "unclear completion", "no dashboard handoff", "false instant-result promise"],
  },
  {
    key: "dashboard-conversion-command",
    label: "Dashboard conversion command",
    area: "dashboard",
    requirement: "The dashboard must convert through clarity, proof, plan-stage logic, and luxury service: mission-control hero, proof grid, roadmap, report vault, billing center, next action, and strategic conversation must all reinforce the same next step.",
    conversionPurpose: "Makes Cendorq feel indispensable after signup and turns scan/report value into the next appropriate plan.",
    requiredControls: ["mission-control hero", "proof grid", "roadmap timeline", "report vault", "billing center", "next best action", "strategic conversation", "support path"],
    blockedBehavior: ["static dashboard", "generic SaaS cards", "no next action", "proof hidden", "billing disconnected", "upsell-only dashboard"],
  },
  {
    key: "proof-first-report-selling",
    label: "Proof-first report selling",
    area: "reports",
    requirement: "Reports must sell the next plan through evidence, confidence labels, limitations, visuals, business tie-back, and what the next plan unlocks, never through unsupported pressure.",
    conversionPurpose: "Turns trust into conversion by showing exactly why deeper work is needed.",
    requiredControls: ["evidence summary", "confidence label", "visual explanation", "limitation statement", "business tie-back", "next-plan unlock", "blocked-claim scan"],
    blockedBehavior: ["unsupported urgency", "complete diagnosis from Free Scan", "guaranteed outcome", "generic upsell", "hidden uncertainty", "no evidence tie-back"],
  },
  {
    key: "frictionless-trustworthy-checkout",
    label: "Frictionless trustworthy checkout",
    area: "billing",
    requirement: "Checkout, billing, invoices, entitlements, failed-payment recovery, upgrades, and plan comparisons must be fast, transparent, mobile-ready, and tied to the customer's current plan stage.",
    conversionPurpose: "Removes purchase friction while making the customer confident about what they are buying.",
    requiredControls: ["clear price", "plan entitlement", "invoice path", "checkout state", "billing portal", "failed-payment recovery", "post-purchase next step", "support fallback"],
    blockedBehavior: ["hidden cost", "manual-only purchase", "unclear entitlement", "checkout dead end", "billing status mismatch", "support hidden"],
  },
  {
    key: "email-sequence-that-sells-by-helping",
    label: "Email sequence that sells by helping",
    area: "email",
    requirement: "Email must move customers through verification, welcome, scan completion, result delivery, plan education, billing, correction, renewal, and reactivation with helpful value, one clear CTA, sender authenticity, and preference controls.",
    conversionPurpose: "Turns inbox touchpoints into useful continuation of the dashboard rather than spam.",
    requiredControls: ["Cendorq Support sender", "authenticated domain", "one CTA", "dashboard deep link", "stage-specific copy", "preference controls", "suppression logic", "one-time welcome"],
    blockedBehavior: ["duplicate welcome", "spammy cadence", "wrong-stage email", "missing dashboard link", "unsupported urgency", "unauthenticated mail"],
  },
  {
    key: "strategic-conversation-conversion",
    label: "Strategic conversation conversion",
    area: "conversation",
    requirement: "Dashboard conversation must answer objections, explain evidence, compare plans, clarify value, and guide checkout or support while staying evidence-grounded, plan-aware, and privacy-safe.",
    conversionPurpose: "Converts high-intent customers by removing confusion at the moment they are deciding.",
    requiredControls: ["objection handling", "evidence reference", "plan comparison", "current-plan limit", "next-plan unlock", "checkout path", "support path", "conversation audit"],
    blockedBehavior: ["pressure-only sales", "invented evidence", "guaranteed ROI", "hiding cheaper option", "free-form unsupported advice", "raw evidence leak"],
  },
  {
    key: "trust-and-legal-conversion-boundary",
    label: "Trust and legal conversion boundary",
    area: "legal-trust",
    requirement: "Conversion copy must be substantiated, accurate, clear, and easy to understand. Guarantees, testimonials, comparisons, benchmarks, pricing, limitations, and plan claims must be reviewed and placed where customers can see them before acting.",
    conversionPurpose: "Improves long-term conversion by building durable trust and reducing refund, dispute, and regulatory risk.",
    requiredControls: ["claim substantiation", "clear limitation", "visible pricing", "guarantee-safe language", "testimonial/endorsement review", "benchmark review", "terms link", "correction path"],
    blockedBehavior: ["hidden material term", "unsupported claim", "fake review", "unqualified benchmark", "guaranteed outcome", "misleading comparison", "dark pattern"],
  },
  {
    key: "measurement-without-manipulation",
    label: "Measurement without manipulation",
    area: "measurement",
    requirement: "Conversion should be measured across funnel steps, activation, dashboard engagement, report views, CTA clicks, checkout starts, upgrades, retention, and support blockers without collecting private evidence or using dark-pattern experiments.",
    conversionPurpose: "Lets Cendorq keep improving conversion while protecting privacy and truth.",
    requiredControls: ["event taxonomy", "privacy-safe payload", "activation metric", "CTA metric", "checkout metric", "retention metric", "experiment owner", "rollback path"],
    blockedBehavior: ["private evidence in analytics", "raw report in event", "dark-pattern test", "unreviewed legal claim test", "no attribution", "no rollback"],
  },
  {
    key: "speed-is-conversion",
    label: "Speed is conversion",
    area: "performance",
    requirement: "Conversion surfaces must remain fast, stable, mobile-ready, and clear under load; slow or broken states must preserve trust with skeletons, status messaging, safe retry, and no quality downgrade.",
    conversionPurpose: "Prevents performance from destroying trust at the moment of intent.",
    requiredControls: ["fast first action", "mobile readiness", "skeleton state", "safe retry", "status message", "bounded query", "queue handoff", "no quality downgrade"],
    blockedBehavior: ["blank loading", "slow form submit", "raw error", "unbounded query", "dropped submission", "lower-quality high-volume mode"],
  },
] as const satisfies readonly FrontToBackConversionRule[];

export const CONVERSION_SURFACE_PASSES = [
  {
    key: "front-end-conversion-pass",
    label: "Front-end conversion pass",
    surfaces: ["home", "plans", "signup", "verify email", "free scan", "dashboard", "reports", "billing"],
    requiredEvidence: ["clear value proposition", "one primary CTA", "visible trust", "mobile path", "reduced friction", "legal-safe copy"],
    blockedBehavior: ["generic hero", "CTA clutter", "hidden price", "unclear next step", "unsupported claim"],
  },
  {
    key: "back-end-conversion-pass",
    label: "Back-end conversion pass",
    surfaces: ["account records", "email records", "session records", "billing entitlements", "report records", "lifecycle events"],
    requiredEvidence: ["verified identity", "one-time welcome guard", "plan-stage state", "entitlement state", "event trigger", "suppression logic"],
    blockedBehavior: ["duplicate welcome", "wrong plan access", "stale entitlement", "missing lifecycle state", "unverified dashboard access"],
  },
  {
    key: "ethical-conversion-pass",
    label: "Ethical conversion pass",
    surfaces: ["copy", "email", "dashboard CTA", "checkout", "conversation", "reports"],
    requiredEvidence: ["claim substantiation", "clear limitations", "visible terms", "no dark patterns", "support path", "correction path"],
    blockedBehavior: ["false scarcity", "fake urgency", "guaranteed outcome", "misleading price", "unsupported comparison", "hidden limitation"],
  },
  {
    key: "optimization-feedback-pass",
    label: "Optimization feedback pass",
    surfaces: ["analytics", "experiments", "support themes", "conversation blockers", "billing dropoff", "dashboard engagement"],
    requiredEvidence: ["privacy-safe metrics", "experiment owner", "risk review", "rollback", "conversion blocker taxonomy", "support escalation insight"],
    blockedBehavior: ["private evidence analytics", "unreviewed legal copy test", "agent drift", "dark-pattern test", "unbounded event payload"],
  },
] as const satisfies readonly ConversionSurfacePass[];

export const FRONT_TO_BACK_CONVERSION_GUARDS = [
  "no conversion surface without one clear next step",
  "no CTA without proof, value, or plan-stage logic",
  "no signup friction without explaining the customer benefit",
  "no checkout without transparent entitlement and support path",
  "no email sequence without sender authentication, suppression, and preference controls",
  "no report upsell without evidence, confidence, limitation, and business tie-back",
  "no experiment that tests false claims, hidden terms, fake urgency, or dark patterns",
  "no analytics payload containing private evidence, raw reports, secrets, or sensitive report text",
] as const;

export function getFrontToBackConversionStandard() {
  return {
    rules: FRONT_TO_BACK_CONVERSION_RULES,
    passes: CONVERSION_SURFACE_PASSES,
    guards: FRONT_TO_BACK_CONVERSION_GUARDS,
  };
}
