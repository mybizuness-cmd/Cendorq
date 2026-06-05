import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Email Command Center | Cendorq",
  description: "Protected Cendorq Email Command Center for approved summaries, report links, resend state, support updates, corrections, monthly Control, and delivery recovery.",
  path: "/dashboard/email-command",
  noIndex: true,
});

const EMAIL_TYPES = [
  ["Scan access", "Confirms the Free Scan result is available and routes back to proof before deeper action."],
  ["Review delivery", "Summarizes the approved Deep Review artifact and points to the protected report vault."],
  ["Build Fix update", "Explains scope, work state, QA, completion status, and where the workroom lives."],
  ["Control snapshot", "Delivers monthly drift, protected strengths, risks, and next priorities."],
  ["Support status", "Updates report questions, delivery issues, billing blockers, or correction requests."],
  ["Recovery notice", "Explains held, retrying, resent, or resolved delivery state without internal detail."],
] as const;

const EMAIL_CHECKS = [
  ["Approved source", "Email copy must come from the same approved package as dashboard and vault state."],
  ["Safe summary", "Email should explain what changed, what is ready, and what is still limited."],
  ["Secure route", "Protected artifacts route through dashboard access instead of exposed private files."],
  ["Resend state", "Support can resend approved customer-safe email without creating a conflicting version."],
  ["Correction outcome", "Corrections explain what was reviewed and what customer-facing surface changed."],
  ["Next command", "Every email should end with one safe next action."],
] as const;

const EMAIL_RULES = [
  "Do not send draft, held, or unapproved report language as final email copy.",
  "Do not let email, dashboard, vault, and report delivery history tell different stories.",
  "Do not include raw evidence, internal notes, private links, billing payloads, or unsupported claims.",
  "Do not use email as pressure; use it to return the customer to proof, status, or a safe next command.",
] as const;

export default function EmailCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Email Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Customer emails should match the approved report state.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Email Command Center keeps report summaries, access links, support updates, correction outcomes, monthly Control notices, resend state, and recovery messages tied to approved customer-safe artifacts.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/delivery-history" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Delivery History</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Report Vault</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Email types</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Access, delivery, work updates, monthly snapshots, support, and recovery.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{EMAIL_TYPES.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Email checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{EMAIL_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Email rules</p><div className="mt-5 grid gap-3">{EMAIL_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Email command guardrails">Email Command Center. Scan access. Review delivery. Build Fix update. Control snapshot. Support status. Recovery notice. Approved source. Safe summary. Secure route. Resend state. Correction outcome. Next command. customer-safe email delivery.</section>
    </main>
  );
}
