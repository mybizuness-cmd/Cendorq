export type PresenceReportReleaseGateStatus = "pass" | "hold";

export type PresenceReportReleaseGateCheck = Readonly<{
  label: string;
  status: PresenceReportReleaseGateStatus;
  customerSafeReason: string;
}>;

export type PresenceReportReleaseGateResult = Readonly<{
  status: PresenceReportReleaseGateStatus;
  checks: readonly PresenceReportReleaseGateCheck[];
}>;

export function evaluatePresenceReportReleaseGate(checks: readonly PresenceReportReleaseGateCheck[]): PresenceReportReleaseGateResult {
  const status: PresenceReportReleaseGateStatus = checks.every((check) => check.status === "pass") ? "pass" : "hold";
  return { status, checks } as const;
}

export const SAMPLE_PRESENCE_REPORT_RELEASE_CHECKS: readonly PresenceReportReleaseGateCheck[] = [
  {
    label: "Approved business facts",
    status: "pass",
    customerSafeReason: "Business Truth Profile facts are present before report language is released.",
  },
  {
    label: "Restricted claims",
    status: "pass",
    customerSafeReason: "Ranking, revenue, lead, outcome, and AI placement promises are not used.",
  },
  {
    label: "Evidence boundary",
    status: "pass",
    customerSafeReason: "Free Scan output stays first-signal only until deeper review proves the cause.",
  },
  {
    label: "Next move clarity",
    status: "pass",
    customerSafeReason: "Recommended next move is tied to the report state instead of forcing a plan.",
  },
] as const;
