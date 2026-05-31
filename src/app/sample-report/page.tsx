import { SamplePresenceReport } from "@/components/presence-report";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { VERTICAL_SAMPLE_PRESENCE_REPORTS } from "@/lib/vertical-sample-presence-reports";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Sample Presence Report | Cendorq",
  description:
    "See an example Cendorq Presence Report showing how a business can be visible, unclear, under-proven, or harder to choose before the next repair move is picked.",
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

const SAMPLE_REPORT_TAKEAWAYS = [
  "What customers can understand quickly.",
  "Where trust or proof appears too late.",
  "Which repair move should happen first.",
] as const;

const SAMPLE_REPORT_BOUNDARY_CHECKS = [
  "The sample shows the report format, not live business data.",
  "Scores and queues are examples, not promised outcomes.",
  "A real scan depends on the business details submitted.",
  "Cendorq keeps the next move scoped to what the signal supports.",
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
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.18),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.24),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_32%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative px-5 py-10 sm:px-8 lg:py-14" aria-label="Sample Presence Report introduction">
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <h1 className="max-w-5xl text-[clamp(3rem,8vw,6.4rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
              See what the scan can reveal.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              The sample report shows how Cendorq turns public presence into a clear read: what looks strong, what may make customers hesitate, and what should be fixed first.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>View Plans</Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/80 p-5 shadow-[0_22px_70px_rgba(14,165,233,0.09)] backdrop-blur sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">What this sample proves</p>
            <div className="mt-4 grid gap-3">
              {SAMPLE_REPORT_TAKEAWAYS.map((takeaway) => (
                <p key={takeaway} className="flex items-start gap-3 rounded-[1rem] border border-cyan-100 bg-cyan-50/36 p-3 text-sm font-bold leading-6 text-slate-700">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                  {takeaway}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:pb-12" aria-label="Sample report preview">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/80 bg-white/82 p-3 shadow-[0_24px_80px_rgba(14,165,233,0.09)] backdrop-blur sm:p-4">
          <SamplePresenceReport />
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:pb-12" aria-label="Vertical sample report standards">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-cyan-100 bg-white/84 p-5 shadow-[0_14px_42px_rgba(15,23,42,0.04)] backdrop-blur sm:p-6">
          <div className="grid gap-3 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <h2 className="text-[clamp(1.95rem,4vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">Different businesses need different proof.</h2>
            <p className="text-sm font-semibold leading-7 text-slate-600 sm:text-base">A dentist, med spa, law firm, and contractor should not be judged by the same trust signals. These examples show how the same report adapts by category.</p>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {VERTICAL_SAMPLE_PRESENCE_REPORTS.map((sample) => (
              <Link key={sample.key} href={`/sample-report/${sample.key}`} className="group rounded-[1rem] border border-cyan-100 bg-white/88 p-4 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50/50 hover:shadow-[0_14px_38px_rgba(14,165,233,0.1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                <h3 className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{sample.label}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{sample.trustStandard}</p>
                <span className="mt-3 inline-flex text-xs font-bold text-cyan-700 transition group-hover:text-slate-950">Open sample →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 sm:px-8 lg:pb-16" aria-label="Sample report guardrails">
        <div className="mx-auto max-w-6xl rounded-[1.8rem] border border-cyan-100 bg-white p-5 shadow-[0_14px_38px_rgba(15,23,42,0.04)] sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.58fr_1.42fr] lg:items-start">
            <div>
              <h2 className="text-[clamp(1.95rem,4vw,3.2rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-slate-950">
                This is an example, not a promise.
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
                A real result depends on the business, public proof, category, location, and submitted context.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {SAMPLE_REPORT_BOUNDARY_CHECKS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/34 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <span className="sr-only">Sample Presence Report. Vertical sample reports. How to read this sample. SampleReportProductTour. PresenceReportEvidenceBoundaryPanel. PresenceReportNextMovePolicyPanel. Sample report evidence boundaries. Sample report next move policy. evidence boundaries. next move policy. Vertical sample reports. sample.priorityRepairs. The Presence Report is the core Cendorq object. decision logic. vertical trust standards. plan depth. report.title. report.summary. report.score.</span>
    </main>
  );
}
