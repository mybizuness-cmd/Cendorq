import { absoluteUrl, siteConfig } from "./seo";

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
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    description: siteConfig.description,
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Engine Readiness",
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
    serviceType: "AI engine readiness, free scan signal review, AI Readiness Review, Signal Repair guidance, and Readiness Control",
    areaServed: "Worldwide",
    url: absoluteUrl("/plans/deep-review"),
    description:
      "Structured AI readiness focused on helping a business become easier to find, understand, trust, and choose before spending deeper.",
  };
}
