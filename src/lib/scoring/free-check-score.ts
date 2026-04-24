import type { SignalResult } from "../signals/free-check-signal";
import {
    normalizeFreeCheckInput,
    type FreeCheckInput,
    type RoutingHint,
} from "../validation/free-check";

export type ScoreTier = "low" | "mid" | "high";
export type ScoreDecision = "reject" | "review" | "priority";

export type ScoreResult = Readonly<{
    score: number;
    tier: ScoreTier;
    decision: ScoreDecision;
    reasons: string[];
    routeFit: RoutingHint;
    summary: string;
}>;

export function scoreFreeCheck(
    input: FreeCheckInput,
    signals: SignalResult,
): ScoreResult {
    const normalized = normalizeFreeCheckInput(input);
    let score = 0;
    const reasons: string[] = [];

    // -------------------------
    // Signal scoring (CORE)
    // -------------------------

    score += clamp(signals.clarityScore, 0, 14);
    if (signals.clarityScore >= 7) {
        reasons.push("strong_problem_clarity");
    } else if (signals.clarityScore <= 3) {
        reasons.push("low_clarity_signal");
    }

    score += clamp(signals.intentStrength, 0, 8);
    if (signals.intentStrength >= 4) {
        reasons.push("strong_intent_signal");
    } else if (signals.intentStrength <= 1) {
        reasons.push("low_intent_signal");
    }

    if (signals.signalQuality >= 85) {
        score += 4;
        reasons.push("high_signal_quality");
    } else if (signals.signalQuality >= 65) {
        score += 2;
        reasons.push("workable_signal_quality");
    } else {
        reasons.push("weak_signal_quality");
    }

    if (signals.strongestPressure !== "mixed") {
        score += 1;
        reasons.push(`clear_pressure_${signals.strongestPressure}`);
    }

    // -------------------------
    // Business context (SUPPORTING)
    // -------------------------

    if (normalized.monthlyRevenue.includes("$250k")) {
        score += 2;
        reasons.push("high_revenue_business");
    } else if (
        normalized.monthlyRevenue.includes("$50k") ||
        normalized.monthlyRevenue.includes("$100k")
    ) {
        score += 1;
        reasons.push("mid_revenue_business");
    }

    if (
        normalized.monthlyMarketing.includes("$5k") ||
        normalized.monthlyMarketing.includes("$15k")
    ) {
        score += 1;
        reasons.push("active_marketing_spend");
    }

    if (normalized.websiteHostname) {
        score += 1;
        reasons.push("has_website");
    }

    if (
        normalized.primaryOffer.length >= 18 &&
        normalized.audience.length >= 45 &&
        normalized.biggestIssue.length >= 70
    ) {
        score += 2;
        reasons.push("strong_business_context");
    }

    if (
        normalized.country.length >= 2 &&
        normalized.stateRegion.length >= 2 &&
        normalized.city.length >= 2
    ) {
        score += 1;
        reasons.push("strong_location_context");
    }

    if (normalized.competitors.length >= 12) {
        score += 1;
        reasons.push("competitive_awareness");
    }

    // -------------------------
    // Risk penalties
    // -------------------------

    if (signals.clarityScore <= 3) {
        score -= 3;
        reasons.push("low_clarity_penalty");
    }

    if (signals.intentStrength <= 1) {
        score -= 2;
        reasons.push("low_intent_penalty");
    }

    if (signals.riskFlags.includes("weak_signal")) {
        score -= 2;
        reasons.push("weak_signal_penalty");
    }

    if (signals.riskFlags.includes("needs_clarification")) {
        score -= 1;
        reasons.push("clarification_penalty");
    }

    if (signals.riskFlags.includes("spam_risk")) {
        score -= 5;
        reasons.push("spam_risk_penalty");
    }

    if (signals.riskFlags.includes("missing_website")) {
        score -= 2;
        reasons.push("missing_website_penalty");
    }

    if (signals.riskFlags.includes("thin_issue_description")) {
        score -= 1;
        reasons.push("thin_issue_penalty");
    }

    if (signals.riskFlags.includes("thin_audience_context")) {
        score -= 1;
        reasons.push("thin_audience_penalty");
    }

    if (signals.riskFlags.includes("thin_primary_offer")) {
        score -= 1;
        reasons.push("thin_offer_penalty");
    }

    if (signals.riskFlags.includes("consumer_email")) {
        score -= 1;
        reasons.push("consumer_email_penalty");
    }

    score = Math.max(0, score);

    // -------------------------
    // Tier logic
    // -------------------------

    let tier: ScoreTier = "low";

    if (
        score >= 18 &&
        signals.clarityScore >= 7 &&
        signals.signalQuality >= 65 &&
        !signals.riskFlags.includes("spam_risk")
    ) {
        tier = "high";
    } else if (
        score >= 9 &&
        signals.clarityScore >= 4 &&
        !signals.riskFlags.includes("spam_risk")
    ) {
        tier = "mid";
    }

    // -------------------------
    // Decision logic
    // -------------------------

    let decision: ScoreDecision = "reject";

    if (
        tier === "high" &&
        signals.intentStrength >= 4 &&
        !signals.riskFlags.includes("spam_risk")
    ) {
        decision = "priority";
    } else if (tier === "mid") {
        decision = "review";
    }

    const routeFit = signals.routingHint;

    return {
        score,
        tier,
        decision,
        reasons: dedupeReasons(reasons),
        routeFit,
        summary: buildSummary({
            businessName: normalized.businessName,
            score,
            tier,
            decision,
            routeFit,
            signals,
        }),
    };
}

function buildSummary({
    businessName,
    score,
    tier,
    decision,
    routeFit,
    signals,
}: {
    businessName: string;
    score: number;
    tier: ScoreTier;
    decision: ScoreDecision;
    routeFit: RoutingHint;
    signals: SignalResult;
}) {
    const businessLabel = businessName || "This business";

    return `${businessLabel} scored ${score} as a ${tier}-tier submission with a ${decision} decision, ${humanizeRoutingHint(routeFit)} route fit, clarity ${signals.clarityScore}/14, intent ${signals.intentStrength}/8, and signal quality ${signals.signalQuality}/100.`;
}

function humanizeRoutingHint(value: RoutingHint) {
    if (value === "scan-only") return "scan-only";
    if (value === "blueprint-candidate") return "Visibility Blueprint candidate";
    if (value === "infrastructure-review") return "Presence Infrastructure review";
    return "Presence Command review";
}

function dedupeReasons(reasons: readonly string[]) {
    return [...new Set(reasons.filter(Boolean))];
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}
