const BUSINESS_TYPES = [
    "Local service business",
    "Professional service firm",
    "Home service company",
    "Medical or dental practice",
    "Restaurant or hospitality business",
    "Retail or ecommerce business",
    "Real estate business",
    "Fitness or wellness business",
    "Agency or consulting business",
    "Education or coaching business",
    "Other",
] as const;

const PRIMARY_GOALS = [
    "Get more qualified leads",
    "Increase trust and credibility",
    "Improve search visibility",
    "Convert more website visitors",
    "Clarify positioning and messaging",
    "Fix inconsistent online presence",
    "Understand what is suppressing growth",
] as const;

const MONTHLY_REVENUE_RANGES = [
    "Under $5k",
    "$5k - $20k",
    "$20k - $50k",
    "$50k - $100k",
    "$100k - $250k",
    "$250k+",
    "Prefer not to say",
] as const;

const MONTHLY_MARKETING_RANGES = [
    "$0 - $500",
    "$500 - $2k",
    "$2k - $5k",
    "$5k - $15k",
    "$15k+",
    "Prefer not to say",
] as const;

export const businessTypes = BUSINESS_TYPES;
export const primaryGoals = PRIMARY_GOALS;
export const monthlyRevenueRanges = MONTHLY_REVENUE_RANGES;
export const monthlyMarketingRanges = MONTHLY_MARKETING_RANGES;

export type BusinessType = (typeof BUSINESS_TYPES)[number];
export type PrimaryGoal = (typeof PRIMARY_GOALS)[number];
export type MonthlyRevenueRange = (typeof MONTHLY_REVENUE_RANGES)[number];
export type MonthlyMarketingRange = (typeof MONTHLY_MARKETING_RANGES)[number];

export type FreeCheckOptionGroupKey =
    | "businessType"
    | "primaryGoal"
    | "monthlyRevenue"
    | "monthlyMarketing";

export type FreeCheckOptionValue =
    | BusinessType
    | PrimaryGoal
    | MonthlyRevenueRange
    | MonthlyMarketingRange;

export type FreeCheckOptionGroup<TValue extends string> = Readonly<{
    key: FreeCheckOptionGroupKey;
    label: string;
    description: string;
    options: readonly TValue[];
}>;

export const freeCheckOptionGroups = {
    businessType: {
        key: "businessType",
        label: "Business type",
        description:
            "Use the closest real business model so the first-read signal starts from the right context.",
        options: BUSINESS_TYPES,
    },
    primaryGoal: {
        key: "primaryGoal",
        label: "Primary goal",
        description:
            "Choose the strongest current outcome pressure instead of selecting everything at once.",
        options: PRIMARY_GOALS,
    },
    monthlyRevenue: {
        key: "monthlyRevenue",
        label: "Monthly revenue",
        description:
            "Use the closest operating range so the signal reflects actual business scale.",
        options: MONTHLY_REVENUE_RANGES,
    },
    monthlyMarketing: {
        key: "monthlyMarketing",
        label: "Monthly marketing",
        description:
            "Choose the real current spend band so the intake signal stays grounded in reality.",
        options: MONTHLY_MARKETING_RANGES,
    },
} as const satisfies Readonly<{
    businessType: FreeCheckOptionGroup<BusinessType>;
    primaryGoal: FreeCheckOptionGroup<PrimaryGoal>;
    monthlyRevenue: FreeCheckOptionGroup<MonthlyRevenueRange>;
    monthlyMarketing: FreeCheckOptionGroup<MonthlyMarketingRange>;
}>;

const NORMALIZED_LOOKUPS = {
    businessType: buildNormalizedLookup(BUSINESS_TYPES),
    primaryGoal: buildNormalizedLookup(PRIMARY_GOALS),
    monthlyRevenue: buildNormalizedLookup(MONTHLY_REVENUE_RANGES),
    monthlyMarketing: buildNormalizedLookup(MONTHLY_MARKETING_RANGES),
} as const;

export function getBusinessTypeOptions() {
    return [...BUSINESS_TYPES];
}

export function getPrimaryGoalOptions() {
    return [...PRIMARY_GOALS];
}

export function getMonthlyRevenueOptions() {
    return [...MONTHLY_REVENUE_RANGES];
}

export function getMonthlyMarketingOptions() {
    return [...MONTHLY_MARKETING_RANGES];
}

export function isBusinessType(value: string): value is BusinessType {
    return hasNormalizedOption(NORMALIZED_LOOKUPS.businessType, value);
}

export function isPrimaryGoal(value: string): value is PrimaryGoal {
    return hasNormalizedOption(NORMALIZED_LOOKUPS.primaryGoal, value);
}

export function isMonthlyRevenueRange(
    value: string,
): value is MonthlyRevenueRange {
    return hasNormalizedOption(NORMALIZED_LOOKUPS.monthlyRevenue, value);
}

export function isMonthlyMarketingRange(
    value: string,
): value is MonthlyMarketingRange {
    return hasNormalizedOption(NORMALIZED_LOOKUPS.monthlyMarketing, value);
}

export function normalizeBusinessType(value: string) {
    return normalizeOption(NORMALIZED_LOOKUPS.businessType, value);
}

export function normalizePrimaryGoal(value: string) {
    return normalizeOption(NORMALIZED_LOOKUPS.primaryGoal, value);
}

export function normalizeMonthlyRevenueRange(value: string) {
    return normalizeOption(NORMALIZED_LOOKUPS.monthlyRevenue, value);
}

export function normalizeMonthlyMarketingRange(value: string) {
    return normalizeOption(NORMALIZED_LOOKUPS.monthlyMarketing, value);
}

export function getDefaultBusinessType(): BusinessType {
    return "Other";
}

export function getDefaultPrimaryGoal(): PrimaryGoal {
    return "Improve search visibility";
}

export function getDefaultMonthlyRevenueRange(): MonthlyRevenueRange {
    return "Prefer not to say";
}

export function getDefaultMonthlyMarketingRange(): MonthlyMarketingRange {
    return "Prefer not to say";
}

export function getFreeCheckOptionSnapshot() {
    return {
        businessTypes: getBusinessTypeOptions(),
        primaryGoals: getPrimaryGoalOptions(),
        monthlyRevenueRanges: getMonthlyRevenueOptions(),
        monthlyMarketingRanges: getMonthlyMarketingOptions(),
    } as const;
}

function buildNormalizedLookup<TValue extends string>(
    values: readonly TValue[],
) {
    const map = new Map<string, TValue>();

    for (const value of values) {
        map.set(normalizeKey(value), value);
    }

    return map;
}

function hasNormalizedOption<TValue extends string>(
    lookup: ReadonlyMap<string, TValue>,
    value: string,
) {
    return lookup.has(normalizeKey(value));
}

function normalizeOption<TValue extends string>(
    lookup: ReadonlyMap<string, TValue>,
    value: string,
) {
    return lookup.get(normalizeKey(value)) || null;
}

function normalizeKey(value: string) {
    return value
        .normalize("NFKC")
        .trim()
        .replace(/\s+/g, " ")
        .toLowerCase();
}
