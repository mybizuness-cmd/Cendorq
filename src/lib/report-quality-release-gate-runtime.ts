import { REPORT_QUALITY_DOMINATION_STANDARD, REPORT_QUALITY_NON_NEGOTIABLES, type ReportQualityDimension } from "./report-quality-domination-standard";
import type { OwnerReportTestSampleOutput } from "./owner-report-test-sample-output";

export type ReportQualityReleaseGateResult = {
  ok: boolean;
  status: "pass" | "blocked";
  evaluatedDimensions: readonly ReportQualityDimension[];
  missingDimensions: readonly ReportQualityDimension[];
  nonNegotiablesChecked: number;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
  rawPrivateEvidenceAllowed: false;
  blockedReasons: readonly string[];
};

const REQUIRED_DIMENSIONS: readonly ReportQualityDimension[] = [
  "visual-hierarchy",
  "truth-separation",
  "evidence-confidence",
  "plan-specific-value",
  "operator-trace",
  "customer-next-command",
  "limitation-clarity",
  "conversion-integrity",
  "executive-readability",
];

export function evaluateReportQualityReleaseGate(sample: OwnerReportTestSampleOutput): ReportQualityReleaseGateResult {
  const text = JSON.stringify(sample).toLowerCase();
  const evaluatedDimensions = REQUIRED_DIMENSIONS.filter((dimension) => hasDimensionSignal(dimension, text));
  const missingDimensions = REQUIRED_DIMENSIONS.filter((dimension) => !evaluatedDimensions.includes(dimension));
  const blockedReasons = [
    ...missingDimensions.map((dimension) => `missing-${dimension}`),
    ...unsafeReportTextReasons(text),
  ];

  return {
    ok: blockedReasons.length === 0,
    status: blockedReasons.length === 0 ? "pass" : "blocked",
    evaluatedDimensions,
    missingDimensions,
    nonNegotiablesChecked: REPORT_QUALITY_NON_NEGOTIABLES.length,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
    rawPrivateEvidenceAllowed: false,
    blockedReasons,
  };
}

export function getReportQualityReleaseGateDimensions() {
  return REPORT_QUALITY_DOMINATION_STANDARD.map((rule) => rule.dimension);
}

function hasDimensionSignal(dimension: ReportQualityDimension, text: string) {
  switch (dimension) {
    case "visual-hierarchy": return hasAny(text, ["visual", "card", "grid", "scorecard", "board"]);
    case "truth-separation": return hasAny(text, ["known", "inferred", "unknown", "public evidence", "what is known"]);
    case "evidence-confidence": return hasAny(text, ["proof", "confidence", "evidence", "known", "confirmation"]);
    case "plan-specific-value": return hasAny(text, ["free-scan", "deep-review", "build-fix", "ongoing-control", "plan"]);
    case "operator-trace": return hasAny(text, ["agent", "chief", "release-captain", "trace"]);
    case "customer-next-command": return hasAny(text, ["next command", "next action", "inspect", "improve", "monitor"]);
    case "limitation-clarity": return hasAny(text, ["limitation", "public evidence only", "still needs confirmation", "cannot know"]);
    case "conversion-integrity": return hasAny(text, ["next", "plan", "scope", "customer-safe"]);
    case "executive-readability": return hasAny(text, ["executive", "plain language", "business", "owner", "summary"]);
  }
}

function hasAny(text: string, fragments: readonly string[]) {
  return fragments.some((fragment) => text.includes(fragment));
}

function unsafeReportTextReasons(text: string) {
  const reasons: string[] = [];
  for (const phrase of ["guaranteed ranking", "guaranteed revenue", "guaranteed roi", "guaranteed ai placement", "guaranteed accuracy", "guaranteed security", "raw private", "password=", "secret=", "token="]) {
    if (text.includes(phrase)) reasons.push(`unsafe-phrase:${phrase}`);
  }
  return reasons;
}
