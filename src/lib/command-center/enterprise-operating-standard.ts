export type EnterpriseControlArea =
  | "governance"
  | "security"
  | "ai-safety"
  | "data-protection"
  | "report-integrity"
  | "market-learning"
  | "commercial-leverage"
  | "brand-trust"
  | "audit-defense"
  | "resilience";

export type EnterpriseOperatingRule = {
  key: string;
  label: string;
  area: EnterpriseControlArea;
  strictnessPolicy: string;
  leveragePolicy: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type EnterpriseAuditPass = {
  key: string;
  label: string;
  purpose: string;
  cadence: "every-change" | "pre-launch" | "monthly" | "quarterly";
  requiredEvidence: readonly string[];
};

export const ENTERPRISE_OPERATING_RULES = [
  {
    key: "strict-but-not-paralyzing",
    label: "Strict but not paralyzing",
    area: "governance",
    strictnessPolicy: "Cendorq should block public exposure, unsupported claims, unsafe AI actions, customer-data leakage, unreviewed method changes, and security regressions by default.",
    leveragePolicy: "Cendorq should still allow approved, evidence-backed experimentation, product expansion, pricing tests, report improvements, and new revenue paths when they are review-gated, versioned, reversible, and customer-safe.",
    requiredControls: ["validation registry", "operator runbook", "docs index", "approval gates", "rollback path", "owner and version metadata"],
    blockedBehavior: ["unreviewed production changes", "absolute security claims", "perfect accuracy claims", "agent drift", "innovation freeze", "growth experiments without evidence"],
  },
  {
    key: "zero-trust-data-boundary",
    label: "Zero-trust data boundary",
    area: "data-protection",
    strictnessPolicy: "Customer records, raw evidence, private reports, prompts, exact scoring weights, secrets, billing data, and market-learning inputs must remain private, access-controlled, and audit-tracked.",
    leveragePolicy: "Aggregated insights may power better reports, market intelligence, and Cendorq leverage only after privacy-safe abstraction, de-identification, review, and approval.",
    requiredControls: ["least privilege", "secret isolation", "private data classes", "audit logging", "privacy-safe aggregation", "no raw evidence exposure"],
    blockedBehavior: ["customer data leakage", "raw evidence reuse in public output", "private revenue disclosure", "cross-customer identification", "secret logging", "public scoring internals"],
  },
  {
    key: "ai-control-plane",
    label: "AI control plane",
    area: "ai-safety",
    strictnessPolicy: "AI agents must operate inside approved report, optimization, customer-output, command-history, and controlled-market-learning policies. They cannot invent methods, bypass approval gates, or silently change customer-facing behavior.",
    leveragePolicy: "AI can accelerate research, drafting, analysis, visual explanations, trend detection, and method improvement when evidence-backed, monitored, versioned, and human-reviewable.",
    requiredControls: ["prompt/version registry", "customer-output approval", "AI command history", "blocked action policy", "review-gated self-evolution", "output confidence labels"],
    blockedBehavior: ["autonomous send", "unreviewed scoring change", "unapproved prompt change", "unsupported report claim", "tool misuse", "agentic action without guardrail"],
  },
  {
    key: "report-truth-system",
    label: "Report truth system",
    area: "report-integrity",
    strictnessPolicy: "Reports must separate customer input from verified evidence, store calculation traces, show confidence labels, use truthful plan conversion logic, and avoid guarantees of outcomes or perfect certainty.",
    leveragePolicy: "Reports should be highly persuasive by making the verified problem, business impact, urgency, and next-step value clear, visual, branded, and specific to the analyzed business.",
    requiredControls: ["report truth engine", "report growth system", "source classes", "formula version", "business-logo handling", "visual standards", "footer safeguards"],
    blockedBehavior: ["lying", "exaggerating", "decorative charts", "unsupported ROI", "fake urgency", "missing uncertainty", "generic report sections"],
  },
  {
    key: "enterprise-security-baseline",
    label: "Enterprise security baseline",
    area: "security",
    strictnessPolicy: "Security must be designed around identity, access control, input validation, output encoding, secrets management, logging, monitoring, change control, incident response, and recovery.",
    leveragePolicy: "Security should create buyer trust and enterprise readiness without slowing approved product iteration when tests, validators, and deployment gates pass.",
    requiredControls: ["authentication and authorization", "input validation", "output safety", "secure configuration", "supply-chain review", "production smoke checks", "incident response", "recovery plan"],
    blockedBehavior: ["open private routes", "client-side secret exposure", "unsafe browser storage", "missing audit logs", "unmonitored production changes", "unvalidated inputs"],
  },
  {
    key: "controlled-market-compounding",
    label: "Controlled market compounding",
    area: "market-learning",
    strictnessPolicy: "Market learning must not expose customer data, overfit to anecdotes, make unsupported forecasts, or change production behavior without review.",
    leveragePolicy: "Approved aggregated insights should improve reports, identify trends, create new Cendorq revenue opportunities, and inform country/category/platform expansion.",
    requiredControls: ["sample-size awareness", "confidence labels", "privacy-safe aggregation", "operator review", "versioned method upgrade", "rollback path"],
    blockedBehavior: ["unreviewed self-evolution", "customer-identifiable benchmarking", "market certainty claims", "private competitor access", "unapproved monetization"],
  },
  {
    key: "commercial-leverage-with-trust",
    label: "Commercial leverage with trust",
    area: "commercial-leverage",
    strictnessPolicy: "Pricing, plans, guarantees, sales copy, and next-plan recommendations must stay truthful, explainable, evidence-backed, and legally reviewable.",
    leveragePolicy: "Cendorq should sell with maximum clarity and conviction by showing what the customer gets, why it matters, what is not included, what is verified, and what the next plan unlocks.",
    requiredControls: ["plan fit logic", "customer-safe guarantee language", "legal review flag", "pricing truth table", "conversion proof", "no unsupported claims"],
    blockedBehavior: ["bait-and-switch", "hidden limitations", "guaranteed outcomes", "plan pressure without evidence", "unclear refund or guarantee terms"],
  },
  {
    key: "liability-minimization-defense",
    label: "Liability minimization defense",
    area: "audit-defense",
    strictnessPolicy: "Cendorq should reduce liability as far as practical through claim substantiation, clear customer terms, consent capture, privacy controls, correction windows, evidence retention, audit trails, legal-review gates, refund/guarantee clarity, and documented approval of customer-facing claims.",
    leveragePolicy: "Liability controls must protect Cendorq without weakening truthful conversion, customer trust, report usefulness, speed, product quality, or transparent guarantees about the review process.",
    requiredControls: ["claim substantiation record", "terms and privacy alignment", "customer consent trail", "legal review gate", "report footer safeguards", "material error correction path", "audit-ready evidence retention", "approved guarantee wording"],
    blockedBehavior: ["claiming zero liability", "promising legal immunity", "unsupported marketing claims", "missing consent record", "unclear guarantee limits", "no correction path", "unreviewed legal wording", "destroying evidence needed for audit defense"],
  },
  {
    key: "brand-trust-standard",
    label: "Brand trust standard",
    area: "brand-trust",
    strictnessPolicy: "Every customer-facing surface must look official, consistent, premium, accessible, and trustworthy while preserving methodology transparency and evidence limits.",
    leveragePolicy: "Branding should make Cendorq feel like a must-have business operating system: authoritative, practical, verifiable, transparent, and commercially useful.",
    requiredControls: ["approved logo system", "report brand rules", "business logo policy", "visual hierarchy", "accessibility", "disclaimer and guarantee footer"],
    blockedBehavior: ["draft-looking surfaces", "generic templates", "brand inconsistency", "unreadable legal text", "customer logo misuse", "visuals detached from data"],
  },
  {
    key: "resilience-and-recovery",
    label: "Resilience and recovery",
    area: "resilience",
    strictnessPolicy: "Cendorq must assume failures can happen and keep detection, rollback, incident response, evidence correction, and recovery procedures ready.",
    leveragePolicy: "Resilience should preserve customer trust by correcting material issues quickly, explaining what changed, and keeping audit history intact.",
    requiredControls: ["monitoring", "production smoke", "incident runbook", "correction window", "rollback path", "audit trail", "status communication"],
    blockedBehavior: ["silent failure", "no rollback", "no customer correction path", "lost audit history", "unclear owner", "untracked emergency change"],
  },
] as const satisfies readonly EnterpriseOperatingRule[];

export const ENTERPRISE_AUDIT_PASSES = [
  {
    key: "security-control-pass",
    label: "Security control pass",
    purpose: "Check the system against identity, access, validation, secrets, logging, monitoring, change control, incident response, and recovery expectations.",
    cadence: "every-change",
    requiredEvidence: ["route validators", "production smoke coverage", "closed private routes", "security posture metadata", "no secret exposure"],
  },
  {
    key: "ai-governance-pass",
    label: "AI governance pass",
    purpose: "Confirm AI behavior remains inside approved methods, report truth rules, customer-output approval, controlled self-evolution, and audit history.",
    cadence: "every-change",
    requiredEvidence: ["validation registry", "AI command history policy", "customer-output approval policy", "controlled market learning policy"],
  },
  {
    key: "report-integrity-pass",
    label: "Report integrity pass",
    purpose: "Confirm reports remain evidence-backed, calculation-traceable, visually accurate, branded, plan-aware, and legally careful.",
    cadence: "every-change",
    requiredEvidence: ["report truth engine", "report growth system", "formula version", "confidence labels", "footer safeguards"],
  },
  {
    key: "audit-defense-pass",
    label: "Audit defense pass",
    purpose: "Confirm customer-facing claims, report guarantees, consent records, terms alignment, correction windows, evidence retention, and legal-review flags are audit-ready and reduce liability without reducing customer value.",
    cadence: "pre-launch",
    requiredEvidence: ["claim substantiation record", "customer consent trail", "terms/privacy alignment", "legal review status", "material error correction path", "report footer safeguards", "evidence retention policy"],
  },
  {
    key: "market-leverage-pass",
    label: "Market leverage pass",
    purpose: "Review whether aggregated market learning reveals approved opportunities for better reports, new products, pricing, categories, countries, or platform-specific offers.",
    cadence: "monthly",
    requiredEvidence: ["privacy-safe pattern set", "sample scope", "confidence", "operator review", "risk review", "rollback path"],
  },
  {
    key: "executive-alignment-pass",
    label: "Executive alignment pass",
    purpose: "Confirm strictness, speed, trust, revenue leverage, customer value, and product expansion remain aligned instead of over-blocking or under-protecting the system.",
    cadence: "quarterly",
    requiredEvidence: ["validation results", "customer outcomes", "conversion data", "risk register", "roadmap decisions", "approved experiments"],
  },
] as const satisfies readonly EnterpriseAuditPass[];

export function getEnterpriseOperatingStandard() {
  return {
    operatingRules: ENTERPRISE_OPERATING_RULES,
    auditPasses: ENTERPRISE_AUDIT_PASSES,
  };
}
