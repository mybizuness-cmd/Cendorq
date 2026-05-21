export type ChoiceGapSeverity = "low" | "medium" | "high" | "critical";

export type ChoiceGapSignal = Readonly<{
  title: string;
  severity: ChoiceGapSeverity;
  customerEffect: string;
  aiEffect: string;
  repairDirection: string;
}>;

export type ChoiceGapPublicShape = Readonly<{
  summary: string;
  signals: readonly ChoiceGapSignal[];
}>;

export const SAMPLE_CHOICE_GAP: ChoiceGapPublicShape = {
  summary: "The business may be capable, but nearby competitors are easier to understand, trust, and choose from public signals alone.",
  signals: [
    {
      title: "Competitor explains the service faster.",
      severity: "high",
      customerEffect: "A rushed buyer understands the competitor before understanding this business.",
      aiEffect: "An answer system has clearer source text for the competitor.",
      repairDirection: "Clarify offer, audience, location, and primary next step above the fold.",
    },
    {
      title: "Competitor shows proof closer to action.",
      severity: "high",
      customerEffect: "The competitor feels safer at the moment of booking or requesting service.",
      aiEffect: "Visible proof creates stronger support for trusted summaries and comparisons.",
      repairDirection: "Move reviews, credentials, photos, and process proof closer to the CTA.",
    },
    {
      title: "Competitor answers buyer questions better.",
      severity: "medium",
      customerEffect: "The buyer has fewer objections left before contacting the competitor.",
      aiEffect: "Answer-ready content gives AI systems more useful source material.",
      repairDirection: "Add service-specific FAQs and local decision support blocks.",
    },
  ],
} as const;
