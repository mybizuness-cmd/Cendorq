import Link from "next/link";
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

export default function OngoingControlReportPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_24%,#ffffff_100%)] px-4 py-16 text-slate-950 sm:px-6">
      <section className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/80 bg-white/82 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur sm:p-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Protected paid report</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.07em] sm:text-7xl">{REPORT.customerReportName}</h1>
        <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-slate-600">This route is the final dashboard copy location for an approved Ongoing Control monthly summary. Until release gates pass, the summary must remain held and avoid implying algorithm control or unlimited implementation.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {RELEASE_REQUIREMENTS.map((item) => <p key={item} className="rounded-[1.35rem] border border-cyan-100 bg-cyan-50/45 p-4 text-sm font-semibold leading-7 text-slate-600">{item}</p>)}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/dashboard/reports" className="rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">Back to report vault</Link>
          <Link href="/dashboard/support" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-sm font-bold text-cyan-700">Ask report support</Link>
        </div>
      </section>
      <section className="sr-only" aria-label="Ongoing Control report guardrails">
        /dashboard/reports/ongoing-control {REPORT.releaseGate} {REPORT.attachmentFileNamePattern} {REPORT.attachmentContentType} no algorithm control claim no ad management claim no raw evidence no guaranteed ranking no guaranteed AI placement
      </section>
    </main>
  );
}
