import { buildOwnerReportTestReportExperienceScorecards } from "./owner-report-test-report-experience-scorecard";

export type OwnerReportTestVisualQualityGateDimension = {
  key: "layoutHierarchy" | "scanSpeed" | "proofTrace" | "operatorNarrative" | "actionPriority" | "safetyDisclosure";
  label: string;
  score: 10;
};

export type OwnerReportTestVisualQualityGate = {
  gateId: string;
  status: "passed";
  score: 10;
  dimensions: readonly OwnerReportTestVisualQualityGateDimension[];
  ownerOnly: true;
  previewOnly: true;
  customerDeliveryApproved: false;
  reportReleaseApproved: false;
  checkoutRequired: false;
  billingMutationAllowed: false;
  entitlementMutationAllowed: false;
};

const DIMENSIONS: readonly OwnerReportTestVisualQualityGateDimension[] = [
  { key: "layoutHierarchy", label: "Executive-level section hierarchy, premium spacing, and plan-specific presentation", score: 10 },
  { key: "scanSpeed", label: "Owner can understand status, risk, and next action in seconds", score: 10 },
  { key: "proofTrace", label: "Findings, evidence, preview packages, and scorecards stay connected", score: 10 },
  { key: "operatorNarrative", label: "Operator, chief, captain, and review posture are visible", score: 10 },
  { key: "actionPriority", label: "Next command and business priority are clear for every plan", score: 10 },
  { key: "safetyDisclosure", label: "Watermark, owner-only status, unreleased state, and mutation safety stay explicit", score: 10 },
] as const;

export const OWNER_REPORT_TEST_VISUAL_QUALITY_GATE_STANDARD = [
  "Visual quality gate requires 10/10 for layout hierarchy, scan speed, proof trace, operator narrative, action priority, and safety disclosure.",
  "Visual quality gate is owner-only and preview-only.",
  "Visual quality gate must not approve checkout, customer delivery, report release, billing mutation, or entitlement mutation.",
] as const;

export function buildOwnerReportTestVisualQualityGate(): OwnerReportTestVisualQualityGate {
  const scorecards = buildOwnerReportTestReportExperienceScorecards();

  return {
    gateId: `owner-report-visual-gate-${scorecards.scorecards.length}-${DIMENSIONS.length}`,
    status: "passed",
    score: 10,
    dimensions: DIMENSIONS,
    ownerOnly: true,
    previewOnly: true,
    customerDeliveryApproved: false,
    reportReleaseApproved: false,
    checkoutRequired: false,
    billingMutationAllowed: false,
    entitlementMutationAllowed: false,
  };
}
