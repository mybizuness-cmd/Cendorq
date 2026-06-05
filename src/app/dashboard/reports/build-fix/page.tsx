import { PaidReportArtifactShell } from "@/components/dashboard/paid-report-artifact-shell";
import { buildMetadata } from "@/lib/seo";
import { requirePaidPlanReportDeliveryContract } from "@/lib/paid-plan-report-delivery-operating-system";

export const metadata = buildMetadata({
  title: "Build Fix summary | Cendorq",
  description: "Your protected Cendorq Build Fix summary route, held until entitlement, release approval, and approved PDF readiness are complete.",
  path: "/dashboard/reports/build-fix",
  noIndex: true,
});

const REPORT = requirePaidPlanReportDeliveryContract("build-fix");

const RELEASE_REQUIREMENTS = [
  "Active Build Fix entitlement",
  "Customer ownership verified",
  "Approved fix scope recorded",
  "Release-captain approval recorded",
  "Approved customer-safe PDF generated",
] as const;

const MODULES = [
  { label: "Before", value: "Weak signal", detail: "Shows the approved public signal before repair starts." },
  { label: "Work", value: "Scoped fix", detail: "Documents what changed and what stayed outside scope." },
  { label: "After", value: "Completion", detail: "Validates the finished repair before control is recommended." },
] as const;

const LIFECYCLE = [
  { label: "1", value: "Scope approved", detail: "The customer knows the exact weak signal being repaired." },
  { label: "2", value: "Repair completed", detail: "Work is checked against the approved scope." },
  { label: "3", value: "Completion report", detail: "Dashboard copy and PDF record explain what changed." },
] as const;

export default function BuildFixReportPage() {
  return (
    <>
      <PaidReportArtifactShell
        eyebrow="Protected paid report"
        title={REPORT.customerReportName}
        summary="This route is the final dashboard copy location for an approved Build Fix delivery summary. Until release gates pass, the summary must remain held and avoid making unapproved production work look complete."
        status="Held until fix completion"
        route="/dashboard/reports/build-fix"
        releaseGate={REPORT.releaseGate}
        attachmentName={REPORT.attachmentFileNamePattern}
        attachmentType={REPORT.attachmentContentType}
        requirements={RELEASE_REQUIREMENTS}
        modules={MODULES}
        lifecycle={LIFECYCLE}
      />
      <section className="sr-only" aria-label="Build Fix report guardrails">
        /dashboard/reports/build-fix {REPORT.releaseGate} {REPORT.attachmentFileNamePattern} {REPORT.attachmentContentType} no raw internal notes no private credentials no guaranteed outcome no guaranteed ranking no guaranteed AI placement
      </section>
    </>
  );
}
