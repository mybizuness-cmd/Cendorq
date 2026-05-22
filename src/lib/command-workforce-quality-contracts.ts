export const COMMAND_WORKFORCE_OPERATING_MODEL = {
  id: "command-workforce-operating-model",
  purpose: "Coordinate owner direction, release-captain execution, chief-lane review, scoped scouting, validation, and handoff memory for category-owning work.",
  hierarchy: [
    "owner-command",
    "release-captain",
    "chief-lanes",
    "scoped-scouts",
    "validators",
    "handoff-memory",
  ],
  chiefLanes: [
    "report-truth",
    "customer-command-experience",
    "visual-command",
    "security-and-command",
    "market-forecast",
  ],
  scoutLanes: [
    "report-truth-scout",
    "evidence-conflict-scout",
    "industry-context-scout",
    "visual-hierarchy-scout",
    "report-design-quality-scout",
    "mobile-command-clarity-scout",
    "customer-journey-scout",
    "validation-drift-scout",
    "operator-command-scout",
    "analytics-and-growth-scout",
    "business-change-forecasting-scout",
  ],
  requiredFindingFields: [
    "findingId",
    "lane",
    "claim",
    "evidenceBasis",
    "riskLevel",
    "customerImpact",
    "categoryImpact",
    "filesOrRoutesAffected",
    "recommendedAction",
    "validatorNeeded",
    "confidence",
    "releaseCaptainDecision",
  ],
  batchRule: "Use bigger batches when changes form one coherent operating layer and can be validated together.",
} as const;

export const VISUAL_COMMAND_QUALITY_STANDARD = {
  id: "visual-command-quality-standard",
  purpose: "Make every important surface feel controlled, premium, clear, useful, and serious within seconds.",
  coreQuestion: "What is the safest next command?",
  requiredQualities: [
    "premium-restraint",
    "strong-hierarchy",
    "immediate-scannability",
    "clear-proof-sequence",
    "one-dominant-next-action",
    "mobile-clarity",
    "serious-business-tone",
    "report-readability",
    "dashboard-command-clarity",
    "clean-visual-focus",
  ],
  surfaceReviews: [
    "public-buyer-path",
    "report-score-finding-proof-limit-next-move-repair-priority",
    "dashboard-state-next-action-report-access-support-billing-control",
    "mobile-main-action-readable-cards-spacing",
  ],
} as const;

export function getCommandWorkforceOperatingModel() {
  return COMMAND_WORKFORCE_OPERATING_MODEL;
}

export function getVisualCommandQualityStandard() {
  return VISUAL_COMMAND_QUALITY_STANDARD;
}
