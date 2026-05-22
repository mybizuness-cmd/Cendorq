export type PresenceReportLaunchCheck = Readonly<{
  label: string;
  requiredState: string;
  ownerVisibleReason: string;
}>;

export const PRESENCE_REPORT_LAUNCH_READINESS: readonly PresenceReportLaunchCheck[] = [
  {
    label: "Public promise boundary",
    requiredState: "No rankings, revenue, leads, or AI placement guarantees.",
    ownerVisibleReason: "Cendorq must sell clarity and repair discipline without fake certainty.",
  },
  {
    label: "Free Scan boundary",
    requiredState: "Free Scan remains the first signal before deeper paid work.",
    ownerVisibleReason: "The product should not overcharge before the customer sees a useful first read.",
  },
  {
    label: "Presence Report object",
    requiredState: "Findability, Understanding, Trust, Choice, Action, Repair Queue, and Recommended Next Move are visible.",
    ownerVisibleReason: "The customer needs one product object they can understand fast.",
  },
  {
    label: "Business Truth Profile",
    requiredState: "Approved claims and restricted claims remain separated.",
    ownerVisibleReason: "The system must repair public presence without inventing facts.",
  },
  {
    label: "Choice Gap",
    requiredState: "Competitor comparison stays specific, careful, and evidence-led.",
    ownerVisibleReason: "The business needs choice clarity without fake superiority claims.",
  },
  {
    label: "Control Snapshot",
    requiredState: "Ongoing monitoring is framed as drift detection, not guaranteed results.",
    ownerVisibleReason: "Control should keep the business watchable without making outcome promises.",
  },
  {
    label: "Shared demo report package",
    requiredState: "Sandwork demo surfaces use the shared public-safe report package instead of hardcoded sample objects.",
    ownerVisibleReason: "Reviewers and future report surfaces need one reusable demo source that follows the live scan mapper.",
  },
  {
    label: "Package-source helper",
    requiredState: "Report surfaces use the package-source helper for object-index-backed demo package access instead of direct fixture imports.",
    ownerVisibleReason: "Future report surfaces should reuse the same package access path before live customer snapshots replace the demo source.",
  },
  {
    label: "Vertical standards",
    requiredState: "Category-specific proof standards exist for priority verticals.",
    ownerVisibleReason: "A dentist, med spa, law firm, and contractor do not earn trust the same way.",
  },
] as const;