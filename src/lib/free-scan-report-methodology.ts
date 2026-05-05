export type FreeScanAxisKey = "clarity" | "trust" | "choice" | "action" | "visibility" | "proof";
export type FreeScanConfidenceLevel = "Observed" | "Inferred" | "Needs deeper review";
export type FreeScanPriorityLevel = "critical" | "important" | "watch";

export type FreeScanAxis = {
  key: FreeScanAxisKey;
  customerLabel: string;
  whyItMatters: string;
  whatWeInspect: readonly string[];
  resultQuestion: string;
  conversionRisk: string;
  deepReviewUnlock: string;
};

export type FreeScanEvidenceRule = {
  label: string;
  customerMeaning: string;
  allowedEvidence: readonly string[];
  shouldNotUse: readonly string[];
};

export type FreeScanResultFinding = {
  axis: FreeScanAxisKey;
  priority: FreeScanPriorityLevel;
  confidence: FreeScanConfidenceLevel;
  findingLabel: string;
  customerImpact: string;
  evidenceNeeded: readonly string[];
  limitation: string;
  bestNextAction: string;
};

export const FREE_SCAN_REPORT_AXES = [
  {
    key: "clarity",
    customerLabel: "Clarity",
    whyItMatters: "Customers must understand what you do, who it is for, and why it matters before they can choose you.",
    whatWeInspect: ["headline", "offer language", "audience fit", "service explanation", "first-screen comprehension"],
    resultQuestion: "Can a serious customer understand the business fast enough to keep moving?",
    conversionRisk: "If clarity is weak, visitors may leave before comparing value, proof, or price.",
    deepReviewUnlock: "Deep Review identifies which message, offer, or positioning layer is causing the confusion.",
  },
  {
    key: "trust",
    customerLabel: "Trust",
    whyItMatters: "Customers need signals that the business is real, safe, current, and worth contacting.",
    whatWeInspect: ["contact confidence", "review posture", "business legitimacy", "visual credibility", "risk-reducing language"],
    resultQuestion: "Does the business feel safe enough for the customer to take the next step?",
    conversionRisk: "If trust is weak, visitors may hesitate even when the offer is relevant.",
    deepReviewUnlock: "Deep Review separates missing proof from weak presentation and unsupported claims.",
  },
  {
    key: "choice",
    customerLabel: "Choice",
    whyItMatters: "Customers compare options quickly. The business must make choosing it feel easier and more justified.",
    whatWeInspect: ["differentiation", "comparison strength", "offer specificity", "customer-fit language", "reason to choose now"],
    resultQuestion: "Is there a strong enough reason to choose this business instead of a competitor or doing nothing?",
    conversionRisk: "If choice is weak, the customer may keep shopping, delay, or default to a better-explained competitor.",
    deepReviewUnlock: "Deep Review finds the missing reason-to-choose and the decision friction behind it.",
  },
  {
    key: "action",
    customerLabel: "Action",
    whyItMatters: "The customer must know exactly what to do next, and that action must feel easy, safe, and worth it.",
    whatWeInspect: ["primary CTA", "contact path", "booking or purchase flow", "form friction", "mobile tap path"],
    resultQuestion: "Is the next step obvious and easy enough to complete on mobile?",
    conversionRisk: "If action is weak, interested customers may still fail to contact, book, buy, or request help.",
    deepReviewUnlock: "Deep Review pinpoints whether the issue is CTA clarity, form friction, page structure, or offer confidence.",
  },
  {
    key: "visibility",
    customerLabel: "Visibility",
    whyItMatters: "The business needs to be discoverable and understandable across search, local results, AI answers, and customer research paths.",
    whatWeInspect: ["search intent fit", "local signal readiness", "page-topic clarity", "structured business context", "channel consistency"],
    resultQuestion: "Can the business be found and understood in the places customers search before deciding?",
    conversionRisk: "If visibility is weak, the business may lose qualified demand before the website even gets a chance to convert.",
    deepReviewUnlock: "Deep Review separates visibility gaps from message, proof, and conversion gaps.",
  },
  {
    key: "proof",
    customerLabel: "Proof",
    whyItMatters: "Proof helps customers believe the promise, reduce perceived risk, and justify taking action.",
    whatWeInspect: ["reviews", "examples", "before-after evidence", "credentials", "specific outcomes without unsupported guarantees"],
    resultQuestion: "Does the page give enough proof to support the action being asked for?",
    conversionRisk: "If proof is weak, customers may like the offer but still avoid committing.",
    deepReviewUnlock: "Deep Review identifies what proof is missing, misplaced, unclear, or not strong enough for the action.",
  },
] as const satisfies readonly FreeScanAxis[];

