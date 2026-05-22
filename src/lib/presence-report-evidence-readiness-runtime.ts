import {
  getPresenceReportEvidenceRecordContract,
  type PresenceReportEvidenceKind,
  type PresenceReportEvidenceReviewState,
  type PresenceReportEvidenceSensitivity,
} from "@/lib/presence-report-evidence-record-contracts";

export type PresenceReportEvidenceReadinessInput = Readonly<{
  kind: PresenceReportEvidenceKind;
  reviewState: PresenceReportEvidenceReviewState;
  sensitivity: PresenceReportEvidenceSensitivity;
  providedSignals: readonly string[];
  customerSafeSummary: string | null;
  confidenceLabel: string | null;
  limitation: string | null;
}>;

export type PresenceReportEvidenceReadinessState = "customer-ready" | "needs-review" | "blocked";

export type PresenceReportEvidenceReadinessResolution = Readonly<{
  kind: PresenceReportEvidenceKind;
  label: string;
  state: PresenceReportEvidenceReadinessState;
  mayFeed: readonly string[];
  customerSafeSummary: string | null;
  confidenceLabel: string | null;
  limitation: string | null;
  missingSignals: readonly string[];
  blockedReasons: readonly string[];
  nextGate: string;
}>;

export function resolvePresenceReportEvidenceReadiness(input: PresenceReportEvidenceReadinessInput): PresenceReportEvidenceReadinessResolution {
  const contract = getPresenceReportEvidenceRecordContract(input.kind);
  const provided = new Set(input.providedSignals.map((signal) => signal.trim()).filter(Boolean));
  const missingSignals = contract.requiredBeforeCustomerUse.filter((signal) => !provided.has(signal));
  const blockedReasons = getBlockedReasons(input, missingSignals);
  const state = getReadinessState(input, missingSignals, blockedReasons);

  return {
    kind: input.kind,
    label: contract.label,
    state,
    mayFeed: state === "customer-ready" ? contract.mayFeed : [],
    customerSafeSummary: state === "customer-ready" ? input.customerSafeSummary : null,
    confidenceLabel: state === "customer-ready" ? input.confidenceLabel : null,
    limitation: state === "customer-ready" ? input.limitation : null,
    missingSignals,
    blockedReasons,
    nextGate: getNextGate(state, missingSignals, blockedReasons),
  } as const;
}

export function resolvePresenceReportEvidenceReadinessBatch(inputs: readonly PresenceReportEvidenceReadinessInput[]) {
  const resolutions = inputs.map(resolvePresenceReportEvidenceReadiness);
  return {
    resolutions,
    customerReady: resolutions.filter((item) => item.state === "customer-ready"),
    needsReview: resolutions.filter((item) => item.state === "needs-review"),
    blocked: resolutions.filter((item) => item.state === "blocked"),
  } as const;
}

function getReadinessState(input: PresenceReportEvidenceReadinessInput, missingSignals: readonly string[], blockedReasons: readonly string[]): PresenceReportEvidenceReadinessState {
  if (blockedReasons.length) return "blocked";
  if (input.reviewState === "approved-for-customer-report" && input.sensitivity === "customer-safe" && !missingSignals.length && input.customerSafeSummary && input.confidenceLabel && input.limitation) return "customer-ready";
  return "needs-review";
}

function getBlockedReasons(input: PresenceReportEvidenceReadinessInput, missingSignals: readonly string[]) {
  const reasons: string[] = [];
  if (input.reviewState === "blocked-from-customer-report") reasons.push("review state blocks customer report use");
  if (input.sensitivity === "internal-only") reasons.push("internal-only sensitivity blocks customer rendering");
  if (!input.customerSafeSummary) reasons.push("customer-safe summary missing");
  if (!input.confidenceLabel) reasons.push("confidence label missing");
  if (!input.limitation) reasons.push("limitation missing");
  if (missingSignals.includes("customer-safe rewrite")) reasons.push("customer-safe rewrite missing");
  return reasons;
}

function getNextGate(state: PresenceReportEvidenceReadinessState, missingSignals: readonly string[], blockedReasons: readonly string[]) {
  if (state === "customer-ready") return "package-resolution";
  if (blockedReasons.length) return "approval-gate";
  if (missingSignals.length) return missingSignals[0];
  return "evidence-readiness";
}
