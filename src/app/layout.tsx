import { ConversionClickTracker } from "@/components/conversion/conversion-click-tracker";
import { SiteFooter } from "@/layout/site-footer";
import { SiteHeader } from "@/layout/site-header-conversion";
import { absoluteUrl, siteConfig, toJsonLd } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./tailwind.css";
import "./globals.css";
import "./quality-polish.css";

const siteUrl = new URL(siteConfig.siteUrl);
const siteOrigin = siteUrl.origin;
const BRAND_NAME = siteConfig.name;
const ORGANIZATION_ID = `${siteOrigin}#organization`;
const WEBSITE_ID = `${siteOrigin}#website`;
const SERVICE_ID = `${siteOrigin}#service`;
const OFFER_CATALOG_ID = `${siteOrigin}#offer-catalog`;
const THEME_COLOR = "#ffffff";

const KNOWLEDGE_AREAS = [
  "AI engine readiness",
  "AI readiness for business",
  "AI search visibility",
  "AI answer visibility",
  "Business clarity",
  "Business trust signals",
  "Answer engine visibility",
  "Free Scan",
  "AI Readiness Review",
  "Signal Repair",
  "Readiness Control",
] as const;

const LAYER_CATALOG = [
  {
    name: "Scan",
    path: "/free-check",
    description: "First-read scan that helps a business see where AI engines and customers may misunderstand, distrust, or skip it.",
  },
  {
    name: "Review",
    path: "/plans/deep-review",
    description: "Cause-level AI readiness review of the signals weakening business clarity, proof, visibility, and customer choice.",
  },
  {
    name: "Repair",
    path: "/plans/build-fix",
    description: "Focused signal repair for the clearest weak point after evidence shows what matters most.",
  },
  {
    name: "Control",
    path: "/plans/ongoing-control",
    description: "Recurring readiness control that keeps AI readiness, trust signals, proof, and action paths from drifting.",
  },
] as const;

const contactEmail = normalizeEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: [
    "Cendorq",
    "AI engine readiness",
    "AI readiness for business",
    "AI search visibility",
    "AI answer visibility",
    "answer engine visibility",
    "business clarity scan",
    "business trust signals",
    "free business scan",
    "free scan",
    "AI readiness review",
    "signal repair",
    "readiness control",
  ],
  authors: [{ name: siteConfig.legalName || siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  category: "business",
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    url: siteOrigin,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — AI Engine Readiness`,
    description: siteConfig.description,
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteConfig.name} — AI Engine Readiness` }],
  },
  twitter: { card: "summary_large_image", title: `${siteConfig.name} — AI Engine Readiness`, description: siteConfig.description, images: ["/twitter-image"] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": 0 },
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
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR },
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR },
  ],
  viewportFit: "cover",
};

const structuredData = buildStructuredData();

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US" className="h-full scroll-smooth bg-white" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-950 antialiased selection:bg-cyan-200/40 selection:text-slate-950 [font-synthesis-weight:none] [text-rendering:optimizeLegibility]">
        <ConversionClickTracker />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950 focus:shadow-lg">Skip to content</a>
        <noscript><div className="border-b border-amber-300/40 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">JavaScript is disabled. Some interactive Cendorq experiences may be limited.</div></noscript>
        {structuredData.map((entry, index) => <script key={`structured-data-${index}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(entry) }} />)}
        <div className="relative min-h-screen overflow-x-clip bg-white" data-brand="cendorq">
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="relative z-10 flex-1">{children}</main>
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
    ...(contactEmail ? { email: contactEmail, contactPoint: [{ "@type": "ContactPoint", contactType: "sales", email: contactEmail, areaServed: "Worldwide", availableLanguage: ["en"] }] } : {}),
  };
  const website = { "@context": "https://schema.org", "@type": "WebSite", "@id": WEBSITE_ID, name: BRAND_NAME, url: siteConfig.siteUrl, description: siteConfig.description, inLanguage: "en-US", publisher: { "@id": ORGANIZATION_ID } };
  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: `${BRAND_NAME} AI Engine Readiness`,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    areaServed: "Worldwide",
    provider: { "@id": ORGANIZATION_ID },
    brand: { "@id": ORGANIZATION_ID },
    serviceType: "AI engine readiness and business signal improvement",
    termsOfService: absoluteUrl("/terms"),
    hasOfferCatalog: { "@type": "OfferCatalog", "@id": OFFER_CATALOG_ID, name: "Cendorq Readiness Path", itemListElement: LAYER_CATALOG.map((item) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: item.name, description: item.description, url: absoluteUrl(item.path) } })) },
  };
  return [organization, website, service] as const;
}

function normalizeEmail(value: string | undefined) {
  const cleaned = (value || "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned) ? cleaned : "";
}
