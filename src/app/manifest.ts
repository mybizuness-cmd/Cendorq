import { siteConfig } from "@/lib/seo";
import type { MetadataRoute } from "next";

const APP_BACKGROUND = "#ffffff";
const APP_THEME = "#ffffff";

type ShortcutDefinition = Readonly<{
    name: string;
    shortName: string;
    description: string;
    url: `/${string}` | "/";
}>;

const MANIFEST_CATEGORIES = [
    "business",
    "productivity",
    "consulting",
    "marketing",
    "utilities",
] as const;

const ICON_DEFINITIONS = [
    {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
    },
    {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
    },
    {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
    },
] as const;

const SHORTCUTS: readonly ShortcutDefinition[] = [
    {
        name: "Start Free Scan",
        shortName: "Scan",
        description:
            "Start with the safest first AI-readiness signal before spending more on the wrong repair.",
        url: "/free-check",
    },
    {
        name: "Compare Readiness Path",
        shortName: "Plans",
        description:
            "Compare Scan, Review, Repair, and Control.",
        url: "/plans",
    },
    {
        name: "Open Dashboard",
        shortName: "Dashboard",
        description:
            "Return to protected reports, proof, notifications, and next actions.",
        url: "/dashboard",
    },
] as const;

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: resolveManifestName(siteConfig.legalName, siteConfig.name),
        short_name: resolveShortName(siteConfig.shortName, siteConfig.name),
        description: resolveDescription(siteConfig.description),
        start_url: "/free-check?source=generated-manifest",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "minimal-ui", "browser"],
        orientation: "portrait",
        background_color: APP_BACKGROUND,
        theme_color: APP_THEME,
        lang: "en-US",
        dir: "ltr",
        categories: [...MANIFEST_CATEGORIES],
        prefer_related_applications: false,
        icons: ICON_DEFINITIONS.map((icon) => ({ ...icon })),
        shortcuts: SHORTCUTS.map((shortcut) => ({
            name: shortcut.name,
            short_name: shortcut.shortName,
            description: shortcut.description,
            url: shortcut.url,
            icons: [
                {
                    src: "/icon",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
        })),
    };
}

function resolveManifestName(legalName: string, fallback: string) {
    const cleanedLegalName = cleanString(legalName);
    if (cleanedLegalName) {
        return `${cleanedLegalName} — AI Engine Readiness`;
    }

    return cleanString(fallback) || "Cendorq — AI Engine Readiness";
}

function resolveShortName(shortName: string, fallback: string) {
    const cleanedShortName = cleanString(shortName);
    if (cleanedShortName) {
        return cleanedShortName.slice(0, 12);
    }

    const cleanedFallback = cleanString(fallback);
    return (cleanedFallback || "Cendorq").slice(0, 12);
}

function resolveDescription(description: string) {
    const cleanedDescription = cleanString(description);
    if (cleanedDescription) {
        return cleanedDescription;
    }

    return "Cendorq helps businesses become easier for customers, search, and AI discovery to find, understand, trust, and choose before spending more.";
}

function cleanString(value: string | undefined | null) {
    return (value || "").trim();
}
