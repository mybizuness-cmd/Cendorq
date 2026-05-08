import Link from "next/link";
import { buildBreadcrumbJsonLd, buildMetadata, buildWebPageJsonLd, toJsonLd } from "@/lib/seo";
import { projectCustomerPlatformHandoff } from "@/lib/customer-platform-handoff-runtime";
import { CENDORQ_PLAN_PRICES, getCendorqPlanPrice, type CendorqPlanKey } from "@/lib/pricing-checkout-orchestration";
import {
  getPlanValueDelivery,
  PLAN_VALUE_SEPARATION_RULES,
  type PlanValueKey,
} from "@/lib/plan-value-delivery-architecture";

export const metadata = buildMetadata({
  title: "Market command path | Cendorq",
  description:
    "Choose the Cendorq command depth for market understanding, AI search visibility, business trust, customer choice, and monthly control.",
  path: "/plans",
  keywords: ["cendorq plans", "market command path", "ai search visibility plans", "business visibility scan", "deep review", "build fix", "ongoing control"],
  image: { alt: "Cendorq market command path." },
});

const CTA_LABEL_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Start Free Scan",
  "deep-review": "Unlock Deep Review",
  "build-fix": "Unlock Build Fix",
  "ongoing-control": "Start Ongoing Control",
};

const COMMAND_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Scan",
  "deep-review": "Diagnose",
  "build-fix": "Fix",
  "ongoing-control": "Control",
};

const PURPOSE_BY_PLAN: Record<CendorqPlanKey, string> = {
  "free-scan": "Find the first break in findability, clarity, trust, choice, or action.",
  "deep-review": "Expose why the business is not being found, understood, trusted, or chosen.",
  "build-fix": "Improve the page, proof, message, or action path that matters most.",
  "ongoing-control": "Keep visibility, trust, and priority under review as AI search and competitors move.",
};

const PLAN_CARDS = CENDORQ_PLAN_PRICES.map((plan) => ({
  ...plan,
  href: plan.checkoutPath,
  cta: CTA_LABEL_BY_PLAN[plan.key],
  command: COMMAND_BY_PLAN[plan.key],
  purpose: PURPOSE_BY_PLAN[plan.key],
  value: getPlanValueDelivery(plan.key as PlanValueKey),
}));

const DEEP_REVIEW = getCendorqPlanPrice("deep-review");
const BUILD_FIX = getCendorqPlanPrice("build-fix");
const ONGOING_CONTROL = getCendorqPlanPrice("ongoing-control");

const DECISION_STANDARDS = [
  { title: "First signal", best: "Scan", copy: "Use Free Scan before spending deeper money." },
  { title: "Real cause", best: "Diagnose", copy: `Use ${DEEP_REVIEW.price} Deep Review when guessing would be expensive.` },
  { title: "Weak point", best: "Fix", copy: `Use ${BUILD_FIX.price} Build Fix when the target is clear.` },
  { title: "Monthly command", best: "Control", copy: `Use ${ONGOING_CONTROL.price} when visibility needs ongoing attention.` },
] as const;

