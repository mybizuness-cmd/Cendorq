import { PresenceReportPreview } from "@/components/presence-report";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CENDORQ_PLAN_PRICES, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Plans | Cendorq",
  description: "Choose the right Cendorq depth: Free Scan, Deep Review, Build Fix, or Ongoing Control.",
  path: "/plans",
  keywords: ["cendorq plans", "AI visibility plans", "AI readiness plans", "Free Scan", "Deep Review", "Build Fix", "Ongoing Control"],
  image: { alt: "Cendorq plans." },
});

const PLAN_ROUTE_BY_KEY: Record<CendorqPlanKey, string> = {
  "free-scan": "/free-check",
  "deep-review": "/plans/deep-review",
  "build-fix": "/plans/build-fix",
  "ongoing-control": "/plans/ongoing-control",
};

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Open Deep Review",
  "build-fix": "Open Build Fix",
  "ongoing-control": "Open Ongoing Control",
};

const STAGE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Review",
  "build-fix": "Repair",
  "ongoing-control": "Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Use this when you need the first signal before choosing paid work.",
  "deep-review": "Use this when the cause is unclear and you need the problem explained before repair.",
  "build-fix": "Use this when the weak point is clear and should be improved with scoped work.",
  "ongoing-control": "Use this when changes, competitors, and customer expectations need ongoing watch.",
};

const DECISION_PATH = [
  ["Start", "Run the Free Scan when you need the first signal."],
  ["Understand", "Use Deep Review when the cause is still unclear."],
  ["Repair", "Use Build Fix when the weak point is ready to improve."],
  ["Watch", "Use Ongoing Control when drift matters over time."],
] as const;

const PLAN_BOUNDARY_CHECKS = [
  "Free Scan shows the first signal.",
  "Deep Review explains the cause.",
  "Build Fix improves the weak point.",
  "Ongoing Control keeps visibility and readiness from drifting.",
] as const;

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: PLAN_ROUTE_BY_KEY[plan.key],
  cta: CTA_LABEL_BY_PLAN[plan.key],
  stage: STAGE_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
}));

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A clear path for choosing Free Scan, Deep Review, Build Fix, or Ongoing Control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }]);

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(125,211,252,0.28),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_34%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative px-5 py-10 sm:px-8 lg:py-14" aria-label="Plans introduction">
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <h1 className="max-w-5xl text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.86] tracking-[-0.092em] text-slate-950">
              Choose the depth that fits the problem.
            </h1>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-8 text-slate-600 sm:text-lg">
              Start free when the weak signal is unclear. Move deeper only when the report shows why Review, Repair, or Control fits.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Run Free Scan</Link>
              <Link href="/sample-report" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>See Sample Report</Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-[0_22px_70px_rgba(14,165,233,0.09)] backdrop-blur sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">One path. Four depths.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {DECISION_PATH.map(([label, copy]) => (
                <p key={label} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/36 p-3 text-sm font-bold leading-6 text-slate-700">
                  <span className="block text-xs font-black uppercase tracking-[0.14em] text-cyan-700">{label}</span>
                  <span className="mt-1 block">{copy}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8" aria-label="Cendorq plan cards">
        <div className="grid gap-3 lg:grid-cols-4">
          {PLAN_CARDS.map((plan) => (
            <article key={plan.key} className="rounded-[1.6rem] border border-cyan-100 bg-white/86 p-5 shadow-[0_18px_55px_rgba(14,165,233,0.06)] backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-700">{plan.stage}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-slate-950">{plan.name}</h2>
              <p className="mt-2 text-sm font-black text-slate-950">{plan.price}</p>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">{plan.purpose}</p>
              <Link href={plan.href} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-10 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center" aria-label="Sample Presence Report plan guidance">
        <div className="rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Report-led plan choice</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Let the report point to the next depth.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">
            Cendorq should not push every business into the same package. The report shows whether the next move is a first signal, deeper Review, scoped Repair, or ongoing Control.
          </p>
          <Link href="/sample-report" className="mt-6 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Open Sample Presence Report →</Link>
        </div>
        <PresenceReportPreview />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8" aria-label="Plan boundaries">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Buy the right layer, not the biggest one.</h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-slate-600 sm:text-base">Cendorq does not guarantee rankings, leads, revenue, or AI placement. Each plan is a different depth of read, repair, or watch.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {PLAN_BOUNDARY_CHECKS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-cyan-100 bg-cyan-50/36 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Plans route validation anchors">
        Choose the right visibility and readiness depth. Choose the right AI Visibility and Readiness depth. Free Scan shows the first signal. Deep Review explains the cause. Build Fix improves the weak point. Build Fix repairs the weak point. Ongoing Control keeps visibility and readiness from drifting. Ongoing Control keeps AI Visibility and Readiness from drifting. Start with what you need now. The report shows which depth fits. Open Sample Presence Report. Open Deep Review. Open Build Fix. Open Ongoing Control. "build-fix": "Repair". One path. Four depths.
      </section>
    </main>
  );
}
