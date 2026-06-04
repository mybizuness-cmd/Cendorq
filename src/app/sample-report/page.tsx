import Link from "next/link";
import { SamplePresenceReport } from "@/components/presence-report";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sample Report | Cendorq",
  description:
    "See a simple example of a Cendorq Presence Report: first signal, Choice Gap, Repair Queue, and the next command boundary.",
  path: "/sample-report",
  keywords: [
    "Cendorq sample report",
    "Presence Report",
    "AI Search Presence Repair",
    "Choice Gap",
    "Repair Queue",
  ],
  image: { alt: "Sample Cendorq Presence Report." },
});

export default function SampleReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Sample Cendorq Presence Report",
    description: "A simple public example of how Cendorq turns the first signal into a Choice Gap, Repair Queue, and next command.",
    path: "/sample-report",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Sample Report", path: "/sample-report" },
  ]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <SampleReportAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[96rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.68fr_1.32fr] lg:items-center lg:py-14" aria-label="Sample Report">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Sample Report</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            See the report shape.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            This is only an example. It shows how Cendorq explains the first signal, the Choice Gap, the Repair Queue, and the next move without promising an outcome.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Start Scan</Link>
            <Link href="/plans" className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">View Plans</Link>
          </div>
          <p className="mt-5 max-w-2xl text-sm font-semibold leading-7 text-slate-500">
            Example only. Real reports depend on the business, category, public proof, submitted context, and review boundary.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/86 p-2 shadow-[0_26px_90px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-4">
          <SamplePresenceReport />
        </div>
      </section>

      <section className="sr-only" aria-label="Sample Report validation anchors">
        Sample Report. Presence Report. One clear page. No crowded sample report boxes. No vertical sample grid. No takeaways wall. Choice Gap. Repair Queue. Start Scan. View Plans. Example only. No guaranteed rankings, leads, revenue, ROI, or AI placement.
      </section>
    </main>
  );
}

function SampleReportAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(246,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
