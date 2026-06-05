import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Customer Command Profile | Cendorq",
  description: "Protected Cendorq Customer Command Profile for account, business, plan, reports, delivery, support, repair, and Control identity.",
  path: "/dashboard/customer-command-profile",
  noIndex: true,
});

const PROFILE_AREAS = [
  ["Customer account", "Verified email, session state, support thread, and account access."],
  ["Business profile", "Business identity, website, market area, services, and Business Truth state."],
  ["Plan entitlement", "Free Scan, Deep Review, Build Fix, and Ongoing Control access."],
  ["Report history", "Scan results, paid reports, completion artifacts, and monthly snapshots."],
  ["Delivery record", "Dashboard publish, PDF readiness, email delivery, download, and resend state."],
  ["Support context", "Report questions, corrections, billing blockers, and scope questions."],
  ["Repair work", "Build Fix scope, work state, before/after proof, and completion report."],
  ["Control status", "Monthly signal health, drift, protected strengths, and next priorities."],
] as const;

const IDENTITY_RULES = [
  "Do not assume one email equals one business forever.",
  "Do not show a blank dashboard when the customer has no active business context.",
  "Do not merge businesses unless ownership and identity are clear.",
  "Do not expose paid reports without matching account, business, and entitlement state.",
] as const;

const PROFILE_STATES = [
  ["Known customer", "Account exists and can return to protected dashboard state."],
  ["Known business", "Business profile is linked to the customer account."],
  ["Known plan", "Plan state decides which reports and commands are available."],
  ["Known delivery", "Report outputs show ready, held, delivered, or recovery state."],
] as const;

export default function CustomerCommandProfilePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Customer Command Profile</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">One customer profile should connect every report and workflow.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Customer Command Profile ties the customer, business, plan, report history, delivery state, support context, repair work, and Control status into one governed record.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/business-truth" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Business Truth</Link>
            <Link href="/dashboard/command-queue" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Command Queue</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Profile states</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Customer, business, plan, and delivery state must align.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{PROFILE_STATES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Profile areas</p><div className="mt-5 grid gap-3 md:grid-cols-2">{PROFILE_AREAS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Identity rules</p><div className="mt-5 grid gap-3">{IDENTITY_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Customer command profile guardrails">Customer Command Profile. Customer account. Business profile. Plan entitlement. Report history. Delivery record. Support context. Repair work. Control status. Business 360. Customer Command Profile. Profile resolution. Entitlement state. Access state.</section>
    </main>
  );
}
