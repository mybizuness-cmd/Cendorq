export type BenchmarkEvidenceStatus = "draft" | "reviewed" | "approved" | "retired";

export type BenchmarkEvidenceSourceType =
  | "website"
  | "service-page"
  | "local-profile"
  | "review-pattern"
  | "visual-proof"
  | "policy-page"
  | "booking-path"
  | "authority-content";

export type BenchmarkEvidenceRequirement = {
  sourceType: BenchmarkEvidenceSourceType;
  requiredForApproval: boolean;
  reviewQuestion: string;
};

export type BenchmarkEvidenceReadiness = {
  status: BenchmarkEvidenceStatus;
  targetSourcesPerBenchmark: number;
  requiredMetadata: readonly string[];
  evidenceRequirements: readonly BenchmarkEvidenceRequirement[];
  approvalChecks: readonly string[];
  retirementChecks: readonly string[];
};

export const BENCHMARK_EVIDENCE_READINESS: BenchmarkEvidenceReadiness = {
  status: "draft",
  targetSourcesPerBenchmark: 5,
  requiredMetadata: ["category", "business name", "source reference", "review date", "review owner", "approval status", "staleness status"],
  evidenceRequirements: [
    {
      sourceType: "website",
      requiredForApproval: true,
      reviewQuestion: "Does the business clearly explain who it helps, what it offers, and what action to take next?",
    },
    {
      sourceType: "service-page",
      requiredForApproval: true,
      reviewQuestion: "Does the business show clear offer structure, service details, and customer value?",
    },
    {
      sourceType: "review-pattern",
      requiredForApproval: true,
      reviewQuestion: "Does the available review pattern support trust, consistency, and customer confidence?",
    },
    {
      sourceType: "booking-path",
      requiredForApproval: true,
      reviewQuestion: "Is the contact, booking, purchase, or consultation path clear and low-friction?",
    },
    {
      sourceType: "authority-content",
      requiredForApproval: false,
      reviewQuestion: "Does the business show extra authority, education, proof, case material, or category leadership?",
    },
  ],
  approvalChecks: ["source evidence present", "category fit confirmed", "strong-business signal confirmed", "customer path reviewed", "private notes separated"],
  retirementChecks: ["stale source", "weakened trust signal", "category mismatch", "unavailable evidence", "better benchmark replacement available"],
};

export function getBenchmarkEvidenceReadiness() {
  return BENCHMARK_EVIDENCE_READINESS;
}
