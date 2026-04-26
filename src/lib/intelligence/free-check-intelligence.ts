import type { ScoreResult } from "@/lib/scoring/free-check-score";
import type { SignalResult } from "@/lib/signals/free-check-signal";
import type { NormalizedFreeCheckInput } from "@/lib/validation/free-check";

export type ConfidenceLevel = "low" | "medium" | "high";
export type TimeSensitivity = "stable" | "watch" | "urgent";

export type IntelligenceModuleScores = Readonly<{
  discoverability: number;
  recommendationVisibility: number;
  trustAuthority: number;
  conversionReadiness: number;
  competitiveExposure: number;
}>;

export type FreeCheckIntelligence = Readonly<{
  confidenceLevel: ConfidenceLevel;
  dataDepthScore: number;
  timeSensitivity: TimeSensitivity;
  decisionMoment: string;
  explanationTrace: string[];
  scoreModules: IntelligenceModuleScores;
}>;

export function deriveFreeCheckIntelligence(
  input: NormalizedFreeCheckInput,
  signals: SignalResult,
  scoring: ScoreResult,
): FreeCheckIntelligence {
  const dataDepthScore = clamp(
    scoreText(input.primaryOffer, 12, 18) +
      scoreText(input.audience, 30, 24) +
      scoreText(input.biggestIssue, 45, 28) +
      scoreText(input.competitors, 10, 10) +
      scoreText(input.notes, 12, 8) +
      (input.websiteHostname ? 6 : 0) +
      (input.city && input.stateRegion && input.country ? 6 : 0),
    0,
    100,
  );

  const scoreModules = {
    discoverability: clamp(
      signals.signalQuality * 0.38 +
        dataDepthScore * 0.18 +
        (input.websiteHostname ? 12 : 0) +
        (input.businessType ? 10 : 0) +
        (input.city && input.stateRegion ? 8 : 0),
      0,
      100,
    ),
    recommendationVisibility: clamp(
      signals.clarityScore * 4 +
        signals.intentStrength * 5 +
        (signals.strongestPressure === "clarity" ? 8 : 0) +
        (signals.strongestPressure === "trust" ? 6 : 0) +
        dataDepthScore * 0.22,
      0,
      100,
    ),
    trustAuthority: clamp(
      signals.signalQuality * 0.34 +
        (signals.strongestPressure === "trust" ? 10 : 0) +
        (input.websiteHostname ? 10 : 0) +
        (looksBusinessEmail(input.email) ? 8 : 0) +
        scoreText(input.notes, 12, 8),
      0,
      100,
    ),
    conversionReadiness: clamp(
      signals.intentStrength * 8 +
        signals.clarityScore * 3 +
        scoreText(input.biggestIssue, 45, 18) +
        (containsAny(`${input.biggestIssue} ${input.notes}`.toLowerCase(), ["book", "call", "lead", "contact", "conversion", "quote"]) ? 10 : 0),
      0,
      100,
    ),
    competitiveExposure: clamp(
      scoreText(input.competitors, 10, 28) +
        (containsAny(`${input.biggestIssue} ${input.notes}`.toLowerCase(), ["competitor", "compare", "comparison", "other options", "alternatives"]) ? 18 : 0) +
        (signals.strongestPressure === "positioning" ? 16 : 0) +
        (signals.strongestPressure === "action" ? 8 : 0),
      0,
      100,
    ),
  } satisfies IntelligenceModuleScores;

  const confidenceLevel = deriveConfidenceLevel({
    signalQuality: signals.signalQuality,
    dataDepthScore,
    riskFlags: signals.riskFlags,
  });

  const timeSensitivity = deriveTimeSensitivity({
    strongestPressure: signals.strongestPressure,
    routingHint: signals.routingHint,
    riskFlags: signals.riskFlags,
    issueText: `${input.biggestIssue} ${input.notes}`.toLowerCase(),
  });

  return {
    confidenceLevel,
    dataDepthScore,
    timeSensitivity,
    decisionMoment: buildDecisionMoment(signals, scoring, confidenceLevel),
    explanationTrace: buildExplanationTrace(input, signals, scoring, scoreModules, confidenceLevel, dataDepthScore),
    scoreModules,
  };
}

