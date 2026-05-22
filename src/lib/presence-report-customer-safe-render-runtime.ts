import type { GeneratedPresenceReportPackage } from "@/lib/presence-report-generation-adapter";
import type { PresenceReportPackageSourceResolution } from "@/lib/presence-report-package-source";
import type { PresenceReportEvidenceReadinessResolution } from "@/lib/presence-report-evidence-readiness-runtime";

export type PresenceReportCustomerSafeRenderInput = Readonly<{
  packageResolution: PresenceReportPackageSourceResolution;
  evidenceReadiness: readonly PresenceReportEvidenceReadinessResolution[];
  surface: "protected-free-scan" | "report-vault" | "customer-dashboard";
  requestedAction: "preview" | "read-report" | "open-next-move";
}>;

export type PresenceReportCustomerSafeRenderState = "render-ready" | "render-demo-fallback" | "render-blocked";

export type PresenceReportCustomerSafeRenderResolution = Readonly<{
  state: PresenceReportCustomerSafeRenderState;
  surface: PresenceReportCustomerSafeRenderInput["surface"];
  requestedAction: PresenceReportCustomerSafeRenderInput["requestedAction"];
  package: GeneratedPresenceReportPackage | null;
  customerSafeNotice: string;
  allowedSections: readonly string[];
  blockedSections: readonly string[];
  nextGate: string;
  evidenceSummary: Readonly<{
    customerReady: number;
    needsReview: number;
    blocked: number;
  }>;
}>;

const CORE_ALLOWED_SECTIONS = ["Presence Score", "Pillars", "Choice Gap", "Repair Queue", "Control Snapshot", "Recommended Next Move"] as const;
const BLOCKED_SECTIONS = ["Raw Evidence", "Internal Notes", "Private Scoring", "Draft Findings"] as const;

export function resolvePresenceReportCustomerSafeRender(input: PresenceReportCustomerSafeRenderInput): PresenceReportCustomerSafeRenderResolution {
  const evidenceSummary = summarizeEvidence(input.evidenceReadiness);

  if (input.packageResolution.resolvedSource === "demo") {
    return {
      state: "render-demo-fallback",
      surface: input.surface,
      requestedAction: input.requestedAction,
      package: input.packageResolution.package,
      customerSafeNotice: input.packageResolution.fallbackReason ?? "Showing the demo Presence Report package until customer-owned report data is ready.",
      allowedSections: CORE_ALLOWED_SECTIONS,
      blockedSections: BLOCKED_SECTIONS,
      nextGate: input.packageResolution.blockedGates[0] ?? "customer-safe-render",
      evidenceSummary,
    } as const;
  }

  if (evidenceSummary.blocked > 0) {
    return blockedRender(input, evidenceSummary, "approval-gate", "Some evidence is blocked from customer rendering. Keep the report from rendering until the approval gate clears or removes it.");
  }

  if (evidenceSummary.needsReview > 0) {
    return blockedRender(input, evidenceSummary, "evidence-readiness", "Some evidence still needs review. Show a safe holding state instead of rendering customer-facing findings.");
  }

  if (evidenceSummary.customerReady === 0) {
    return blockedRender(input, evidenceSummary, "evidence-readiness", "No customer-ready evidence is available yet. Keep the report gated until proof summaries, limitations, and confidence labels are ready.");
  }

  return {
    state: "render-ready",
    surface: input.surface,
    requestedAction: input.requestedAction,
    package: input.packageResolution.package,
    customerSafeNotice: "This Presence Report is ready to render with customer-safe summaries, limitations, confidence labels, and next actions.",
    allowedSections: CORE_ALLOWED_SECTIONS,
    blockedSections: BLOCKED_SECTIONS,
    nextGate: "customer-safe-render",
    evidenceSummary,
  } as const;
}

function blockedRender(input: PresenceReportCustomerSafeRenderInput, evidenceSummary: PresenceReportCustomerSafeRenderResolution["evidenceSummary"], nextGate: string, customerSafeNotice: string): PresenceReportCustomerSafeRenderResolution {
  return {
    state: "render-blocked",
    surface: input.surface,
    requestedAction: input.requestedAction,
    package: null,
    customerSafeNotice,
    allowedSections: [],
    blockedSections: BLOCKED_SECTIONS,
    nextGate,
    evidenceSummary,
  } as const;
}

function summarizeEvidence(evidenceReadiness: readonly PresenceReportEvidenceReadinessResolution[]) {
  return {
    customerReady: evidenceReadiness.filter((item) => item.state === "customer-ready").length,
    needsReview: evidenceReadiness.filter((item) => item.state === "needs-review").length,
    blocked: evidenceReadiness.filter((item) => item.state === "blocked").length,
  } as const;
}
