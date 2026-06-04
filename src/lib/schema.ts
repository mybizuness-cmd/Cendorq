import { absoluteUrl, siteConfig } from "./seo";

const KNOWS_ABOUT = [
  "AI Search Presence Repair",
  "Presence Report",
  "Choice Gap",
  "Repair Queue",
  "Free Scan",
  "Deep Review",
  "Build Fix",
  "Ongoing Control",
] as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.siteUrl,
    email: siteConfig.email,
    telephone: siteConfig.phone || undefined,
    description: siteConfig.description,
    knowsAbout: [...KNOWS_ABOUT],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
    potentialAction: {
      "@type": "ReadAction",
      target: [absoluteUrl("/free-check"), absoluteUrl("/sample-report"), absoluteUrl("/plans")],
    },
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Search Presence Repair",
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
    serviceType: "AI Search Presence Repair, Free Scan, Presence Report, Choice Gap, Repair Queue, Deep Review, Build Fix, and Ongoing Control",
    areaServed: "Worldwide",
    url: absoluteUrl("/plans"),
    description:
      "Structured AI Search Presence Repair focused on helping a business become easier for AI, search, and customers to find, understand, trust, compare, and choose before spending deeper.",
    knowsAbout: [...KNOWS_ABOUT],
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${siteConfig.name} Contact Us`,
    url: absoluteUrl("/connect"),
    about: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
  };
}
