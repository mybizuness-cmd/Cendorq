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
    name: "Search Presence OS",
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
    serviceType: "Search presence intelligence, strategic visibility guidance, and system strengthening",
    areaServed: "Worldwide",
    url: absoluteUrl("/diagnosis"),
    description:
      "Structured search-presence diagnosis focused on trust, clarity, positioning, action readiness, and route sequencing.",
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${siteConfig.name}`,
    url: absoluteUrl("/contact"),
    about: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
  };
}
