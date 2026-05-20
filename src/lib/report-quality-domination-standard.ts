export type ReportQualityDimension =
  | "visual-hierarchy"
  | "truth-separation"
  | "evidence-confidence"
  | "plan-specific-value"
  | "operator-trace"
  | "customer-next-command"
  | "limitation-clarity"
  | "conversion-integrity"
  | "executive-readability";

export type ReportQualityDominationRule = {
  dimension: ReportQualityDimension;
  tenOutOfTenDefinition: string;
  requiredInEveryReport: readonly string[];
  blockerSignals: readonly string[];
};

export const REPORT_QUALITY_DOMINATION_STANDARD = [
  {
    dimension: "visual-hierarchy",
    tenOutOfTenDefinition: "The report looks premium, calm, scannable, and boardroom-ready on web and PDF without sacrificing detail.",
    requiredInEveryReport: ["cover", "executive signal", "scorecard", "priority cards", "evidence grid", "next command", "support path"],
    blockerSignals: ["wall of text", "weak section contrast", "unclear priority", "missing mobile readability", "PDF/dashboard mismatch"],
  },
  {
    dimension: "truth-separation",
    tenOutOfTenDefinition: "Observed facts, inferred risks, assumptions, recommendations, and unknowns are visibly separated.",
    requiredInEveryReport: ["observed", "inferred", "unknown", "recommended", "not evaluated"],
    blockerSignals: ["fact/inference mixed", "unsupported certainty", "hidden limitation", "raw private data shown"],
  },
  {
    dimension: "evidence-confidence",
    tenOutOfTenDefinition: "Every meaningful claim has an evidence class, confidence label, and reason for the confidence level.",
    requiredInEveryReport: ["evidence class", "confidence label", "source category", "freshness note", "limitation note"],
    blockerSignals: ["claim without evidence", "confidence without reason", "stale source treated as current", "private/internal source leaked"],
  },
  {
    dimension: "plan-specific-value",
    tenOutOfTenDefinition: "Free Scan, Deep Review, Build Fix, and Ongoing Control each feel distinct, valuable, and correctly scoped.",
    requiredInEveryReport: ["plan boundary", "plan-specific output", "not included", "upgrade/next-step logic", "scope discipline"],
    blockerSignals: ["free output gives away paid depth", "paid plan feels generic", "scope creep", "checkout pressure without evidence"],
  },
  {
    dimension: "operator-trace",
    tenOutOfTenDefinition: "Owner test mode exposes how agents, chiefs, and release captains shaped the output without exposing customer-private internals.",
    requiredInEveryReport: ["agent mission", "finding class", "chief review", "release-captain gate", "blocked claim scan"],
    blockerSignals: ["no trace", "trace exposes private notes", "release gate unclear", "operator role confusion"],
  },
  {
    dimension: "customer-next-command",
    tenOutOfTenDefinition: "The customer always knows the single most important next action and why it matters.",
    requiredInEveryReport: ["one primary next command", "reason", "expected effort", "risk if ignored", "support path"],
    blockerSignals: ["too many equal CTAs", "unclear action", "fake urgency", "unsupported outcome promise"],
  },
  {
    dimension: "limitation-clarity",
    tenOutOfTenDefinition: "The report is stronger because it names what Cendorq cannot know from public evidence alone.",
    requiredInEveryReport: ["limitations", "not inspected", "requires owner confirmation", "public evidence only", "no guarantee"],
    blockerSignals: ["pretends full certainty", "implies private access", "overclaims AI/search platform behavior", "guarantees outcome"],
  },
  {
    dimension: "conversion-integrity",
    tenOutOfTenDefinition: "Recommendations create demand through truth, specificity, and plan fit—not pressure or exaggerated claims.",
    requiredInEveryReport: ["plan-fit reason", "scope boundary", "why now", "what changes with upgrade", "customer-safe CTA"],
    blockerSignals: ["guaranteed revenue", "guaranteed ranking", "fake urgency", "fear-based manipulation"],
  },
  {
    dimension: "executive-readability",
    tenOutOfTenDefinition: "A busy owner can understand the business implication in under three minutes and still trust the details underneath.",
    requiredInEveryReport: ["plain-English headline", "business impact", "top risks", "top opportunities", "details below"],
    blockerSignals: ["technical jargon first", "buried conclusion", "unclear business impact", "no summary"],
  },
] as const satisfies readonly ReportQualityDominationRule[];

export const REPORT_QUALITY_NON_NEGOTIABLES = [
  "Every report must be visually premium and structurally obvious before it is information dense.",
  "Every report must separate observed facts, inferences, unknowns, limitations, and recommendations.",
  "Every report must show evidence class and confidence for meaningful claims.",
  "Every report must show one next command, not a pile of equal CTAs.",
  "Owner test reports must reveal agent/chief/release-captain trace while remaining blocked from customer delivery.",
  "No report may claim guaranteed ranking, guaranteed revenue, guaranteed AI placement, guaranteed security, or guaranteed accuracy.",
] as const;

export function getReportQualityDominationStandard() {
  return REPORT_QUALITY_DOMINATION_STANDARD;
}
