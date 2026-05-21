import type { PresenceReportNextMove } from "@/lib/presence-report-contract";

export const PRESENCE_REPORT_NEXT_MOVE_SEQUENCE: readonly PresenceReportNextMove[] = [
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
] as const;

export function normalizePresenceReportNextMove(value: string): PresenceReportNextMove {
  if (value.includes("Ongoing Control")) return "Ongoing Control";
  if (value.includes("Build Fix")) return "Build Fix";
  if (value.includes("Deep Review")) return "Deep Review";
  return "Free Scan";
}
