import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Entitlement Center | Cendorq",
  description: "Protected Cendorq Entitlement Center for plan access, report vault visibility, paid artifacts, PDF delivery, and dashboard route boundaries.",
  path: "/dashboard/entitlement-center",
  noIndex: true,
});

const ACCESS_LEVELS = [
  ["Unknown visitor", "No protected dashboard, report, PDF, or support history should be exposed."],
  ["Scan customer", "Can access Free Scan result and safe next-command routes."],
  ["Deep Review customer", "Can access approved review report after entitlement and release state align."],
  ["Build Fix customer", "Can access repair workroom, scope, and completion artifacts when ready."],
  ["Control customer", "Can access monthly snapshots, drift summaries, and delivery records."],
  ["Support access", "Can see support-safe context for active or historical requests."],
] as const;

const ENTITLEMENT_CHECKS = [
  ["Account", "Verified customer session and account identity."],
  ["Business", "Correct business profile selected for the report or work item."],
  ["Plan", "Free Scan, Deep Review, Build Fix, or Ongoing Control state."],
  ["Artifact", "Report, PDF, email, vault card, workroom, or snapshot readiness."],
  ["Release", "Approved customer-facing state before paid report delivery."],
  ["Support", "Customer-safe context for help, correction, or delivery recovery."],
] as const;

const ENTITLEMENT_RULES = [
  "Do not expose paid artifacts without account, business, plan, and release alignment.",
  "Do not let unknown visitors reach blank or private dashboard states.",
  "Do not let one business profile reveal another business profile's report history.",
  "Do not treat payment success alone as report delivery readiness.",
] as const;

export default function EntitlementCenterPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Entitlement Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Access should follow customer, business, plan, and release state.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Entitlement Center defines who can see each dashboard route, report, PDF, email artifact, repair workroom, monthly snapshot, and support context.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/customer-command-profile" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open customer profile</Link>
            <Link href="/dashboard/reports" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open report vault</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Access levels</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Visitor, scan, review, repair, control, and support.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{ACCESS_LEVELS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Entitlement checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{ENTITLEMENT_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Entitlement rules</p><div className="mt-5 grid gap-3">{ENTITLEMENT_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Entitlement center guardrails">Entitlement Center. Unknown visitor. Scan customer. Deep Review customer. Build Fix customer. Control customer. Support access. Account. Business. Plan. Artifact. Release. Support. Access state. Entitlement state. Report vault access.</section>
    </main>
  );
}
