export const VISUAL_COMMAND_DEVICE_WIDTHS = [390, 430, 768, 1024, 1440] as const;

export type VisualCommandDeviceWidth = (typeof VISUAL_COMMAND_DEVICE_WIDTHS)[number];

export type VisualCommandReviewSurfaceKey =
  | "homepage"
  | "plans"
  | "faq"
  | "protected-free-scan-report"
  | "dashboard-presence-snapshot";

export type VisualCommandReviewTarget = {
  readonly key: VisualCommandReviewSurfaceKey;
  readonly label: string;
  readonly path: string;
  readonly source: string;
  readonly requiredWidths: readonly VisualCommandDeviceWidth[];
  readonly captureBands: readonly string[];
  readonly dominantCommand: string;
  readonly proofBeforePressureCheck: string;
  readonly nonRegressionChecks: readonly string[];
  readonly liveReviewDecisionRequired: readonly string[];
};

export const VISUAL_COMMAND_DEVICE_REVIEW_TARGETS: readonly VisualCommandReviewTarget[] = [
  {
    key: "homepage",
    label: "Homepage",
    path: "/",
    source: "src/app/page.tsx",
    requiredWidths: VISUAL_COMMAND_DEVICE_WIDTHS,
    captureBands: ["hero and first command", "primary CTA stack", "Presence Report preview", "Scan Review Repair Control path", "footer or support path"],
    dominantCommand: "Run Free Scan remains the clearest first command.",
    proofBeforePressureCheck: "FAQ and Plans remain secondary evidence-led paths after Free Scan.",
    nonRegressionChecks: [
      "AI Search Presence Repair remains the category frame.",
      "Presence Report preview supports the hero without crowding it.",
      "Mobile buttons stack cleanly without equal primary competition.",
    ],
    liveReviewDecisionRequired: ["confirm hero stack", "confirm preview readability", "confirm CTA hierarchy"],
  },
  {
    key: "plans",
    label: "Plans",
    path: "/plans",
    source: "src/app/plans/page.tsx",
    requiredWidths: VISUAL_COMMAND_DEVICE_WIDTHS,
    captureBands: ["hero decision frame", "plan cards", "Presence Report preview", "plan separation standard", "support path"],
    dominantCommand: "Free Scan remains the safest starting command when the buyer is unsure.",
    proofBeforePressureCheck: "FAQ and Free Scan remain available before paid pressure.",
    nonRegressionChecks: [
      "Scan Review Repair Control stay visually separated.",
      "Paid plan CTAs do not all compete as equal first actions on mobile.",
      "No ranking, lead, revenue, or AI placement guarantee language remains visible.",
    ],
    liveReviewDecisionRequired: ["confirm plan-card loudness", "confirm Free Scan priority", "confirm no-guarantee visibility"],
  },
  {
    key: "faq",
    label: "FAQ",
    path: "/faq",
    source: "src/app/faq/page.tsx",
    requiredWidths: VISUAL_COMMAND_DEVICE_WIDTHS,
    captureBands: ["hero rule", "core questions", "answer cards", "privacy guarantee access answers", "contact path"],
    dominantCommand: "Run Free Scan remains the first action after answers are clear.",
    proofBeforePressureCheck: "FAQ explains AI Search Presence Repair, Decision Gap, Repair Queue, and boundaries before plan pressure.",
    nonRegressionChecks: [
      "Customer access and same-email recovery remain clear.",
      "Guarantees, privacy, account access, and support answers stay easy to find.",
      "Answer cards have comfortable mobile tap targets.",
    ],
    liveReviewDecisionRequired: ["confirm answer-card wrapping", "confirm tap target spacing", "confirm high-risk answer visibility"],
  },
  {
    key: "protected-free-scan-report",
    label: "Protected Free Scan Presence Report",
    path: "/dashboard/reports/free-scan",
    source: "src/app/dashboard/reports/free-scan/page.tsx",
    requiredWidths: VISUAL_COMMAND_DEVICE_WIDTHS,
    captureBands: ["hero and report-first CTA", "protected report preview", "Proof before paid pressure section", "market signal cards", "methodology summary"],
    dominantCommand: "Read Free Scan report first remains the dominant mobile hero action.",
    proofBeforePressureCheck: "The protected report preview appears before the paid Review CTA and proof-before-paid-pressure section.",
    nonRegressionChecks: [
      "First signal only remains visible.",
      "Complete diagnosis stays out of the Free Scan layer.",
      "Paid Review appears only after proof framing.",
    ],
    liveReviewDecisionRequired: ["confirm report-first dominance", "confirm paid CTA does not overpower proof", "confirm methodology readability"],
  },
  {
    key: "dashboard-presence-snapshot",
    label: "Dashboard Presence Command Snapshot",
    path: "/dashboard",
    source: "src/app/dashboard/dashboard-presence-command-snapshot.tsx",
    requiredWidths: VISUAL_COMMAND_DEVICE_WIDTHS,
    captureBands: ["presence score", "next move", "five pillars", "Decision Gap", "Repair Queue", "Control Snapshot"],
    dominantCommand: "Open Free Scan result remains the clear dashboard next action.",
    proofBeforePressureCheck: "Dashboard state, next move, repair, and control remain separated before any paid pressure.",
    nonRegressionChecks: [
      "Current state is obvious.",
      "Decision Gap, Repair Queue, and Control Snapshot remain distinct.",
      "Tablet-width pillar cards remain readable.",
    ],
    liveReviewDecisionRequired: ["confirm tablet pillar readability", "confirm next-action visibility", "confirm repair/control separation"],
  },
] as const;

export function getVisualCommandDeviceReviewTargets() {
  return VISUAL_COMMAND_DEVICE_REVIEW_TARGETS;
}

export function getVisualCommandDeviceReviewWidths() {
  return VISUAL_COMMAND_DEVICE_WIDTHS;
}
