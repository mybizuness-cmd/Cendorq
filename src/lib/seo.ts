import type { Metadata } from "next";

type SiteConfig = Readonly<{
    name: string;
    legalName: string;
    shortName: string;
    siteUrl: string;
    description: string;
    locale: string;
    twitterHandle: string;
    email: string;
    supportEmail: string;
    phone: string;
    locationLabel: string;
    defaultOgTitle: string;
    defaultOgDescription: string;
    defaultKeywords: readonly string[];
}>;

type MetadataImageInput = Readonly<{
    path?: string;
    alt?: string;
    width?: number;
    height?: number;
}>;

export type BuildMetadataInput = Readonly<{
    title: string;
    description: string;
    path?: string;
    keywords?: readonly string[];
    image?: MetadataImageInput;
    imageAlt?: string;
    imageTitle?: string;
    imageSubtitle?: string;
    noIndex?: boolean;
}>;

export type BreadcrumbItem = Readonly<{
    name: string;
    path: string;
}>;

export type FaqJsonLdItem = Readonly<{
    question: string;
    answer: string;
}>;

export type WebPageJsonLdInput = Readonly<{
    title: string;
    description: string;
    path?: string;
}>;

export type ServiceJsonLdInput = Readonly<{
    title: string;
    description: string;
    path?: string;
    serviceType?: string;
}>;

const FALLBACK_SITE_URL = "https://cendorq.example";
const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";
const ORGANIZATION_HASH = "#organization";
const WEBSITE_HASH = "#website";

export const siteConfig: SiteConfig = {
    name: "Cendorq",
    legalName: "Cendorq",
    shortName: "Cendorq",
    siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
    description:
        "Cendorq helps businesses become the strongest answer across evolving search environments through stronger signal, sharper strategy, stronger infrastructure, and stronger ongoing command.",
    locale: "en_US",
    twitterHandle: "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@cendorq.com",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@cendorq.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    locationLabel: "United States",
    defaultOgTitle: "Cendorq",
    defaultOgDescription:
        "Search Presence OS for businesses that need to become and remain the strongest answer across evolving search environments.",
    defaultKeywords: [
        "Cendorq",
        "Search Presence OS",
        "search presence scan",
        "visibility blueprint",
        "presence infrastructure",
        "presence command",
        "AI search visibility",
        "answer engine visibility",
        "search relevance strategy",
        "business search presence",
        "search presence consulting",
        "visibility operating system",
    ],
} as const;

export function absoluteUrl(path = "/") {
    const cleaned = cleanString(path);
    if (!cleaned) return siteConfig.siteUrl;

    try {
        return new URL(cleaned).toString();
    } catch {
        return new URL(normalizePath(cleaned), siteConfig.siteUrl).toString();
    }
}

export function buildMetadata({
    title,
    description,
    path = "/",
    keywords = [],
    image,
    imageAlt,
    imageTitle,
    imageSubtitle,
    noIndex = false,
}: BuildMetadataInput): Metadata {
    const resolvedTitle = cleanString(title) || siteConfig.defaultOgTitle;
    const resolvedDescription = cleanString(description) || siteConfig.defaultOgDescription;
    const normalizedPath = normalizePath(path);
    const canonicalUrl = absoluteUrl(normalizedPath);
    const imageUrl = resolveAssetUrl(image?.path || DEFAULT_OG_IMAGE_PATH);
    const resolvedImageAlt =
        cleanString(image?.alt) ||
        cleanString(imageAlt) ||
        buildImageAlt({ title: resolvedTitle, imageTitle, imageSubtitle });
    const imageWidth = clampNumber(image?.width, 200, 4000, 1200);
    const imageHeight = clampNumber(image?.height, 200, 4000, 630);
    const mergedKeywords = dedupeStrings([...siteConfig.defaultKeywords, ...keywords]);
    const twitterHandle = normalizeTwitterHandle(siteConfig.twitterHandle);
    const locale = normalizeLocale(siteConfig.locale);

    return {
        metadataBase: new URL(siteConfig.siteUrl),
        title: resolvedTitle,
        description: resolvedDescription,
        applicationName: siteConfig.name,
        authors: [{ name: siteConfig.legalName || siteConfig.name }],
        creator: siteConfig.name,
        publisher: siteConfig.name,
        category: "business",
        referrer: "origin-when-cross-origin",
        keywords: mergedKeywords,
        alternates: { canonical: normalizedPath },
        robots: buildRobots(noIndex),
        openGraph: {
            type: "website",
            url: canonicalUrl,
            siteName: siteConfig.name,
            title: resolvedTitle,
            description: resolvedDescription,
            locale,
            images: [{ url: imageUrl, alt: resolvedImageAlt, width: imageWidth, height: imageHeight }],
        },
        twitter: {
            card: "summary_large_image",
            title: resolvedTitle,
            description: resolvedDescription,
            ...(twitterHandle ? { creator: twitterHandle, site: twitterHandle } : {}),
            images: [imageUrl],
        },
    };
}

export function buildOrganizationJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": organizationSchemaId(),
        name: siteConfig.legalName || siteConfig.name,
        brand: siteConfig.name,
        url: siteConfig.siteUrl,
        email: siteConfig.email,
        telephone: siteConfig.phone || undefined,
        description: siteConfig.description,
    };
}

