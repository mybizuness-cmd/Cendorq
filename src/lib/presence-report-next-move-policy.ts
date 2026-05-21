import type { PresenceReportNextMove } from "@/lib/presence-report-contract";

export type PresenceReportNextMovePolicy = Readonly<{
  nextMove: PresenceReportNextMove;
  when: string;
  boundary: string;
}>;

export const PRESENCE_REPORT_NEXT_MOVE_POLICIES: readonly PresenceReportNextMovePolicy[] = [
  {
    nextMove: "Free Scan",
    when: "The customer has not received a first signal yet.",
    boundary: "Do not force a paid step before a useful preview exists.",
  },
  {
    nextMove: "Deep Review",
    when: "The first signal is weak but the cause needs proof.",
    boundary: "Diagnose before prescribing implementation.",
  },
  {
    nextMove: "Build Fix",
    when: "The repair lane is clear enough to scope safely.",
    boundary: "Fix one high-impact public signal before expanding scope.",
  },
  {
    nextMove: "Ongoing Control",
    when: "The business needs drift monitoring after scan, review, or repair.",
    boundary: "Monitor changes without promising outcomes.",
  },
] as const;
