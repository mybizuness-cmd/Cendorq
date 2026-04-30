export const AGENT_OPERATING_SYSTEM_CONTRACT = {
  id: "agent-operating-system-contract",
  name: "Cendorq Agent Operating System Contract",
  purpose:
    "Define the controlled multi-agent operating model for Cendorq so parallel agents increase speed, research depth, report quality, design quality, forecasting, and validation coverage without taking release authority, weakening safety, or drifting from the owner-approved platform standard.",
  commandHierarchy: [
    {
      key: "owner-command",
      title: "Owner command",
      authority: "highest",
      responsibilities: [
        "sets business direction",
        "approves launch readiness",
        "approves payment/provider configuration",
        "approves brand and customer trust posture",
        "can override roadmap priority after safety review",
      ],
    },
    {
      key: "release-captain",
      title: "Release captain",
      authority: "execution-command",
      responsibilities: [
        "owns branch sequencing",
        "owns scoped PR creation",
        "owns validation and Vercel gates",
        "owns merge readiness review",
        "converts agent findings into controlled code changes",
        "owns final report-truth review before customer-facing release",
      ],
    },
    {
      key: "scoped-agents",
      title: "Scoped agents",
      authority: "support-only",
      responsibilities: [
        "scout repo risks",
        "draft safe findings",
        "prepare non-authoritative checklists",
        "review copy consistency",
        "research external business evidence",
        "pressure-test report truthfulness, usefulness, design, and claims",
        "surface future opportunities for release captain review",
      ],
    },
  ],
  agentLanes: [
    {
      key: "report-truth-research-scout",
      title: "Report truth and research scout",
      mission:
        "Gather and compare external evidence, customer-submitted context, observable business signals, market context, category norms, website/social/product signals, and report assumptions so every report separates verified facts, customer claims, external evidence, assumptions, inferences, limitations, and recommended next actions.",
      allowedOutputs: ["source findings", "fact-confidence notes", "assumption gaps", "evidence conflict notes", "report correction suggestions"],
    },
    {
      key: "report-design-quality-scout",
      title: "Report design and comprehension scout",
      mission:
        "Pressure-test report layout, customer comprehension, premium visual quality, section hierarchy, business usefulness, and decision clarity without changing truth boundaries or creating unsupported certainty.",
      allowedOutputs: ["layout findings", "visual hierarchy notes", "customer comprehension risks", "report polish suggestions"],
    },
    {
      key: "security-privacy-scout",
      title: "Security and privacy scout",
      mission: "Find exposure risk, unsafe browser storage, protected data projection, access-control drift, and command-center leakage.",
      allowedOutputs: ["findings", "risk summaries", "validator suggestions", "test ideas"],
    },
    {
      key: "conversion-luxury-ui-scout",
      title: "Conversion and luxury UI scout",
      mission: "Review public and customer surfaces for premium positioning, clarity, trust, stage-aware conversion, and non-manipulative calls to action.",
      allowedOutputs: ["copy notes", "layout notes", "trust improvements", "conversion hypotheses"],
    },
    {
      key: "validation-drift-scout",
      title: "Validation and drift scout",
      mission: "Search for missing validators, disconnected route contracts, stale scripts, weak package wiring, and inconsistent route expectations.",
      allowedOutputs: ["validator gap reports", "route map findings", "script consistency notes"],
    },
    {
      key: "customer-journey-scout",
      title: "Customer journey scout",
      mission: "Trace Free Scan, dashboard, reports, billing, notifications, support, status, and plans for dead ends or confusing handoffs.",
      allowedOutputs: ["handoff findings", "customer confusion risks", "safe next-action suggestions"],
    },
    {
      key: "future-platform-scout",
      title: "Future platform scout",
      mission: "Forecast post-website expansion lanes including mobile app, controlled maintenance, market learning, internationalization, partner channels, enterprise readiness, and business-model adaptation.",
      allowedOutputs: ["future roadmap findings", "dependency notes", "sequencing suggestions", "risk forecasts"],
    },
    {
      key: "operator-command-scout",
      title: "Operator command scout",
      mission: "Review command-center, audit, approval, launch evidence, smoke, rollback, and support operations for missing operator visibility.",
      allowedOutputs: ["operator workflow findings", "approval gate suggestions", "audit visibility notes"],
    },
  ],
  reportTruthRules: [
    "Reports must not rely solely on customer-submitted information when external evidence can be gathered safely.",
    "Customer-submitted information may be used when relevant, but must be labeled or treated as customer-provided context unless independently verified.",
    "External evidence, customer-provided context, assumptions, inferences, limitations, confidence, and next actions must stay separated in report logic and customer-facing explanation.",
    "Contradictions between customer-provided information and external evidence must be surfaced as evidence conflicts, not hidden or treated as certainty.",
    "Reports must use the strongest available evidence without claiming impossible 100 percent certainty.",
    "Reports may describe high-confidence, evidence-backed findings, but must not claim guaranteed accuracy, guaranteed outcomes, guaranteed revenue, guaranteed ROI, or absolute completeness.",
    "Report agents may research, compare, and pressure-test findings, but final customer-facing report release remains under release captain and approval-gate control.",
  ],
  autonomyRules: [
    "Agents may scout, summarize, draft, research, compare, and propose, but must not merge code.",
    "Agents must not approve public launch, paid launch, report launch, security readiness, or owner configuration readiness.",
    "Agents must not modify production configuration, provider settings, payment mapping, runtime credentials, or launch evidence records without owner and release captain approval.",
    "Agents must not create customer-facing claims without release captain review and validation coverage.",
    "Agents must not weaken validation, remove hard locks, bypass Vercel checks, bypass mergeability checks, or skip branch comparison.",
    "Agents must not act on raw customer data, protected provider payloads, private audit payloads, internal notes, operator private identity, or cross-customer data.",
    "Agents must route all code changes through branch, validation, PR, Vercel, mergeability, and release captain review.",
  ],
  futureForecastLanes: [
    {
      key: "post-website-mobile-app",
      horizon: "after core web launch readiness",
      focus: "Plan Apple App Store and Google Play app readiness using platform APIs, hardened auth, notifications, billing posture, and customer dashboard flows.",
    },
    {
      key: "controlled-maintenance-engine",
      horizon: "after production smoke and owner configuration evidence",
      focus: "Schedule dependency review, security advisory review, validation registry checks, smoke checks, rollback review, and content-claim drift checks with approval gates.",
    },
    {
      key: "market-learning-command",
      horizon: "after reports and customer dashboard data are real",
      focus: "Learn market patterns from safe aggregate signals only, preserving privacy and preventing uncontrolled AI production mutation.",
    },
    {
      key: "international-expansion",
      horizon: "after core customer platform stability",
      focus: "Prepare localization, country-aware disclaimers, payment-region readiness, language routing, and international support posture.",
    },
    {
      key: "enterprise-and-partner-readiness",
      horizon: "after command-center and audit maturity",
      focus: "Prepare enterprise proof posture, partner referrals, account-level access controls, team dashboards, audit exports, and trust-center evidence.",
    },
    {
      key: "analytics-and-growth-intelligence",
      horizon: "after safe analytics instrumentation",
      focus: "Use privacy-preserving conversion analytics, funnel health, scan completion, upgrade intent, report engagement, support load, and retention signals.",
    },
    {
      key: "business-change-forecasting",
      horizon: "continuous after controlled market learning is approved",
      focus: "Anticipate market, search, platform, customer behavior, competitor, pricing, compliance, and technology changes that may affect customer businesses before they become urgent.",
    },
  ],
  releaseRules: [
    "One release captain controls the active merge lane.",
    "One branch owns one coherent layer.",
    "Agents may run in parallel only when their work is read-only, scoped, and non-authoritative.",
    "Agent findings become code only through release captain branch ownership and validation.",
    "No agent may create pressure, fake urgency, guaranteed outcome, guaranteed revenue, absolute security, or liability-free claims.",
    "No agent may store or expose protected internals, raw payloads, raw evidence, protected configuration values, private customer data, or private audit payloads.",
    "No agent may bypass owner approval for provider configuration, payment mapping, production launch, paid launch, report launch, or security posture declarations.",
  ],
} as const;

export const AGENT_OPERATING_SYSTEM_BLOCKED_PATTERNS = [
  "agentMergeAuthority",
  "agentLaunchApprovalAuthority",
  "agentReportReleaseAuthority",
  "agentProviderConfigAuthority",
  "agentPaymentMappingAuthority",
  "agentSecretAccessAuthority",
  "agentProductionMutationAuthority",
  "agentValidationBypass",
  "agentVercelBypass",
  "agentMergeabilityBypass",
  "agentRawPayloadAccess",
  "agentRawEvidenceAccess",
  "agentProtectedProviderPayloadAccess",
  "agentPrivateCustomerDataAccess",
  "agentPrivateAuditPayloadAccess",
  "agentCrossCustomerDataAccess",
  "agentFakeUrgencyClaim",
  "agentGuaranteedOutcomeClaim",
  "agentGuaranteedAccuracyClaim",
  "agentAbsoluteSecurityClaim",
  "agentLiabilityFreeClaim",
  "customerOnlyReportTruth",
  "unverifiedCustomerClaimAsFact",
  "hiddenEvidenceConflict",
  "uncontrolledAgentDrift",
] as const;

export function getAgentOperatingSystemContract() {
  return AGENT_OPERATING_SYSTEM_CONTRACT;
}
