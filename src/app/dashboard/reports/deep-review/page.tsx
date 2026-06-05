import { PaidReportArtifactShell } from "@/components/dashboard/paid-report-artifact-shell";
import { buildMetadata } from "@/lib/seo";
import { requirePaidPlanReportDeliveryContract } from "@/lib/paid-plan-report-delivery-operating-system";

export const metadata = buildMetadata({
  title: "Deep Review report | Cendorq",
  description: "Your protected Cendorq Deep Review report route, held until entitlement, release approval, and approved PDF readiness are complete.",
  path: "/dashboard/reports/deep-review",
  noIndex: true,
});

const REPORT = requirePaidPlanReportDeliveryContract("deep-review");

const RELEASE_REQUIREMENTS = [
  "Active Deep Review entitlement",
  "Customer ownership verified",
  "Release-captain approval recorded",
  "Approved customer-safe PDF generated",
  "Dashboard copy and email attachment generated from the same approved report version",
] as const;

const MODULES = [
  { label: "Score", value: "Presence Score", detail: "Shows the current readiness state before repair begins." },
  { label: "Gap", value: "Choice Gap", detail: "Explains why customers or AI/search systems may hesitate." },
  { label: "Priorities", value: "Repair order", detail: "Ranks what should be fixed first and why." },
] as const;

const LIFECYCLE = [
  { label: "1", value: "Evidence assembled", detail: "Public signal, confidence, and limits are organized first." },
  { label: "2", value: "Report approved", detail: "Customer-safe findings are checked before release." },
  { label: "3", value: "PDF delivered", detail: "Dashboard copy and email artifact stay matched." },
] as const;

export default function DeepReviewReportPage() {
  return (
    <>
      <PaidReportArtifactShell
        eyebrow="Protected paid report"
        title={REPORT.customerReportName}
        summary="This route is the final dashboard copy location for an approved Deep Review. Until release gates pass, the report must remain held and route customers back to plan or support paths."
        status="Held until release approval"
        route="/dashboard/reports/deep-review"
        releaseGate={REPORT.releaseGate}
        attachmentName={REPORT.attachmentFileNamePattern}
        attachmentType={REPORT.attachmentContentType}
        requirements={RELEASE_REQUIREMENTS}
        modules={MODULES}
        lifecycle={LIFECYCLE}
      />
      <section className="sr-only" aria-label="Deep Review report guardrails">
        /dashboard/reports/deep-review {REPORT.releaseGate} {REPORT.attachmentFileNamePattern} {REPORT.attachmentContentType} no raw evidence no private credentials no guaranteed ranking no guaranteed AI placement
      </section>
    </>
  );
}
