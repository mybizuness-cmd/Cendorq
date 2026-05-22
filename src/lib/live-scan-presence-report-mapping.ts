import { buildPresenceReportPackage, type GeneratedPresenceReportPackage, type PresenceReportGenerationInput } from "@/lib/presence-report-generation-adapter";
import { normalizePresenceReportNextMove } from "@/lib/presence-report-next-move";
import type { FreeCheckReportSnapshot } from "@/lib/reports/free-check-report";
import type { PresenceReportPillar, PresenceReportPillarKey } from "@/lib/presence-report-contract";

export function mapLiveScanSnapshotToPresenceReport(snapshot: FreeCheckReportSnapshot, input: PresenceReportGenerationInput = {}): GeneratedPresenceReportPackage {
  const packageBase = buildPresenceReportPackage(input);
  const pillarScores = derivePresencePillarScores(snapshot);
  const score = averageScore(Object.values(pillarScores));
  const repairQueue = snapshot.priorityActions.slice(0, 4).map((action) => ({
    title: action,
    publicReason: "Customer-safe first signal. Prove cause before deeper work.",
  }));

  return {
    ...packageBase,
    report: {
      ...packageBase.report,
      summary: snapshot.executiveSummary,
      score,
      pillars: packageBase.report.pillars.map((pillar) => applyLivePillarScore(pillar, pillarScores[pillar.key])),
      repairQueue: repairQueue.length ? repairQueue : packageBase.report.repairQueue,
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

function derivePresencePillarScores(snapshot: FreeCheckReportSnapshot): Record<PresenceReportPillarKey, number> {
  const readout = (label: string) => snapshot.moduleReadouts.find((item) => item.label === label)?.value ?? 0;
  const discoverability = readout("Discoverability");
  const recommendationVisibility = readout("AI Recommendation Visibility");
  const trustAuthority = readout("Trust & Authority");
  const conversionReadiness = readout("Conversion Readiness");
  const competitiveExposure = readout("Competitive Exposure");

  return {
    findability: clampScore(discoverability),
    understanding: clampScore(Math.round((recommendationVisibility * 0.7) + (discoverability * 0.3))),
    trust: clampScore(trustAuthority),
    choice: clampScore(Math.round(((100 - competitiveExposure) * 0.55) + (recommendationVisibility * 0.25) + (trustAuthority * 0.2))),
    action: clampScore(conversionReadiness),
  };
}

function applyLivePillarScore(pillar: PresenceReportPillar, score: number): PresenceReportPillar {
  return {
    ...pillar,
    score,
    state: stateForScore(score),
  } as const;
}

function stateForScore(score: number) {
  if (score >= 80) return "Strong signal";
  if (score >= 65) return "Workable signal";
  if (score >= 45) return "Needs repair";
  return "Weak signal";
}

function averageScore(values: readonly number[]) {
  if (!values.length) return 0;
  const total = values.reduce((sum, value) => sum + value, 0);
  return clampScore(Math.round(total / values.length));
}

function clampScore(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function weakestReadoutSummary(snapshot: FreeCheckReportSnapshot) {
  const weakest = [...snapshot.moduleReadouts].sort((a, b) => a.value - b.value)[0];
  if (!weakest) return "";
  return `Lowest visible readout: ${weakest.label}. ${weakest.interpretation}`;
}