export function buildWebsiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": websiteSchemaId(),
        url: siteConfig.siteUrl,
        name: siteConfig.name,
        description: siteConfig.defaultOgDescription,
        inLanguage: normalizeLocale(siteConfig.locale),
        publisher: { "@id": organizationSchemaId() },
    };
}

export function buildBreadcrumbJsonLd(items: readonly BreadcrumbItem[]) {
    const normalizedItems = items
        .map((item) => ({ name: cleanString(item.name), path: normalizePath(item.path) }))
        .filter((item) => item.name);

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: normalizedItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function buildFaqJsonLd(items: readonly FaqJsonLdItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items
            .map((item) => ({ question: cleanString(item.question), answer: cleanString(item.answer) }))
            .filter((item) => item.question && item.answer)
            .map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
    };
}

export function buildWebPageJsonLd({ title, description, path = "/" }: WebPageJsonLdInput) {
    const normalizedPath = normalizePath(path);

    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": buildSchemaId(normalizedPath, "webpage"),
        name: cleanString(title) || siteConfig.defaultOgTitle,
        description: cleanString(description) || siteConfig.defaultOgDescription,
        url: absoluteUrl(normalizedPath),
        inLanguage: normalizeLocale(siteConfig.locale),
        isPartOf: { "@id": websiteSchemaId() },
        about: { "@id": organizationSchemaId() },
        publisher: { "@id": organizationSchemaId() },
    };
}

export function buildServiceJsonLd({ title, description, path = "/", serviceType = "Search Presence OS" }: ServiceJsonLdInput) {
    const normalizedPath = normalizePath(path);

    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": buildSchemaId(normalizedPath, "service"),
        name: cleanString(title) || siteConfig.defaultOgTitle,
        description: cleanString(description) || siteConfig.defaultOgDescription,
        url: absoluteUrl(normalizedPath),
        serviceType: cleanString(serviceType) || "Search Presence OS",
        areaServed: "Worldwide",
        provider: { "@id": organizationSchemaId() },
        brand: { "@id": organizationSchemaId() },
        isRelatedTo: { "@id": websiteSchemaId() },
    };
}

export function toJsonLd(value: unknown) {
    return JSON.stringify(value)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}

function buildRobots(noIndex: boolean): Metadata["robots"] {
    if (noIndex) {
        return {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
                index: false,
                follow: false,
                noimageindex: true,
                "max-image-preview": "none",
                "max-snippet": 0,
                "max-video-preview": 0,
            },
        };
    }

    return {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    };
}

function resolveSiteUrl(value: string | undefined) {
    const cleaned = cleanString(value);
    if (!cleaned) return FALLBACK_SITE_URL;

    const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(cleaned) ? cleaned : `https://${cleaned}`;
    try {
        const parsed = new URL(candidate);
        return parsed.toString().replace(/\/+$/, "");
    } catch {
        return FALLBACK_SITE_URL;
    }
}

function resolveAssetUrl(pathOrUrl: string) {
    const cleaned = cleanString(pathOrUrl);
    if (!cleaned) return absoluteUrl(DEFAULT_OG_IMAGE_PATH);

    try {
        return new URL(cleaned).toString();
    } catch {
        return absoluteUrl(cleaned);
    }
}

function normalizePath(path: string) {
    const cleaned = cleanString(path);
    if (!cleaned || cleaned === "/") return "/";

    try {
        const parsed = new URL(cleaned);
        const pathname = parsed.pathname.replace(/\/+$/, "") || "/";
        return `${pathname}${parsed.search || ""}${parsed.hash || ""}`;
    } catch {
        const withLeadingSlash = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
        return withLeadingSlash.replace(/\/+$/, "") || "/";
    }
}

function normalizeTwitterHandle(value: string) {
    const cleaned = cleanString(value);
    if (!cleaned) return "";
    return cleaned.startsWith("@") ? cleaned : `@${cleaned}`;
}

function normalizeLocale(value: string) {
    return cleanString(value).replace(/_/g, "-") || "en-US";
}

function organizationSchemaId() {
    return `${siteConfig.siteUrl}${ORGANIZATION_HASH}`;
}

function websiteSchemaId() {
    return `${siteConfig.siteUrl}${WEBSITE_HASH}`;
}

function buildSchemaId(path: string, suffix: string) {
    const url = new URL(absoluteUrl(path));
    url.hash = cleanString(suffix) || "entity";
    return url.toString();
}

function buildImageAlt({ title, imageTitle, imageSubtitle }: { title: string; imageTitle?: string; imageSubtitle?: string }) {
    const primary = cleanString(imageTitle) || cleanString(title) || siteConfig.defaultOgTitle;
    const secondary = cleanString(imageSubtitle);
    return secondary ? `${primary} — ${secondary}` : `${primary} | ${siteConfig.name}`;
}

function cleanString(value: string | undefined | null) {
    return (value || "").trim();
}

function dedupeStrings(values: readonly string[]) {
    const seen = new Set<string>();
    const result: string[] = [];
    for (const value of values) {
        const cleaned = cleanString(value);
        if (!cleaned) continue;
        const key = cleaned.toLowerCase();
        if (seen.has(key)) continue;
        seen.add(key);
        result.push(cleaned);
    }
    return result;
}

function clampNumber(value: number | undefined, min: number, max: number, fallback: number) {
    if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
    return Math.max(min, Math.min(max, Math.round(value)));
}
