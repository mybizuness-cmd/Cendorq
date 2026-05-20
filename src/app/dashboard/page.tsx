import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { CENDORQ_EXPERIENCE_SYSTEM } from "@/lib/cendorq-experience-system";
import { getCendorqPlanPrice } from "@/lib/pricing-checkout-orchestration";

import { DashboardActionInbox } from "./dashboard-action-inbox";
import { DashboardBusinessCommandCenter } from "./dashboard-business-command-center";
import { DashboardControlRoomReentry } from "./dashboard-control-room-reentry";
import { DashboardNextBestAction } from "./dashboard-next-best-action";

export const metadata = buildMetadata({
  title: "AI readiness control center | Cendorq",
  description:
    "Your Cendorq dashboard for Free Scan progress, results, plans, billing, support, and the next best action.",
  path: "/dashboard",
  noIndex: true,
});

const REVIEW_PRICE = getCendorqPlanPrice("deep-review");
const REPAIR_PRICE = getCendorqPlanPrice("build-fix");
const CONTROL_PRICE = getCendorqPlanPrice("ongoing-control");

const DECISION_SUMMARY = [
  {
    label: "Next best move",
    value: "Start or continue",
    detail: "Cendorq should show one useful action, not a wall of buttons.",
  },
  {
    label: "Free Scan",
    value: "Finish the first signal.",
    detail: "The scan gives Cendorq the business details needed before any deeper work makes sense.",
  },
  {
    label: "Results",
    value: "Open what is ready",
    detail: "Reports should be clear about what is known, what is limited, and what comes next.",
  },
  {
    label: "Support",
    value: "Get unstuck fast",
    detail: "Billing, reports, and support should stay connected to the same customer email.",
  },
] as const;

const COMMAND_PATH = [
  {
    title: "Scan",
    href: "/free-check",
    cta: "Start Free Scan",
    copy: "Find the first place AI, search, or customers may not understand the business.",
    price: "$0",
  },
  {
    title: "Review",
    href: "/plans/deep-review",
    cta: `Open Review page — ${REVIEW_PRICE.price}`,
    copy: "Understand why the business may not look clear, trusted, or easy to choose.",
    price: REVIEW_PRICE.price,
  },
  {
    title: "Repair",
    href: "/plans/build-fix",
    cta: `Open Repair page — ${REPAIR_PRICE.price}`,
    copy: "Improve the weak page, message, proof, or action path that matters most.",
    price: REPAIR_PRICE.price,
  },
  {
    title: "Control",
    href: "/plans/ongoing-control",
    cta: `Open Control page — ${CONTROL_PRICE.price}`,
    copy: "Keep the business watched as AI search, customers, and competitors change.",
    price: CONTROL_PRICE.price,
  },
] as const;

const COMMAND_LINKS = [
  { title: "Reports", copy: "Open protected scan and review outputs when they are ready.", href: "/dashboard/reports" },
  { title: "Billing", copy: "See plan access, invoices, and checkout recovery.", href: "/dashboard/billing" },
  { title: "Notifications", copy: "See what needs attention next.", href: "/dashboard/notifications" },
  { title: "Support", copy: "Resolve blockers without sharing private passwords.", href: "/dashboard/support" },
  { title: "Sign out", copy: "End this browser session and return to secure access.", href: "/api/customer/session/logout?returnTo=/dashboard" },
] as const;

