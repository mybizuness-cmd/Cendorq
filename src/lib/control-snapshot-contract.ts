export type ControlSnapshotSignalState = "stable" | "watch" | "repair";

export type ControlSnapshotSignal = Readonly<{
  label: string;
  state: ControlSnapshotSignalState;
  whyItMatters: string;
  nextAction: string;
}>;

export type ControlSnapshotPublicShape = Readonly<{
  monthLabel: string;
  presenceScore: number;
  summary: string;
  signals: readonly ControlSnapshotSignal[];
}>;

export const SAMPLE_CONTROL_SNAPSHOT: ControlSnapshotPublicShape = {
  monthLabel: "Sample month",
  presenceScore: 46,
  summary: "The business remains visible, but proof freshness and competitor clarity need attention before the Choice Gap widens.",
  signals: [
    {
      label: "Proof freshness",
      state: "watch",
      whyItMatters: "Trust can decay even when the business still performs well.",
      nextAction: "Move current review themes, credentials, and process proof closer to the CTA.",
    },
    {
      label: "Competitor clarity",
      state: "repair",
      whyItMatters: "Customers and AI systems compare visible public signals first.",
      nextAction: "Strengthen the above-fold offer and local decision language.",
    },
    {
      label: "Public fact consistency",
      state: "stable",
      whyItMatters: "Stable facts help customers and AI systems understand what the business does.",
      nextAction: "Continue monitoring service areas, hours, and primary CTA consistency.",
    },
  ],
} as const;
