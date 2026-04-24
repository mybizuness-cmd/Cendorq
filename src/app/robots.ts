import { absoluteUrl, siteConfig } from "@/lib/seo";
import type { MetadataRoute } from "next";

type RulePath = `/${string}` | "/";

const PUBLIC_ALLOWLIST = [
    "/",
    "/free-check",
    "/diagnosis",
    "/pricing",
    "/pricing/full-diagnosis",
    "/pricing/optimization",
    "/pricing/monthly-partner",
    "/profile",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
] as const satisfies readonly RulePath[];

const PRIVATE_DISALLOWLIST = [
    "/api/",
    "/intake-console",
    "/_next/",
] as const satisfies readonly RulePath[];

const PRIORITY_BOTS = [
    "Googlebot",
    "Bingbot",
    "DuckDuckBot",
    "Applebot",
] as const;

export default function robots(): MetadataRoute.Robots {
    const siteUrl = resolveSiteUrl();
    const sitemap = absoluteUrl("/sitemap.xml");
    const allow = dedupePaths(PUBLIC_ALLOWLIST);
    const disallow = dedupePaths(PRIVATE_DISALLOWLIST);

    if (shouldBlockCrawlers(siteUrl)) {
        return {
            rules: [
                {
                    userAgent: "*",
                    disallow: "/",
                },
            ],
            sitemap,
            host: siteUrl.host,
        };
    }

    return {
        rules: [
            {
                userAgent: "*",
                allow,
                disallow,
            },
            {
                userAgent: [...PRIORITY_BOTS],
                allow,
                disallow,
            },
        ],
        sitemap,
        host: siteUrl.host,
    };
}

function resolveSiteUrl() {
    try {
        return new URL(siteConfig.siteUrl);
    } catch {
        return new URL("https://cendorq.example");
    }
}

function shouldBlockCrawlers(siteUrl: URL) {
    const vercelEnv = readEnv(process.env.VERCEL_ENV).toLowerCase();
    const nodeEnv = readEnv(process.env.NODE_ENV).toLowerCase();
    const hostname = siteUrl.hostname.toLowerCase();
    const explicitBlock = readEnv(process.env.BLOCK_SEARCH_INDEXING).toLowerCase();

    if (explicitBlock === "1" || explicitBlock === "true") {
        return true;
    }

    const isPreviewOrDev =
        vercelEnv === "preview" ||
        vercelEnv === "development" ||
        nodeEnv !== "production";

    const isPlaceholderDomain =
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname === "::1" ||
        hostname.endsWith(".example") ||
        hostname.endsWith(".local") ||
        hostname.endsWith(".test") ||
        hostname.endsWith(".internal");

    return isPreviewOrDev || isPlaceholderDomain;
}

function dedupePaths(paths: readonly RulePath[]) {
    return [...new Set(paths.map(normalizePath))];
}

function normalizePath(path: string): RulePath {
    const trimmed = path.trim();
    if (!trimmed) return "/";

    const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    const normalized = withLeadingSlash.replace(/\/+$/, "");

    return (normalized || "/") as RulePath;
}

function readEnv(value: string | undefined) {
    return (value || "").trim();
}
