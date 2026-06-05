import { PaidReportArtifactShell } from "@/components/dashboard/paid-report-artifact-shell";
import { buildMetadata } from "@/lib/seo";
import { requirePaidPlanReportDeliveryContract } from "@/lib/paid-plan-report-delivery-operating-system";

export const metadata = buildMetadata({
  title: "Ongoing Control monthly summary | Cendorq",
  description: "Your protected Cendorq Ongoing Control monthly summary route, held until subscription, release approval, and approved PDF readiness are complete.",
  path: "/dashboard/reports/ongoing-control",
  noIndex: true,
});

const REPORT = requirePaidPlanReportDeliveryContract("ongoing-control");

const RELEASE_REQUIREMENTS = [
  "Active Ongoing Control subscription",
  "Customer ownership verified",
  "Monthly monitoring scope confirmed",
  "Release-captain approval recorded",
  "Approved customer-safe PDF generated",
] as const;

const MODULES = [
  { label: "Drift", value: "Signal movement", detail: "Shows what improved, weakened, or stayed stable this month." },
  { label: "Pressure", value: "Context watch", detail: "Keeps competitor and AI/search posture from going stale." },
  { label: "Next", value: "Monthly priorities", detail: "Routes only the most important changes to the next command." },
] as const;

const LIFECYCLE = [
  { label: "1", value: "Monitor", detail: "Signal health is checked against the active control scope." },
  { label: "2", value: "Snapshot", detail: "Monthly findings are summarized with limits and confidence." },
  { label: "3", value: "Deliver", detail: "Dashboard copy and PDF/email artifact stay aligned." },
] as const;

export default function OngoingControlReportPage() {
  return (
    <>
      <PaidReportArtifactShell
        eyebrow="Protected paid report"
        title={REPORT.customerReportName}
        summary="This route is the final dashboard copy location for an approved Ongoing Control monthly summary. Until release gates pass, the summary must remain held and avoid implying algorithm control or unlimited implementation."
        status="Held until monthly release"
        route="/dashboard/reports/ongoing-control"
        releaseGate={REPORT.releaseGate}
        attachmentName={REPORT.attachmentFileNamePattern}
        attachmentType={REPORT.attachmentContentType}
        requirements={RELEASE_REQUIREMENTS}
        modules={MODULES}
        lifecycle={LIFECYCLE}
      />
      <section className="sr-only" aria-label="Ongoing Control report guardrails">
        /dashboard/reports/ongoing-control {REPORT.releaseGate} {REPORT.attachmentFileNamePattern} {REPORT.attachmentContentType} no algorithm control claim no ad management claim no raw evidence no guaranteed ranking no guaranteed AI placement
      </section>
    </>
  );
}