const PLANS_HANDOFFS = [
  projectCustomerPlatformHandoff({ surfaceKey: "plans-to-free-scan-or-dashboard", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "dashboard-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "billing-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
  projectCustomerPlatformHandoff({ surfaceKey: "report-vault-to-plans", customerOwned: true, verifiedAccess: true, safeProjectionReady: true }),
] as const;

export default function PlansPage() {
  const webPageJsonLd = buildWebPageJsonLd({
    title: "Cendorq Market Command Path",
    description: "A clear command path for market understanding, business visibility, trust, customer choice, and control.",
    path: "/plans",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Plans", path: "/plans" },
  ]);

  const deepReview = getCendorqPlanPrice("deep-review");

  return (
    <main className="relative isolate overflow-hidden text-white">
      <PlanAtmosphere />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(breadcrumbJsonLd) }} />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
        <div className="relative z-10">
          <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100 shadow-[0_0_60px_rgba(34,211,238,0.12)]">Market command path</div>
          <h1 className="mt-6 max-w-5xl text-[clamp(3.25rem,7.5vw,7.6rem)] font-semibold leading-[0.84] tracking-[-0.08em] text-white">
            Choose the command depth that matches the market risk.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl sm:leading-9">
            Scan first. Diagnose when the cause matters. Fix only when the target is clear. Control when visibility, trust, and customer choice need monthly command.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free-check" className="inline-flex min-h-14 items-center justify-center rounded-full bg-cyan-200 px-9 py-4 text-base font-black text-slate-950 shadow-[0_22px_80px_rgba(103,232,249,0.24)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-100 focus:ring-offset-2 focus:ring-offset-slate-950">
              Start Free Scan
            </Link>
            <Link href={deepReview.checkoutPath} className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-9 py-4 text-base font-bold text-white shadow-[0_18px_70px_rgba(2,8,23,0.32)] transition hover:border-cyan-200/40 hover:bg-cyan-200/10 focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950">
              Unlock Deep Review {deepReview.price}
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-cyan-200/22 bg-[radial-gradient(circle_at_50%_0%,rgba(103,232,249,0.2),transparent_36%),linear-gradient(145deg,rgba(8,47,73,0.9),rgba(2,8,23,0.98)_52%,rgba(14,116,144,0.32))] shadow-[0_55px_200px_rgba(2,8,23,0.72)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <div className="divide-y divide-white/10">
            {PLAN_CARDS.map((plan, index) => (
              <Link key={plan.key} href={plan.href} className={index === 1 ? "group grid gap-4 bg-cyan-200/[0.08] p-5 transition hover:bg-cyan-200/[0.12] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:p-7" : "group grid gap-4 p-5 transition hover:bg-cyan-200/[0.06] focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950 sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:p-7"}>
                <div>
                  <h2 className="text-5xl font-semibold tracking-[-0.07em] text-white">{plan.command}</h2>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100/75">{plan.name}</p>
                </div>
                <p className="max-w-2xl text-base leading-7 text-slate-300">{plan.purpose}</p>
                <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                  <div className="text-lg font-black text-cyan-100">{plan.price}</div>
                  <span className="mt-1 inline-flex text-sm font-bold text-cyan-100 transition group-hover:text-white">{plan.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="How to choose a plan">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DECISION_STANDARDS.map((item, index) => (
            <article key={item.title} className={index === 1 ? "rounded-[2rem] border border-cyan-200/22 bg-cyan-200/[0.09] p-6 shadow-[0_28px_100px_rgba(2,8,23,0.42)] lg:-mt-6 lg:mb-6" : "rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.34)]"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-100">{item.title}</div>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white">{item.best}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6" aria-label="Plan separation standard">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025)_38%,rgba(103,232,249,0.08))] p-6 shadow-[0_45px_180px_rgba(2,8,23,0.55)] backdrop-blur-2xl sm:p-8 lg:p-10">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-100">No overlap</p>
          <h2 className="mt-3 max-w-5xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl">Each plan buys a different level of command.</h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-300">
            Free Scan finds the first signal. Deep Review explains the cause. Build Fix improves the selected weak point. Ongoing Control keeps the business watched as search, AI answers, and competitors move.
          </p>
        </div>
      </section>

      <section className="sr-only" aria-label="Market command path guardrails">
        Market command path. Choose the command depth that matches the market risk. Scan. Diagnose. Fix. Control. Free Scan $0. Deep Review $497. Build Fix $1,497. Ongoing Control $597/mo. Each plan buys a different level of command. No overlap. {DECISION_STANDARDS.map((item) => `${item.title} ${item.best} ${item.copy}`).join(" ")} {PLAN_VALUE_SEPARATION_RULES.join(" ")} {PLANS_HANDOFFS.map((handoff) => `${handoff.decision} ${handoff.surfaceKey} ${handoff.currentState} ${handoff.safeNextAction} ${handoff.recoveryPath} ${handoff.connectedDestination}`).join(" ")}
      </section>
    </main>
  );
}

function PlanAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(103,232,249,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.11),transparent_27%),linear-gradient(180deg,#020617_0%,#020817_42%,#030712_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-300/[0.04] blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
