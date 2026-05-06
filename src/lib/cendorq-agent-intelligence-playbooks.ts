import { AGENT_OPERATING_SYSTEM_CONTRACT } from "@/lib/agent-operating-system-contracts";
import type { PlanValueKey } from "@/lib/plan-value-delivery-architecture";

export type CendorqAgentPlaybookKey = (typeof AGENT_OPERATING_SYSTEM_CONTRACT.agentLanes)[number]["key"];

export type CendorqAgentSourceTier =
  | "owned-surface"
  | "search-and-ai-visibility"
  | "local-and-map-presence"
  | "third-party-trust"
  | "competitive-context"
  | "customer-provided-context"
  | "platform-change-watch";

export type CendorqAgentFindingShape = {
  field: string;
  purpose: string;
  blockedWhenMissing: boolean;
};

export type CendorqAgentDecisionPlaybook = {
  agentKey: CendorqAgentPlaybookKey;
  mission: string;
  customerProblemFocus: readonly string[];
  sourceStrategy: readonly CendorqAgentSourceTier[];
  searchProcedure: readonly string[];
  aiVisibilityProcedure: readonly string[];
  acquisitionDiagnosisProcedure: readonly string[];
  forecastProcedure: readonly string[];
  rejectionRules: readonly string[];
  confidenceScoring: readonly string[];
  requiredFindingShape: readonly CendorqAgentFindingShape[];
  planAdaptations: Record<PlanValueKey, readonly string[]>;
  blockedCustomerLanguage: readonly string[];
};

const REQUIRED_FINDING_SHAPE = [
  { field: "customer acquisition problem", purpose: "Name the exact problem stopping the customer from being found, trusted, chosen, or contacted.", blockedWhenMissing: true },
  { field: "AI-era visibility signal", purpose: "Explain whether the business is understandable, citeable, comparable, and recommendable by AI/search systems.", blockedWhenMissing: true },
  { field: "evidence basis", purpose: "Separate observed facts, customer-provided context, external evidence, assumptions, and missing evidence.", blockedWhenMissing: true },
  { field: "confidence and limitation", purpose: "State confidence without pretending complete certainty or guaranteed outcomes.", blockedWhenMissing: true },
  { field: "next best action", purpose: "Give one practical action that fits the customer moment and plan boundary.", blockedWhenMissing: true },
  { field: "forecast risk", purpose: "Flag what may weaken visibility, trust, conversion, or competitiveness if nothing changes.", blockedWhenMissing: false },
] as const satisfies readonly CendorqAgentFindingShape[];

export const CENDORQ_AGENT_INTELLIGENCE_SYSTEM_RULES = [
  "Cendorq agents must diagnose customer acquisition, AI-era visibility, trust clarity, offer clarity, conversion friction, evidence quality, and next best action together instead of treating website polish as the whole problem.",
  "Customer-facing promises must focus on helping the business become easier to find, understand, trust, compare, and choose; the 5-to-10-year adaptation goal belongs to Cendorq's internal system, not as a customer guarantee.",
  "Agents must optimize for the customer problems Cendorq exists to solve: weak visibility, unclear positioning, low trust, poor conversion, unsupported claims, fragmented presence, and missed AI/search relevance.",
  "Every agent must use evidence tiers, conflict checks, confidence scoring, blocked-language rules, plan boundaries, and customer-usefulness scoring before a finding can reach chief-agent review.",
  "AI visibility findings must evaluate whether a business has clear entity identity, service specificity, location/category context, proof, reviews, structured content, comparison clarity, and enough public trust signals to be surfaced by search and answer systems.",
  "Forecasting must be practical: identify likely risks, opportunity windows, and monitoring needs without pretending to know future algorithms, guaranteed rankings, guaranteed AI placement, or guaranteed revenue.",
  "Agent recommendations must be plan-scoped: Free Scan gives a first visible signal, Deep Review gives cause-level diagnosis, Build Fix gives scoped implementation, and Ongoing Control gives recurring monitoring and monthly decision support.",
  "Agents must reject vague premium language, generic badges, fake urgency, unsupported superiority claims, internal-facing jargon, and customer-facing claims that do not speak directly to the buyer's business problem.",
] as const;

const STANDARD_REJECTION_RULES = [
  "Reject findings that do not name a customer acquisition problem.",
  "Reject findings that confuse customer-provided claims with verified facts.",
  "Reject findings that imply guaranteed ranking, guaranteed AI placement, guaranteed revenue, guaranteed ROI, absolute certainty, or unlimited implementation.",
  "Reject findings that recommend Build Fix work inside Free Scan or Deep Review.",
  "Reject findings that turn Ongoing Control into unlimited Build Fix.",
  "Reject findings that lack a clear next action the customer can understand.",
] as const;