export const FREE_SCAN_CONFIDENCE_MODEL = [
  {
    level: "Observed",
    customerMeaning: "Cendorq can point to visible, customer-facing evidence on the submitted page or business profile.",
    reportUse: "Use for direct findings and visible friction.",
  },
  {
    level: "Inferred",
    customerMeaning: "Cendorq can form a reasoned judgment from the evidence, but more context would improve confidence.",
    reportUse: "Use for likely causes and prioritization guidance.",
  },
  {
    level: "Needs deeper review",
    customerMeaning: "The Free Scan found a signal, but a reliable answer needs more evidence, comparison, or business context.",
    reportUse: "Use to explain why Deep Review exists and what it would unlock.",
  },
] as const;

export const FREE_SCAN_EVIDENCE_RULES = [
  {
    label: "Visible customer-facing evidence",
    customerMeaning: "Use what a real customer can see or experience without private access.",
    allowedEvidence: ["public website", "public business profile", "visible offer copy", "visible CTA", "public proof signals", "public search or local presentation"],
    shouldNotUse: ["private account data", "password-protected pages", "raw internal notes", "unverified claims", "guaranteed outcome assumptions"],
  },
  {
    label: "Customer-provided context",
    customerMeaning: "Use the submitted business goal, audience, offer, location, and stated concern to avoid generic advice.",
    allowedEvidence: ["business name", "business URL", "target customer", "primary offer", "market or location", "main goal or concern", "known competitors"],
    shouldNotUse: ["secrets", "tokens", "card data", "private keys", "irrelevant personal data"],
  },
  {
    label: "Confidence boundaries",
    customerMeaning: "Show what is known, what is inferred, and what still needs deeper review before presenting a cause as reliable.",
    allowedEvidence: ["visible mismatch", "missing proof", "unclear action path", "customer stated concern", "observable comparison gap"],
    shouldNotUse: ["final diagnosis without evidence", "fake precision", "unsupported score certainty", "pressure language"],
  },
] as const satisfies readonly FreeScanEvidenceRule[];

export const FREE_SCAN_PRIORITY_MODEL = [
  {
    level: "critical",
    customerMeaning: "This may block the customer from understanding, trusting, choosing, or acting now.",
    action: "Explain first and route toward Deep Review when the cause needs evidence-backed diagnosis.",
  },
  {
    level: "important",
    customerMeaning: "This may reduce confidence or make the business easier to compare away from.",
    action: "Teach why it matters and show what deeper review or a fix would clarify.",
  },
  {
    level: "watch",
    customerMeaning: "This is worth monitoring, but it may not be the first revenue leak.",
    action: "Keep it visible without distracting from the highest-leverage next move.",
  },
] as const;

export const FREE_SCAN_RESULT_SECTIONS = [
  {
    label: "What matters first",
    purpose: "Start with the single highest-leverage customer decision issue instead of overwhelming the customer with a checklist.",
  },
  {
    label: "What Cendorq can see",
    purpose: "Show the visible evidence behind the first read so the customer understands that the result is not random opinion.",
  },
  {
    label: "Why it may cost choices",
    purpose: "Translate the finding into customer hesitation, lost confidence, delay, or action friction.",
  },
  {
    label: "What is still uncertain",
    purpose: "Protect accuracy by showing what the Free Scan cannot prove without deeper review.",
  },
  {
    label: "Best next move",
    purpose: "Lead to Free Scan continuation, Deep Review, Build Fix, or Ongoing Control based on stage and evidence.",
  },
] as const;

