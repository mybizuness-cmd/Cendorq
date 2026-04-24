export type IntakeSource = "free-check" | "search-presence-scan";

export type RoutingHint =
    | "scan-only"
    | "blueprint-candidate"
    | "infrastructure-review"
    | "command-review";

export type FreeCheckInput = {
    source?: IntakeSource;
    fullName: string;
    email: string;
    businessName: string;
    websiteUrl: string;
    businessType: string;
    biggestIssue: string;
    competitors?: string;

    country?: string;
    stateRegion?: string;
    city?: string;
    primaryOffer?: string;
    audience?: string;
    notes?: string;

    // Legacy compatibility fields preserved so older callers do not break.
    location?: string;
    primaryGoal?: string;
    monthlyRevenue?: string;
    monthlyMarketing?: string;
    consent?: boolean;
};

export type NormalizedFreeCheckInput = Readonly<{
    source: IntakeSource;
    fullName: string;
    email: string;
    businessName: string;
    websiteUrl: string;
    websiteHostname: string;
    businessType: string;
    country: string;
    stateRegion: string;
    city: string;
    primaryOffer: string;
    audience: string;
    biggestIssue: string;
    competitors: string;
    notes: string;
    location: string;
    primaryGoal: string;
    monthlyRevenue: string;
    monthlyMarketing: string;
    consent: boolean;
}>;

export type ValidationResult = Readonly<{
    isValid: boolean;
    errors: Record<string, string>;
    normalized: NormalizedFreeCheckInput;
    signalQuality: number;
    routingHint: RoutingHint;
}>;

const MAX_FIELD_LENGTHS = {
    fullName: 120,
    email: 160,
    businessName: 160,
    websiteUrl: 240,
    businessType: 120,
    country: 120,
    stateRegion: 120,
    city: 120,
    primaryOffer: 500,
    audience: 1500,
    biggestIssue: 1800,
    competitors: 1000,
    notes: 1500,
    location: 160,
    primaryGoal: 200,
    monthlyRevenue: 120,
    monthlyMarketing: 120,
} as const;

const MIN_FIELD_LENGTHS = {
    fullName: 2,
    businessName: 2,
    businessType: 3,
    country: 2,
    stateRegion: 2,
    city: 2,
    primaryOffer: 10,
    audience: 30,
    biggestIssue: 45,
} as const;

export function validateFreeCheck(input: FreeCheckInput): ValidationResult {
    const normalized = normalizeFreeCheckInput(input);
    const errors: Record<string, string> = {};

    if (normalized.fullName.length < MIN_FIELD_LENGTHS.fullName) {
        errors.fullName = "Please enter the real business contact name.";
    }

    if (!looksLikeEmail(normalized.email)) {
        errors.email = "Please enter a valid business email address.";
    }

    if (normalized.businessName.length < MIN_FIELD_LENGTHS.businessName) {
        errors.businessName = "Please enter the real business name.";
    }

    if (!looksLikeWebsite(normalized.websiteUrl)) {
        errors.websiteUrl = "Please enter the main business website.";
    }

    if (normalized.businessType.length < MIN_FIELD_LENGTHS.businessType) {
        errors.businessType = "Please describe the business type more clearly.";
    }

    if (normalized.country.length < MIN_FIELD_LENGTHS.country) {
        errors.country = "Please choose the business country.";
    }

    if (normalized.stateRegion.length < MIN_FIELD_LENGTHS.stateRegion) {
        errors.stateRegion =
            "Please enter the business state, province, or region.";
    }

    if (normalized.city.length < MIN_FIELD_LENGTHS.city) {
        errors.city = "Please enter the main business city.";
    }

    if (normalized.primaryOffer.length < MIN_FIELD_LENGTHS.primaryOffer) {
        errors.primaryOffer =
            "Please explain what the business actually sells in clearer language.";
    }

    if (normalized.audience.length < MIN_FIELD_LENGTHS.audience) {
        errors.audience =
            "Please describe the target audience in more useful detail.";
    }

    if (normalized.biggestIssue.length < MIN_FIELD_LENGTHS.biggestIssue) {
        errors.biggestIssue =
            "Please explain the biggest issue in enough detail for a serious first read.";
    }

    if (input.consent === false) {
        errors.consent = "Consent is required.";
    }

    const signalQuality = computeSignalQuality(normalized);
    const routingHint = buildRoutingHint(signalQuality, normalized);

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
        normalized,
        signalQuality,
        routingHint,
    };
}