const STANDARD_CONFIDENCE_SCORING = [
  "High confidence requires multiple aligned evidence sources, direct observable support, low conflict, and a plan-safe conclusion.",
  "Medium confidence is allowed when evidence is directionally aligned but still has missing context, incomplete public data, or moderate conflict.",
  "Low confidence is required when the finding depends mainly on customer-provided context, weak public evidence, or unverified assumptions.",
  "Confidence must be downgraded when AI visibility, trust, reviews, entity clarity, or offer clarity are fragmented across sources.",
] as const;

const STANDARD_BLOCKED_LANGUAGE = [
  "guaranteed ranking",
  "guaranteed AI placement",
  "guaranteed revenue",
  "guaranteed ROI",
  "complete certainty",
  "unlimited implementation",
  "we will fix everything",
  "best in your market without evidence",
] as const;

const STANDARD_PLAN_ADAPTATIONS: Record<PlanValueKey, readonly string[]> = {
  "free-scan": ["Find the strongest first visible signal only.", "Keep the output dashboard-only.", "Name limitations and the safest next step without full diagnosis."],
  "deep-review": ["Move from symptom to cause-level diagnosis.", "Separate priority, confidence, evidence, and Build Fix fit.", "Do not imply implementation is included."],
  "build-fix": ["Translate approved diagnosis or scope into a bounded implementation path.", "Preserve before-state, after-state, remaining risk, and out-of-scope items.", "Do not mutate production without approval gates."],
  "ongoing-control": ["Compare current evidence to prior baseline.", "Pick one monthly priority and escalation fit.", "Monitor AI-era visibility, trust drift, conversion drift, and market/search change signals without guaranteeing outcomes."],
};