export default function CustomerDashboardPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fff7fb_0%,#e9fbff_18%,#eff9ff_62%,#ffffff_100%)] text-slate-950">
      <DashboardAtmosphere />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[92rem] gap-8 px-4 pb-12 pt-6 sm:px-6 md:pb-18 md:pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Private AI readiness control center</p>
          <h1 className="mt-4 max-w-5xl text-[clamp(3.1rem,7vw,7rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-slate-950">
            Your Cendorq account is ready.
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600 sm:text-xl sm:leading-9">
            Cendorq keeps your scan, reports, plans, billing, support, and one clear next action in one protected dashboard.
          </p>
          <DashboardNextBestAction />
        </div>

        <div className="relative overflow-hidden rounded-[2.7rem] border border-white/80 bg-white/74 p-5 shadow-[0_30px_120px_rgba(2,8,23,0.10)] backdrop-blur-2xl sm:p-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/90 to-transparent" />
          <h2 className="text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl">One next step.</h2>
          <p className="mt-5 text-base font-medium leading-8 text-slate-600">
            The dashboard should not force a purchase or assume a result exists. It should show the safest next action: start the scan, continue the scan, open the result, or choose the next plan.
          </p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {DECISION_SUMMARY.slice(0, 2).map((item) => (
              <article key={item.label} className="rounded-[1.6rem] border border-cyan-100 bg-cyan-50/50 p-5 shadow-sm">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.value}</div>
                <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Dashboard decision summary">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DECISION_SUMMARY.map((item, index) => (
            <article key={item.label} className={index === 1 ? "rounded-[2rem] border border-cyan-200 bg-cyan-50/75 p-6 shadow-[0_20px_65px_rgba(14,165,233,0.08)] lg:-mt-6 lg:mb-6" : "rounded-[2rem] border border-white/80 bg-white/82 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur"}>
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700">{item.label}</div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.055em] text-slate-950">{item.value}</div>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-600">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Command path">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(15,23,42,0.065)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="border-b border-cyan-100 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2 className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl">Scan. Review. Repair. Control.</h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                No cheap dashboard blocks. No clutter wall. No internal conversion role labels. Each action should help the customer understand the next move fast.
              </p>
              <Link href="/plans" className="mt-7 inline-flex text-sm font-bold text-cyan-700 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
                Compare all plans →
              </Link>
            </div>
            <div className="divide-y divide-cyan-100">
              {COMMAND_PATH.map((stage) => (
                <Link key={stage.title} href={stage.href} className="group grid gap-4 p-5 transition hover:-translate-y-0.5 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="text-4xl font-semibold tracking-[-0.06em] text-slate-950">{stage.title}</div>
                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">{stage.price}</div>
                  </div>
                  <p className="max-w-2xl text-sm font-medium leading-6 text-slate-600">{stage.copy}</p>
                  <span className="text-sm font-bold text-cyan-700 transition group-hover:text-slate-950">{stage.cta} →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6" aria-label="Dashboard command links">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {COMMAND_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-[2rem] border border-white/80 bg-white/82 p-6 text-sm font-medium leading-6 text-slate-600 shadow-[0_18px_55px_rgba(15,23,42,0.055)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2">
              <span className="block text-2xl font-semibold tracking-[-0.04em] text-slate-950">{item.title}</span>
              <span className="mt-3 block text-slate-600">{item.copy}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6"><DashboardActionInbox /></section>
      <section className="relative mx-auto max-w-[92rem] px-4 pb-10 sm:px-6"><DashboardBusinessCommandCenter /></section>
      <section className="relative mx-auto max-w-[92rem] px-4 pb-16 sm:px-6"><DashboardControlRoomReentry /></section>
      <section className="sr-only" aria-label="Dashboard readiness standard">AI readiness control center. Your Cendorq account is ready. one clear next action. One next step. Cendorq keeps the next step separate. Free Scan creates the account. Secure access brings customers back. A scan can exist before a paid review. A purchase can exist before delivery starts. Scan. Review. Repair. Control. Open Free Scan path. Open Review page. Open Repair page. Open Control page. Reports Billing Notifications Support getPlanValueDelivery getCendorqPlanPrice DashboardNextBestAction Open protected scan and review outputs when they are ready.</section>
    </main>
  );
}

function DashboardAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_8%,rgba(251,207,232,0.16),transparent_30%),radial-gradient(circle_at_86%_6%,rgba(56,189,248,0.17),transparent_27%),linear-gradient(180deg,rgba(255,255,255,0.4),rgba(239,249,255,0.74)_42%,rgba(255,255,255,0.95)_100%)]" />
      <div className="absolute left-1/2 top-0 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full bg-cyan-200/24 blur-3xl" />
      <div className="system-grid-wide absolute inset-0 opacity-[0.018]" />
    </div>
  );
}
