import { siteConfig } from "@/lib/seo";
import type { MetadataRoute } from "next";

const APP_BACKGROUND = "#020817";
const APP_THEME = "#020817";

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
        name: "Start Search Presence Scan",
        shortName: "Start Scan",
        description:
            "Begin with the first serious business signal before moving into a deeper layer.",
        url: "/free-check",
    },
    {
        name: "View Visibility Blueprint",
        shortName: "Blueprint",
        description:
            "Review the deeper strategic explanation layer before concentrated strengthening begins.",
        url: "/pricing/full-diagnosis",
    },
    {
        name: "Compare System Layers",
        shortName: "Plans",
        description:
            "Compare Search Presence Scan, Visibility Blueprint, Presence Infrastructure, and Presence Command.",
        url: "/pricing",
    },
    {
        name: "Ask Which Layer Fits",
        shortName: "Contact",
        description:
            "Use the direct communication lane when the business is clear enough to ask the right question.",
        url: "/contact",
    },
] as const;

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: resolveManifestName(siteConfig.legalName, siteConfig.name),
        short_name: resolveShortName(siteConfig.shortName, siteConfig.name),
        description: resolveDescription(siteConfig.description),
        start_url: "/",
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
        return cleanedLegalName;
    }

    return cleanString(fallback) || "Cendorq";
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

    return "Cendorq helps businesses strengthen search presence through stronger signal, stronger strategy, stronger infrastructure, and stronger ongoing command.";
}

function cleanString(value: string | undefined | null) {
    return (value || "").trim();
}
