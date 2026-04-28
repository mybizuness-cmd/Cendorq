export type InsightConversationArea =
  | "strategic-insights"
  | "guided-conversation"
  | "evidence-grounding"
  | "plan-guidance"
  | "customer-education"
  | "operator-escalation"
  | "safety"
  | "memory"
  | "conversion"
  | "analytics";

export type InsightConversationRule = {
  key: string;
  label: string;
  area: InsightConversationArea;
  requirement: string;
  requiredControls: readonly string[];
  blockedBehavior: readonly string[];
};

export type InsightConversationMode = {
  key: string;
  label: string;
  purpose: string;
  allowedOutputs: readonly string[];
  blockedOutputs: readonly string[];
};

export const INSIGHTS_CONVERSATION_RULES = [
  {
    key: "strategic-insight-layer",
    label: "Strategic insight layer",
    area: "strategic-insights",
    requirement: "The customer dashboard should surface strategic insights that explain what matters most, why it matters, what evidence supports it, what is uncertain, and what the customer should do next.",
    requiredControls: ["top insight", "why it matters", "evidence tie-back", "confidence label", "next action", "plan-stage fit", "methodology version"],
    blockedBehavior: ["random insight", "unsupported business advice", "generic recommendation", "hidden uncertainty", "no next action", "no evidence tie-back"],
  },
  {
    key: "guided-business-conversation",
    label: "Guided business conversation",
    area: "guided-conversation",
    requirement: "Conversation inside the dashboard must behave like a controlled business advisor: it can answer report questions, explain scores, compare plan options, clarify evidence, guide next steps, and route complex issues to support without inventing facts.",
    requiredControls: ["report-aware context", "evidence references", "plan-stage guard", "safe answer boundary", "support escalation", "conversation audit", "confidence wording"],
    blockedBehavior: ["free-form unsupported advice", "invented evidence", "unapproved legal advice", "guaranteed outcomes", "bypassing support", "changing report conclusions"],
  },
  {
    key: "evidence-grounded-answers",
    label: "Evidence-grounded answers",
    area: "evidence-grounding",
    requirement: "Every answer about a specific customer report, business score, recommendation, platform signal, or plan recommendation must be grounded in approved report records, evidence summaries, calculation traces, or clearly labeled uncertainty.",
    requiredControls: ["evidence ID reference", "calculation ID reference", "report version", "confidence label", "uncertainty fallback", "no raw private evidence exposure"],
    blockedBehavior: ["answer without source", "raw evidence dump", "private secret exposure", "confidence inflation", "unversioned method", "unsupported platform revenue claim"],
  },
  {
    key: "plan-guidance-with-integrity",
    label: "Plan guidance with integrity",
    area: "plan-guidance",
    requirement: "Conversation may recommend Full Diagnosis, Optimization, Monthly Control, or expansion only when the plan fit is supported by the customer's stage, evidence, open questions, severity, or implementation needs.",
    requiredControls: ["plan-stage mapping", "evidence-backed reason", "current-plan limit", "next-plan unlock", "checkout or support path", "blocked-claim scan"],
    blockedBehavior: ["same plan push for every user", "unsupported upsell", "fake urgency", "outcome guarantee", "hidden limitations", "dark pattern"],
  },
  {
    key: "education-without-overwhelm",
    label: "Education without overwhelm",
    area: "customer-education",
    requirement: "Insights and conversation should teach customers what the report means in practical, plain language with visual references, examples, and next actions without overwhelming them or dumping raw methodology.",
    requiredControls: ["plain-language explanation", "section explainer", "visual reference", "example", "next action", "progressive disclosure", "help path"],
    blockedBehavior: ["jargon dump", "methodology overload", "black-box wording", "unclear action", "raw scoring internals", "condescending tone"],
  },
  {
    key: "operator-escalation-path",
    label: "Operator escalation path",
    area: "operator-escalation",
    requirement: "When the customer asks about billing disputes, material report errors, legal-sensitive claims, unsupported data, account access, or complex edge cases, the conversation must route to support or operator review.",
    requiredControls: ["escalation trigger", "support ticket path", "correction request path", "billing support path", "operator review status", "conversation summary"],
    blockedBehavior: ["handling legal disputes autonomously", "changing billing state in chat without controls", "ignoring correction request", "fabricating policy", "no escalation record"],
  },
  {
    key: "conversation-safety-and-brand",
    label: "Conversation safety and brand",
    area: "safety",
    requirement: "Conversation must maintain Cendorq's luxury, exceptional, calm, strategic, truthful brand voice while refusing unsafe or unsupported requests and protecting private data.",
    requiredControls: ["brand voice rules", "unsafe request refusal", "privacy guard", "no raw secret output", "no perfect certainty", "no guaranteed outcomes", "audit log"],
    blockedBehavior: ["hype voice", "legal immunity claim", "perfect accuracy claim", "raw secret output", "customer data leakage", "unprofessional tone"],
  },
  {
    key: "memory-with-boundaries",
    label: "Memory with boundaries",
    area: "memory",
    requirement: "Customer conversation may use account memory, prior reports, saved opportunities, plan state, and business profiles to reduce friction, but must respect business boundaries, consent, privacy, and current plan entitlements.",
    requiredControls: ["customer account boundary", "business switcher context", "plan entitlement", "safe prefill", "memory source label", "delete or correction path"],
    blockedBehavior: ["cross-business leakage", "cross-customer memory", "using deleted data", "wrong business context", "unentitled report access", "unlabeled memory"],
  },
  {
    key: "conversion-conversation-moat",
    label: "Conversion conversation moat",
    area: "conversion",
    requirement: "Conversation should increase conversion by making value obvious, answering objections, explaining plan differences, showing what is unlocked next, and guiding checkout or support, while staying truthful and evidence-backed.",
    requiredControls: ["objection handling", "plan comparison", "evidence-backed CTA", "checkout link", "support alternative", "what happens next", "no dark pattern"],
    blockedBehavior: ["pressure-only sales", "fake scarcity", "unsupported claims", "hiding cheaper options", "forcing checkout", "misrepresenting plan value"],
  },
  {
    key: "conversation-analytics-with-privacy",
    label: "Conversation analytics with privacy",
    area: "analytics",
    requirement: "Conversation analytics should measure useful themes, unanswered questions, conversion blockers, support triggers, and product improvement opportunities without storing raw private evidence, secrets, or sensitive report text in analytics payloads.",
    requiredControls: ["topic classification", "privacy-safe event", "support trigger count", "conversion blocker tag", "unanswered question tag", "product feedback tag"],
    blockedBehavior: ["raw report text in analytics", "raw evidence in analytics", "secret in event", "no support trigger visibility", "unbounded transcript export"],
  },
] as const satisfies readonly InsightConversationRule[];

