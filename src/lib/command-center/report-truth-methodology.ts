export type ReportTruthReadinessStatus = "draft" | "reviewed" | "approved" | "retired";

export type ReportTruthMethodology = {
  status: ReportTruthReadinessStatus;
  methodLabel: string;
  scorePrinciples: readonly string[];
  requiredEvidenceLinks: readonly string[];
  optimizationProofChecks: readonly string[];
  customerOutputGates: readonly string[];
  monthlyControlChecks: readonly string[];
};

export const REPORT_TRUTH_METHODOLOGY: ReportTruthMethodology = {
  status: "draft",
  methodLabel: "Cendorq Trust Clarity Methodology",
  scorePrinciples: [
    "clarity must be observable",
    "trust must be supported by evidence",
    "conversion path must be reviewable",
    "recommendations must map to a business problem or opportunity",
    "customer-facing language must stay plain and useful",
  ],
  requiredEvidenceLinks: [
    "business identity source",
    "website or page observation",
    "offer or service evidence",
    "trust or proof signal",
    "customer path observation",
    "recommendation rationale",
  ],
  optimizationProofChecks: [
    "problem identified",
    "evidence linked",
    "recommendation matched to plan scope",
    "expected customer impact stated",
    "unsupported claim blocked",
    "operator review completed",
  ],
  customerOutputGates: [
    "truth review",
    "evidence review",
    "methodology review",
    "customer-safe language review",
    "delivery approval",
  ],
  monthlyControlChecks: [
    "previous recommendation reviewed",
    "progress evidence captured",
    "new risk identified",
    "next action backed by evidence",
    "customer update approved",
  ],
};

export function getReportTruthMethodology() {
  return REPORT_TRUTH_METHODOLOGY;
}
