import { absoluteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

type RouteDefinition = Readonly<{
    path: string;
    priority: number;
    changeFrequency: ChangeFrequency;
    includeInProduction: boolean;
}>;

const ROUTES: readonly RouteDefinition[] = [
    {
        path: "/",
        priority: 1,
        changeFrequency: "weekly",
        includeInProduction: true,
    },
    {
        path: "/free-check",
        priority: 0.98,
        changeFrequency: "weekly",
        includeInProduction: true,
    },
    {
        path: "/plans",
        priority: 0.95,
        changeFrequency: "weekly",
        includeInProduction: true,
    },
    {
        path: "/plans/deep-review",
        priority: 0.9,
        changeFrequency: "weekly",
        includeInProduction: true,
    },
    {
        path: "/plans/build-fix",
        priority: 0.88,
        changeFrequency: "weekly",
        includeInProduction: true,
    },
    {
        path: "/plans/ongoing-control",
        priority: 0.87,
        changeFrequency: "weekly",
        includeInProduction: true,
    },
    {
        path: "/connect",
        priority: 0.76,
        changeFrequency: "monthly",
        includeInProduction: true,
    },
    {
        path: "/privacy",
        priority: 0.3,
        changeFrequency: "yearly",
        includeInProduction: true,
    },
    {
        path: "/terms",
        priority: 0.3,
        changeFrequency: "yearly",
        includeInProduction: true,
    },
    {
        path: "/disclaimer",
        priority: 0.28,
        changeFrequency: "yearly",
        includeInProduction: true,
    },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    if (!shouldExposeSitemap()) {
        return [];
    }

    const lastModified = resolveLastModified();

    return ROUTES.filter((route) => route.includeInProduction).map((route) => ({
        url: absoluteUrl(route.path),
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}

function shouldExposeSitemap() {
    const siteUrl = safeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
    const vercelEnv = cleanEnv(process.env.VERCEL_ENV);
    const nodeEnv = cleanEnv(process.env.NODE_ENV);

    const isProductionLike =
        nodeEnv === "production" && (vercelEnv === "production" || !vercelEnv);

    const isPlaceholderHost =
        !siteUrl ||
        siteUrl.hostname === "localhost" ||
        siteUrl.hostname === "127.0.0.1" ||
        siteUrl.hostname.endsWith(".local") ||
        siteUrl.hostname.endsWith(".test") ||
        siteUrl.hostname.endsWith(".example");

    return isProductionLike && !isPlaceholderHost;
}

function resolveLastModified() {
    const candidates = [
        process.env.NEXT_PUBLIC_BUILD_TIMESTAMP,
        process.env.VERCEL_GIT_COMMIT_DATE,
        process.env.BUILD_TIMESTAMP,
        process.env.VERCEL_GIT_COMMIT_SHA,
    ];

    for (const candidate of candidates) {
        const parsed = parseBuildDate(candidate);
        if (parsed) return parsed;
    }

    return new Date();
}

function parseBuildDate(value: string | undefined) {
    const cleaned = (value || "").trim();
    if (!cleaned) return null;

    const directDate = new Date(cleaned);
    if (!Number.isNaN(directDate.getTime())) {
        return directDate;
    }

    if (/^[a-f0-9]{7,40}$/i.test(cleaned)) {
        return null;
    }

    return null;
}

function safeSiteUrl(value: string | undefined) {
    const cleaned = (value || "").trim();
    if (!cleaned) return null;

    try {
        return new URL(cleaned);
    } catch {
        return null;
    }
}

function cleanEnv(value: string | undefined) {
    return (value || "").trim().toLowerCase();
}
