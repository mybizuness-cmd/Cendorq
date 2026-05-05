import {
  FREE_SCAN_CONFIDENCE_MODEL,
  FREE_SCAN_EVIDENCE_RULES,
  FREE_SCAN_PRIORITY_MODEL,
  FREE_SCAN_REPORT_QUALITY_RULES,
  FREE_SCAN_RESULT_SECTIONS,
  getFreeScanFindingSummary,
} from "@/lib/free-scan-report-methodology";

export type ReportRoutingHint =
  | "scan-only"
  | "blueprint-candidate"
  | "infrastructure-review"
  | "command-review";

export type ReportDecision = "reject" | "review" | "priority";
export type ReportScoreTier = "low" | "mid" | "high";
export type ReportStrongestPressure = "trust" | "clarity" | "positioning" | "action" | "mixed";
export type ReportConfidenceLevel = "low" | "medium" | "high";
export type ReportTimeSensitivity = "stable" | "watch" | "urgent";

export type ReportScoreModules = Readonly<{
  discoverability: number;
  recommendationVisibility: number;
  trustAuthority: number;
  conversionReadiness: number;
  competitiveExposure: number;
}>;

export type FreeCheckReportInput = Readonly<{
  id: string;
  businessName: string;
  businessType: string;
  websiteUrl: string;
  websiteHostname: string;
  city: string;
  stateRegion: string;
  country: string;
  primaryOffer: string;
  audience: string;
  biggestIssue: string;
  competitors: string;
  notes: string;
  signalQuality: number;
  clarityScore: number;
  intentStrength: number;
  routingHint: ReportRoutingHint;
  score: number;
  scoreTier: ReportScoreTier;
  decision: ReportDecision;
  strongestPressure: ReportStrongestPressure;
  riskFlags: readonly string[];
  confidenceLevel: ReportConfidenceLevel;
  dataDepthScore: number;
  timeSensitivity: ReportTimeSensitivity;
  decisionMoment: string;
  explanationTrace: readonly string[];
  scoreModules: ReportScoreModules;
  createdAt: string;
  updatedAt: string;
}>;

export type FreeCheckReportSnapshot = Readonly<{
  reportId: string;
  generatedAt: string;
  destination: "/dashboard/reports/free-scan";
  scope: "Free Scan";
  executiveSummary: string;
  routeRecommendation: {
    title: string;
    copy: string;
    href: string;
    cta: string;
  };
  posture: {
    confidence: ReportConfidenceLevel;
    confidenceMeaning: string;
    timeSensitivity: ReportTimeSensitivity;
    strongestPressure: ReportStrongestPressure;
    scoreTier: ReportScoreTier;
    decision: ReportDecision;
  };
  methodology: {
    evidenceRules: readonly string[];
    confidenceModel: readonly string[];
    priorityModel: readonly string[];
    resultSections: readonly string[];
    qualityRules: readonly string[];
  };
  structuredFindings: ReturnType<typeof getFreeScanFindingSummary>;
  moduleReadouts: Array<{
    label: string;
    value: number;
    interpretation: string;
  }>;
  priorityActions: string[];
  limitations: string[];
  riskInterpretation: string[];
  explanationTrace: string[];
}>;

