export type PresenceReportEvidenceConfidence = "observed" | "inferred" | "needs-review";

export type PresenceReportEvidenceBoundary = Readonly<{
  label: string;
  confidence: PresenceReportEvidenceConfidence;
  publicSafeUse: string;
  boundary: string;
}>;

export const SAMPLE_PRESENCE_REPORT_EVIDENCE_BOUNDARIES: readonly PresenceReportEvidenceBoundary[] = [
  {
    label: "Homepage clarity",
    confidence: "observed",
    publicSafeUse: "Use visible page language to explain whether the offer is easy to understand.",
    boundary: "Keep the conclusion directional until deeper review confirms the cause.",
  },
  {
    label: "Trust proof visibility",
    confidence: "inferred",
    publicSafeUse: "Use visible reviews, credentials, testimonials, photos, or policies to explain trust strength.",
    boundary: "Use only proof that is visible, verified, and approved.",
  },
  {
    label: "Competitor contrast",
    confidence: "needs-review",
    publicSafeUse: "Use competitor examples to show public clarity differences after human review.",
    boundary: "Keep comparisons specific, evidence-led, and category-aware.",
  },
] as const;
