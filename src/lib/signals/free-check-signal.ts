import {
    buildRoutingHint,
    computeSignalQuality,
    normalizeFreeCheckInput,
    type FreeCheckInput,
    type NormalizedFreeCheckInput,
    type RoutingHint,
} from "../validation/free-check";

export type SignalPressure =
    | "trust"
    | "clarity"
    | "positioning"
    | "action"
    | "mixed";

export type SignalResult = Readonly<{
    clarityScore: number;
    intentStrength: number;
    riskFlags: string[];
    strongestPressure: SignalPressure;
    routingHint: RoutingHint;
    signalQuality: number;
    summary: string;
}>;

export function deriveSignals(input: FreeCheckInput): SignalResult {
    const normalized = normalizeFreeCheckInput(input);
    const signalQuality = computeSignalQuality(normalized);
    const strongestPressure = detectStrongestPressure(normalized);
    const clarityScore = deriveClarityScore(normalized);
    const intentStrength = deriveIntentStrength(normalized);
    const riskFlags = deriveRiskFlags(
        normalized,
        signalQuality,
        clarityScore,
        intentStrength,
    );
    const routingHint = buildRoutingHint(signalQuality, normalized);

    return {
        clarityScore,
        intentStrength,
        riskFlags,
        strongestPressure,
        routingHint,
        signalQuality,
        summary: buildSummary({
            input: normalized,
            strongestPressure,
            routingHint,
            signalQuality,
            clarityScore,
            intentStrength,
            riskFlags,
        }),
    };
}

export function deriveClarityScore(input: NormalizedFreeCheckInput) {
    let score = 0;

    if (input.businessType.length >= 3) score += 1;
    if (input.primaryOffer.length >= 12) score += 2;
    if (input.primaryOffer.length >= 40) score += 1;
    if (input.audience.length >= 30) score += 2;
    if (input.audience.length >= 90) score += 1;
    if (input.biggestIssue.length >= 45) score += 2;
    if (input.biggestIssue.length >= 120) score += 2;
    if (input.websiteHostname) score += 1;

    if (hasSpecificLanguage(input.primaryOffer)) score += 1;
    if (hasSpecificLanguage(input.audience)) score += 1;
    if (hasSpecificLanguage(input.biggestIssue)) score += 1;

    return clamp(score, 0, 14);
}

export function deriveIntentStrength(input: NormalizedFreeCheckInput) {
    let score = 0;

    const goalText = [
        input.primaryGoal,
        input.primaryOffer,
        input.biggestIssue,
        input.notes,
    ]
        .join(" ")
        .toLowerCase();

    if (containsAny(goalText, ["lead", "leads", "qualified"])) score += 2;
    if (containsAny(goalText, ["visibility", "visible", "search"])) score += 1;
    if (containsAny(goalText, ["trust", "credibility", "authority"])) score += 1;
    if (containsAny(goalText, ["convert", "conversion", "book", "booking", "calls"]))
        score += 2;
    if (
        containsAny(goalText, [
            "positioning",
            "differentiate",
            "messaging",
            "offer",
            "clarity",
        ])
    ) {
        score += 1;
    }
    if (
        containsAny(goalText, [
            "ongoing",
            "monthly",
            "maintain",
            "monitor",
            "continuity",
            "adaptation",
        ])
    ) {
        score += 1;
    }
    if (input.websiteHostname) score += 1;

    return clamp(score, 0, 8);
}

export function deriveRiskFlags(
    input: NormalizedFreeCheckInput,
    signalQuality: number,
    clarityScore: number,
    intentStrength: number,
) {
    const flags: string[] = [];

    if (!input.websiteHostname) {
        flags.push("missing_website");
    }

    if (signalQuality < 55) {
        flags.push("weak_signal");
    }

    if (signalQuality < 70) {
        flags.push("needs_clarification");
    }

    if (clarityScore < 6) {
        flags.push("low_context_submission");
    }

    if (input.primaryOffer.length < 20) {
        flags.push("thin_primary_offer");
    }

    if (input.audience.length < 45) {
        flags.push("thin_audience_context");
    }

    if (input.biggestIssue.length < 70) {
        flags.push("thin_issue_description");
    }

    if (looksDisposable(input.email)) {
        flags.push("consumer_email");
    }

    if (input.monthlyMarketing === "$0 - $500") {
        flags.push("low_marketing_spend");
    }

    if (intentStrength <= 1) {
        flags.push("weak_intent_signal");
    }

    if (looksSuspicious(input)) {
        flags.push("spam_risk");
    }

    return [...new Set(flags)];
}