export function buildFreeCheckReportSnapshot(entry: FreeCheckReportInput): FreeCheckReportSnapshot {
  const routeRecommendation = recommendRoute(entry.routingHint);
  const moduleReadouts = [
    {
      label: "Discoverability",
      value: entry.scoreModules.discoverability,
      interpretation: interpretModule(entry.scoreModules.discoverability, "how easy the business looks to discover across visible search surfaces"),
    },
    {
      label: "AI Recommendation Visibility",
      value: entry.scoreModules.recommendationVisibility,
      interpretation: interpretModule(entry.scoreModules.recommendationVisibility, "how strongly the business is currently framed to become a preferred answer candidate"),
    },
    {
      label: "Trust & Authority",
      value: entry.scoreModules.trustAuthority,
      interpretation: interpretModule(entry.scoreModules.trustAuthority, "how credible, current, and dependable the business currently appears"),
    },
    {
      label: "Conversion Readiness",
      value: entry.scoreModules.conversionReadiness,
      interpretation: interpretModule(entry.scoreModules.conversionReadiness, "how ready the current business presentation looks to turn interest into movement"),
    },
    {
      label: "Competitive Exposure",
      value: entry.scoreModules.competitiveExposure,
      interpretation: interpretModule(entry.scoreModules.competitiveExposure, "how vulnerable the business may be to comparison, substitution, or competitive pressure"),
    },
  ];

  const priorityActions = buildPriorityActions(entry);
  const riskInterpretation = buildRiskInterpretation(entry);
  const limitations = buildLimitations(entry);

  return {
    reportId: `report-${entry.id}`,
    generatedAt: new Date().toISOString(),
    destination: "/dashboard/reports/free-scan",
    scope: "Free Scan",
    executiveSummary: buildExecutiveSummary(entry, routeRecommendation.title),
    routeRecommendation,
    posture: {
      confidence: entry.confidenceLevel,
      confidenceMeaning: explainConfidence(entry.confidenceLevel),
      timeSensitivity: entry.timeSensitivity,
      strongestPressure: entry.strongestPressure,
      scoreTier: entry.scoreTier,
      decision: entry.decision,
    },
    methodology: {
      evidenceRules: FREE_SCAN_EVIDENCE_RULES.map((item) => `${item.label}: ${item.customerMeaning}`),
      confidenceModel: FREE_SCAN_CONFIDENCE_MODEL.map((item) => `${item.level}: ${item.customerMeaning}`),
      priorityModel: FREE_SCAN_PRIORITY_MODEL.map((item) => `${item.level}: ${item.customerMeaning}`),
      resultSections: FREE_SCAN_RESULT_SECTIONS.map((item) => item.label),
      qualityRules: [...FREE_SCAN_REPORT_QUALITY_RULES],
    },
    structuredFindings: getFreeScanFindingSummary(),
    moduleReadouts,
    priorityActions,
    limitations,
    riskInterpretation,
    explanationTrace: [...entry.explanationTrace],
  };
}

function recommendRoute(routingHint: ReportRoutingHint) {
  if (routingHint === "command-review") {
    return {
      title: "Ongoing Control may become the right path after the base is stable.",
      copy: "The signal suggests the business may eventually benefit from continued direction, monitoring, and improvement. Sequence still matters: the base should be clear enough before ongoing work begins.",
      href: "/plans/ongoing-control",
      cta: "Review Ongoing Control",
    };
  }

  if (routingHint === "infrastructure-review") {
    return {
      title: "Build Fix pressure is visible, but the cause still matters.",
      copy: "Implementation pressure is appearing already. If the weakness is clear, Build Fix may be right. If not, Deep Review protects the path before bigger work begins.",
      href: "/plans/build-fix",
      cta: "Review Build Fix",
    };
  }

  if (routingHint === "blueprint-candidate") {
    return {
      title: "Deep Review is the strongest next step.",
      copy: "The intake has enough signal quality to justify a deeper diagnosis before the business spends harder in the wrong place.",
      href: "/plans/deep-review",
      cta: "Open Deep Review",
    };
  }

  return {
    title: "Free Scan should keep strengthening the first signal.",
    copy: "The strongest next move is still improving first-read signal quality, not escalating before the business is understood clearly enough.",
    href: "/free-check",
    cta: "Refine Free Scan",
  };
}

function buildExecutiveSummary(entry: FreeCheckReportInput, recommendationTitle: string) {
  const businessLabel = entry.businessName || "This business";
  const location = [entry.city, entry.stateRegion, entry.country].filter(Boolean).join(", ");
  const locationSuffix = location ? ` in ${location}` : "";

  return `${businessLabel}${locationSuffix} is currently reading as a ${entry.scoreTier}-tier / ${entry.decision} Free Scan intake with ${entry.confidenceLevel} confidence, signal quality ${entry.signalQuality}/100, and data depth ${entry.dataDepthScore}/100. The strongest visible pressure is ${humanizePressure(entry.strongestPressure)}. This is a first-read signal, not a final diagnosis. The controlled route recommendation is: ${recommendationTitle}`;
}

