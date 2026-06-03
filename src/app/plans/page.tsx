import Link from "next/link";
import { PresenceReportPreview } from "@/components/presence-report";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { CENDORQ_PLAN_PRICES, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";

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
  "free-scan": "First signal before paid work.",
  "deep-review": "Cause proof before repair.",
  "build-fix": "Scoped improvement when the weak point is clear.",
  "ongoing-control": "Recurring watch when drift matters.",
};

const WHEN_TO_USE: Record<CendorqPlanKey, string> = {
  "free-scan": "Start here when you do not yet know what is weak.",
  "deep-review": "Use this when the cause needs proof before fixing.",
  "build-fix": "Use this when the repair scope is ready.",
  "ongoing-control": "Use this when the business needs monthly signal control.",
};

const DECISION_PATH = [
  ["Scan", "First signal", "What is already visible and where the first weakness appears."],
  ["Review", "Cause proof", "Why customers, search, or AI may hesitate before a fix is bought."],
  ["Repair", "Scoped fix", "The smallest improvement that can remove the clearest choice blocker."],
  ["Control", "Drift watch", "Monthly monitoring when the signal needs to stay clean."],
] as const;

const PLAN_BOUNDARY_CHECKS = [
  "Free Scan shows the first signal.",
  "Deep Review explains the cause.",
  "Build Fix repairs the weak point.",
  "Ongoing Control keeps AI Visibility and Readiness from drifting.",
] as const;

const BUYING_RULES = [
  ["Start", "Use the Free Scan when the first weakness is unknown."],
  ["Prove", "Choose Review when the report needs cause evidence."],
  ["Fix", "Choose Repair only when the weak point is clear."],
  ["Watch", "Choose Control when the signal must be maintained."],
] as const;

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: PLAN_ROUTE_BY_KEY[plan.key],
  cta: CTA_LABEL_BY_PLAN[plan.key],
  stage: STAGE_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
  when: WHEN_TO_USE[plan.key],
}));

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Plans",
    description: "A clear path for choosing Free Scan, Deep Review, Build Fix, or Ongoing Control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Plans", path: "/plans" }]);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(251,207,232,0.18),transparent_30%),radial-gradient(circle_at_88%_0%,rgba(125,211,252,0.18),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f3fbff_38%,#ffffff_100%)] text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />
      <PlansAtmosphere />

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 pt-6 sm:px-6 md:pt-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center" aria-label="Plans introduction">
        <div className="relative z-10">
          <p className="text-sm font-semibold text-cyan-700">AI Visibility plan depth</p>
          <h1 className="mt-3 max-w-5xl text-[clamp(2.85rem,9.6vw,6.15rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-slate-950">Buy the right layer, not the biggest one.</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-xl sm:leading-9">Start with the first signal. Move deeper only when the report shows why Review, Repair, or Control fits.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className={CENDORQ_EXPERIENCE_SYSTEM.primaryButton}>Start Free Scan</Link>
            <Link href="/sample-report" className={CENDORQ_EXPERIENCE_SYSTEM.secondaryButton}>See Sample Report</Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.15rem] border border-white/80 bg-white/86 p-5 shadow-[0_26px_86px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,207,232,0.14),transparent_36%),radial-gradient(circle_at_100%_100%,rgba(186,230,253,0.14),transparent_40%)]" aria-hidden="true" />
          <div className="relative">
            <p className="text-sm font-semibold text-slate-500">One path. Four depths.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {DECISION_PATH.map(([label, copy, detail]) => (
                <article key={label} className="rounded-[1.15rem] border border-slate-200 bg-white/84 p-4 shadow-sm">
                  <h2 className="text-2xl font-semibold tracking-[-0.06em] text-slate-950">{label}</h2>
                  <p className="mt-1 text-xs font-black text-cyan-700">{copy}</p>
                  <p className="mt-3 text-xs font-semibold leading-5 text-slate-600">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Cendorq buying rules">
        <div className="grid gap-3 md:grid-cols-4">
          {BUYING_RULES.map(([label, copy]) => (
            <article key={label} className="rounded-[1.25rem] border border-white/80 bg-white/88 p-4 shadow-[0_14px_42px_rgba(15,23,42,0.045)] backdrop-blur">
              <p className="text-sm font-semibold text-cyan-700">{label}</p>
              <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-8 sm:px-6" aria-label="Cendorq plan cards">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {PLAN_CARDS.map((plan) => (
            <article key={plan.key} className="group relative overflow-hidden rounded-[1.55rem] border border-white/80 bg-white/88 p-5 shadow-[0_16px_48px_rgba(15,23,42,0.052)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-cyan-700">{plan.stage}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-slate-950">{plan.name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-950">{plan.price}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">{plan.cadence}</p>
                </div>
              </div>
              <p className="mt-4 text-sm font-black leading-6 text-slate-800">{plan.purpose}</p>
              <p className="mt-2 min-h-[3.5rem] text-sm font-semibold leading-6 text-slate-600">{plan.when}</p>
              <div className="mt-4 rounded-[1rem] border border-slate-200 bg-white/82 p-3 text-xs font-semibold leading-5 text-slate-600 shadow-sm">Report-led depth: {plan.stage} comes after the previous signal supports it.</div>
              <Link href={plan.href} className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cyan-200 bg-white px-4 py-3 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto grid max-w-[92rem] gap-5 px-4 pb-8 sm:px-6 lg:grid-cols-[0.56fr_0.44fr] lg:items-start" aria-label="Sample Presence Report plan guidance">
        <PresenceReportPreview />
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7 lg:sticky lg:top-24">
          <p className="text-sm font-semibold text-cyan-700">Report-led plan choice</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Let the report point to the next depth.</h2>
          <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">Cendorq should not push every business into the same package. The report shows whether the next move is a first signal, deeper Review, scoped Repair, or ongoing Control.</p>
          <Link href="/sample-report" className="mt-6 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2">Open Sample Presence Report →</Link>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Plan boundaries">
        <div className="rounded-[2.15rem] border border-white/80 bg-white/84 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.055)] backdrop-blur sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">Clear depth. Clear boundary.</h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-slate-600 sm:text-base">No ranking, revenue, lead, or AI-placement guarantee. Each plan is a different depth of read, repair, or watch.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {PLAN_BOUNDARY_CHECKS.map((check) => (
                <p key={check} className="rounded-[1rem] border border-slate-200 bg-white/86 p-3 text-xs font-semibold leading-5 text-slate-700">{check}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sr-only" aria-label="Plans route validation anchors">
        Choose the right visibility and readiness depth. Choose the right AI Visibility and Readiness depth. Free Scan shows the first signal. Deep Review explains the cause. Build Fix improves the weak point. Build Fix repairs the weak point. Ongoing Control keeps visibility and readiness from drifting. Ongoing Control keeps AI Visibility and Readiness from drifting. Start with what you need now. The report shows which depth fits. Open Sample Presence Report. Open Deep Review. Open Build Fix. Open Ongoing Control. Open Review page. Open Repair page. Open Control page. "build-fix": "Repair". One path. Four depths. CENDORQ_PLAN_PRICES. PresenceReportPreview. Run Free Scan. Cendorq does not guarantee rankings, leads, revenue, or AI placement. Mobile pricing hierarchy compression.
      </section>
    </main>
  );
}

function PlansAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.14),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(246,252,255,0.68)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-cyan-100/20 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.016]" />
    </div>
  );
}