export function detectStrongestPressure(
    input: NormalizedFreeCheckInput,
): SignalPressure {
    const content = [
        input.primaryOffer,
        input.audience,
        input.biggestIssue,
        input.notes,
    ]
        .join(" ")
        .toLowerCase();

    const scores = {
        trust: countMatches(content, [
            "trust",
            "credible",
            "credibility",
            "reviews",
            "reputation",
            "authority",
            "believe",
            "doubt",
        ]),
        clarity: countMatches(content, [
            "clarity",
            "clear",
            "understand",
            "confusing",
            "message",
            "messaging",
            "explain",
            "explanation",
        ]),
        positioning: countMatches(content, [
            "position",
            "positioning",
            "different",
            "differentiate",
            "generic",
            "compare",
            "blending",
            "blend",
            "commoditized",
        ]),
        action: countMatches(content, [
            "convert",
            "conversion",
            "book",
            "booking",
            "call",
            "contact",
            "lead",
            "sales",
            "buy",
            "action",
            "hesitation",
        ]),
    };

    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    if (ranked[0][1] === 0) return "mixed";
    if (ranked[1] && ranked[0][1] === ranked[1][1]) return "mixed";

    return ranked[0][0] as SignalPressure;
}

function buildSummary({
    input,
    strongestPressure,
    routingHint,
    signalQuality,
    clarityScore,
    intentStrength,
    riskFlags,
}: {
    input: NormalizedFreeCheckInput;
    strongestPressure: SignalPressure;
    routingHint: RoutingHint;
    signalQuality: number;
    clarityScore: number;
    intentStrength: number;
    riskFlags: string[];
}) {
    const businessLabel = input.businessName || "This business";
    const pressureLabel = humanizePressure(strongestPressure);
    const routeLabel = humanizeRoutingHint(routingHint);
    const qualityLabel =
        signalQuality >= 85 ? "strong" : signalQuality >= 65 ? "developing" : "weak";

    const riskNote =
        riskFlags.length > 0
            ? ` Risk posture: ${riskFlags
                .slice(0, 3)
                .map(humanizeFlag)
                .join(", ")}.`
            : "";

    return `${businessLabel} is currently producing a ${qualityLabel} first signal with a ${pressureLabel} pressure bias, clarity ${clarityScore}/14, intent ${intentStrength}/8, and a likely ${routeLabel} next-read posture.${riskNote}`;
}

function looksSuspicious(input: NormalizedFreeCheckInput) {
    const content = [
        input.primaryOffer,
        input.audience,
        input.biggestIssue,
        input.notes,
    ]
        .join(" ")
        .toLowerCase();

    const spamTerms = [
        "crypto",
        "casino",
        "forex",
        "adult",
        "viagra",
        "loan",
        "telegram",
        "whatsapp",
    ];

    const hasSpamTerm = spamTerms.some((term) => content.includes(term));
    const tooManyUrls = countUrls(content) > 3;
    const repeatedNoise = /(.)\1{6,}/.test(content);

    return hasSpamTerm || tooManyUrls || repeatedNoise;
}

function looksDisposable(email: string) {
    const freeDomains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
        "icloud.com",
        "proton.me",
        "protonmail.com",
    ];

    const domain = email.split("@")[1]?.toLowerCase() ?? "";
    return freeDomains.includes(domain);
}

function hasSpecificLanguage(value: string) {
    const specificitySignals = [
        /\bpatients?\b/i,
        /\bclients?\b/i,
        /\bcustomers?\b/i,
        /\bappointments?\b/i,
        /\bbook(ing)?\b/i,
        /\bleads?\b/i,
        /\bconversion\b/i,
        /\btrust\b/i,
        /\bclarity\b/i,
        /\bpositioning\b/i,
        /\bcompetitors?\b/i,
    ];

    return specificitySignals.some((pattern) => pattern.test(value));
}

function countMatches(content: string, keywords: readonly string[]) {
    return keywords.reduce(
        (count, keyword) => count + (content.includes(keyword) ? 1 : 0),
        0,
    );
}

function countUrls(value: string) {
    const matches = value.match(/https?:\/\/[^\s]+|[a-z0-9.-]+\.[a-z]{2,}/gi);
    return matches ? matches.length : 0;
}

function containsAny(value: string, needles: readonly string[]) {
    return needles.some((needle) => value.includes(needle));
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

function humanizePressure(value: SignalPressure) {
    if (value === "trust") return "trust-heavy";
    if (value === "clarity") return "clarity-heavy";
    if (value === "positioning") return "positioning-heavy";
    if (value === "action") return "action-heavy";
    return "mixed-pressure";
}

function humanizeRoutingHint(value: RoutingHint) {
    if (value === "scan-only") return "Free Scan only";
    if (value === "blueprint-candidate") return "Deep Review candidate";
    if (value === "infrastructure-review") return "Build Fix review";
    return "Ongoing Control review";
}

function humanizeFlag(flag: string) {
    return flag.replace(/_/g, " ");
}
