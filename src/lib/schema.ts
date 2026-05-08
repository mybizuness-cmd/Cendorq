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
    name: "Market Command Intelligence",
    provider: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
    serviceType: "Market command intelligence, free scan signal review, deep review diagnosis, build fix guidance, and ongoing control",
    areaServed: "Worldwide",
    url: absoluteUrl("/plans/deep-review"),
    description:
      "Structured market command intelligence focused on helping a business become easier to find, understand, trust, and choose before spending deeper.",
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Connect with ${siteConfig.name}`,
    url: absoluteUrl("/connect"),
    about: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.siteUrl,
    },
  };
}