export function normalizeFreeCheckInput(
    input: FreeCheckInput,
): NormalizedFreeCheckInput {
    const websiteUrl = normalizeWebsite(input.websiteUrl);
    const country = cleanString(input.country, MAX_FIELD_LENGTHS.country);
    const stateRegion = cleanString(
        input.stateRegion,
        MAX_FIELD_LENGTHS.stateRegion,
    );
    const city = cleanString(input.city, MAX_FIELD_LENGTHS.city);
    const location = cleanString(input.location, MAX_FIELD_LENGTHS.location);
    const locationParts = splitLocation(location);

    const normalizedCountry = country || locationParts.country;
    const normalizedStateRegion = stateRegion || locationParts.stateRegion;
    const normalizedCity = city || locationParts.city;

    return {
        source: normalizeSource(input.source),
        fullName: cleanString(input.fullName, MAX_FIELD_LENGTHS.fullName),
        email: cleanEmail(input.email),
        businessName: cleanString(input.businessName, MAX_FIELD_LENGTHS.businessName),
        websiteUrl,
        websiteHostname: safeHostname(websiteUrl),
        businessType: cleanString(input.businessType, MAX_FIELD_LENGTHS.businessType),
        country: normalizedCountry,
        stateRegion: normalizedStateRegion,
        city: normalizedCity,
        primaryOffer: cleanString(
            input.primaryOffer || input.primaryGoal,
            MAX_FIELD_LENGTHS.primaryOffer,
        ),
        audience: cleanString(input.audience, MAX_FIELD_LENGTHS.audience),
        biggestIssue: cleanString(input.biggestIssue, MAX_FIELD_LENGTHS.biggestIssue),
        competitors: cleanString(input.competitors, MAX_FIELD_LENGTHS.competitors),
        notes: cleanString(input.notes, MAX_FIELD_LENGTHS.notes),
        location,
        primaryGoal: cleanString(input.primaryGoal, MAX_FIELD_LENGTHS.primaryGoal),
        monthlyRevenue: cleanString(
            input.monthlyRevenue,
            MAX_FIELD_LENGTHS.monthlyRevenue,
        ),
        monthlyMarketing: cleanString(
            input.monthlyMarketing,
            MAX_FIELD_LENGTHS.monthlyMarketing,
        ),
        consent: Boolean(input.consent),
    };
}

export function computeSignalQuality(input: NormalizedFreeCheckInput) {
    let score = 0;

    score += scoreField(input.fullName, 2, 4);
    score += scoreField(input.email, 6, 6);
    score += scoreField(input.businessName, 2, 6);
    score += scoreField(input.websiteUrl, 8, 8);
    score += scoreField(input.country, 2, 4);
    score += scoreField(input.stateRegion, 2, 4);
    score += scoreField(input.city, 2, 4);
    score += scoreField(input.businessType, 3, 8);
    score += scoreField(input.primaryOffer, 10, 14);
    score += scoreField(input.audience, 30, 16);
    score += scoreField(input.biggestIssue, 45, 18);
    score += optionalScore(input.competitors, 10, 4);
    score += optionalScore(input.notes, 12, 4);

    if (hasSpecificLanguage(input.primaryOffer)) score += 2;
    if (hasSpecificLanguage(input.audience)) score += 3;
    if (hasSpecificLanguage(input.biggestIssue)) score += 3;
    if (input.websiteHostname) score += 2;
    if (!looksDisposable(input.email)) score += 2;

    return clamp(score, 0, 100);
}

