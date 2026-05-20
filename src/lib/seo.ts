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

export const siteConfig: SiteConfig = {
    name: "Cendorq",
    legalName: "Cendorq",
    shortName: "Cendorq",
    siteUrl: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
    description:
        "Cendorq checks whether AI engines, search, and customers can understand, trust, and choose a business clearly.",
    locale: "en_US",
    twitterHandle: "",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@cendorq.com",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@cendorq.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
    locationLabel: "United States",
    defaultOgTitle: "Cendorq — AI Visibility and Readiness",
    defaultOgDescription:
        "If AI engines and search cannot understand your business, customers may never get the chance to. Start with the Free Scan.",
    defaultKeywords: [
        "Cendorq",
        "AI visibility",
        "AI engine readiness",
        "AI readiness for business",
        "AI search visibility",
        "answer engine visibility",
        "business clarity scan",
        "business trust signals",
        "Free Scan",
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
    const mergedKeywords = dedupeStrings([...siteConfig.defaultKeywords, ...keywords]).slice(0, 10);
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
        alternateName: siteConfig.shortName,
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
    return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: cleanString(title),
        description: cleanString(description),
        url: absoluteUrl(path),
        isPartOf: { "@id": websiteSchemaId() },
        publisher: { "@id": organizationSchemaId() },
    };
}

export function buildServiceJsonLd({ title, description, path = "/", serviceType = "AI readiness and business clarity" }: ServiceJsonLdInput) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        name: cleanString(title),
        description: cleanString(description),
        serviceType: cleanString(serviceType),
        url: absoluteUrl(path),
        provider: { "@id": organizationSchemaId() },
    };
}

export function toJsonLd(value: unknown) {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}

function resolveSiteUrl(value: string | undefined) {
    const cleaned = cleanString(value || "");
    if (!cleaned) return FALLBACK_SITE_URL;
    try {
        const url = new URL(cleaned.startsWith("http") ? cleaned : `https://${cleaned}`);
        return url.origin;
    } catch {
        return FALLBACK_SITE_URL;
    }
}

function normalizePath(path: string) {
    const cleaned = cleanString(path);
    if (!cleaned || cleaned === "/") return "/";
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
}

function resolveAssetUrl(path: string) {
    return absoluteUrl(path || DEFAULT_OG_IMAGE_PATH);
}

function buildImageAlt({ title, imageTitle, imageSubtitle }: { title: string; imageTitle?: string; imageSubtitle?: string }) {
    const parts = [imageTitle, imageSubtitle, title].map((part) => cleanString(part || "")).filter(Boolean);
    return parts.join(" — ") || siteConfig.defaultOgTitle;
}

function buildRobots(noIndex: boolean): Metadata["robots"] {
    if (noIndex) return { index: false, follow: false, googleBot: { index: false, follow: false } };
    return { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": 0 } };
}

function normalizeLocale(value: string) {
    return cleanString(value).replace("_", "-") || "en-US";
}

function normalizeTwitterHandle(value: string) {
    const cleaned = cleanString(value);
    if (!cleaned) return "";
    return cleaned.startsWith("@") ? cleaned : `@${cleaned}`;
}

function clampNumber(value: number | undefined, min: number, max: number, fallback: number) {
    if (typeof value !== "number" || Number.isNaN(value)) return fallback;
    return Math.max(min, Math.min(max, value));
}

function dedupeStrings(values: readonly string[]) {
    return Array.from(new Set(values.map(cleanString).filter(Boolean)));
}

function cleanString(value: string | undefined) {
    return (value || "").replace(/\s+/g, " ").trim();
}