function deriveConfidenceLevel({ signalQuality, dataDepthScore, riskFlags }: { signalQuality: number; dataDepthScore: number; riskFlags: readonly string[]; }): ConfidenceLevel {
  const penalty = riskFlags.includes("spam_risk") ? 30 : riskFlags.includes("weak_signal") ? 12 : 0;
  const composite = signalQuality * 0.55 + dataDepthScore * 0.45 - penalty;
  if (composite >= 76) return "high";
  if (composite >= 50) return "medium";
  return "low";
}

function deriveTimeSensitivity({ strongestPressure, routingHint, riskFlags, issueText }: { strongestPressure: SignalResult["strongestPressure"]; routingHint: SignalResult["routingHint"]; riskFlags: readonly string[]; issueText: string; }): TimeSensitivity {
  if (riskFlags.includes("spam_risk")) return "watch";
  if (routingHint === "infrastructure-review" || routingHint === "command-review") return "urgent";
  if (containsAny(issueText, ["urgent", "immediately", "dropping", "declining", "losing", "falling"])) return "urgent";
  if (strongestPressure === "mixed") return "watch";
  return "stable";
}

function buildDecisionMoment(signals: SignalResult, scoring: ScoreResult, confidenceLevel: ConfidenceLevel) {
  if (scoring.decision === "priority" && confidenceLevel === "high") {
    return "The business has enough signal for a strong next-step decision without forcing premature escalation.";
  }
  if (signals.routingHint === "blueprint-candidate") {
    return "The strongest decision moment is whether the business should move into Deep Review before bigger fix pressure increases.";
  }
  if (signals.routingHint === "infrastructure-review") {
    return "The business is showing Build Fix pressure, but the system should still protect diagnosis before heavier action.";
  }
  if (signals.routingHint === "command-review") {
    return "The business is showing possible Ongoing Control pressure, but the base should be stable before recurring work begins.";
  }
  return "The strongest decision moment is improving first-signal quality so the next recommendation can be trusted more confidently.";
}

function buildExplanationTrace(
  input: NormalizedFreeCheckInput,
  signals: SignalResult,
  scoring: ScoreResult,
  modules: IntelligenceModuleScores,
  confidenceLevel: ConfidenceLevel,
  dataDepthScore: number,
) {
  const trace = [
    `Signal quality registered at ${signals.signalQuality}/100 with ${confidenceLevel} confidence and data depth ${dataDepthScore}/100.`,
    `Primary route fit is ${humanizeRoutingHint(signals.routingHint)} with strongest pressure in ${signals.strongestPressure}.`,
    `Module stack: discoverability ${modules.discoverability}, recommendation visibility ${modules.recommendationVisibility}, trust authority ${modules.trustAuthority}, conversion readiness ${modules.conversionReadiness}, competitive exposure ${modules.competitiveExposure}.`,
    `Score posture is ${scoring.score} (${scoring.tier} tier / ${scoring.decision} decision).`,
  ];
  if (!input.websiteHostname) trace.push("Website confidence is reduced because no strong public-facing website signal was provided.");
  if (!input.competitors) trace.push("Competitive exposure is partially inferred because direct competitor context was thin.");
  if (signals.riskFlags.length > 0) trace.push(`Active risk flags: ${signals.riskFlags.join(", ")}.`);
  return trace;
}

function humanizeRoutingHint(value: SignalResult["routingHint"]) {
  if (value === "scan-only") return "Free Scan only";
  if (value === "blueprint-candidate") return "Deep Review candidate";
  if (value === "infrastructure-review") return "Build Fix review";
  return "Ongoing Control review";
}

function looksBusinessEmail(email: string) {
  const domain = email.split("@")[1] || "";
  return domain && !["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "protonmail.com", "proton.me"].includes(domain.toLowerCase());
}

function containsAny(value: string, needles: readonly string[]) {
  return needles.some((needle) => value.includes(needle));
}

function scoreText(value: string, minLength: number, maxPoints: number) {
  const length = value.trim().length;
  if (length < minLength) return 0;
  if (length >= minLength * 4) return maxPoints;
  return Math.round((length / (minLength * 4)) * maxPoints);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}
