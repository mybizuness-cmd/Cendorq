import type { OwnerReportTestPlanKey } from "./owner-report-test-mode-standard";

export type OwnerReportPreviewSectionKey =
  | "cover"
  | "executive-summary"
  | "signal"
  | "proof"
  | "risk"
  | "limit"
  | "next-command"
  | "visual-system"
  | "operator-trace"
  | "chief-review"
  | "release-captain-gate";

export type OwnerReportPreviewBlueprint = {
  planKey: OwnerReportTestPlanKey;
  title: string;
  previewWatermark: "OWNER TEST MODE - NOT CUSTOMER DELIVERY";
  visualStandard: readonly string[];
  requiredSections: readonly OwnerReportPreviewSectionKey[];
  operatorTrace: readonly string[];
  chiefCaptainReview: readonly string[];
  blockedFromPreview: readonly string[];
};

const SHARED_SECTIONS: readonly OwnerReportPreviewSectionKey[] = [
  "cover",
  "executive-summary",
  "signal",
  "proof",
  "risk",
  "limit",
  "next-command",
  "visual-system",
  "operator-trace",
  "chief-review",
  "release-captain-gate",
];

export const OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS = [
  {
    planKey: "free-scan",
    title: "Owner Test Free Scan Preview",
    previewWatermark: "OWNER TEST MODE - NOT CUSTOMER DELIVERY",
    visualStandard: ["fast signal card", "readiness meter", "top three hesitation points", "protected next step panel"],
    requiredSections: SHARED_SECTIONS,
    operatorTrace: ["public surface captured", "signal class labeled", "confidence labeled", "paid-plan boundary checked"],
    chiefCaptainReview: ["first-signal usefulness", "no paid-review leakage", "support/correction path", "blocked claim scan"],
    blockedFromPreview: ["customer email send", "paid entitlement creation", "full report release", "raw evidence dump"],
  },
  {
    planKey: "deep-review",
    title: "Owner Test Deep Review Preview",
    previewWatermark: "OWNER TEST MODE - NOT CUSTOMER DELIVERY",
    visualStandard: ["premium report cover", "visibility scorecard", "priority heat map", "evidence and confidence grid", "next-command board"],
    requiredSections: SHARED_SECTIONS,
    operatorTrace: ["agent mission summary", "evidence classes", "inference boundaries", "review priority rationale"],
    chiefCaptainReview: ["truth separation", "customer-safe wording", "plan-fit logic", "release readiness"],
    blockedFromPreview: ["customer delivery email", "dashboard release", "checkout requirement", "unsupported certainty"],
  },
  {
    planKey: "build-fix",
    title: "Owner Test Build Fix Preview",
    previewWatermark: "OWNER TEST MODE - NOT CUSTOMER DELIVERY",
    visualStandard: ["scope card", "before-after storyboard", "work checklist", "remaining-risk map", "approval path"],
    requiredSections: SHARED_SECTIONS,
    operatorTrace: ["approved target placeholder", "scope boundary", "implementation risk", "approval dependency"],
    chiefCaptainReview: ["scope discipline", "no unlimited work claim", "safe customer summary", "remaining risk clarity"],
    blockedFromPreview: ["production mutation", "provider change", "customer access request", "unapproved implementation"],
  },
  {
    planKey: "ongoing-control",
    title: "Owner Test Ongoing Control Preview",
    previewWatermark: "OWNER TEST MODE - NOT CUSTOMER DELIVERY",
    visualStandard: ["monthly command cover", "change cards", "trend posture", "watchlist", "next-month priority"],
    requiredSections: SHARED_SECTIONS,
    operatorTrace: ["monitoring scope", "monthly posture", "change rationale", "escalation logic"],
    chiefCaptainReview: ["recurring value", "algorithm-control claim check", "support path", "monthly priority quality"],
    blockedFromPreview: ["unbounded monitoring", "algorithm control claim", "ad management claim", "cross-customer private comparison"],
  },
] as const satisfies readonly OwnerReportPreviewBlueprint[];

export const OWNER_REPORT_TEST_PREVIEW_STANDARD = [
  "Every owner test preview must render the same top-level structure across Free Scan, Deep Review, Build Fix, and Ongoing Control.",
  "Every owner test preview must include a visible owner-test watermark and must not be usable as customer delivery.",
  "Every owner test preview must show visual hierarchy, evidence class, confidence, limitations, next command, and plan boundary.",
  "Every owner test preview must show operator trace, chief review posture, and release-captain gate posture.",
  "Every owner test preview must block checkout, customer email, entitlement creation, billing mutation, and production mutation.",
] as const;

export function getOwnerReportTestPreviewBlueprint(planKey: OwnerReportTestPlanKey) {
  return OWNER_REPORT_TEST_PREVIEW_BLUEPRINTS.find((blueprint) => blueprint.planKey === planKey);
}
