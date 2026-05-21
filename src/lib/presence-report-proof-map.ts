export type PresenceReportProofMapSignal = Readonly<{
  label: string;
  currentState: "missing" | "buried" | "visible" | "needs-review";
  whyItMatters: string;
  repairDirection: string;
}>;

export const SAMPLE_PRESENCE_REPORT_PROOF_MAP: readonly PresenceReportProofMapSignal[] = [
  {
    label: "Recent reviews",
    currentState: "buried",
    whyItMatters: "Customers and AI systems need visible trust proof close to the choice moment.",
    repairDirection: "Move recent review themes near service and action sections.",
  },
  {
    label: "Credentials and policies",
    currentState: "needs-review",
    whyItMatters: "Proof should support trust without inventing or overstating claims.",
    repairDirection: "Show verified credentials, safety notes, policies, or standards where relevant.",
  },
  {
    label: "Photos and real-world proof",
    currentState: "buried",
    whyItMatters: "Real photos and process proof make the business easier to trust before contact.",
    repairDirection: "Place approved team, location, process, or work proof close to CTAs.",
  },
] as const;
