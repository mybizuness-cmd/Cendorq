export type PlatformLeverageArea =
  | "portfolio"
  | "multi-location"
  | "enterprise-admin"
  | "benchmarking"
  | "integrations"
  | "partner-channel"
  | "lifecycle-automation"
  | "expansion-revenue"
  | "localization"
  | "market-intelligence"
  | "governance";

export type PlatformLeverageRule = {
  key: string;
  label: string;
  area: PlatformLeverageArea;
  requirement: string;
  leverageOutcome: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export const PLATFORM_LEVERAGE_RULES = [
  {
    key: "portfolio-account-readiness",
    label: "Portfolio account readiness",
    area: "portfolio",
    requirement: "Cendorq must support customers who manage more than one business, brand, location, or client account without cross-business leakage or repeated setup friction.",
    leverageOutcome: "Turns one customer into multi-business revenue and makes the dashboard useful for agencies, owners, operators, groups, and franchise-style accounts.",
    requiredControls: ["business switcher", "account-to-business mapping", "object ownership", "safe prefill", "portfolio report vault", "per-business billing state", "cross-business boundary"],
    blockedBehavior: ["single-business-only design", "cross-business data leak", "wrong business prefill", "one report vault for all businesses", "manual-only business switching"],
  },
  {
    key: "multi-location-franchise-readiness",
    label: "Multi-location and franchise readiness",
    area: "multi-location",
    requirement: "Cendorq should be ready for businesses with many locations, territories, service areas, departments, or franchise units while preserving per-location evidence, reporting, billing, and progress state.",
    leverageOutcome: "Creates high-contract-value expansion paths for growing businesses and multi-location operators.",
    requiredControls: ["location profile", "territory profile", "location report grouping", "rollup dashboard", "location-level confidence", "location-level entitlement", "bulk import readiness"],
    blockedBehavior: ["mixing locations", "unclear rollup metric", "location evidence without boundary", "bulk update without validation", "one-size-fits-all local recommendation"],
  },
  {
    key: "enterprise-admin-team-roles",
    label: "Enterprise admin and team roles",
    area: "enterprise-admin",
    requirement: "Cendorq should support team members, owners, billing contacts, viewers, operators, and agency/client roles with least-privilege access and audit trails.",
    leverageOutcome: "Enables larger accounts, agencies, internal teams, and enterprise customers without handing everyone the same access.",
    requiredControls: ["role model", "team invite", "billing contact role", "viewer role", "owner role", "agency/client relationship", "audit trail", "revocation path"],
    blockedBehavior: ["shared login", "all-admin team", "no access revocation", "billing visible to every user", "team invite without verification", "unlogged role change"],
  },
  {
    key: "privacy-safe-benchmarking",
    label: "Privacy-safe benchmarking",
    area: "benchmarking",
    requirement: "Cendorq should generate benchmark insights only from anonymized, aggregated, thresholded, and reviewed data that cannot reveal an individual customer, business, report, evidence record, or private strategy.",
    leverageOutcome: "Builds defensible market intelligence and stronger recommendations without exposing customer data.",
    requiredControls: ["aggregation threshold", "anonymization", "privacy review", "industry grouping", "geography grouping", "no raw evidence", "no customer-identifying benchmark", "methodology version"],
    blockedBehavior: ["single-customer benchmark", "raw customer data in benchmark", "identifiable competitor comparison", "unreviewed benchmark claim", "benchmark from weak sample"],
  },
  {
    key: "integration-api-readiness",
    label: "Integration and API readiness",
    area: "integrations",
    requirement: "Future integrations and APIs must be scoped, rate-limited, auditable, revocable, entitlement-aware, privacy-safe, and designed around explicit customer benefit.",
    leverageOutcome: "Connects Cendorq with CRMs, websites, analytics, billing, scheduling, ad platforms, and partner systems without weakening the platform.",
    requiredControls: ["scoped API keys", "OAuth scope review", "rate limits", "webhook signature verification", "revocation path", "integration audit", "entitlement check", "data minimization"],
    blockedBehavior: ["unscoped API key", "unverified webhook", "unlimited partner access", "integration without customer value", "secret in client", "data sharing without scope"],
  },
  {
    key: "partner-referral-channel",
    label: "Partner and referral channel",
    area: "partner-channel",
    requirement: "Cendorq should support partner/referral growth through trackable links, partner attribution, compliant payouts where applicable, customer-safe claims, and no partner access to private customer records unless explicitly authorized.",
    leverageOutcome: "Creates scalable distribution through agencies, consultants, vertical partners, and referral networks.",
    requiredControls: ["partner attribution", "referral link", "partner claim rules", "payout eligibility record", "customer authorization", "partner dashboard boundary", "anti-fraud checks"],
    blockedBehavior: ["partner sees private reports by default", "unsupported partner claims", "untracked referral", "payout without eligibility", "fraud-prone referral loop"],
  },
  {
    key: "lifecycle-automation-engine",
    label: "Lifecycle automation engine",
    area: "lifecycle-automation",
    requirement: "Cendorq should automate signup, verification, scan completion, result delivery, plan upgrade, onboarding, correction, renewal, reactivation, and expansion while preserving truth and customer preference controls.",
    leverageOutcome: "Raises conversion, retention, and customer success without requiring manual follow-up for every account.",
    requiredControls: ["lifecycle stage", "event trigger", "email preference", "dashboard notification", "plan-stage CTA", "support fallback", "one-time welcome guard", "suppression logic"],
    blockedBehavior: ["duplicate welcome", "wrong stage email", "spammy follow-up", "missing unsubscribe where required", "unsupported urgency", "automation without suppression"],
  },
  {
    key: "expansion-revenue-map",
    label: "Expansion revenue map",
    area: "expansion-revenue",
    requirement: "Cendorq should identify expansion paths from additional businesses, more locations, higher plan depth, monthly monitoring, team seats, partner services, and integration-enabled workflows.",
    leverageOutcome: "Moves Cendorq beyond one-time reports into recurring, compounding, multi-account platform revenue.",
    requiredControls: ["expansion eligibility", "account fit", "plan fit", "proof-backed upgrade", "billing entitlement", "customer consent", "support path", "no dark pattern"],
    blockedBehavior: ["random upsell", "unsupported expansion", "billing without consent", "hidden plan limit", "one-size expansion", "dark pattern"],
  },
  {
    key: "international-localization-readiness",
    label: "International and localization readiness",
    area: "localization",
    requirement: "Cendorq should be structurally ready for countries, languages, currencies, time zones, regional search behavior, local business categories, and regional compliance review before activating a market.",
    leverageOutcome: "Expands beyond one market without breaking trust, reports, billing, or legal boundaries.",
    requiredControls: ["locale field", "language field", "currency readiness", "timezone readiness", "country-specific evidence rules", "regional compliance review", "translation quality review", "local plan copy"],
    blockedBehavior: ["machine-translated legal claims", "wrong currency", "wrong regional assumption", "unsupported country activation", "no local evidence rule", "unreviewed compliance copy"],
  },
  {
    key: "controlled-market-intelligence-loop",
    label: "Controlled market intelligence loop",
    area: "market-intelligence",
    requirement: "Cendorq should learn from aggregate trends, customer questions, report patterns, conversion blockers, and market changes only through reviewed, versioned, privacy-safe, and non-deviating intelligence loops.",
    leverageOutcome: "Improves recommendations, product direction, pricing, plan packaging, and new revenue opportunities while protecting customer data and agent boundaries.",
    requiredControls: ["privacy-safe aggregation", "trend review", "versioned insight", "operator approval", "agent boundary", "no raw customer data", "rollback path", "methodology link"],
    blockedBehavior: ["self-evolving without review", "raw customer transcript learning", "unsupported market claim", "agent drift", "unversioned insight", "leaking private strategy"],
  },
] as const satisfies readonly PlatformLeverageRule[];

export const PLATFORM_LEVERAGE_GUARDS = [
  "no leverage feature without customer benefit",
  "no expansion path without security and entitlement boundaries",
  "no benchmark without privacy-safe aggregation and thresholding",
  "no partner access to private customer records by default",
  "no integration without scoped access and revocation",
  "no international activation without regional review",
  "no lifecycle automation without suppression and preference controls",
  "no market-learning loop without review, versioning, and rollback",
] as const;

export function getPlatformLeverageStandard() {
  return {
    rules: PLATFORM_LEVERAGE_RULES,
    guards: PLATFORM_LEVERAGE_GUARDS,
  };
}
