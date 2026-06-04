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
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
    },
] as const;

const SHORTCUTS: readonly ShortcutDefinition[] = [
    {
        name: "Start Free Scan",
        shortName: "Free Scan",
        description: "Start the first AI Search Presence Repair signal.",
        url: "/free-check?source=manifest-shortcut",
    },
    {
        name: "Open Sample Report",
        shortName: "Sample",
        description: "See the Cendorq Presence Report, Choice Gap, and Repair Queue sample.",
        url: "/sample-report?source=manifest-shortcut",
    },
    {
        name: "Compare Plans",
        shortName: "Plans",
        description: "Compare Scan, Review, Repair, and Control depth.",
        url: "/plans?source=manifest-shortcut",
    },
] as const;

export default function manifest(): MetadataRoute.Manifest {
    return {
        id: "/",
        name: `${resolveManifestName(siteConfig.legalName, siteConfig.name)} — AI Search Presence Repair`,
        short_name: resolveShortName(siteConfig.shortName, siteConfig.name),
        description: resolveDescription(siteConfig.description),
        start_url: "/?source=app-manifest",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "minimal-ui", "browser"],
        orientation: "portrait-primary",
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

    return "Cendorq helps businesses become easier for AI, search, and customers to find, understand, trust, compare, and choose before spending more.";
}

function cleanString(value: string | undefined | null) {
    return (value || "").trim();
}
