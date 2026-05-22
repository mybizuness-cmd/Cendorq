import { SAMPLE_CHOICE_GAP, type ChoiceGapPublicShape } from "@/lib/choice-gap-contract";
import { SAMPLE_CONTROL_SNAPSHOT, type ControlSnapshotPublicShape } from "@/lib/control-snapshot-contract";
import { SAMPLE_BUSINESS_TRUTH_PROFILE, type BusinessTruthProfilePublicShape } from "@/lib/business-truth-profile-contract";
import { SAMPLE_PRESENCE_REPORT, type PresenceReportPublicShape } from "@/lib/presence-report-contract";

export type PresenceReportGenerationInput = Readonly<{
  businessName?: string;
  website?: string;
  category?: string;
  location?: string;
  primaryOffer?: string;
  audience?: string;
  preferredCta?: string;
}>;

export type GeneratedPresenceReportPackage = Readonly<{
  report: PresenceReportPublicShape;
  businessTruthProfile: BusinessTruthProfilePublicShape;
  choiceGap: ChoiceGapPublicShape;
  controlSnapshot: ControlSnapshotPublicShape;
}>;

export function buildPresenceReportPackage(input: PresenceReportGenerationInput = {}): GeneratedPresenceReportPackage {
  const businessName = clean(input.businessName) || SAMPLE_BUSINESS_TRUTH_PROFILE.businessName;
  const website = clean(input.website) || SAMPLE_BUSINESS_TRUTH_PROFILE.website;
  const category = clean(input.category) || SAMPLE_BUSINESS_TRUTH_PROFILE.category;
  const location = clean(input.location) || SAMPLE_BUSINESS_TRUTH_PROFILE.primaryLocation;
  const mainOffer = clean(input.primaryOffer) || SAMPLE_BUSINESS_TRUTH_PROFILE.mainOffer;
  const audience = clean(input.audience) || SAMPLE_BUSINESS_TRUTH_PROFILE.primaryAudience;
  const preferredCta = clean(input.preferredCta) || SAMPLE_BUSINESS_TRUTH_PROFILE.preferredCta;

  return {
    report: SAMPLE_PRESENCE_REPORT,
    businessTruthProfile: {
      ...SAMPLE_BUSINESS_TRUTH_PROFILE,
      businessName,
      website,
      category,
      primaryLocation: location,
      primaryAudience: audience,
      mainOffer,
      preferredCta,
    },
    choiceGap: SAMPLE_CHOICE_GAP,
    controlSnapshot: SAMPLE_CONTROL_SNAPSHOT,
  } as const;
}

function clean(value: string | undefined) {
  return (value || "").trim();
}
