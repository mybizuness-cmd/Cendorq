import { buildPresenceReportPackage, type GeneratedPresenceReportPackage } from "@/lib/presence-report-generation-adapter";
import type { FreeCheckReportSnapshot } from "@/lib/reports/free-check-report";

export function mapLiveScanSnapshotToPresenceReport(snapshot: FreeCheckReportSnapshot): GeneratedPresenceReportPackage {
  const packageBase = buildPresenceReportPackage();
  const score = averageScore(snapshot.moduleReadouts.map((item) => item.value));

  return {
    ...packageBase,
    report: {
      ...packageBase.report,
      summary: snapshot.executiveSummary,
      score,
      repairQueue: snapshot.priorityActions.slice(0, 4).map((action) => ({
        title: action,
        publicReason: "Customer-safe first signal. Prove cause before deeper work.",
      })),
      nextMove: routeTitleToNextMove(snapshot.routeRecommendation.title),
    },
    controlSnapshot: {
      ...packageBase.controlSnapshot,
      presenceScore: score,
      summary: snapshot.riskInterpretation[0] || packageBase.controlSnapshot.summary,
    },
  } as const;
}

function averageScore(values: readonly number[]) {
  if (!values.length) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.max(0, Math.min(100, Math.round(total / values.length)));
}

function routeTitleToNextMove(title: string) {
  if (title.includes("Ongoing Control")) return "Ongoing Control";
  if (title.includes("Build Fix")) return "Build Fix";
  if (title.includes("Deep Review")) return "Deep Review";
  return "Free Scan";
}
