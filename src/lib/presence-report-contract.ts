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
    label: "Search Presence",
    score: 58,
    state: "Needs structure",
    publicMeaning: "Can search, answer engines, and customers locate the business facts that make the company eligible to be considered?",
  },
  {
    key: "understanding",
    label: "Understanding",
    score: 39,
    state: "Weak signal",
    publicMeaning: "Can a first-time visitor understand what the business does, who it helps, where it operates, and when it is relevant?",
  },
  {
    key: "trust",
    label: "Trust",
    score: 44,
    state: "Proof buried",
    publicMeaning: "Are reviews, credentials, testimonials, photos, and experience visible before the customer needs another option?",
  },
  {
    key: "choice",
    label: "Choice",
    score: 31,
    state: "Competitor clearer",
    publicMeaning: "Does the business make the better choice obvious when a buyer compares nearby alternatives?",
  },
  {
    key: "action",
    label: "Action",
    score: 52,
    state: "Path uneven",
    publicMeaning: "Can the next customer step happen quickly without confusion, hesitation, or buried calls to action?",
  },
] as const;

export const PRESENCE_REPORT_PUBLIC_REPAIR_QUEUE: readonly PresenceReportRepairItem[] = [
  {
    title: "Make the first screen decision-ready.",
    publicReason: "The first screen should explain the offer, audience, location, proof, and next action before the buyer compares another provider.",
  },
  {
    title: "Move proof into the moment of choice.",
    publicReason: "Trust evidence should appear where hesitation happens, not after the customer has already started comparing competitors.",
  },
  {
    title: "Add answer-ready service support.",
    publicReason: "Public pages should answer practical buyer questions clearly enough for customers and answer engines to understand the business.",
  },
  {
    title: "Strengthen choice contrast carefully.",
    publicReason: "The business needs a calm, credible reason to choose it over similar options without overclaiming or sounding generic.",
  },
] as const;

export const SAMPLE_PRESENCE_REPORT: PresenceReportPublicShape = {
  title: "Visible, but not easy to choose.",
  summary: "This example shows how Cendorq turns public signal confusion into a clear Presence Report, Choice Gap, and Repair Queue.",
  score: 42,
  pillars: PRESENCE_REPORT_PUBLIC_PILLARS,
  repairQueue: PRESENCE_REPORT_PUBLIC_REPAIR_QUEUE,
  nextMove: "Deep Review",
} as const;
