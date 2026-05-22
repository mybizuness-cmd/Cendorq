import type { ChoiceGapPublicShape } from "@/lib/choice-gap-contract";
import type { BusinessTruthProfilePublicShape } from "@/lib/business-truth-profile-contract";

export type VerticalSamplePresenceReportKey = "dentist" | "med-spa" | "law-firm" | "contractor";

export type VerticalSamplePresenceReport = Readonly<{
  key: VerticalSamplePresenceReportKey;
  label: string;
  category: string;
  trustStandard: string;
  truthProfile: BusinessTruthProfilePublicShape;
  choiceGap: ChoiceGapPublicShape;
  priorityRepairs: readonly string[];
}>;

export const VERTICAL_SAMPLE_PRESENCE_REPORTS: readonly VerticalSamplePresenceReport[] = [
  {
    key: "dentist",
    label: "Sample Dentist Presence Report",
    category: "Dental practice",
    trustStandard: "Patients need clear services, location confidence, recent reviews, insurance or payment clarity, credentials, photos, and a low-friction booking path.",
    truthProfile: {
      businessName: "Sandwork Dental",
      website: "https://example.com/dentist",
      category: "Dental practice",
      primaryLocation: "Sample local market",
      serviceAreas: ["Sample local market"],
      primaryAudience: "Local patients comparing safe and trusted dental care.",
      mainOffer: "General dental care with a clear appointment request path.",
      preferredCta: "Request appointment",
      approvedClaims: [
        { label: "Local dental practice", evidenceNote: "Use with consistent location and service information." },
        { label: "Appointment request path", evidenceNote: "Use when booking or contact path is visible." },
      ],
      restrictedClaims: [
        { label: "Guaranteed treatment outcome", evidenceNote: "Do not use outcome promises." },
      ],
      knownCompetitors: [{ name: "Nearby dental competitor", comparisonReason: "Shows recent reviews and services closer to the booking path." }],
      complianceNotes: ["Keep clinical claims careful and evidence-backed."],
    },
    choiceGap: {
      summary: "The practice may be trusted locally, but competitors can look safer when recent reviews, credentials, and appointment steps are easier to see.",
      signals: [
        { title: "Recent patient proof is not close enough to booking.", severity: "high", customerEffect: "Patients hesitate before requesting care.", aiEffect: "AI systems see less visible trust support.", repairDirection: "Move current reviews and credentials closer to service and booking CTAs." },
      ],
    },
    priorityRepairs: ["Clarify top services above the fold.", "Move recent patient proof near appointment CTA.", "Add service-specific FAQ and insurance or payment clarity."],
  },
  {
    key: "med-spa",
    label: "Sample Med Spa Presence Report",
    category: "Med spa",
    trustStandard: "Customers need service clarity, safety proof, practitioner credentials, real photos, review themes, consultation path, and careful non-exaggerated claims.",
    truthProfile: {
      businessName: "Sandwork Med Spa",
      website: "https://example.com/med-spa",
      category: "Med spa",
      primaryLocation: "Sample local market",
      serviceAreas: ["Sample local market"],
      primaryAudience: "Local customers comparing safe aesthetic providers.",
      mainOffer: "Consultation-led aesthetic services with visible proof and safety information.",
      preferredCta: "Request consultation",
      approvedClaims: [{ label: "Consultation-led service", evidenceNote: "Use when consultation flow is visible." }],
      restrictedClaims: [{ label: "Guaranteed aesthetic result", evidenceNote: "Do not use outcome promises." }],
      knownCompetitors: [{ name: "Nearby med spa competitor", comparisonReason: "Shows practitioner proof and safety language earlier." }],
      complianceNotes: ["Avoid unsupported before-and-after or medical claims."],
    },
    choiceGap: {
      summary: "A med spa can lose choice when services look attractive but safety, practitioner proof, and consultation clarity are not immediately visible.",
      signals: [
        { title: "Safety proof appears too late.", severity: "high", customerEffect: "Customers compare away before booking a consult.", aiEffect: "AI systems have weaker support for trusted recommendation language.", repairDirection: "Place practitioner proof, safety language, and review themes near service CTAs." },
      ],
    },
    priorityRepairs: ["Clarify service categories.", "Move practitioner and safety proof near CTAs.", "Add consultation FAQ and careful expectation language."],
  },
  {
    key: "law-firm",
    label: "Sample Law Firm Presence Report",
    category: "Law firm",
    trustStandard: "Clients need practice-area clarity, attorney proof, jurisdiction or location fit, review themes, process clarity, and a direct consultation path.",
    truthProfile: {
      businessName: "Sandwork Law",
      website: "https://example.com/law",
      category: "Law firm",
      primaryLocation: "Sample local market",
      serviceAreas: ["Sample local market"],
      primaryAudience: "Local clients comparing trusted legal help.",
      mainOffer: "Practice-area guidance with a consultation request path.",
      preferredCta: "Request consultation",
      approvedClaims: [{ label: "Local legal service", evidenceNote: "Use with practice area and location context." }],
      restrictedClaims: [{ label: "Guaranteed case result", evidenceNote: "Do not use legal outcome promises." }],
      knownCompetitors: [{ name: "Nearby law competitor", comparisonReason: "Explains practice areas and attorney proof faster." }],
      complianceNotes: ["Avoid attorney-client relationship implications and outcome guarantees."],
    },
    choiceGap: {
      summary: "The firm may be qualified, but clients and AI systems need clearer practice-area fit and proof before choosing.",
      signals: [
        { title: "Practice-area fit is not fast enough.", severity: "high", customerEffect: "Clients do not know if the firm handles their issue.", aiEffect: "AI systems have weaker source text for matching the firm to the right query.", repairDirection: "Clarify practice areas, location fit, attorney proof, and consultation path." },
      ],
    },
    priorityRepairs: ["Clarify practice areas above the fold.", "Surface attorney proof and process clarity.", "Add careful consultation FAQ."],
  },
  {
    key: "contractor",
    label: "Sample Contractor Presence Report",
    category: "Local contractor",
    trustStandard: "Customers need clear services, service area, photos, license or insurance proof where applicable, review themes, estimate path, and comparison clarity.",
    truthProfile: {
      businessName: "Sandwork Contractor",
      website: "https://example.com/contractor",
      category: "Local contractor",
      primaryLocation: "Sample local market",
      serviceAreas: ["Sample local market", "Nearby towns"],
      primaryAudience: "Local homeowners comparing trusted contractors.",
      mainOffer: "Local contractor service with a clear estimate request path.",
      preferredCta: "Request estimate",
      approvedClaims: [{ label: "Local contractor", evidenceNote: "Use with clear service area." }],
      restrictedClaims: [{ label: "Guaranteed lowest price", evidenceNote: "Avoid unsupported price superiority." }],
      knownCompetitors: [{ name: "Nearby contractor competitor", comparisonReason: "Shows project proof and estimate path sooner." }],
      complianceNotes: ["Use license, insurance, and guarantee language only when verified."],
    },
    choiceGap: {
      summary: "A contractor can lose choice when project proof, service area, and estimate steps are harder to find than competitors.",
      signals: [
        { title: "Project proof is too scattered.", severity: "high", customerEffect: "Homeowners cannot quickly judge fit or trust.", aiEffect: "AI systems have weaker evidence for local provider comparisons.", repairDirection: "Move project photos, review themes, service area, and estimate CTA into a clearer path." },
      ],
    },
    priorityRepairs: ["Clarify services and service area.", "Move project proof near estimate CTA.", "Add local trust and process FAQ."],
  },
] as const;
