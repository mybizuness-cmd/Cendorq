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
    name: "AI Engine Visibility and Readiness",
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
    serviceType: "AI visibility and readiness, Free Scan signal review, Deep Review, Build Fix, and Ongoing Control",
    areaServed: "Worldwide",
    url: absoluteUrl("/plans/deep-review"),
    description:
      "Structured AI visibility and readiness support focused on helping a business become easier to find, understand, trust, and choose before spending deeper.",
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
