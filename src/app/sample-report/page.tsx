import { SamplePresenceReport } from "@/components/presence-report/sample-presence-report";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Sample Presence Report | Cendorq",
  description:
    "See an example Cendorq Presence Report showing findability, understanding, trust, choice, action, repair priorities, and the recommended next move.",
  path: "/sample-report",
  keywords: [
    "Cendorq Presence Report",
    "sample AI visibility report",
    "AI Search Presence Repair",
    "business clarity report",
    "business trust signals",
  ],
  image: { alt: "Sample Cendorq Presence Report." },
});

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

      <section className="relative overflow-hidden px-5 pb-8 pt-10 sm:px-8 lg:pb-12 lg:pt-14" aria-label="Sample Presence Report introduction">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(251,207,232,0.22),transparent_28%),radial-gradient(circle_at_72%_8%,rgba(125,211,252,0.28),transparent_34%)]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="inline-flex rounded-full border border-cyan-200 bg-white/84 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700 shadow-[0_10px_28px_rgba(14,165,233,0.08)]">Sample Presence Report</p>
            <h1 className="mt-5 text-[clamp(2.8rem,10vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-slate-950">
              See how Cendorq turns uncertainty into a repair queue.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
              The Presence Report is the core Cendorq object: a clear view of findability, understanding, trust, choice, action, and the next safest move.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
              <Link href="/plans" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>View Plans</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 sm:px-8 lg:pb-16" aria-label="Sample report object">
        <div className="mx-auto max-w-7xl">
          <SamplePresenceReport />
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:pb-20" aria-label="Sample report guardrails">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_55px_rgba(15,23,42,0.055)] sm:rounded-[2.5rem] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">How to read this sample</p>
          <h2 className="mt-3 text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.065em] text-slate-950">
            This is an example, not a promise.
          </h2>
          <p className="mt-4 max-w-4xl text-base font-medium leading-8 text-slate-600">
            Cendorq uses the report format to make weak public signals easier to understand and prioritize. A real result depends on the business details, public pages, proof, category, location, and the selected plan depth.
          </p>
        </div>
      </section>
    </main>
  );
}