function buildPriorityActions(entry: FreeCheckReportInput) {
  const actions: string[] = [];

  if (entry.scoreModules.trustAuthority < 60) {
    actions.push("Strengthen trust so the business feels more credible, current, and safer to choose.");
  }
  if (entry.scoreModules.recommendationVisibility < 65) {
    actions.push("Clarify the business explanation so answer systems and human readers can identify the offer, audience, and fit faster.");
  }
  if (entry.scoreModules.conversionReadiness < 65) {
    actions.push("Reduce action friction so interested visitors do not hesitate before inquiry, booking, or contact.");
  }
  if (entry.scoreModules.competitiveExposure >= 60) {
    actions.push("Sharpen positioning so the business becomes harder to compare away against nearby or lower-readability alternatives.");
  }
  if (entry.dataDepthScore < 60) {
    actions.push("Collect stronger business detail before escalating recommendations too aggressively.");
  }

  if (actions.length === 0) {
    actions.push("The business has enough baseline structure to justify a deeper diagnosis instead of another vague first-pass recommendation.");
  }

  return actions.slice(0, 5);
}

function buildLimitations(entry: FreeCheckReportInput) {
  const limitations = [
    "The Free Scan uses submitted business context and visible customer-facing signals; it does not claim full diagnosis from private or unavailable evidence.",
    "Observed signals and inferred judgments must stay separated before a customer treats the result as a fix plan.",
  ];

  if (entry.confidenceLevel === "low") {
    limitations.push("Confidence is low, so the safest next action is to improve context or use Deep Review before spending on implementation.");
  }

  if (entry.dataDepthScore < 60) {
    limitations.push("Data depth is still limited, so some recommendations should be treated as directional until more evidence is reviewed.");
  }

  if (!entry.websiteHostname) {
    limitations.push("No clean public website host was captured, so website-specific findings are limited.");
  }

  return limitations;
}

function buildRiskInterpretation(entry: FreeCheckReportInput) {
  const messages: string[] = [];

  if (entry.riskFlags.length === 0) {
    messages.push("No active risk flags are materially weakening this signal snapshot right now.");
  } else {
    messages.push(`Active intake risk flags: ${entry.riskFlags.join(", ")}.`);
  }

  if (entry.confidenceLevel === "low") {
    messages.push("Confidence is still low, which means the system should protect against overconfident escalation.");
  }

  if (entry.timeSensitivity === "urgent") {
    messages.push("Time sensitivity is elevated, so the business may be losing ground faster if clarity and structure remain unresolved.");
  }

  if (!entry.websiteHostname) {
    messages.push("Website confidence is reduced because no clean public-facing website host was captured in the intake.");
  }

  return messages;
}

function explainConfidence(confidence: ReportConfidenceLevel) {
  if (confidence === "high") return "The intake has enough depth to make the first-read direction more useful, while still staying short of a final diagnosis.";
  if (confidence === "medium") return "The intake has workable signal, but deeper review would improve cause-level precision.";
  return "The intake is still thin, so Cendorq should avoid overconfident conclusions and gather more evidence before implementation.";
}

function interpretModule(value: number, suffix: string) {
  if (value >= 80) return `Strong current posture in ${suffix}.`;
  if (value >= 60) return `Workable but still improvable posture in ${suffix}.`;
  if (value >= 40) return `Noticeable weakness remains in ${suffix}.`;
  return `This is currently a major pressure point in ${suffix}.`;
}

function humanizePressure(value: ReportStrongestPressure) {
  if (value === "mixed") return "mixed pressure";
  return `${value} pressure`;
}
