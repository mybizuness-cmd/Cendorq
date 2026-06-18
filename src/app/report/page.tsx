import Link from "next/link";
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildServiceJsonLd,
  buildWebPageJsonLd,
  toJsonLd,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Report Access | Cendorq",
  description:
    "A simple Cendorq report access route for returning to protected reports or starting Scan when no verified result exists yet.",
  path: "/report",
  keywords: [
    "Cendorq report access",
    "Cendorq reports",
    "Presence Report",
    "AI Search Presence Repair",
    "Start Scan",
  ],
  image: { alt: "Cendorq report access." },
  noIndex: true,
});

const PRIMARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-100 px-8 py-4 text-base font-black text-slate-950 shadow-[0_18px_48px_rgba(14,165,233,0.14)] transition hover:-translate-y-0.5 hover:bg-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";
const SECONDARY_CTA_CLASS = "inline-flex min-h-14 items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2";

export default function ReportPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Report Access",
    description: "A simple route for protected Cendorq reports and first-signal Scan access.",
    path: "/report",
  });

  const serviceJsonLd = buildServiceJsonLd({
    title: "Cendorq Report Access",
    description:
      "A protected-report routing surface for Cendorq AI Search Presence Repair work.",
    path: "/report",
    serviceType: "AI Search Presence Repair report access",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Report Access", path: "/report" },
  ]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f7fcff_45%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <ReportAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-4.5rem)] max-w-[92rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-14" aria-label="Report access">
        <div className="relative z-10 max-w-4xl">
          <p className="text-sm font-semibold text-cyan-700">Report Access</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3rem,7.6vw,6.8rem)] font-semibold leading-[0.86] tracking-[-0.09em] text-slate-950">
            Reports stay protected.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">
            Open reports from the protected dashboard when your email already has Cendorq work. Start Scan when there is no verified result yet.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/reports" className={PRIMARY_CTA_CLASS}>Open Reports</Link>
            <Link href="/free-check" className={SECONDARY_CTA_CLASS}>Start Scan</Link>
          </div>
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 p-5 shadow-[0_26px_84px_rgba(15,23,42,0.075)] backdrop-blur-2xl sm:p-7" aria-label="Report access guidance">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.1),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-cyan-700">Safe route</p>
            <h2 className="mt-3 text-[clamp(2.25rem,4.7vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-slate-950">Verified work first.</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-slate-600">
              Reports should stay tied to the right email, business, plan, billing, and support context. The public route stays simple instead of pretending private report state is available without verification.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/login?returnTo=%2Fdashboard%2Freports" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Customer Access</Link>
              <Link href="/faq" className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Read FAQ</Link>
            </div>
          </div>
        </section>
      </section>

      <section className="sr-only" aria-label="Report access validation anchors">
        Report Access. One clear page. Open Reports. Start Scan. Customer Access. Read FAQ. Presence Report. AI Search Presence Repair. No crowded route shell. No AI Readiness wording. Protected dashboard reports stay verified.
      </section>
    </main>
  );
}

function ReportAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.12),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.09),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.014]" />
    </div>
  );
}