export const INSIGHTS_CONVERSATION_MODES = [
  {
    key: "explain-my-scan",
    label: "Explain my scan",
    purpose: "Help Free Scan customers understand visible findings, limitations, confidence, and why Full Diagnosis may be the next logical step.",
    allowedOutputs: ["plain-language summary", "visible evidence explanation", "uncertainty explanation", "Full Diagnosis next-step reason", "dashboard link"],
    blockedOutputs: ["complete diagnosis claim", "guaranteed outcome", "unsupported revenue claim", "raw evidence dump"],
  },
  {
    key: "what-should-i-do-next",
    label: "What should I do next",
    purpose: "Guide customers to the most logical next action based on plan stage, evidence, open questions, and urgency.",
    allowedOutputs: ["next action", "why now", "evidence support", "plan fit", "support option", "checkout option"],
    blockedOutputs: ["fake urgency", "same answer for every plan", "unsupported upsell", "dark pattern"],
  },
  {
    key: "compare-plans",
    label: "Compare plans",
    purpose: "Explain what each plan unlocks, what is not included, and which plan fits the customer's current state.",
    allowedOutputs: ["plan comparison", "current-plan limit", "next-plan unlock", "billing link", "support option"],
    blockedOutputs: ["hidden limitation", "bait and switch", "guaranteed ROI", "unclear price"],
  },
  {
    key: "ask-about-report",
    label: "Ask about report",
    purpose: "Answer questions about report sections, calculations, visuals, confidence labels, and recommendations using report records.",
    allowedOutputs: ["section explanation", "calculation explanation", "visual explanation", "confidence explanation", "recommendation tie-back"],
    blockedOutputs: ["changing report conclusion", "inventing calculation", "raw scoring internals", "unsupported advice"],
  },
  {
    key: "request-review-or-support",
    label: "Request review or support",
    purpose: "Route material errors, billing questions, account issues, or complex concerns to the right support or operator path.",
    allowedOutputs: ["support route", "correction request", "billing help", "conversation summary", "next expected step"],
    blockedOutputs: ["legal ruling", "unapproved refund promise", "silent escalation", "account change without controls"],
  },
] as const satisfies readonly InsightConversationMode[];

export function getInsightsConversationStandard() {
  return {
    rules: INSIGHTS_CONVERSATION_RULES,
    modes: INSIGHTS_CONVERSATION_MODES,
  };
}
