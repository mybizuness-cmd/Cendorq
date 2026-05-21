export type BusinessTruthProfileClaim = Readonly<{
  label: string;
  evidenceNote: string;
}>;

export type BusinessTruthProfileCompetitor = Readonly<{
  name: string;
  website?: string;
  comparisonReason: string;
}>;

export type BusinessTruthProfilePublicShape = Readonly<{
  businessName: string;
  website: string;
  category: string;
  primaryLocation: string;
  serviceAreas: readonly string[];
  primaryAudience: string;
  mainOffer: string;
  preferredCta: string;
  approvedClaims: readonly BusinessTruthProfileClaim[];
  restrictedClaims: readonly BusinessTruthProfileClaim[];
  knownCompetitors: readonly BusinessTruthProfileCompetitor[];
  complianceNotes: readonly string[];
}>;

export const SAMPLE_BUSINESS_TRUTH_PROFILE: BusinessTruthProfilePublicShape = {
  businessName: "Sandwork",
  website: "https://example.com",
  category: "Local service contractor",
  primaryLocation: "Sample local market",
  serviceAreas: ["Sample local market", "Nearby service area"],
  primaryAudience: "Local customers comparing trusted providers before requesting service.",
  mainOffer: "Clear local service help with a simple request path.",
  preferredCta: "Request service",
  approvedClaims: [
    { label: "Local service provider", evidenceNote: "Use only where the service area is visible and consistent." },
    { label: "Clear estimate path", evidenceNote: "Use only when the page explains how the next step works." },
    { label: "Customer-first repair process", evidenceNote: "Use only with visible process proof or approved business context." },
  ],
  restrictedClaims: [
    { label: "Ranking promise", evidenceNote: "Cendorq must not promise rankings, leads, revenue, or AI placement." },
    { label: "AI placement promise", evidenceNote: "Cendorq repairs public signals without claiming controlled AI recommendations." },
    { label: "Unverified best-in-market claim", evidenceNote: "Comparison language must be specific, evidence-backed, and careful." },
  ],
  knownCompetitors: [
    { name: "Competitor A", comparisonReason: "Explains services faster above the fold." },
    { name: "Competitor B", comparisonReason: "Shows proof closer to the booking path." },
  ],
  complianceNotes: [
    "Use approved business facts before public repair language.",
    "Do not invent credentials, reviews, guarantees, locations, or service claims.",
    "Keep Free Scan positioned as a first signal, not a full diagnosis.",
  ],
} as const;
