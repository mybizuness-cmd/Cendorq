import type { CommandCenterValidationRegistryItem } from "./validation-registry";

export const BRAND_LEGAL_VALIDATION_REGISTRY_ADDENDUM = [
  {
    key: "current-operating-research-notes",
    label: "Current operating research notes",
    scriptPath: "src/scripts/validate-current-operating-research-notes.mjs",
    category: "docs",
    requiredInValidateRoutes: true,
    protectedBoundary: "current-source research discipline for search, AI discovery, analytics, performance, advertising readiness, brand filing preparation, security, deliverability, and deployment posture",
    failureMeaning: "Current operating research may no longer be locked into doctrine, route-chain execution, docs visibility, or safe no-guarantee boundaries.",
  },
  {
    key: "brand-trademark-operating-standard",
    label: "Brand and trademark operating standard",
    scriptPath: "src/scripts/validate-brand-trademark-operating-standard.mjs",
    category: "docs",
    requiredInValidateRoutes: true,
    protectedBoundary: "wordmark, signal mark, logo ownership, clearance review, five owner filing steps, specimens, qualified legal review, and no guaranteed registration or competitor blocking claims",
    failureMeaning: "Brand or trademark posture may no longer protect logo provenance, filing readiness, legal-review boundaries, or no-guarantee trademark language.",
  },
  {
    key: "logo-readiness-standard",
    label: "Logo readiness standard",
    scriptPath: "src/scripts/validate-logo-readiness-standard.mjs",
    category: "docs",
    requiredInValidateRoutes: true,
    protectedBoundary: "Cendorq signal mark source artwork, visual clearance, owner files, small-size recognition, and wordmark-plus-signal consistency",
    failureMeaning: "The logo may no longer be tracked for provenance, distinctiveness, owner files, or current header mark consistency.",
  },
  {
    key: "legal-trust-crawler-readiness-standard",
    label: "Legal trust crawler readiness standard",
    scriptPath: "src/scripts/validate-legal-trust-crawler-readiness-standard.mjs",
    category: "docs",
    requiredInValidateRoutes: true,
    protectedBoundary: "policy pages, sitemap, robots, security contact, public trust signals, concise boundaries, advertising-readiness, and private-customer discovery separation",
    failureMeaning: "Public trust, crawler readiness, legal boundary placement, ad-platform posture, or private surface separation may have drifted.",
  },
  {
    key: "owner-brand-legal-trust-addendum",
    label: "Owner brand legal trust addendum",
    scriptPath: "src/scripts/validate-owner-brand-legal-trust-addendum.mjs",
    category: "docs",
    requiredInValidateRoutes: true,
    protectedBoundary: "owner-facing logo provenance, legal review, crawler trust alignment, and confidence-safe public boundary language",
    failureMeaning: "Owner-level brand, logo, legal, and public trust guidance may have become detached from the route-chain.",
  },
] as const satisfies readonly CommandCenterValidationRegistryItem[];

export function getBrandLegalValidationRegistryAddendum() {
  return BRAND_LEGAL_VALIDATION_REGISTRY_ADDENDUM;
}
