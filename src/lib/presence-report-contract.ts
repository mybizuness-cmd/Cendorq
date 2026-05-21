export type PresenceReportPillarKey = "findability" | "understanding" | "trust" | "choice" | "action";
export type PresenceReportNextMove = "Free Scan" | "Deep Review" | "Build Fix" | "Ongoing Control";

export type PresenceReportPillar = Readonly<{
  key: PresenceReportPillarKey;
  label: string;
  score: number;
  state: string;
  publicMeaning: string;
}>;

export type PresenceReportRepairItem = Readonly<{
  title: string;
  publicReason: string;
}>;

export type PresenceReportPublicShape = Readonly<{
  title: string;
  summary: string;
  score: number;
  pillars: readonly PresenceReportPillar[];
  repairQueue: readonly PresenceReportRepairItem[];
  nextMove: PresenceReportNextMove;
}>;

export const PRESENCE_REPORT_PUBLIC_PILLARS: readonly PresenceReportPillar[] = [
  {
    key: "findability",
    label: "Findability",
    score: 58,
    state: "Needs structure",
    publicMeaning: "Can public systems locate the business, service area, pages, and public facts?",
  },
  {
    key: "understanding",
    label: "Understanding",
    score: 39,
    state: "Weak signal",
    publicMeaning: "Can a first-time visitor understand what the business does and when it is relevant?",
  },
  {
    key: "trust",
    label: "Trust",
    score: 44,
    state: "Proof buried",
    publicMeaning: "Are reviews, credentials, testimonials, photos, and experience visible near the decision point?",
  },
  {
    key: "choice",
    label: "Choice",
    score: 31,
    state: "Competitor clearer",
    publicMeaning: "Does the business explain why someone should choose it over alternatives?",
  },
  {
    key: "action",
    label: "Action",
    score: 52,
    state: "Path uneven",
    publicMeaning: "Can the next customer step happen quickly without confusion or buried calls to action?",
  },
] as const;

export const PRESENCE_REPORT_PUBLIC_REPAIR_QUEUE: readonly PresenceReportRepairItem[] = [
  {
    title: "Clarify the service offer above the fold.",
    publicReason: "The first screen should say what the business does, who it helps, where it operates, and what action to take next.",
  },
  {
    title: "Move proof closer to the decision point.",
    publicReason: "Trust evidence should appear before customers need to compare another provider.",
  },
  {
    title: "Add answer-ready service questions.",
    publicReason: "Public pages should answer the practical questions customers need before choosing.",
  },
  {
    title: "Strengthen choice contrast carefully.",
    publicReason: "The business needs a clear reason to choose it over similar options.",
  },
] as const;

export const SAMPLE_PRESENCE_REPORT: PresenceReportPublicShape = {
  title: "Visible, but not easy to choose.",
  summary: "This example shows how Cendorq turns the first scan signal into a repair path.",
  score: 42,
  pillars: PRESENCE_REPORT_PUBLIC_PILLARS,
  repairQueue: PRESENCE_REPORT_PUBLIC_REPAIR_QUEUE,
  nextMove: "Deep Review",
} as const;
