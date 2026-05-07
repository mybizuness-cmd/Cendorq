export type AiVisibilitySignalKey =
  | "findability"
  | "answer-readability"
  | "entity-clarity"
  | "proof-strength"
  | "choice-pressure"
  | "action-path";

export type AiVisibilityCommandLayer = "scan" | "diagnose" | "fix" | "control";

export type AiVisibilityStandard = {
  name: string;
  promise: string;
  customerTruth: string;
  marketShift: readonly string[];
  signalKeys: readonly AiVisibilitySignalKey[];
  commandLayers: readonly {
    layer: AiVisibilityCommandLayer;
    customerMeaning: string;
    mustExplain: readonly string[];
    mustNotClaim: readonly string[];
  }[];
  reportStandard: readonly string[];
  pageStandard: readonly string[];
  forecastStandard: readonly string[];
  blockedClaims: readonly string[];
};

export const AI_VISIBILITY_SIGNAL_KEYS = [
  "findability",
  "answer-readability",
  "entity-clarity",
  "proof-strength",
  "choice-pressure",
  "action-path",
] as const satisfies readonly AiVisibilitySignalKey[];

export const AI_VISIBILITY_MARKET_COMMAND_STANDARD = {
  name: "AI visibility market command standard",
  promise: "Cendorq helps a business become clear enough for customers, search, maps, reviews, directories, and AI answers to find, understand, trust, and choose it.",
  customerTruth:
    "The business is no longer competing only for ranking. It is competing for meaning before the click, before the call, and before the customer asks for a quote.",
  marketShift: [
    "Search is moving from short keyword lookup into longer questions, summaries, comparisons, maps, reviews, and AI-assisted answers.",
    "A customer may form an opinion from search results, map panels, review snippets, business profiles, directories, social proof, and AI summaries before reaching the website.",
    "If public information is vague, thin, inconsistent, or hard to verify, the business can be flattened into a generic option instead of the clear choice.",
    "Winning the new search reality requires findability, structured clarity, proof close to the decision, and a next action that feels safe.",
  ],
  signalKeys: AI_VISIBILITY_SIGNAL_KEYS,
  commandLayers: [
    {
      layer: "scan",
      customerMeaning: "Find the first visible signal where the market may not understand, trust, or choose the business.",
      mustExplain: ["first signal", "confidence limit", "visible risk", "best next command"],
      mustNotClaim: ["full diagnosis", "complete AI visibility audit", "guaranteed ranking", "guaranteed lead volume"],
    },
    {
      layer: "diagnose",
      customerMeaning: "Prove the cause before the customer pays for fixes, content, ads, or redesign work.",
      mustExplain: ["cause", "evidence", "confidence", "implementation fit"],
      mustNotClaim: ["done-for-you implementation", "absolute certainty", "guaranteed sales", "unlimited revisions"],
    },
    {
      layer: "fix",
      customerMeaning: "Improve the page, message, proof, structure, or action path that weakens the market decision.",
      mustExplain: ["approved target", "scope", "what changed", "what stayed outside scope"],
      mustNotClaim: ["full rebuild", "unlimited implementation", "monthly monitoring", "guaranteed performance"],
    },
    {
      layer: "control",
      customerMeaning: "Keep visibility, proof, trust, AI/search posture, and customer decision priorities under monthly watch.",
      mustExplain: ["monthly priority", "trend posture", "watch area", "next decision"],
      mustNotClaim: ["unlimited Build Fix", "guaranteed AI placement", "guaranteed rankings", "ad management"],
    },
  ],
  reportStandard: [
    "Every report must separate signal, proof, risk, limit, and next command.",
    "Every AI/search visibility statement must explain what is observed, what is inferred, and what needs deeper review.",
    "Reports should educate and sell by making the customer understand the cost of confusion and the value of the next command.",
    "Reports must stay concise, structured, and decision-useful; longer reports still need clear sections and no filler.",
  ],
  pageStandard: [
    "Every page must speak to the customer, not describe generic software features.",
    "Every page should answer: what is this, why does it matter now, what should I do next, and what does this not include?",
    "Public pages should avoid clutter and keep the most important market-command message above decorative detail.",
    "Dashboard pages should show status, proof, next action, and scope boundary without account-page filler.",
  ],
  forecastStandard: [
    "Forecasts must be useful but bounded: likely risk, confidence posture, and next review path.",
    "Forecasts must connect changing search, AI answers, competitors, reviews, proof, and customer behavior to business action.",
    "Forecasts must not pretend to predict guaranteed revenue, rankings, AI placement, or exact customer behavior.",
  ],
  blockedClaims: [
    "guaranteed AI answer placement",
    "guaranteed ranking",
    "guaranteed revenue",
    "complete certainty",
    "all search problems fixed",
    "full diagnosis inside Free Scan",
    "unlimited implementation",
    "premium generic positioning",
    "luxury UI as the standard instead of customer command clarity",
  ],
} as const satisfies AiVisibilityStandard;

export function getAiVisibilityMarketCommandStandard() {
  return AI_VISIBILITY_MARKET_COMMAND_STANDARD;
}

export function getAiVisibilitySignalKeys() {
  return AI_VISIBILITY_SIGNAL_KEYS;
}