export const CENDORQ_AGENT_DECISION_PLAYBOOKS = [
  playbook("report-truth-research-scout", "Prove what is true enough to tell the customer, what is only likely, and what must stay limited.", ["unsupported report conclusions", "unclear evidence", "AI/search systems not understanding the business", "weak public proof"], ["owned-surface", "search-and-ai-visibility", "third-party-trust", "customer-provided-context", "competitive-context"], ["Check the customer's owned surfaces for who they serve, what they sell, where they operate, proof, CTA, and service specificity.", "Compare customer-provided claims against visible public evidence.", "Look for missing entity clarity: name, category, location, service, proof, and trust signals.", "Record conflicts and confidence downgrades before recommending anything."], ["Assess whether answer engines could identify the business entity, services, location/category, proof points, and reasons to recommend it.", "Check whether the business has content that answers buyer questions clearly enough to be cited or summarized.", "Flag thin, vague, or inconsistent public signals that make the business hard for AI systems to trust."], ["Map the problem to discovery, trust, understanding, comparison, or conversion.", "Identify one customer-facing reason buyers may not choose the business now.", "Connect every recommendation to visibility, trust, choice, or contact intent."], ["Flag risks from vague category positioning, weak proof, review gaps, outdated content, AI answer compression, and stronger competitor entities.", "Recommend monitoring when visibility depends on changing search, maps, reviews, or answer-engine behavior."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("evidence-conflict-scout", "Find contradictions before they become wrong reports, weak recommendations, or unsafe customer claims.", ["contradictory customer claims", "unsupported positioning", "wrong confidence", "hidden limitations"], ["owned-surface", "customer-provided-context", "third-party-trust", "competitive-context"], ["Compare customer intake against public surfaces and report assumptions.", "Name each contradiction as claim, counter-signal, missing proof, or outdated proof.", "Downgrade confidence when public evidence does not support the claim."], ["Find whether AI/search systems would see conflicting business categories, service areas, names, offers, or proof signals.", "Flag inconsistencies that make the business less citeable or recommendable."], ["Explain how each conflict could hurt buyer trust or decision clarity.", "Separate harmless gaps from conversion-blocking conflicts."], ["Forecast trust decay when outdated claims, inconsistent services, weak reviews, or unclear location signals remain unresolved."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("industry-context-scout", "Understand the customer's business category deeply enough to avoid generic advice.", ["generic recommendations", "wrong category assumptions", "missing buyer expectation", "weak competitive framing"], ["competitive-context", "search-and-ai-visibility", "third-party-trust", "platform-change-watch"], ["Identify category norms, buyer expectations, common objections, proof standards, and typical conversion actions.", "Compare the customer against category-specific clarity and trust needs.", "Mark what is category context versus customer-specific truth."], ["Assess whether the business gives answer engines enough category-specific language, service detail, and proof to match relevant buyer intents.", "Flag missing category terms that prevent AI/search systems from understanding what the business should be recommended for."], ["Tie category gaps to customer acquisition: being found for the wrong thing, being compared poorly, or failing buyer confidence."], ["Forecast category risks from search behavior shifts, marketplace compression, review expectations, local/map competition, and AI answer summarization."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("report-design-quality-scout", "Make reports understandable, useful, premium, and action-oriented without weakening truth boundaries.", ["confusing reports", "weak decision clarity", "generic sections", "hard-to-act recommendations"], ["owned-surface", "customer-provided-context"], ["Check whether the report answers: what matters, why it matters, confidence, limitation, and next action.", "Remove clutter, duplicated points, and internal-sounding language.", "Make every section speak directly to the customer's business decision."], ["Ensure AI visibility sections are explained as practical visibility/trust/readability signals, not algorithm promises.", "Make AI-era recommendations educational and bounded."], ["Prioritize report structure around customer acquisition impact and decision urgency without fake urgency."], ["Flag future report drift if monthly updates become generic, too long, or disconnected from customer outcomes."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("conversion-luxury-ui-scout", "Improve customer-facing surfaces so the business feels clear, trustworthy, valuable, and easy to act on.", ["cheap-looking blocks", "weak homepage", "bulky pricing paths", "forms too low or too noisy", "copy not speaking to the customer"], ["owned-surface", "competitive-context", "third-party-trust"], ["Audit above-the-fold clarity, CTA, trust sequence, mobile flow, form position, pricing clarity, and footer weight.", "Remove generic badges, vague claims, and bulky blocks that slow decision-making.", "Rewrite copy to speak directly to the customer's business problem."], ["Check whether AI/search visibility is introduced as a customer value: easier to understand, trust, compare, and choose.", "Do not turn AI visibility into a hype claim or guaranteed placement."], ["Diagnose where the page loses the buyer: unclear promise, weak proof, too much before form, too many steps, or plan confusion."], ["Forecast conversion risk from bloated pages, generic language, mobile friction, outdated trust signals, and competitor clarity."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("customer-journey-scout", "Make every customer path obvious, connected, plan-aware, and impossible to confuse.", ["dead-end dashboard", "confusing handoffs", "plan overlap", "missing next best action"], ["owned-surface", "customer-provided-context"], ["Trace homepage, scan, pricing, checkout, dashboard, reports, billing, notifications, support, and email handoffs.", "Ensure every surface answers: what this is, what value it gives, what is included, what is not included, and what to do next.", "Find any route where Free Scan, Deep Review, Build Fix, or Ongoing Control blur."], ["Make AI visibility show up where it helps the customer understand why Cendorq matters, especially scan, report, dashboard, and ongoing-control moments."], ["Tie each handoff to customer acquisition progress, not internal workflow labels."], ["Forecast where customers may churn, misunderstand value, or fail to act if the next step is unclear."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("business-change-forecasting-scout", "Protect Cendorq and customers from changes in search, AI answers, platforms, competitors, buyer behavior, and trust expectations.", ["future search change", "AI answer compression", "visibility decay", "competitor displacement", "trust signal drift"], ["platform-change-watch", "search-and-ai-visibility", "competitive-context", "third-party-trust"], ["Track platform and search changes as internal Cendorq intelligence.", "Identify which customer-facing systems need updates when discovery behavior changes.", "Separate likely trend, weak signal, and unsupported speculation."], ["Assess whether businesses are becoming more or less understandable to answer engines over time.", "Monitor entity clarity, reviews, content freshness, service specificity, and public proof signals."], ["Translate forecast signals into practical customer acquisition risks and next monitoring actions."], ["Build 5-to-10-year internal adaptation notes for Cendorq's system without promising customers guaranteed future performance."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("analytics-and-growth-scout", "Use privacy-safe signals to understand where customers gain, stall, upgrade, or need support.", ["weak funnel intelligence", "unclear upgrade intent", "report engagement gaps", "retention risk"], ["owned-surface", "customer-provided-context"], ["Review scan completion, dashboard engagement, report access, support requests, billing status, and upgrade paths in safe summary form.", "Find friction between customer intent and system next action.", "Never expose private customer data or cross-customer records."], ["Track whether AI visibility content improves understanding and next-action clarity, not as a guaranteed placement metric."], ["Map growth signals to acquisition stage: discover, trust, choose, fix, monitor, renew."], ["Forecast churn or upgrade risk when customers do not see value, do not open reports, or hit unclear support/billing paths."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("future-platform-scout", "Keep Cendorq's system ahead of where customer acquisition, AI visibility, and operating platforms are moving.", ["stale system strategy", "late platform adaptation", "missing product expansion path"], ["platform-change-watch", "competitive-context", "search-and-ai-visibility"], ["Identify future product layers only after core web/dashboard/report systems are stable.", "Sequence app, enterprise, partner, analytics, international, and maintenance readiness without distracting from current conversion.", "Flag dependencies before expansion work starts."], ["Treat AI/search evolution as an internal product-intelligence input for Cendorq's system architecture."], ["Tie future roadmap work to customer acquisition value, not novelty."], ["Forecast platform needs over 1, 3, 5, and 10 year horizons while keeping customer promises bounded."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("security-privacy-scout", "Protect trust, privacy, command authority, and customer-safe operations while Cendorq becomes more powerful.", ["data exposure", "unsafe authority", "private payload leakage", "approval bypass"], ["owned-surface", "customer-provided-context"], ["Check for raw payload exposure, unsafe storage, command-center leakage, approval bypass, and customer data overexposure.", "Ensure every powerful agent/system layer remains safe-summary-only unless explicitly approved.", "Add validators when new standards are created."], ["Protect AI visibility work from becoming invasive scraping, private-data exposure, or unsupported claims."], ["Connect security posture to customer trust and serious-company credibility."], ["Forecast risk from expanding agents, dashboards, APIs, reports, and operator actions without stronger access/audit gates."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("validation-drift-scout", "Make sure standards stay enforced after every upgrade.", ["missing validator", "route drift", "copy drift", "plan-boundary drift", "agent authority drift"], ["owned-surface"], ["Search for new standards without validators.", "Confirm route, dashboard, email, billing, support, report, and command-center language stay aligned.", "Block drift when plan boundaries or AI visibility claims are introduced."], ["Validate that AI visibility is bounded, useful, and not phrased as guaranteed ranking or guaranteed AI placement."], ["Tie validation failures to customer confusion, trust loss, conversion loss, or operational risk."], ["Forecast maintenance burden and standard decay when validators are missing."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
  playbook("operator-command-scout", "Give operators the visibility to run Cendorq like a serious operating platform.", ["weak backend operations", "unclear command center", "missing approval visibility", "blocked reason ambiguity"], ["owned-surface"], ["Review command-center panels for mission state, blocked reasons, owner approval, captain review, report delivery, billing/support posture, and audit trail.", "Keep operator language internal and customer surfaces customer-facing.", "Make every blocked state explain the next safe action."], ["Ensure operator views can see AI visibility posture without exposing raw customer data or unsupported claims."], ["Connect backend operations to customer value delivery and plan boundaries."], ["Forecast operating bottlenecks as volume, report complexity, agent work, and support load grow."], STANDARD_REJECTION_RULES, STANDARD_CONFIDENCE_SCORING),
] as const satisfies readonly CendorqAgentDecisionPlaybook[];

export function getCendorqAgentIntelligencePlaybooks() {
  return {
    systemRules: CENDORQ_AGENT_INTELLIGENCE_SYSTEM_RULES,
    playbooks: CENDORQ_AGENT_DECISION_PLAYBOOKS,
  };
}

export function getCendorqAgentIntelligencePlaybook(agentKey: CendorqAgentPlaybookKey) {
  return CENDORQ_AGENT_DECISION_PLAYBOOKS.find((playbook) => playbook.agentKey === agentKey) || null;
}

function playbook(
  agentKey: CendorqAgentPlaybookKey,
  mission: string,
  customerProblemFocus: readonly string[],
  sourceStrategy: readonly CendorqAgentSourceTier[],
  searchProcedure: readonly string[],
  aiVisibilityProcedure: readonly string[],
  acquisitionDiagnosisProcedure: readonly string[],
  forecastProcedure: readonly string[],
  rejectionRules: readonly string[],
  confidenceScoring: readonly string[],
): CendorqAgentDecisionPlaybook {
  return {
    agentKey,
    mission,
    customerProblemFocus,
    sourceStrategy,
    searchProcedure,
    aiVisibilityProcedure,
    acquisitionDiagnosisProcedure,
    forecastProcedure,
    rejectionRules,
    confidenceScoring,
    requiredFindingShape: REQUIRED_FINDING_SHAPE,
    planAdaptations: STANDARD_PLAN_ADAPTATIONS,
    blockedCustomerLanguage: STANDARD_BLOCKED_LANGUAGE,
  };
}
