export type DashboardProtectedSuiteKey = "reports" | "billing" | "notifications" | "support";

export type DashboardProtectedSuiteContract = {
  readonly key: DashboardProtectedSuiteKey;
  readonly label: string;
  readonly path: string;
  readonly purpose: string;
  readonly primaryCustomerQuestion: string;
  readonly safestNextAction: string;
  readonly mustShow: readonly string[];
  readonly mustNotShow: readonly string[];
};

export const DASHBOARD_PROTECTED_SUITE_CONTRACTS: readonly DashboardProtectedSuiteContract[] = [
  {
    key: "reports",
    label: "Presence Reports",
    path: "/dashboard/reports",
    purpose: "Keep AI Visibility signals, approved report outputs, proof boundaries, paid report delivery state, and next-command guidance in one protected vault.",
    primaryCustomerQuestion: "What proof is ready, what is still limited, and what should I do next?",
    safestNextAction: "Open the approved report or return to the dashboard before choosing a deeper plan.",
    mustShow: ["AI Visibility proof vault", "Nothing final until it is approved.", "Scan", "Review", "Repair", "Control", "AI/Search posture"],
    mustNotShow: ["raw evidence", "ranking guarantee", "AI placement guarantee", "pending report as final"],
  },
  {
    key: "billing",
    label: "Plan Depth",
    path: "/dashboard/billing",
    purpose: "Show current access, safe payment recovery, plan depth, activation boundaries, and checkout continuity without exposing private payment details.",
    primaryCustomerQuestion: "What is active, what unlocked, and what depth should I choose next?",
    safestNextAction: "Compare plan depth or open the next plan page before payment.",
    mustShow: ["AI Visibility plan depth", "Current access", "Next depth", "Safety", "Review", "Repair", "Control"],
    mustNotShow: ["card data", "raw provider payload", "fake urgency", "guaranteed outcomes"],
  },
  {
    key: "notifications",
    label: "Signal Feed",
    path: "/dashboard/notifications",
    purpose: "Keep proof, access, support, account, and security actions quiet until a safe customer action is needed.",
    primaryCustomerQuestion: "What needs attention now, and where can I act safely?",
    safestNextAction: "Open proof, status, billing, or secure access only when the alert explains why it matters.",
    mustShow: ["AI Visibility signal feed", "Priority AI Visibility feed", "Scan", "Review", "Repair", "Control", "Quiet feed standard"],
    mustNotShow: ["raw prompts", "private internals", "raw billing IDs", "duplicate anxiety"],
  },
  {
    key: "support",
    label: "Support Routing",
    path: "/dashboard/support",
    purpose: "Route blockers to the narrowest safe support path while preserving proof, scope, status, access, and review gates.",
    primaryCustomerQuestion: "Which support path matches my blocker without expanding scope?",
    safestNextAction: "Track status first, then submit a protected request only when review or new context is needed.",
    mustShow: ["AI Visibility support routing", "Track, then act.", "Access issue", "Proof question", "Repair scope", "Control priority"],
    mustNotShow: ["passwords", "card data", "private keys", "session tokens", "silent scope expansion"],
  },
] as const;

export function getDashboardProtectedSuiteContracts() {
  return DASHBOARD_PROTECTED_SUITE_CONTRACTS;
}
