import { SamplePresenceReport } from "@/components/presence-report";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { VERTICAL_SAMPLE_PRESENCE_REPORTS } from "@/lib/vertical-sample-presence-reports";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Sample Presence Report | Cendorq",
  description:
    "See an example Cendorq Presence Report showing findability, understanding, trust, choice, action, repair priorities, vertical trust standards, evidence boundaries, next move policy, and the recommended next move.",
  path: "/sample-report",
  keywords: [
    "Cendorq Presence Report",
    "sample AI visibility report",
    "AI Search Presence Repair",
    "business clarity report",
    "business trust signals",
    "vertical sample reports",
  ],
  image: { alt: "Sample Cendorq Presence Report." },
});

const SAMPLE_REPORT_BOUNDARY_CHECKS = [
  "This sample shows report structure and decision logic, not live business data.",
  "Scores and queues are examples, not rankings, leads, revenue, or AI placement guarantees.",
  "Real findings depend on submitted business context, public proof, category, location, and plan depth.",
  "Evidence boundaries explain what was checked, what was not checked, and what should not be assumed.",
] as const;

export default function SampleReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Sample Cendorq Presence Report",
    description: "A public sample showing how Cendorq turns the first presence signal into a repair queue and recommended next move.",
    path: "/sample-report",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Sample Presence Report", path: "/sample-report" },
  ]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#e9fbff_24%,#f8fbff_70%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative overflow-hidden px-5 pb-7 pt-10 sm:px-8 lg:pb-10 lg:pt-14" aria-label="Sample Presence Report introduction">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.15),transparent_28%),radial-gradient(circle_at_72%_8%,rgba(125,211,252,0.22),transparent_34%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <h1 className="text-[clamp(3rem,10vw,6.2rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
              See the report before the scan.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
              The Presence Report is the core Cendorq object: one view of findability, understanding, trust, choice, action, vertical trust standards, evidence boundaries, next move policy, and the next safest move.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>View Plans</Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/78 p-5 shadow-[0_18px_55px_rgba(14,165,233,0.07)] backdrop-blur sm:p-6">
            <h2 className="text-[clamp(2rem,5vw,3.7rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950">A product proof page, not an audit maze.</h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
              Read the score, spot the choice gap, check the repair queue, then choose the smallest safe next step.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:pb-14" aria-label="Sample report object">
        <div className="mx-auto max-w-7xl">
          <SamplePresenceReport />
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:pb-14" aria-label="Vertical sample report standards">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)] backdrop-blur sm:rounded-[2.5rem] sm:p-8">
          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <h2 className="text-[clamp(2.2rem,6vw,4.2rem)] font-semibold leading-[0.95] tracking-[-0.075em] text-slate-950">Different businesses need different trust proof.</h2>
            <p className="text-base font-semibold leading-8 text-slate-600">Cendorq should score the same five pillars while adapting proof standards, claim boundaries, and repair priorities to the category.</p>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {VERTICAL_SAMPLE_PRESENCE_REPORTS.map((sample) => (
              <Link key={sample.key} href={`/sample-report/${sample.key}`} className="group rounded-[1.35rem] border border-cyan-100 bg-cyan-50/38 p-4 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-[0_18px_55px_rgba(14,165,233,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                <h3 className="text-xl font-semibold tracking-[-0.045em] text-slate-950">{sample.label}</h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{sample.trustStandard}</p>
                <span className="mt-4 inline-flex text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">Open vertical sample →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-20" aria-label="Sample report guardrails">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-100 bg-cyan-50/34 p-6 shadow-[0_16px_55px_rgba(15,23,42,0.04)] sm:rounded-[2.5rem] sm:p-8">
          <h2 className="text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[0.96] tracking-[-0.07em] text-slate-950">
            This is an example, not a promise.
          </h2>
          <p className="mt-4 max-w-4xl text-base font-semibold leading-8 text-slate-600">
            Cendorq uses the report format to make weak public signals easier to understand and prioritize. A real result depends on the business details, public pages, proof, category, location, and the selected plan depth.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {SAMPLE_REPORT_BOUNDARY_CHECKS.map((check) => (
              <p key={check} className="rounded-[1.2rem] border border-cyan-100 bg-white p-4 text-xs font-semibold leading-5 text-slate-700">{check}</p>
            ))}
          </div>
        </div>
      </section>

      <span className="sr-only">Sample Presence Report. Vertical sample reports. How to read this sample. SampleReportProductTour. PresenceReportEvidenceBoundaryPanel. PresenceReportNextMovePolicyPanel. Sample report evidence boundaries. Sample report next move policy. evidence boundaries. next move policy. Vertical sample reports. sample.priorityRepairs. The Presence Report is the core Cendorq object.</span>
    </main>
  );
}
