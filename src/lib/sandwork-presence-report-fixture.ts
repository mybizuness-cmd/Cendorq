import { mapLiveScanSnapshotToPresenceReport } from "@/lib/live-scan-presence-report-mapping";
import { buildFreeCheckReportSnapshot, type FreeCheckReportInput } from "@/lib/reports/free-check-report";

export const SANDWORK_FREE_SCAN_INPUT = {
  id: "sandwork-protected-preview",
  businessName: "Sandwork",
  businessType: "Local service contractor",
  websiteUrl: "https://example.com",
  websiteHostname: "example.com",
  city: "Sample City",
  stateRegion: "Sample State",
  country: "US",
  primaryOffer: "Clear local service help with a simple request path.",
  audience: "Local customers comparing trusted providers before requesting service.",
  biggestIssue: "Visible, but proof and choice clarity are harder to understand than competitors.",
  competitors: "Competitor A, Competitor B",
  notes: "Protected preview fixture for the first Free Scan Presence Report result.",
  signalQuality: 68,
  clarityScore: 54,
  intentStrength: 72,
  routingHint: "blueprint-candidate",
  score: 49,
  scoreTier: "mid",
  decision: "review",
  strongestPressure: "trust",
  riskFlags: ["proof buried", "choice gap visible"],
  confidenceLevel: "medium",
  dataDepthScore: 66,
  timeSensitivity: "watch",
  decisionMoment: "first protected scan result",
  explanationTrace: [
    "Free Scan remains first signal only.",
    "Trust and choice pressure justify Review before implementation.",
    "Repair Queue must stay evidence-led.",
  ],
  scoreModules: {
    discoverability: 58,
    recommendationVisibility: 46,
    trustAuthority: 41,
    conversionReadiness: 55,
    competitiveExposure: 68,
  },
  createdAt: "2026-05-21T00:00:00.000Z",
  updatedAt: "2026-05-21T00:00:00.000Z",
} as const satisfies FreeCheckReportInput;

export const SANDWORK_FREE_SCAN_SNAPSHOT = buildFreeCheckReportSnapshot(SANDWORK_FREE_SCAN_INPUT);

export const SANDWORK_PRESENCE_REPORT_PACKAGE = mapLiveScanSnapshotToPresenceReport(SANDWORK_FREE_SCAN_SNAPSHOT, {
  businessName: SANDWORK_FREE_SCAN_INPUT.businessName,
  website: SANDWORK_FREE_SCAN_INPUT.websiteUrl,
  category: SANDWORK_FREE_SCAN_INPUT.businessType,
  location: `${SANDWORK_FREE_SCAN_INPUT.city}, ${SANDWORK_FREE_SCAN_INPUT.stateRegion}`,
  primaryOffer: SANDWORK_FREE_SCAN_INPUT.primaryOffer,
  audience: SANDWORK_FREE_SCAN_INPUT.audience,
  preferredCta: "Request service",
});
