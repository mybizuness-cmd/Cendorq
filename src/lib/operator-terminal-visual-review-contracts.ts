export type OperatorTerminalVisualReviewViewportId = "mobile-390" | "mobile-430" | "tablet-768" | "desktop-1024" | "desktop-1440";

export type OperatorTerminalVisualReviewPanelId =
  | "hero-boundary"
  | "access-safety"
  | "server-access-gate"
  | "production-entry-guard"
  | "release-lanes"
  | "packet-runtime"
  | "approval-gate";

export type OperatorTerminalVisualReviewCheckId =
  | "sample-banner-before-packet-work"
  | "disabled-actions-readable"
  | "server-gate-before-release-lanes"
  | "production-entry-before-execution-content"
  | "release-and-provider-controls-inactive"
  | "packet-count-labels-readable"
  | "approval-copy-customer-safe-only"
  | "internal-only-terminal-copy";

export type OperatorTerminalVisualReviewViewport = Readonly<{
  id: OperatorTerminalVisualReviewViewportId;
  label: string;
  widthPx: 390 | 430 | 768 | 1024 | 1440;
  reviewFocus: string;
}>;

export type OperatorTerminalVisualReviewPanel = Readonly<{
  id: OperatorTerminalVisualReviewPanelId;
  label: string;
  requiredBeforeProduction: true;
  safetyPurpose: string;
}>;

export type OperatorTerminalVisualReviewCheck = Readonly<{
  id: OperatorTerminalVisualReviewCheckId;
  label: string;
  passCriterion: string;
}>;

export type OperatorTerminalVisualReviewResolution = Readonly<{
  productionEntryGate: "visual-review";
  status: "review-required";
  reviewComplete: false;
  requiredViewports: readonly OperatorTerminalVisualReviewViewport[];
  requiredPanels: readonly OperatorTerminalVisualReviewPanel[];
  requiredChecks: readonly OperatorTerminalVisualReviewCheck[];
  blockedUntil: string;
  allowedBeforeReview: readonly string[];
  forbiddenBeforeReview: readonly string[];
}>;

export const OPERATOR_TERMINAL_VISUAL_REVIEW_VIEWPORTS: readonly OperatorTerminalVisualReviewViewport[] = [
  {
    id: "mobile-390",
    label: "Mobile 390",
    widthPx: 390,
    reviewFocus: "Confirm the safety banner, gate states, packet counts, and approval copy remain readable in the narrowest supported operator review width.",
  },
  {
    id: "mobile-430",
    label: "Mobile 430",
    widthPx: 430,
    reviewFocus: "Confirm the large-mobile stack keeps internal-only safety copy before packet work and preserves readable disabled actions.",
  },
  {
    id: "tablet-768",
    label: "Tablet 768",
    widthPx: 768,
    reviewFocus: "Confirm two-column sections collapse safely and production-entry hold copy appears before release-oriented lanes.",
  },
  {
    id: "desktop-1024",
    label: "Desktop 1024",
    widthPx: 1024,
    reviewFocus: "Confirm route hierarchy keeps server access, production-entry hold, and visual review requirements above execution-oriented content.",
  },
  {
    id: "desktop-1440",
    label: "Desktop 1440",
    widthPx: 1440,
    reviewFocus: "Confirm the full command surface stays bounded, readable, and clearly internal without active release or provider controls.",
  },
] as const;