export const FREE_SCAN_SAMPLE_FINDINGS = [
  {
    axis: "clarity",
    priority: "critical",
    confidence: "Inferred",
    findingLabel: "The offer may not become clear fast enough for a serious customer.",
    customerImpact: "A visitor who cannot quickly understand the promise may leave before trust, proof, or price can help.",
    evidenceNeeded: ["submitted website", "headline and first-screen copy", "primary offer", "target customer"],
    limitation: "The Free Scan can flag the clarity risk, but Deep Review is needed to identify the exact message layer causing it.",
    bestNextAction: "Use Deep Review when the business needs the full reason before buying fixes or ads.",
  },
  {
    axis: "trust",
    priority: "important",
    confidence: "Observed",
    findingLabel: "Trust signals may not support the action being asked for.",
    customerImpact: "Customers may like the service but hesitate if proof, legitimacy, or contact confidence feels thin.",
    evidenceNeeded: ["visible proof", "reviews or examples", "contact path", "risk-reducing copy"],
    limitation: "A first scan cannot prove customer intent; it can only show whether trust support appears strong enough for the action.",
    bestNextAction: "Use Deep Review to separate missing proof from weak proof placement or weak action framing.",
  },
  {
    axis: "action",
    priority: "critical",
    confidence: "Observed",
    findingLabel: "The next action may not feel obvious or easy enough on mobile.",
    customerImpact: "Interested customers can still fail to contact, book, buy, or request help when the path is unclear or high-friction.",
    evidenceNeeded: ["primary CTA", "form path", "mobile tap path", "booking or contact steps"],
    limitation: "The Free Scan can show the action risk; deeper review is needed to decide whether the fix is copy, layout, offer, or trust.",
    bestNextAction: "Use Build Fix only when the weak action path is already clear enough to improve safely.",
  },
] as const satisfies readonly FreeScanResultFinding[];

export const FREE_SCAN_REPORT_QUALITY_RULES = [
  "Separate observed evidence from inferred judgment.",
  "Never claim 100 percent certainty from a limited first scan.",
  "Explain customer impact in plain business language, not internal scoring language.",
  "Show one most important next move before secondary actions.",
  "Educate the customer while moving them toward the right paid depth.",
  "Use Deep Review when the cause matters more than a quick fix.",
  "Use Build Fix only when the weak part is clear enough to improve.",
  "Use Ongoing Control when the business needs repeated monitoring and monthly decisions.",
  "Never present a pending result as final.",
  "Never expose private payloads, secrets, internal notes, prompts, tokens, or billing data inside the report.",
  "Use confidence labels and limitations whenever the Free Scan makes an inference.",
] as const;

export const FREE_SCAN_REQUIRED_INTAKE_FIELDS = [
  "business_name",
  "business_url",
  "target_customer",
  "primary_offer",
  "market_or_location",
  "main_goal_or_concern",
  "customer_action",
  "email",
] as const;

export const FREE_SCAN_OPTIONAL_CONTEXT_FIELDS = [
  "known_competitors",
  "current_traffic_source",
  "best_customer_type",
  "what_has_already_been_tried",
] as const;

export function getFreeScanAxis(axisKey: FreeScanAxisKey) {
  return FREE_SCAN_REPORT_AXES.find((axis) => axis.key === axisKey) || FREE_SCAN_REPORT_AXES[0];
}

export function getFreeScanFindingSummary() {
  return FREE_SCAN_SAMPLE_FINDINGS.map((finding) => ({
    ...finding,
    axisLabel: getFreeScanAxis(finding.axis).customerLabel,
  }));
}
