import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Delivery History | Cendorq",
  description: "Protected Cendorq delivery history for dashboard publishing, PDF readiness, email delivery, downloads, resend requests, and recovery states.",
  path: "/dashboard/delivery-history",
  noIndex: true,
});

const DELIVERY_EVENTS = [
  ["Dashboard published", "The approved report appears in the protected customer dashboard."],
  ["PDF prepared", "The approved customer-safe PDF is generated from the same report package."],
  ["Email sent", "The customer receives the approved summary and report attachment or secure link."],
  ["PDF downloaded", "The vault records when the customer opens or saves the artifact."],
  ["Resend requested", "Support can resend the approved report without creating a conflicting version."],
  ["Delivery failed", "The customer gets a safe status while internal recovery handles the issue."],
] as const;

const REPORT_PACKAGES = [
  ["Free Scan Signal", "Dashboard-only", "First signal result, no full diagnosis claim."],
  ["Deep Review", "Dashboard + PDF + email", "Evidence-backed Presence Report after release approval."],
  ["Build Fix", "Work Plan + Completion Report", "Before/after proof and scope-safe completion delivery."],
  ["Ongoing Control", "Monthly Snapshot", "Recurring drift snapshot with PDF/email delivery."],
] as const;

const RECOVERY_STATES = [
  ["PDF failed", "Retry rendering from the approved package instead of editing by hand."],
  ["Email failed", "Keep the dashboard artifact ready and show a customer-safe delivery status."],
  ["Vault unavailable", "Do not expose raw files; route to support until access is restored."],
  ["Report held", "Do not deliver until release approval, entitlement, and PDF readiness align."],
] as const;

const GUARDRAILS = [
  "Do not show paid reports to unknown or unpaid users.",
  "Do not send draft, pending, held, or unavailable reports as final.",
  "Do not create conflicting PDF, email, and dashboard versions.",
  "Do not expose raw internal notes, raw evidence, payment payloads, or private report links.",
] as const;

export default function DeliveryHistoryPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_0%,rgba(125,211,252,.28),transparent_30%),radial-gradient(circle_at_86%_0%,rgba(196,181,253,.2),transparent_34%),linear-gradient(180deg,#ffffff_0%,#eefbff_42%,#ffffff_100%)] px-4 py-14 text-slate-950 sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,23,42,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      <section className="mx-auto grid max-w-[94rem] gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <div className="rounded-[2.25rem] border border-white/80 bg-white/84 p-6 shadow-[0_24px_80px_rgba(15,23,42,.065)] backdrop-blur sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-700">Delivery history</p>
          <h1 className="mt-4 text-[clamp(3rem,7vw,6.2rem)] font-semibold leading-[.86] tracking-[-.08em] text-slate-950">Every report needs a visible delivery record.</h1>
          <p className="mt-6 text-base font-semibold leading-8 text-slate-600">Cendorq should show whether a report was published, rendered as PDF, emailed, downloaded, resent, held, or failed without exposing internal systems.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/dashboard/reports" className="rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-bold text-white">Open report vault</Link><Link href="/dashboard/support" className="rounded-full border border-cyan-200 bg-white px-5 py-3 text-center text-sm font-bold text-cyan-700">Ask delivery support</Link></div>
        </div>
        <section className="rounded-[2.25rem] border border-slate-950 bg-slate-950 p-6 text-white shadow-[0_28px_90px_rgba(15,23,42,.25)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Delivery lifecycle</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] text-white sm:text-5xl">Approved package → dashboard → PDF → email → vault record.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{DELIVERY_EVENTS.map(([label, copy], index) => <article key={label} className="rounded-[1.35rem] border border-white/10 bg-white/[.06] p-4"><span className="grid h-8 w-8 place-items-center rounded-xl bg-cyan-300 text-xs font-black text-slate-950">{index + 1}</span><h3 className="mt-3 text-xl font-semibold tracking-[-.04em] text-white">{label}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-300">{copy}</p></article>)}</div>
        </section>
      </section>
      <section className="mx-auto mt-6 grid max-w-[94rem] gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <Panel title="Report packages" items={REPORT_PACKAGES} />
        <Panel title="Recovery states" items={RECOVERY_STATES} />
      </section>
      <section className="mx-auto mt-6 max-w-[94rem] rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">Delivery guardrails</p><div className="mt-5 grid gap-3 md:grid-cols-4">{GUARDRAILS.map((guard) => <p key={guard} className="rounded-[1.15rem] border border-cyan-100 bg-cyan-50/45 p-4 text-xs font-semibold leading-6 text-slate-700">{guard}</p>)}</div></section>
      <section className="sr-only" aria-label="Delivery history guardrails">Delivery History. Dashboard published. PDF prepared. Email sent. PDF downloaded. Resend requested. Delivery failed. Approved package. Dashboard copy. PDF readiness. Email delivery. Report vault. Delivery record. Do not expose raw internal notes, raw evidence, payment payloads, or private report links.</section>
    </main>
  );
}

function Panel({ title, items }: { title: string; items: readonly (readonly [string, string, string])[] }) {
  return <div className="rounded-[2rem] border border-white/80 bg-white/86 p-5 shadow-[0_18px_60px_rgba(15,23,42,.055)] backdrop-blur sm:p-6"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-700">{title}</p><div className="mt-5 grid gap-3 md:grid-cols-2">{items.map(([name, state, copy]) => <article key={name} className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/45 p-4"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-700">{state}</p><h3 className="mt-2 text-xl font-semibold tracking-[-.04em] text-slate-950">{name}</h3><p className="mt-2 text-xs font-semibold leading-5 text-slate-600">{copy}</p></article>)}</div></div>;
}
