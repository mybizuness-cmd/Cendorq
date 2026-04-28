import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Report vault | Cendorq",
  description: "Your private Cendorq report vault for scan results, confidence labels, versions, and next-plan guidance.",
  path: "/dashboard/reports",
  noIndex: true,
});

const REPORT_STAGES = [
  {
    label: "Free Scan",
    status: "Ready after scan completion",
    copy: "A concise first read on visible hesitation, trust, clarity, choice, and action signals.",
    next: "When limits appear, Deep Review explains causes in more depth.",
  },
  {
    label: "Deep Review",
    status: "Available as next plan",
    copy: "A deeper diagnosis with stronger evidence, root causes, visual explanations, and prioritized findings.",
    next: "When causes are clear, Build Fix turns diagnosis into implementation.",
  },
  {
    label: "Build Fix",
    status: "Available after diagnosis",
    copy: "Implementation-focused work that addresses the verified issues instead of guessing at fixes.",
    next: "When improvements are live, Ongoing Control protects progress and finds new opportunities.",
  },
  {
    label: "Ongoing Control",
    status: "Available for monthly control",
    copy: "Monthly monitoring, regression detection, progress history, and next-priority guidance.",
    next: "Best for businesses that want continued visibility, control, and compounding improvement.",
  },
] as const;

export default function ReportsVaultPage() {
  return (
    <main className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 text-white sm:px-6 md:py-12 xl:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(103,232,249,0.12),transparent_32%)]" />
      <section className="system-panel-authority relative z-10 rounded-[2.5rem] p-6 sm:p-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-200">Private report vault</div>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Every report stays organized, versioned, and tied to what happens next.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          Your report vault is designed to hold Free Scan, Deep Review, Build Fix, and Ongoing Control outputs with confidence labels, methodology versions, correction markers, and next-plan guidance.
        </p>
      </section>

      <section className="relative z-10 mt-8 grid gap-4 md:grid-cols-2">
        {REPORT_STAGES.map((report) => (
          <article key={report.label} className="system-surface rounded-[1.75rem] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">{report.status}</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{report.label}</h2>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300">Vault</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{report.copy}</p>
            <p className="mt-4 rounded-[1.25rem] border border-cyan-300/15 bg-cyan-300/10 p-4 text-sm leading-7 text-cyan-50">{report.next}</p>
          </article>
        ))}
      </section>

      <div className="relative z-10 mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/dashboard" className="rounded-2xl border border-white/10 px-5 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
          Back to dashboard
        </Link>
        <Link href="/plans" className="rounded-2xl bg-cyan-300 px-5 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-200">
          Compare plans
        </Link>
      </div>
    </main>
  );
}
