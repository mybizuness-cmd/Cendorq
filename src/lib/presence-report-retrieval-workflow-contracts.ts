import type { PresenceReportPackageSourceKind } from "@/lib/presence-report-customer-source-contracts";
import type { PresenceReportEvidenceKind } from "@/lib/presence-report-evidence-record-contracts";

export type PresenceReportRetrievalStage =
  | "entry-context"
  | "customer-identity"
  | "ownership-resolution"
  | "evidence-readiness"
  | "package-resolution"
  | "customer-safe-render";

export type PresenceReportRetrievalMode = "demo-fallback" | "customer-latest-free-scan" | "customer-released-report";

export type PresenceReportRetrievalContract = {
  readonly stage: PresenceReportRetrievalStage;
  readonly label: string;
  readonly customerSafePurpose: string;
  readonly requiredSignals: readonly string[];
  readonly allowedSources: readonly PresenceReportPackageSourceKind[];
  readonly evidenceInputs: readonly PresenceReportEvidenceKind[];
  readonly mustPassBeforeNextStage: readonly string[];
  readonly mustNotExpose: readonly string[];
};

export const PRESENCE_REPORT_RETRIEVAL_WORKFLOW_CONTRACTS: readonly PresenceReportRetrievalContract[] = [
  {
    stage: "entry-context",
    label: "Entry context",
    customerSafePurpose: "Determine whether the visitor is viewing a demo, returning to a Free Scan result, or opening a released paid report.",
    requiredSignals: ["requested report surface", "same-email access posture", "access-required or restart entry state"],
    allowedSources: ["demo", "customer-latest-free-scan", "customer-released-report"],
    evidenceInputs: ["submitted-business-context"],
    mustPassBeforeNextStage: ["no blank dashboard", "no stale localStorage draft restore", "no provider button exposure"],
    mustNotExpose: ["account existence internals", "raw intake payload", "private scoring internals"],
  },
  {
    stage: "customer-identity",
    label: "Customer identity",
    customerSafePurpose: "Confirm the viewer is the same customer who owns the scan or released report before resolving customer data.",
    requiredSignals: ["verified customer email", "same-account access gate", "server-derived customer session"],
    allowedSources: ["customer-latest-free-scan", "customer-released-report"],
    evidenceInputs: ["submitted-business-context"],
    mustPassBeforeNextStage: ["resolveCustomerAccessEligibility", "verified email matches owned record", "unknown customers route to Free Scan"],
    mustNotExpose: ["account existence internals", "provider callback internals", "session implementation details"],
  },
  {
    stage: "ownership-resolution",
    label: "Ownership resolution",
    customerSafePurpose: "Resolve the latest customer-owned Free Scan snapshot or approved paid report without falling into blank customer states.",
    requiredSignals: ["server-side scan ownership", "released report ownership for paid report", "paid entitlement for released report"],
    allowedSources: ["customer-latest-free-scan", "customer-released-report"],
    evidenceInputs: ["submitted-business-context", "visible-public-signal", "customer-proof-signal"],
    mustPassBeforeNextStage: ["ownership record exists", "record belongs to verified customer", "fallback reason is customer-safe if demo is used"],
    mustNotExpose: ["raw storage keys", "private entitlement internals", "draft report"],
  },
  {
    stage: "evidence-readiness",
    label: "Evidence readiness",
    customerSafePurpose: "Confirm evidence has the right review state and sensitivity before it can support a customer-facing finding.",
    requiredSignals: ["source label", "observation summary", "confidence label", "evidence boundary"],
    allowedSources: ["customer-latest-free-scan", "customer-released-report"],
    evidenceInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal", "operator-note"],
    mustPassBeforeNextStage: ["no internal-only evidence rendered", "comparison signal reviewed", "customer proof claim boundary set", "operator note converted before use"],
    mustNotExpose: ["raw scrape body", "unsupported competitor claim", "unverified customer claim", "operator notes"],
  },
  {
    stage: "package-resolution",
    label: "Package resolution",
    customerSafePurpose: "Convert approved customer-owned inputs into the shared Presence Report package shape consumed by protected report surfaces.",
    requiredSignals: ["Presence Report package source", "Business Truth Profile boundary", "Choice Gap", "Repair Queue", "Recommended Next Move"],
    allowedSources: ["demo", "customer-latest-free-scan", "customer-released-report"],
    evidenceInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal"],
    mustPassBeforeNextStage: ["package-source helper used", "no direct fixture import", "fallback reason attached when demo is used"],
    mustNotExpose: ["private scoring internals", "raw evidence", "draft report"],
  },
  {
    stage: "customer-safe-render",
    label: "Customer-safe render",
    customerSafePurpose: "Render only approved findings, proof summaries, limitations, confidence labels, and safe next actions to the protected dashboard or report vault.",
    requiredSignals: ["customer-safe phrasing", "proof summary", "limitation", "confidence label", "safe next action"],
    allowedSources: ["demo", "customer-latest-free-scan", "customer-released-report"],
    evidenceInputs: ["visible-public-signal", "comparison-signal", "customer-proof-signal"],
    mustPassBeforeNextStage: ["no ranking guarantee", "no revenue guarantee", "no AI placement guarantee", "next move tied to evidence"],
    mustNotExpose: ["private scoring internals", "raw evidence", "operator notes", "unsupported certainty"],
  },
] as const;

export function getPresenceReportRetrievalWorkflowContracts() {
  return PRESENCE_REPORT_RETRIEVAL_WORKFLOW_CONTRACTS;
}

export function getPresenceReportRetrievalWorkflowContract(stage: PresenceReportRetrievalStage) {
  return PRESENCE_REPORT_RETRIEVAL_WORKFLOW_CONTRACTS.find((contract) => contract.stage === stage) ?? PRESENCE_REPORT_RETRIEVAL_WORKFLOW_CONTRACTS[0];
}

export function getPresenceReportRetrievalMode(source: PresenceReportPackageSourceKind): PresenceReportRetrievalMode {
  if (source === "customer-released-report") return "customer-released-report";
  if (source === "customer-latest-free-scan") return "customer-latest-free-scan";
  return "demo-fallback";
}
