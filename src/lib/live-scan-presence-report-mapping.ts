import { buildPresenceReportPackage, type GeneratedPresenceReportPackage, type PresenceReportGenerationInput } from "@/lib/presence-report-generation-adapter";
import { normalizePresenceReportNextMove } from "@/lib/presence-report-next-move";
import type { FreeCheckReportSnapshot } from "@/lib/reports/free-check-report";

export function mapLiveScanSnapshotToPresenceReport(snapshot: FreeCheckReportSnapshot, input: PresenceReportGenerationInput = {}): GeneratedPresenceReportPackage {
  const packageBase = buildPresenceReportPackage(input);
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
      nextMove: normalizePresenceReportNextMove(snapshot.routeRecommendation.title),
    },
    choiceGap: {
      ...packageBase.choiceGap,
      summary: weakestReadoutSummary(snapshot) || packageBase.choiceGap.summary,
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

function weakestReadoutSummary(snapshot: FreeCheckReportSnapshot) {
  const weakest = [...snapshot.moduleReadouts].sort((a, b) => a.value - b.value)[0];
  if (!weakest) return "";
  return `Lowest visible readout: ${weakest.label}. ${weakest.interpretation}`;
}