export const OPERATOR_TERMINAL_VISUAL_REVIEW_PANELS: readonly OperatorTerminalVisualReviewPanel[] = [
  {
    id: "hero-boundary",
    label: "Hero boundary",
    requiredBeforeProduction: true,
    safetyPurpose: "The first screen must frame the route as an internal operator terminal and repeat the no-raw-evidence release doctrine.",
  },
  {
    id: "access-safety",
    label: "Access safety",
    requiredBeforeProduction: true,
    safetyPurpose: "The sample-only banner and disabled actions must appear before packet work begins.",
  },
  {
    id: "server-access-gate",
    label: "Server access gate",
    requiredBeforeProduction: true,
    safetyPurpose: "Server-owned identity, session, and internal-boundary state must be visible before release lanes.",
  },
  {
    id: "production-entry-guard",
    label: "Production entry guard",
    requiredBeforeProduction: true,
    safetyPurpose: "Production entry must stay held until identity, route, role, packet, audit, release-log, rollback, and visual review gates are complete.",
  },
  {
    id: "release-lanes",
    label: "Release lanes",
    requiredBeforeProduction: true,
    safetyPurpose: "Release-lane copy must remain planning-oriented and must not present execution or provider controls as active.",
  },
  {
    id: "packet-runtime",
    label: "Packet runtime",
    requiredBeforeProduction: true,
    safetyPurpose: "Packet status counts must remain labeled as ready, review, and blocked so operators do not confuse sample readiness with production release.",
  },
  {
    id: "approval-gate",
    label: "Approval gate",
    requiredBeforeProduction: true,
    safetyPurpose: "Approval copy must remain bounded to reviewed customer-safe output and keep unsupported evidence out of release paths.",
  },
] as const;

export const OPERATOR_TERMINAL_VISUAL_REVIEW_CHECKS: readonly OperatorTerminalVisualReviewCheck[] = [
  {
    id: "sample-banner-before-packet-work",
    label: "Sample banner before packet work",
    passCriterion: "The sample-only safety banner appears before command queue or packet runtime content at every required viewport.",
  },
  {
    id: "disabled-actions-readable",
    label: "Disabled actions readable",
    passCriterion: "Disabled release, provider, live-record, publication, and notification actions stay readable without cramped wrapping.",
  },
  {
    id: "server-gate-before-release-lanes",
    label: "Server gate before release lanes",
    passCriterion: "Server access state appears before release lanes and shows release execution plus provider access as disabled.",
  },
  {
    id: "production-entry-before-execution-content",
    label: "Production entry before execution content",
    passCriterion: "Production-entry hold state appears before execution-oriented content and keeps every missing gate visible.",
  },
  {
    id: "release-and-provider-controls-inactive",
    label: "Release and provider controls inactive",
    passCriterion: "The route does not show active release execution, provider controls, customer record mutation, or approval notification controls.",
  },
  {
    id: "packet-count-labels-readable",
    label: "Packet count labels readable",
    passCriterion: "Packet readiness counts remain labeled as ready, review, and blocked across every required viewport.",
  },
  {
    id: "approval-copy-customer-safe-only",
    label: "Approval copy customer-safe only",
    passCriterion: "Approval gate copy stays limited to reviewed customer-safe output and never exposes raw evidence or operator notes.",
  },
  {
    id: "internal-only-terminal-copy",
    label: "Internal-only terminal copy",
    passCriterion: "Terminal copy stays internal-only and never presents the operator terminal as a customer surface.",
  },
] as const;

export function resolveOperatorTerminalVisualReviewContracts(): OperatorTerminalVisualReviewResolution {
  return {
    productionEntryGate: "visual-review",
    status: "review-required",
    reviewComplete: false,
    requiredViewports: OPERATOR_TERMINAL_VISUAL_REVIEW_VIEWPORTS,
    requiredPanels: OPERATOR_TERMINAL_VISUAL_REVIEW_PANELS,
    requiredChecks: OPERATOR_TERMINAL_VISUAL_REVIEW_CHECKS,
    blockedUntil: "Visual review is captured for mobile-390, mobile-430, tablet-768, desktop-1024, and desktop-1440 with every safety panel and copy boundary passing.",
    allowedBeforeReview: [
      "review static visual requirements",
      "prepare viewport capture checklist",
      "inspect sample-only route hierarchy",
      "document required fixes before production entry",
    ],
    forbiddenBeforeReview: [
      "treat the terminal as production ready",
      "activate release execution",
      "open provider controls",
      "load live customer records",
      "send approval notifications",
    ],
  } as const;
}
