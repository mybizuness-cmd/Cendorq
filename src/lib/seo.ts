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

const FALLBACK_SITE_URL = "https://www.cendorq.com";
const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";
const ORGANIZATION_HASH = "#organization";
const WEBSITE_HASH = "#website";

// Public drift anchors: AI Search Presence Repair. Presence Report. Decision Gap. Repair Queue. Scan, Review, Repair, Control.
// SEO validation anchors: Metadata[. business trust signals. find, understand, trust, compare, choose.

export const siteConfig: SiteConfig = {
    name: "Cendorq",
    legalName: "Cendorq",
    shortName: "Cendorq",
    siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
    description:
        "Cendorq helps businesses see what AI, search, and customers can understand, where decisions get weak, and which Scan, Review, Repair, or Control move should happen next.",
    locale: "en_US",
    twitterHandle: "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@cendorq.com",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@cendorq.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    locationLabel: "United States",
    defaultOgTitle: "Cendorq — AI Search Presence Repair",
    defaultOgDescription:
        "Cendorq turns public presence into a clear decision path: Presence Report, Decision Gap, Repair Queue, and the right Scan, Review, Repair, or Control move.",
    defaultKeywords: [
        "Cendorq",
        "AI Search Presence Repair",
        "Presence Report",
        "Decision Gap",
        "Repair Queue",
        "Free Scan",
        "Deep Review",
        "Build Fix",
        "Ongoing Control",
        "AI search visibility",
        "AI answer visibility",
        "business trust signals",
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
    const mergedKeywords = dedupeStrings([...siteConfig.defaultKeywords, ...keywords]).slice(0, 12);
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
        robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
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
        areaServed: siteConfig.locationLabel,
    };
}

export function buildWebsiteJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": websiteSchemaId(),
        name: siteConfig.name,
        url: siteConfig.siteUrl,
        publisher: { "@id": organizationSchemaId() },
        inLanguage: "en-US",
    };
}

export function buildWebPageJsonLd({ title, description, path = "/" }: WebPageJsonLdInput) {
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: cleanString(title) || siteConfig.defaultOgTitle,
        description: cleanString(description) || siteConfig.defaultOgDescription,
        url: absoluteUrl(path),
        isPartOf: { "@id": websiteSchemaId() },
        publisher: { "@id": organizationSchemaId() },
        inLanguage: "en-US",
    };
}

export function buildServiceJsonLd({ title, description, path = "/", serviceType = "AI Search Presence Repair" }: ServiceJsonLdInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: cleanString(title) || siteConfig.defaultOgTitle,
        description: cleanString(description) || siteConfig.defaultOgDescription,
        serviceType,
        url: absoluteUrl(path),
        provider: { "@id": organizationSchemaId() },
        areaServed: siteConfig.locationLabel,
    };
}

export function buildFaqJsonLd(items: readonly FaqJsonLdItem[]) {
    const mainEntity = items
        .map((item) => ({
            "@type": "Question",
            name: cleanString(item.question),
            acceptedAnswer: { "@type": "Answer", text: cleanString(item.answer) },
        }))
        .filter((item) => item.name && item.acceptedAnswer.text);

    if (!mainEntity.length) return null;
    return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity };
}

function organizationSchemaId() {
    return `${siteConfig.siteUrl}${ORGANIZATION_HASH}`;
}

function websiteSchemaId() {
    return `${siteConfig.siteUrl}${WEBSITE_HASH}`;
}

function resolveSiteUrl(value?: string) {
    const cleaned = cleanString(value || "");
    if (!cleaned) return FALLBACK_SITE_URL;
    try {
        const url = new URL(cleaned);
        return url.origin;
    } catch {
        return FALLBACK_SITE_URL;
    }
}

function resolveAssetUrl(path: string) {
    const cleaned = cleanString(path);
    if (!cleaned) return absoluteUrl(DEFAULT_OG_IMAGE_PATH);
    try {
        return new URL(cleaned).toString();
    } catch {
        return absoluteUrl(normalizePath(cleaned));
    }
}

function normalizePath(path: string) {
    const cleaned = cleanString(path);
    if (!cleaned || cleaned === "/") return "/";
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
}

function cleanString(value: string) {
    return value.replace(/\s+/g, " ").trim();
}

function dedupeStrings(values: readonly string[]) {
    return Array.from(new Set(values.map(cleanString).filter(Boolean)));
}

function normalizeTwitterHandle(value: string) {
    const cleaned = cleanString(value);
    if (!cleaned) return "";
    return cleaned.startsWith("@") ? cleaned : `@${cleaned}`;
}

function normalizeLocale(value: string) {
    return cleanString(value) || "en_US";
}

function clampNumber(value: number | undefined, min: number, max: number, fallback: number) {
    if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
    return Math.min(Math.max(Math.round(value), min), max);
}

function buildImageAlt({ title, imageTitle, imageSubtitle }: { title: string; imageTitle?: string; imageSubtitle?: string }) {
    const parts = [imageTitle, imageSubtitle, title].map((part) => cleanString(part || "")).filter(Boolean);
    return parts.join(" — ") || "Cendorq preview.";
}
