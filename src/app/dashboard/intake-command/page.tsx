import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Intake Command Center | Cendorq",
  description: "Protected Cendorq Intake Command Center for business facts, website context, plan routing, evidence permissions, support-safe uploads, and first-run dashboard state.",
  path: "/dashboard/intake-command",
  noIndex: true,
});

const INTAKE_AREAS = [
  ["Business identity", "Name, website, category, audience, location, service area, and ownership context."],
  ["Offer context", "Services, exclusions, buying path, proof points, guarantees, and unclear claims."],
  ["Website context", "Important pages, action paths, friction points, proof surfaces, and customer questions."],
  ["Plan route", "Free Scan, Deep Review, Build Fix, and Ongoing Control entry paths stay separated."],
  ["Evidence permission", "Customer-provided material is captured without treating it as verified proof."],
  ["First-run state", "New customers avoid blank dashboards and route into the right first command."],
] as const;

const INTAKE_CHECKS = [
  ["Required basics", "Enough context exists to create or match the business profile."],
  ["Conflict check", "New intake does not overwrite verified Business Truth without review."],
  ["Support-safe upload", "Uploads are accepted as context, not automatically as public proof."],
  ["Plan clarity", "The intake path explains what the selected plan can and cannot deliver."],
  ["Dashboard route", "The customer lands on scan, report, support, or setup state instead of a dead end."],
  ["Recovery path", "Missing, invalid, duplicate, or unclear intake routes to support-safe recovery."],
] as const;

const INTAKE_RULES = [
  "Do not create duplicate business records when a customer returns with the same company context.",
  "Do not publish customer-provided facts before Business Truth review supports them.",
  "Do not ask for passwords, private keys, card data, or account secrets in intake.",
  "Do not route a customer into paid depth before the current plan boundary is clear.",
] as const;

export default function IntakeCommandPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Intake Command Center</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Clean intake keeps every report downstream clean.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">The Intake Command Center governs business facts, website context, offer details, plan routing, evidence permissions, support-safe uploads, and first-run dashboard state before work enters the operating system.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard/business-truth" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open Business Truth</Link>
            <Link href="/dashboard/customer-command-profile" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Open Customer Profile</Link>
          </div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Intake areas</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Identity, offer, website, plan, evidence, and first-run routing.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{INTAKE_AREAS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Intake checks</p><div className="mt-5 grid gap-3 md:grid-cols-2">{INTAKE_CHECKS.map(([label, copy]) => <article key={label} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><h3 className="text-xl font-semibold tracking-[-.04em] text-slate-950">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>
        <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Intake rules</p><div className="mt-5 grid gap-3">{INTAKE_RULES.map((rule) => <p key={rule} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{rule}</p>)}</div></div>
      </section>
      <section className="sr-only" aria-label="Intake command guardrails">Intake Command Center. Business identity. Offer context. Website context. Plan route. Evidence permission. First-run state. Required basics. Conflict check. Support-safe upload. Plan clarity. Dashboard route. Recovery path. clean customer intake.</section>
    </main>
  );
}
