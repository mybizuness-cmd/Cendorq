import Link from "next/link";
import { SamplePresenceReport } from "@/components/presence-report";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { VERTICAL_SAMPLE_PRESENCE_REPORTS } from "@/lib/vertical-sample-presence-reports";

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
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.2),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_38%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <SampleReportAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-8 px-4 pb-10 pt-8 sm:px-6 md:pt-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center" aria-label="Sample Presence Report introduction">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Sample Presence Report</p>
          <h1 className="max-w-5xl text-[clamp(3rem,7vw,6.6rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">See what the scan can reveal.</h1>
          <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-xl sm:leading-9">
            The sample report shows how Cendorq turns public presence into a clear read: what looks strong, what may make customers hesitate, and what should be fixed first.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
            <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>View Plans</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/78 p-5 shadow-[0_30px_100px_rgba(15,23,42,0.09)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">What this sample proves</p>
          <div className="mt-5 grid gap-3">
            {SAMPLE_REPORT_TAKEAWAYS.map((takeaway) => (
              <p key={takeaway} className="flex items-start gap-3 rounded-[1.25rem] border border-cyan-100 bg-cyan-50/42 p-4 text-xs font-semibold leading-6 text-slate-700 shadow-sm">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" aria-hidden="true" />
                {takeaway}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[96rem] px-3 pb-8 sm:px-6" aria-label="Sample report preview">
        <div className="overflow-hidden rounded-[2.35rem] border border-white/80 bg-white/84 p-2 shadow-[0_24px_80px_rgba(14,165,233,0.085)] backdrop-blur sm:p-4">
          <SamplePresenceReport />
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Vertical sample report standards">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.06em] text-slate-950 sm:text-5xl">Different businesses need different proof.</h2>
            <p className="text-sm font-semibold leading-7 text-slate-600 sm:text-base">A dentist, med spa, law firm, and contractor should not be judged by the same trust signals. These examples show how the same report adapts by category.</p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {VERTICAL_SAMPLE_PRESENCE_REPORTS.map((sample) => (
              <Link key={sample.key} href={`/sample-report/${sample.key}`} className="group rounded-[1.25rem] border border-cyan-100 bg-cyan-50/42 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                <h3 className="text-lg font-semibold tracking-[-0.04em] text-slate-950">{sample.label}</h3>
                <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{sample.trustStandard}</p>
                <span className="mt-3 inline-flex text-xs font-bold text-cyan-700 transition group-hover:text-slate-950">Open sample →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Sample report guardrails">
        <div className="overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">This is an example, not a promise.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">A real result depends on the business, public proof, category, location, and submitted context.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {SAMPLE_REPORT_BOUNDARY_CHECKS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/40 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <span className="sr-only">Sample Presence Report. Vertical sample reports. How to read this sample. SampleReportProductTour. PresenceReportEvidenceBoundaryPanel. PresenceReportNextMovePolicyPanel. Sample report evidence boundaries. Sample report next move policy. evidence boundaries. next move policy. Vertical sample reports. Different businesses need different trust proof. sample.priorityRepairs. The Presence Report is the core Cendorq object. decision logic. vertical trust standards. plan depth. report.title. report.summary. report.score.</span>
    </main>
  );
}

function SampleReportAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