export function buildRoutingHint(
    signalQuality: number,
    input: NormalizedFreeCheckInput,
): RoutingHint {
    const text =
        `${input.biggestIssue} ${input.notes} ${input.audience} ${input.primaryOffer}`.toLowerCase();

    if (
        signalQuality >= 88 &&
        containsAny(text, [
            "monthly",
            "ongoing",
            "maintain",
            "maintenance",
            "monitor",
            "monitoring",
            "recurring",
            "continuity",
            "long term",
            "long-term",
            "adaptation",
        ])
    ) {
        return "command-review";
    }

    if (
        signalQuality >= 82 &&
        containsAny(text, [
            "conversion",
            "convert",
            "book",
            "booking",
            "calls",
            "trust",
            "clarity",
            "positioning",
            "messaging",
            "website",
            "site",
            "offer",
            "structure",
            "friction",
        ])
    ) {
        return "infrastructure-review";
    }

    if (signalQuality >= 65) {
        return "blueprint-candidate";
    }

    return "scan-only";
}

function normalizeSource(value: string | undefined) {
    return value === "free-check" || value === "search-presence-scan"
        ? value
        : "search-presence-scan";
}

function cleanString(value: unknown, maxLength: number) {
    if (typeof value !== "string") return "";

    return value
        .normalize("NFKC")
        .replace(/<[^>]*>/g, " ")
        .replace(/[\u0000-\u001F\u007F]/g, " ")
        .replace(/[\u200B-\u200D\uFEFF]/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength);
}

function cleanEmail(value: unknown) {
    return cleanString(value, MAX_FIELD_LENGTHS.email).toLowerCase();
}

function normalizeWebsite(value: unknown) {
    const cleaned = cleanString(value, MAX_FIELD_LENGTHS.websiteUrl);
    if (!cleaned) return "";

    try {
        const candidate = /^https?:\/\//i.test(cleaned)
            ? cleaned
            : `https://${cleaned}`;
        const parsed = new URL(candidate);
        parsed.hash = "";
        parsed.search = "";
        return parsed.toString().replace(/\/$/, "");
    } catch {
        return cleaned;
    }
}

function looksLikeEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function looksLikeWebsite(value: string) {
    try {
        const parsed = new URL(value);
        return Boolean(parsed.hostname && parsed.hostname.includes("."));
    } catch {
        return false;
    }
}

function safeHostname(value: string) {
    try {
        return new URL(value).hostname.toLowerCase().replace(/^www\./, "");
    } catch {
        return "";
    }
}

function scoreField(value: string, minLength: number, maxPoints: number) {
    if (value.length < minLength) return 0;
    if (value.length >= minLength * 4) return maxPoints;
    return Math.round((value.length / (minLength * 4)) * maxPoints);
}

function optionalScore(value: string, minLength: number, maxPoints: number) {
    if (!value) return 0;
    if (value.length < minLength) return Math.round(maxPoints * 0.25);
    if (value.length >= minLength * 4) return maxPoints;
    return Math.round((value.length / (minLength * 4)) * maxPoints);
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

function containsAny(value: string, needles: readonly string[]) {
    return needles.some((needle) => value.includes(needle));
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

function splitLocation(location: string) {
    const parts = location
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

    if (parts.length === 0) {
        return {
            city: "",
            stateRegion: "",
            country: "",
        };
    }

    if (parts.length === 1) {
        return {
            city: parts[0],
            stateRegion: "",
            country: "",
        };
    }

    if (parts.length === 2) {
        return {
            city: parts[0],
            stateRegion: parts[1],
            country: "",
        };
    }

    return {
        city: parts[0],
        stateRegion: parts[1],
        country: parts.slice(2).join(", "),
    };
}
