import { SiteFooter } from "@/layout/site-footer";
import { SiteHeader } from "@/layout/site-header";
import { absoluteUrl, siteConfig, toJsonLd } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = new URL(siteConfig.siteUrl);
const siteOrigin = siteUrl.origin;

const BRAND_NAME = siteConfig.name;
const ORGANIZATION_ID = `${siteOrigin}#organization`;
const WEBSITE_ID = `${siteOrigin}#website`;
const SERVICE_ID = `${siteOrigin}#service`;
const OFFER_CATALOG_ID = `${siteOrigin}#offer-catalog`;

const THEME_COLOR = "#020617";

const KNOWLEDGE_AREAS = [
  "Search Presence OS",
  "Search Presence Scan",
  "Visibility Blueprint",
  "Presence Infrastructure",
  "Presence Command",
  "AI search visibility",
  "Answer engine visibility",
  "Business visibility strategy",
  "Trust clarity positioning action analysis",
] as const;

const LAYER_CATALOG = [
  {
    name: "Search Presence Scan",
    path: "/free-check",
    description:
      "First-signal intake layer for businesses that need a stronger initial read before deeper action.",
  },
  {
    name: "Visibility Blueprint",
    path: "/pricing/full-diagnosis",
    description:
      "Strategic explanation layer for businesses that need a deeper interpretation before concentrated strengthening.",
  },
  {
    name: "Presence Infrastructure",
    path: "/pricing/optimization",
    description:
      "One-time concentrated implementation layer for businesses ready for structural strengthening.",
  },
  {
    name: "Presence Command",
    path: "/pricing/monthly-partner",
    description:
      "Recurring continuity layer for businesses ready to compound through ongoing strategic direction.",
  },
] as const;

const contactEmail = normalizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
  keywords: [
    "Cendorq",
    "Search Presence OS",
    "search presence scan",
    "visibility blueprint",
    "presence infrastructure",
    "presence command",
    "AI search visibility",
    "answer engine visibility",
    "business search presence",
    "search relevance strategy",
  ],
  authors: [{ name: siteConfig.legalName || siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  category: "business",
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  appleWebApp: {
    capable: true,
    title: siteConfig.shortName,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    url: siteOrigin,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Search Presence OS`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "512x512" },
      { url: "/icon", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    shortcut: [{ url: "/icon", type: "image/png", sizes: "192x192" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR },
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR },
  ],
  viewportFit: "cover",
};

const structuredData = buildStructuredData();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className="h-full scroll-smooth bg-slate-950"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-slate-950 text-white antialiased selection:bg-cyan-300/20 selection:text-white [font-synthesis-weight:none] [text-rendering:optimizeLegibility]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
        >
          Skip to content
        </a>

        <noscript>
          <div className="border-b border-amber-300/20 bg-amber-300/10 px-4 py-3 text-center text-sm text-amber-100">
            JavaScript is disabled. Some interactive Cendorq experiences may be limited.
          </div>
        </noscript>

        {structuredData.map((entry, index) => (
          <script
            key={`structured-data-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: toJsonLd(entry),
            }}
          />
        ))}

        <div
          className="relative min-h-screen overflow-x-clip bg-slate-950"
          data-brand="cendorq"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.09),transparent_28%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.08),transparent_24%),radial-gradient(circle_at_bottom_center,rgba(34,211,238,0.05),transparent_34%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),transparent_18%,transparent_82%,rgba(255,255,255,0.014))]" />
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-400/8 blur-3xl sm:h-96 sm:w-96" />
            <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-sky-400/8 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
            <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/6 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
            <div className="system-grid-wide absolute inset-0 opacity-[0.02]" />
            <div className="system-scan-line absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
          </div>

          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />

            <main id="main-content" className="relative z-10 flex-1">
              {children}
            </main>

            <SiteFooter />
          </div>
        </div>
      </body>
    </html>
  );
}

function buildStructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: BRAND_NAME,
    legalName: siteConfig.legalName,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    logo: absoluteUrl("/icon"),
    image: absoluteUrl("/opengraph-image"),
    knowsAbout: [...KNOWLEDGE_AREAS],
    ...(contactEmail
      ? {
        email: contactEmail,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: contactEmail,
            areaServed: "Worldwide",
            availableLanguage: ["en"],
          },
        ],
      }
      : {}),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND_NAME,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@id": ORGANIZATION_ID,
    },
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: BRAND_NAME,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    areaServed: "Worldwide",
    provider: {
      "@id": ORGANIZATION_ID,
    },
    brand: {
      "@id": ORGANIZATION_ID,
    },
    serviceType: "Search Presence OS",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "@id": OFFER_CATALOG_ID,
      name: "Cendorq System Layers",
      itemListElement: LAYER_CATALOG.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.name,
          description: item.description,
          url: absoluteUrl(item.path),
        },
      })),
    },
  };

  return [organization, website, service] as const;
}

function normalizeEmail(value: string | undefined) {
  const cleaned = (value || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}